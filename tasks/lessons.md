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

## L14 · 「底层库支持」要查到 export 层，别只查签名

交接说明写「`DayOfWeek` 是 `@internationalized/date` 导出的类型」，签名里确实到处在用它
（`startOfWeek`/`getWeeksInMonth`/`endOfWeek` 的第三参都是它），但 v3.12.1 的 `index.d.ts`
**从未 re-export 这个名字**——它只在 `queries.d.ts` 里 `type DayOfWeek = ...` 局部声明。
照着交接写完，typecheck 直接 4 个 TS2724。改成在 `calendar/context.ts` 本地声明该联合类型
并从 `calendar/index.ts` 对外导出，作为单一来源给三个消费方复用。

**How to apply**：
- 验「库支持某能力」要分两层：**签名接受**（grep .d.ts 函数声明）和**名字可导入**
  （grep 入口 `index.d.ts` 的 `export type {...}`），前者成立不代表后者成立
- 类型不可导入时，本地声明 + 单点导出，别在多个文件各写一份

## L15 · 测试要证伪，不能只看它变绿

给 firstDayOfWeek 写「整月覆盖」断言时，我先用的是九月 2026——但实测
`getWeeksInMonth(2026-09, 'en-US', 'sun'|'mon'|'sat')` 全是 5，**这个月根本区分不出漏传第三参**，
测试即便在有 bug 的代码上也会绿。换成 2026-02/03/11（sun 与 mon 差一周）后，
故意把 `getWeeksInMonth` 的第三参删掉复跑，3 个用例失败，才确认这是真守卫。

**How to apply**：
- 写完防回归断言，**先把修复删掉跑一遍**，看它是否真的红；不红就是空测试
- 选测试数据前先跑一次探针脚本确认「不同输入真的产生不同输出」，别凭直觉挑月份

## L16 · 并发改同一仓库时，全局指标要按目录归因

我做完 calendar 后跑 lint 得 194（基线 214），typecheck 还报了个 autocomplete 的 TS2614——
都不是我的改动，是队友 task #7 的在途工作。用 `git worktree add /tmp/hv-base HEAD`
建干净基线（软链 node_modules 复用依赖），对同一组 `--ignore-pattern` 排除队友目录后两边都是 188，
才把「我加了 0 个问题」证到数字上。

**How to apply**：
- 全局指标（lint 总数/typecheck）在多代理并发下不可直接与交接给的基线比
- 用 `git worktree` 建 HEAD 基线做对照，比 `git stash` 干净（不动队友的工作树）
- 归因公式要能对上账：基线全量 214 = 排除队友目录 188 + 队友目录 26

## L17 · jsdom 不做布局，所以「测试全绿 + 构建通过」证明不了组件能看

**事故**：用户报「日历有问题、color 也有问题」。我此前跑了 305 个单测、typecheck、docs build
全绿，还审计了 data-slot 契约，**全都没发现**。真实情况是：
- 日历日期格子渲染成 **250×250px**（应约 56px）：`.calendar__grid` 是 `<table>`，CSS 把它
  重排为 `display:grid`，但 VitePress 的 `.vp-doc table{display:block}` 与 docs 主题的
  `.vp-doc table{display:table}` 同优先级且在后，覆盖掉了 grid；行随之塌陷，
  `aspect-ratio:1/1` 把格子撑成整表宽。
- **ColorArea 渲染成 16×16px**（应 224px）：markdown 渲染器把 demo 根节点包进 `<p>`，
  该 `<p>` 在居中 flex 预览里收缩包裹，`w-full` 于是对着塌缩的父级求值。

**为什么全链路都没抓到**：jsdom 解析 CSS 但**不计算布局**，
`getBoundingClientRect()` 恒为 0，所以任何尺寸断言在单测里都无意义；
docs build 只保证编译；data-slot 审计只看结构不看几何。

**How to apply**：
- **组件库必须有一层真实浏览器的几何审计**。已落地 `apps/docs/scripts/audit-demos.mjs`
  （`pnpm --filter @rysinal/heroui-vue-docs audit:demos`），遍历 76 个页面检测尺寸塌缩。
  改完组件/CSS/预览外壳后跑一次。
