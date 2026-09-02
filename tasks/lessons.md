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

---

# 迁移工作教训（2026-09-02 日期族收尾）

## L5 · `data-slot` 是对外契约，必须逐名比对，不能只看渲染效果

**发现的三个真实缺陷**（都不影响"能渲染"，但破坏样式/集成契约）：
1. `CalendarYearPickerGrid` 我按 CSS 类名（`__year-grid`）命名了 `data-slot`，
   但 React 用的是 `calendar-year-picker-grid`。**CSS 类名 ≠ data-slot 名**，两者独立。
2. `CalendarNavButton` 内的 svg 漏了 `data-slot="calendar-nav-button-icon"`。
3. **最严重**：RangeCalendar 复用 Calendar 子部件，全部发出 `calendar-*`，
   但 React 发 `range-calendar-*`，且预移植的 `calendar-year-picker.css:35,46` 选择器写的是
   `[data-slot="range-calendar-grid"]` → Vue 从不发出该名字 →
   **RangeCalendar 里年份选择器的淡入淡出完全失效**。

**How to apply**：
- 每实现完一个组件，跑一次 data-slot 契约审计（从 React 源码 grep `data-slot="..."` 与 Vue 产物比对），
  不要只看"页面能不能打开"
- **复用子部件时警惕命名**：React 若为变体准备了独立命名，Vue 复用就必须让部件按上下文改名
  （本次做法：context 加 `slotPrefix`，部件用 `calendarSlotName(context, part)` 派生）
- 用生产构建产物（`.vitepress/dist/**/*.html`）审计，dev server 是客户端渲染，SSR 里看不到 DOM

## L6 · Vue 布尔 prop 缺省是 `false` 不是 `undefined`，`??` 回退会失效

**事故**：`DatePickerTrigger` 写 `props.isDisabled ?? field?.isDisabled.value ?? false`，
期望「未传 prop 时继承字段的禁用态」。但 Vue 对声明为 `boolean` 的 prop 缺省注入 `false`，
`??` 只在 `null/undefined` 时回退 → 永远取到 `false`，继承逻辑完全失效。

**修法**：显式声明 `withDefaults(defineProps<P>(), { isDisabled: undefined })`。

**How to apply**：任何「prop 未传时回退到 context」的布尔属性，都必须显式把默认值设为 `undefined`。
写完立刻加一条「父级禁用 → 子部件也禁用」的测试，这类 bug 不写测试根本发现不了。

## L7 · `Intl.DateTimeFormat` 必须与参考时刻的时区一致

**事故**：`buildSegments` 用 `Date.UTC(...)` 造参考时刻，但 formatter 没传 `timeZone`，
于是按本机时区（UTC+8）读回 → 小时偏移。且它把小时硬编码为 12，
导致 DateField 在时间粒度下 `dayPeriod` **恒为 PM**，与真实值无关。
另有 12 小时制显示直接 pad 0-23 原值 → 下午显示成 "20 PM"，午夜显示成 "00"。

**How to apply**：
- 用 `Date.UTC` 造时刻，formatter 就必须 `timeZone: 'UTC'`，两者成对出现
- 参考时刻的时间部分要取真实值，不能硬编码（否则被格式化读回的 `dayPeriod` 是假的）
- 12 小时制显示要换算：`h % 12 === 0 ? 12 : h % 12`；值仍存 0-23
- 这类 bug 在 UTC+0 机器上不复现，**必须写断言而不是靠眼看**

## L8 · 同名 context 会被内层组件覆盖

**事故**：`DateRangePicker` provide 了 `DATE_INPUT_GROUP_KEY`（带 `segmentsFor`），
但 demo 里用的 `DateField.Group` 内部又 provide 了同一个 key，
**把外层覆盖掉且丢失了 `segmentsFor`** → 两个 input 渲染出零个 segment。

**How to apply**：写「内层会重新 provide 同 key」的组件时，先 inject 同 key 拿到外层值再合并转发
（本次做法：`DateInputGroup` 先 `inject(DATE_INPUT_GROUP_KEY)` 作为 host，
字段优先、否则回退 host）。渲染为空先怀疑 context 被覆盖，而不是数据生成有问题。

## L9 · 陈旧的 tsbuildinfo 会让 vue-tsc 静默不产出声明

**事故**：`vue-tsc --declaration --emitDeclarationOnly` 退出码 0 但 `dist/index.d.ts` 不生成，
一度误判为自己的改动引入。根因是 `packages/vue/tsconfig.tsbuildinfo` 增量缓存陈旧
（`vite build` 清空 dist 后，tsc 认为无需重新产出）。删掉缓存即恢复。

**How to apply**：声明产物异常先 `rm -f packages/vue/tsconfig.tsbuildinfo` 再判断，
不要急着回滚代码。另：判断「是否我引入的」要用 `git stash` 对照干净树实测。

## L10 · 子代理产出必须复验（本次 0 前科，但流程要保持）

本次 4 个子代理写了 51 个 demo，我逐项查了：幻觉 API（`@gravity-ui/icons` / `I18nProvider` /
`useLocale` / `onPress`）、`ref` 误用（应为 `shallowRef`）、slot 契约是否漏用 —— 全部干净。
**检查成本很低（几条 grep），但一旦漏检就会写进 commit。**

## L11 · demo 依赖要落到 demo 所在的包

`apps/docs` 缺 `@internationalized/date` 依赖，导致所有日期 demo 一编译就
`Rollup failed to resolve import`。React 侧 demo 也是直接 import 这个库的，
真实使用者同样要装 → 加到 `apps/docs/package.json` 是正确解法，不是绕路。

## L12 · 指标忽高忽低时，先查它统计了什么，别急着归因到代码

**事故**：`pnpm lint` 在同一个 commit 上先报 215 problems，再报 811/812，反复横跳。
我一度怀疑是自己引入的、又怀疑是 `git checkout` 时序问题。
根因：`eslint.config.js` 的 `ignores` 漏了 `**/.vitepress/cache/**`，
该目录**只在 docs build 之后才存在**，里面 6 个生成文件贡献了 597 个问题。
所以「有没有跑过 build」决定了 lint 数字，与代码无关。

**How to apply**：
- 数字对不上先做**可重复性验证**（同一状态连跑两次），再谈归因
- 分解指标来源（`grep "^/Users" | cut -d/ -f1-2 | sort | uniq -c`）比盯总数有用
- 判断「是否我引入的」要用 `git stash` + `git checkout` 对照，**但要注意生成物残留会污染对照**——
  这次基线两次测出 215 和 812，就是因为第二次跑时 dist/cache 还在
- 顺手修掉配置缺口（把生成目录加进 ignores），别让后人再踩

## L13 · 用户批准破坏性重构前，要把代价与证据一起摆出来

Autocomplete 的可组合化会让 19 个现有 demo 全部重写。我没有直接开工，也没有直接放弃，
而是先复验「被阻塞」的判断是否成立（成立，且比交接文档描述的更大：Vue 侧是 724 行单文件、
零子部件，React 侧有 7 个部件），再把**关键证据**（`packages/styles` 已预移植
filter/indicator/popover/trigger/value/clearButton 全部 slots，说明样式层本就是为可组合 API 准备的）
和**代价**（19 个 demo 重写、无既有测试束缚）一并给用户选择。

**How to apply**：架构级改动即使在「自主推进」授权下也值得停一次，
但停下来时必须带着结论和证据，而不是问「要不要做」。
