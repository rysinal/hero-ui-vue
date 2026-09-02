# 教训沉淀

## L1 · 长会话必须主动管控上下文，不能依赖自动压缩兜底

**事故**：会话 `b0b06980` 上下文从 41k 一路涨到 999.4k/1M，全程未触发自动压缩；
到顶后所有请求返回 `API Error: 400 unknown error`，手动 `/compact` 同样 400，会话彻底死锁。

**根因**（已在 CLI bundle 中逆向确认，非推测）：模型名里的 `[1m]` 后缀（正则 `/\[1m\]/i`，**大小写不敏感**）
让窗口计算函数 `bL()` 在第一行 `if(Qc(e))return 1e6` 就直接返回，**根本读不到
`CLAUDE_CODE_MAX_CONTEXT_TOKENS`**（该分支在函数末尾，是死代码）。更要命的是自动压缩判定函数 `vC()`：
`[1m]` 命中后跳过 `unknown-model`（主动压缩）分支，落到 `source:"auto"` → `enforced=false`，
即**退化为"反应式压缩"——不再按阈值主动压，而是等 API 返回它能识别的 `prompt is too long` 才压**。
而中转网关把超限错误改写成了 `400 unknown error`（实测 `error_code:-4003`），CLI 认不出来
→ 反应式压缩也永不触发 → 一路涨到 100% 然后彻底卡死。`/compact` 自身要携带完整上下文发请求，
上下文已超限 → 这条自救路径同样必然失败。

**网关真实上限**（实测）：严格小于 1,000,000 input tokens。999,006 通过，1,000,000 报 400。

**正确修法**：用 `CLAUDE_CODE_AUTO_COMPACT_WINDOW`（bundle 中 `vC()` 的**第一优先分支**，
返回 `source:"env"` → `enforced=true`，主动压缩恢复）。取值范围 100,000–1,000,000，只接受纯整数
（写 `950k` 会被解析成 950 再夹到下限）。阈值 = 窗口 − 13,000，所以设 950000 → 约 937k 触发压缩。
`CLAUDE_CODE_MAX_CONTEXT_TOKENS` 在带 `[1m]` 时**完全无效**，别指望它。

**How to apply**：
- 用 `CLAUDE_CODE_AUTO_COMPACT_WINDOW` 控制压缩时机，而非 `MAX_CONTEXT_TOKENS`
- 长会话在 70~80% 时**主动** `/compact`，不要等自动触发
- 单会话不要连续跑十几个小时的大任务；阶段性收尾 + 交接文档 + 新会话接续
- 关键产出**及时 commit**（本次靠这条保住了全部代码，只有交接文档是新增未跟踪文件）
- 卡死后的自救顺序：**Esc Esc 回退几轮对话 → `/compact` → 仍不行则 `/clear` + `/resume`**，
  不是只能重开（`/compact` 无部分压缩、无 `--dry-run`、不能指定起始消息）


## L2 · 浏览器截图会瞬间吃掉巨量上下文

**事故**：会话中两个 base64 截图 tool_result 分别为 266,056 和 163,556 字符，
合计约 107k tokens ≈ **占满 1M 窗口的 10.7%**，两次调用就吃掉十分之一预算。

**How to apply**：
- 验证 UI 优先用 `evaluate_script` 取 DOM 属性/计算样式做断言，**返回文本而非图像**
- 必须截图时缩小视口/裁剪元素区域，不要全页截图
- 同一处 UI 不要反复截图对比，改用脚本提取关键值比对

## L3 · 模型名后缀 `[1m]` 会静默改变压缩行为；配置漂移要靠实测发现

**事实**：`settings.json` 里写 `[1M]`（大写）时，**直连网关 curl 返回 404 Model not found**，
只有 `[1m]`（小写）才 200。但 CLI 内部对模型名做了归一化，实际发出的查询是 `[1m]`
（`claude -p` 实测日志显示 `{"model":"model_hub/es1_orange_o50[1m]"}`），**所以大写并不是本次事故的原因**——
会话本身正常跑了十几个小时。`Qc()` 的正则 `/\[1m\]/i` 也是大小写不敏感的。

**真正的坑**：这个后缀会静默把自动压缩切成反应式模式（见 L1），CLI **不给任何提示**。

**How to apply**：
- 改模型配置后用 curl 打一发最小请求验证，别等实际会话里报错
- 区分错误码语义：`404 Model not found` = 模型名/路由问题；`400 -4003 unknown error` = 请求超上下文上限
- 别用 `/v1/models` 列表判断别名是否可用（列表里根本没有 `[1m]` 别名，但它可用），直接实测
- 排查配置类问题时，**以 CLI 实际发出的请求为准**，不要只看配置文件字面值
- `~/.zshrc:220` 的 `claude-relay` alias 里有另一套模型名和 `MAX_CONTEXT_TOKENS=256000`，
  与 `settings.json` 不一致；settings 的 `env` 优先级更高，但走 alias 启动时行为会变


## L4 · morph-compact 插件无法替代原生压缩，且在超限时同样无效

**事实**：已启用 `morph-compact@morph`（使用 1002 次），它挂 `PreCompact`/`SessionStart` 钩子。
但其 README 明确写明：**无法阻止 Claude Code 自带压缩**，只能靠提示注入让自带压缩少输出，
且"在超大会话上更可能不被遵守"。

**How to apply**：
- 不要因为装了 morph-compact 就以为上下文有兜底，它不改变窗口上限，超限时 `/compact morph` 一样 400
- 该插件要求 `bun`，`PreCompact` 阶段会跑 `bun install`，压缩链路上多一个失败点