- **审计要在生产构建上跑**，不能只跑 dev：hydration 类问题只在 prerender 后暴露。
- 写检测器要先剔除「设计上就很薄」的部件（separator/indicator 1px、日期分隔符 `/` 4px、
  `sr-only` 的 `clip-path:inset(50%)`、OTP 的 `opacity:0` 捕获输入框），
  否则 18 页假阳性会把真信号埋掉 —— 我第一版就是这样，逐个查证后才收敛到真问题。
- **库自己的布局要能对抗宿主页面**：修在组件 CSS 层（用 `.class[data-slot="..."]` 提权），
  而不是逐条追着宿主主题打补丁。宿主补丁只用于预览外壳这类确属 docs 的问题。

## L18 · 指标异常先分清「既有」还是「新引入」，用同一脚本测基线

`Hydration completed but contains mismatches` 在**全部 76 页**都报。我用 `git stash` +
`checkout ca7442f`（本轮起点）在基线上跑同一脚本，**同样在我没碰过的页面上报同样的错**
→ 确认是既有问题，不是本次引入。已在审计脚本里默认过滤，用 `AUDIT_HYDRATION=1` 可查看。

**副作用提醒**：`git checkout` 切分支时**未跟踪文件会留在原地**，我的审计脚本因此在基线上
被 `git show develop:...` 覆盖成 0 字节，导致脚本静默 exit 0。切换分支做对照前，
先把未跟踪的工具脚本备份到 `/tmp`。

## L19 · 靠人逐个测组件不可行,要把「比对基准」做成工具

**事故**：用户连续报了三轮问题（日历、color、toast）,每轮我都是被动定位。用户明确说
「我不可能一个一个的测,你得想个办法,比如1个1个组件的比对源码」。

**做出来的两层工具**（互补,不能互相替代）：

| 工具 | 命令 | 抓什么 | 抓不到什么 |
|---|---|---|---|
| `scripts/compare-with-react.mjs` | `pnpm compare [组件]` | 静态契约漂移：React 有而 Vue 没有的 data-slot / 复合部件 / props；CSS 选了但没人发的死规则 | 布局、几何、运行时 |
| `apps/docs/scripts/audit-demos.mjs` | `pnpm --filter ...-docs audit:demos` | 真实浏览器里的尺寸塌缩、渲染错误 | 契约命名 |

**首轮就扫出 6 个组件 21 处真实不符**,其中最严重的是 toast：
`toast.css:104` 有 `[data-slot="toast-default-icon"]{size-4}`,而 Vue 从不发这个 slot
→ 默认图标尺寸完全失控。这就是用户报的「toast 有问题」。

**关键教训：写检测器必须先压假阳性,否则等于没写。** 我的迭代过程：
- 第一版 slot 检查报 11 个组件 → 其中 calendar 那批是我把 slot 改成动态绑定
  （`calendarSlotName(context, 'cell')`）导致静态 grep 抓不到 → 教工具认这个 helper
- 又发现 `hasCustom ? 'x' : 'x-default'` 三元绑定也抓不到 → 加正则
- 跨目录消费（year-picker 在独立目录、Calendar 部件消费 range-calendar 的 slot）
  → 加「全库回退」：名字在库内任何地方出现过就不算缺失
- 试加「styles.ts 声明但组件未读」检查 → **报 27/81,逐个查证全是假阳性**
  （变量名可能是 `slots.value.x()` / `styles.value.x()` / `ctx?.slots.x()` / 跨目录）
  → **直接删掉该检查并在文件头注明为何删**,留着只会掩盖真信号
- props 检查第一版报 12 个 → 排除 `RenderProps`（那是 slot 载荷不是 props）、
  认 Vue 的 emits（React 的 `onFooChange` = Vue 的 `foo`）、
  白名单 React 专属管道（`state`/`containerRef`/`validationErrors`/`inputClassName`）
  → 收敛到 0 假阳性

**How to apply**：
- 加新检查后**逐项人工核实**再宣布可用；假阳性率高的检查宁可删掉
- 删掉的检查要在代码里写明「试过、为何删」,避免后人重复踩
- 工具跑出来的每一条,修之前仍要自己确认一遍（本轮 21 条我全查了）
- **prop 检查天生是 advisory**：继承自 primitive 的 props 正则看不见,
  所以输出措辞是「check, may be inherited」而不是断言缺失

## L20 · 工具立刻回过头抓到了我自己的疏漏

prop-parity 检查上线第一次跑就报 `isYearPickerOpen` / `defaultYearPickerOpen` /
`onYearPickerOpenChange` 缺失 —— 这是**我本轮实现 YearPicker 时漏的**：
React 允许外部驱动年份面板,Vue 侧只能从自己的 trigger 打开。已补齐并加受控/非受控双路测试。

**这说明「我实现的东西」同样需要机器复核,不能因为是自己写的就跳过。**

## L21 · 给出"照抄这个范例"的指导前,先核对 CSS 选择器的形状

**我犯的错**：修 `toast-default-icon` 时,我让子代理"照抄 `SelectIndicator.vue` 的三元模式"
（`:data-slot="hasCustom ? 'x' : 'x-default'"`,即 slot 打在 wrapper 自身)。
**照抄会修不好这个 bug**,子代理指出并纠正了我。

**根因是两处 CSS 选择器形状不同**：

| 组件 | CSS 写法 | 含义 | slot 该打在哪 |
|---|---|---|---|
| select.css:132 | `&[data-slot="select-default-indicator"]` | **自身** | wrapper 上（三元切换）|
| toast.css:104 | `.toast__indicator { [data-slot="toast-default-icon"] {...} }` | **后代**（嵌套 CSS 裸 `[attr]` 隐含 `& [attr]`）| **内部图标元素**上 |

combo-box.css:81/86 与 toast 同形。

**我用浏览器证伪确认了这一点**（造了个最小页面同时渲染两种写法）：
- slot 打在 wrapper 自身 → `width: auto`,**规则未命中**（`box-sizing` 只是继承来的,看着像生效）
- slot 打在内部 svg → `width: 16px`,**规则命中**

`box-sizing` 会继承这一点特别容易骗人 —— 只看 `boxSizing` 两者都是 `content-box`,
**必须同时看一个不继承的属性（如 `width`）才能判断规则是否真的命中**。

仓内本来就有正确范例：`AlertIndicator.vue` 的 `<component :is="defaultIcon" data-slot="alert-default-icon" />`。
我推荐了形状不匹配的那个。

**How to apply**：
- 指导别人"照抄 X"之前,先确认 X 与目标的 CSS 选择器形状一致（自身 vs 后代）
- 判断 CSS 规则是否命中,要挑**不可继承**的属性验证（`width`/`padding` 而非 `box-sizing`/`color`）
- 嵌套 CSS 里的裸 `[attr] {}` 是**后代**选择器,不是自身；要选自身必须写 `&[attr]`
- 子代理提出"你给的方案在这里不适用"时,先验证再判断 —— 这次它是对的

---

## L22 · 检查器的"豁免条件"绝不能查被检查方,否则必然自我遮蔽

**我犯的错**：`compare` 的死 CSS 检查里,我为"两侧都没实现的交互"加了豁免：

```js
const INTERACTION_EVIDENCE = { dragging: /isDragging|dragstart|draggable/i }
// ...
if (evidence && !evidence.test(vueText)) continue   // ← 循环论证
```

意图是"Vue 侧没有拖拽实现 → 这条规则不算缺陷"。但**判据查的正是缺失的那段代码**：
`isDragging` 没写 → 正则不匹配 → 跳过报告。于是 color-area / color-slider / slider
三个**真实缺陷**被无声吞掉,工具报告 "No mismatches across 81 components"。

**发现方式**：我用 grep 交叉核对"工具说干净"与"属性是否真的存在",两者矛盾。

**正确判据的方向**：参照物必须是 **React 侧 + CSS 契约**,而不是 Vue 侧。改成显式白名单：

```js
const DEAD_ON_BOTH_SIDES = { table: ['dragging', 'drop-target'] }  // 逐条查证过
```

table 的豁免是查证过的：两侧都没有 `useDragAndDrop`、React 也没有拖拽行的 story。
三个 slider 则自研了 pointer 拖拽,属性该补 —— 已补齐并经浏览器确认（cursor
`grab`→`grabbing`、thumb 16px→20px、`scale: 0.9`）。

**同一次还挖出第二个遮蔽**：`stateAttrsSelectedBy` 的正则要求规则体 `[^{}]*`(无花括号),
而 slider 的 dragging 规则内嵌了 `&::after` → **所有嵌套规则全部不可见**。改成数花括号
配对后,slider 立刻现形。越是"有意思"的状态规则越可能嵌套,这个盲区选择性极强。

**How to apply**：
- 写豁免条件时先问：**这个判据会不会在缺陷存在时恰好为真?** 若会,方向就是反的
- 参照物永远是**上游 + 契约**,不是待检方
- 静态检查器的正则一旦要求"结构简单"（无嵌套/无花括号/单行）,就会系统性漏掉复杂case
- **每个新检查都要反证**：手动注入一个假缺陷,确认工具变红,再删掉。
  这次三条 `data-dragging` + 自嵌套选择器检查都是这样验证的
- 工具报"干净"时,至少交叉核对一次原始事实（grep 属性是否真存在)

---

## L23 · 上游的 bug 不该当成 parity 照抄；但偏离必须留证据

**发现**：`color-swatch-picker.css` 的浅色勾选规则,两侧**逐字节相同**：

```css
&[data-light-color="true"] & > * { @apply text-black; }
```

编译后是 `.indicator[data-light-color="true"] .indicator > *` —— **indicator 套 indicator**,
浏览器实测 `matches: 0`。所以浅色色板上的勾一直是白底白勾,看不见。
React 上游同样坏,`isLightColor` 算了个没人用的值。

我先按 parity 补齐了 Vue 侧的 `data-light-color`(公式与 React 一致),属性正确但**样式仍无效** ——
**DOM 契约对齐不等于视觉正确**。去掉多余的 `&` 后浏览器实测：浅色 `rgb(0,0,0)`、深色 `rgb(255,255,255)`,两个分支都对。

**How to apply**：
- parity 的目标是**上游的意图**,不是上游的笔误。规则自带注释说明意图时,注释即判据
- 偏离上游必须：① 代码注释写清原因+证据 ② 浏览器实测两个分支 ③ 沉淀成可复现的检查
- 已把这类缺陷做成 `compare` 的第五项检查(自嵌套 `&` 选择器),全库扫描 + 反证通过
- 只验证"属性出现了"是不够的,要验证**属性驱动的样式真的生效**（查具体 computed 值)

---

## L24 · jsdom 的能力缺口会静默截断我们自己的事件处理

**现象**：给 slider 加 `data-dragging` 测试时失败,`expected undefined to be 'true'`。
根因不在我的代码：radix-vue 的 pointerdown 里调用了 `setPointerCapture`,
**jsdom 未实现** → 抛错 → 整条 handler 链中断 → 挂在同一元素上的我方 pointerdown 逻辑根本没跑。

修在 `vitest.setup.ts`(与既有 `ResizeObserver` stub 同一性质,属环境缺口而非单测 workaround):
`setPointerCapture` / `releasePointerCapture` / `hasPointerCapture`。

**How to apply**：
- 测试失败先分清:是**我的实现错**,还是**测试环境能力缺口**。看 stderr 有没有第三方抛错
- 环境缺口修在 `vitest.setup.ts` 全局,不要在单个测试里绕过
- 同一元素上的多个 handler,前面抛错会吃掉后面的 —— 这类失败看起来极像"我的代码没生效"

---

## L25 · "只加载页面"的审计看不见需要交互才存在的组件

**用户说"toast 也有问题",我当时补了 `data-index`、图标尺寸,以为修完了。实际最严重的缺陷还在**：
toast 渲染成 **32px 宽 × 264px 高**的竖条(文字一字一行)。76 页审计全绿,单测 324 全绿。

**两层盲区叠加**：
1. **审计从不点击** → toast/popover 这类"交互后才存在"的组件,页面加载时 DOM 里根本没有,
   `querySelectorAll` 自然扫不到 → 永远不会被测量
2. **阈值只认绝对值**(`width < 8px`) → 32px 对图标是合法尺寸,对 toast 是塌缩。
   **绝对阈值无法表达"相对于内容不合理"**

**根因是漏移植了一个 prop**：React `ToastProvider` 有 `width`(默认 460)写入 `--toast-width`;
`toast.css` 用 `sm:min-w-(--toast-width)` 定宽,region 又是 `position: fixed`、toast 是
`position: absolute`。变量未定义 → region 宽 0 → 每个 toast 收缩到最长单词的宽度。

讽刺的是 `DEFAULT_TOAST_WIDTH = 460` **早就在我们 constants.ts 里,只是从没被引用** ——
死常量是"移植漏了一半"的强信号,值得单独扫一遍。

**修复后审计升级两处,并逐一反证**：
- 加"点击触发"阶段(只点自己 preview 内、文案像"show/open/toast"的按钮,每个 preview 一个)
- 加"文字换行成竖条"判据:`width < 80 && height > width * 2.5 && 聚合文字 > 12 字`
- **反证有效**:撤掉修复重建 → 审计精确报 `toast 32x264`;恢复 → 76 页全绿

我第一版判据写的是"直接子文本节点",**实测 `directText: 0`** —— toast 的字在
title/description 子元素里。必须用 `element.textContent` 聚合文本。

**How to apply**：
- 浏览器审计必须包含**交互后状态**,否则 overlay 类组件(toast/popover/dialog/tooltip)零覆盖
- 塌缩判据要有**相对形状**维度(宽高比 + 有文字),不能只有绝对像素阈值
- **未被引用的常量/类型是移植不全的线索**,`grep` 一遍死常量很划算
- 用户报某组件"有问题"时,不要修完第一个发现就收工 —— 继续量到底
- 每次改审计判据,都要用"撤销真实修复"反证它真能抓到

---

## L26 · 派活之后自己动手，必须告知子代理（否则它会看见"幽灵并发写入者"）

**我犯的错**：把 `data-dragging` 派给子代理 FixDragging 后，我发现自己的检查器瞎了，
就顺手把那三个组件也修了 —— **但没告知它**。

它读完组件准备动手时，`git status` 从 3 个文件涨到 20 个，时间戳与它的会话重叠，
且**精确落在它的任务范围上**。它据此推断"有另一个会话在并发写入"，
于是花时间判断是否该避让、等待文件静默 60 秒、改为验证而非重写。

`ListAgents` 里 `hero-ui-vue-12` 与 `team-lead` 显示为两行，**其实是同一个会话**，
这进一步坐实了它的误判。

它的应对（不覆盖活跃写入者、等静默、转为验证）**恰好是对的，但是碰对的**。
它自己的总结最到位：**"I'd rather have known than been right by accident."**

**没有白费的部分**：它转向独立验证，产出三项我保留的成果 ——
radix-vue 1.9.17 无拖拽状态的字段级枚举、pointer-capture 假通过的独立确认、反证跑。
这些**印证**而非重复了我的实现，比它自己再写一遍更有价值。

**How to apply**：
- **收回已派出的任务必须显式通知**，一条消息的成本远低于对方的推断成本
- 自己动手改子代理负责的文件前，先问：**它会不会以为遇到了并发写入者?**
- 子代理报告"检测到并发修改"时，第一件事是**核对是不是我自己**，而不是去找 peer
- 不要依赖 `ListAgents` 的行数判断身份 —— 同一会话可能显示为多行
- 任务被抢先完成时，把子代理转向**独立验证/反证**是高价值收尾，不是安慰性工作
