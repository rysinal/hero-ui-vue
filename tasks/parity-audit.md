# HeroUI Vue 对照 React 源码的进度审计

审计日期：2026-09-01
基准：`react-source/heroui`（React 组件源码 + 官方 docs demo 71 个组件页 / 70 个 demo 目录）

## 一、总体结论

| 维度 | React | Vue | 覆盖 |
|---|---|---|---|
| 组件目录 | 84（含 rac/icons 等内部件） | 57 + icons | — |
| 官方文档页 | 70 | 57 | 81% |
| 官方 demo 文件 | 559 | 280 | **50%** |
| 公开 hooks | 11 | **0** | **0%** |
| 复合点号 API（`X.Sub`） | 79 个组件 | **0** | **0%** |
| 单测 | 0（React 侧无） | 9 文件 / 68 用例，覆盖 6 组件 | — |

构建与类型检查通过：`pnpm typecheck` + `pnpm build` 均成功，`npx vitest run` 68/68 通过。

styles 包已 **100% 预移植**：`packages/styles/src/components/` 的 84 个 variants 目录与 React 完全一致，
连 table/toast/tooltip/slider/calendar/dropdown/combo-box 这些尚未实现的组件的 `.styles.ts` 都已按行数
1:1 存在。**样式层不是瓶颈，瓶颈在 Vue 组件层。**

## 二、三个系统性缺口（跨组件，优先级高于任何单组件）

### 1. 复合点号 API 全缺（最严重）
React 79 个组件的 `index.ts` 都用 `Object.assign(Root, {Control, Indicator, ...})` 暴露
`Checkbox.Control` / `Card.Header` 这类命名空间 API，**137 个官方 demo 直接依赖它**。
Vue 侧 `grep -rl "Object.assign" packages/vue/src/components/*/index.ts` = 0。

后果分两档：
- **A 档（仅命名差异，易补）**：子部件已实现，只是扁平导出。
  Card / Tabs / InputOTP / Fieldset / Modal / Drawer / Select / Popover / Accordion 等。
  补一层 `Object.assign` 即可，风险低。
- **B 档（子部件根本没实现，需重写）**：
  | 组件 | React 子部件 | Vue 现状 |
  |---|---|---|
  | Checkbox | Control, Indicator, Content | 只有 `Checkbox.vue` 单文件 |
  | Radio | Control, Indicator, Content | 只有 `Radio.vue` |
  | Switch | Control, Thumb, Icon, Content | 只有 `Switch.vue` |
  | Meter | Output, Track, Fill | 只有 `Meter.vue` |
  | ProgressBar | Output, Track, Fill | 只有 `ProgressBar.vue` |
  | Kbd | Abbr, Content | 只有 `Kbd.vue` |
  | TagGroup | List | 只有 `TagGroup.vue` |
  | Tabs | Indicator, ListContainer | 缺这两个（选中滑块指示器丢失） |

  这直接导致 `custom-render-function`、`custom-indicator` 类 demo 无法实现——
  这也正是这批 demo 在 Vue 侧普遍缺席的根因。

### 2. hooks / composables 层全缺
`packages/vue/src/composables/` 是**空目录**。React 公开导出 11 个 hooks（929 行）：
`useListData`(473行) / `useOverlayState`(110行) / `useTheme` / `useMediaQuery` /
`useCSSVariable` / `useMeasuredHeight` / `useIsHydrated` / `useMounted` 等。

已造成的实际能力损失：
- `useCSSVariable` 缺失 → Skeleton 无法通过 `--skeleton-animation` CSS 变量全局配置动画类型。
- `useOverlayState` 缺失 → Modal/Drawer/AlertDialog 各自内联实现状态，用户拿不到公开的浮层状态 API。
- `useListData` 缺失 → `tag-group-with-list-data.vue` 用手写 ref 绕过，丢掉了 React 版的增删改能力。

### 3. 文档页普遍是骨架
15 个文档页只有 23~25 行（React 对应页 108~217 行）。
最典型：`tabs.md` 25 行 / React 217 行；`skeleton.md` 23 行 / React 196 行。
这些页面只有 1 个 demo + 3~5 行 API 表，不具备交付水准。

## 三、按组件分档

### A. 达到 1:1（可交付）— 12 个
demo 100% 对齐 + 子组件导出对齐 + 有测试或结构完整：

`Modal`(13/13) `NumberField`(16/16) `SearchField`(14/14) `TagGroup`(11/11)
`InputOTP`(10/10) `Drawer`(8/8) `Popover`(5/5) `ListBox`(8/8) `Pagination`(8/8)
`ButtonGroup`(8/8) `Avatar`(7/7) `Badge`(7/7)

⚠️ **子代理实测后下调**：Modal、Drawer、Popover、Select 虽然 demo 齐、子组件导出对齐，
但存在第六章列出的功能性 bug 与 a11y 硬伤，**实际不达交付标准，应降为「粗糙」**。
经此修正，真正 1:1 的只剩 `Chip`、`DisclosureGroup`、`Text`、`Header`、`EmptyState`
及 demo 齐全且无实测缺陷的 `NumberField`/`SearchField`/`TagGroup`/`InputOTP`/`Pagination`
—— 约 **10 个**。

### B. 粗糙，未达交付标准 — 26 个
按严重度排序（demo 覆盖率 + 子组件缺口）：

**极粗糙（demo < 25%，且子组件缺失）**
| 组件 | demo | 主要缺口 |
|---|---|---|
| InputGroup | 0/20 | 20 个 demo 全缺，只有 1 个自造 basic；文档 30 行 |
| TextField | 1/12 | 缺 controlled/validation/input-types/on-surface 等 11 个 |
| Tabs | 1/8 | **缺 TabIndicator（选中滑块）+ TabListContainer**；无 vertical/secondary |
| Skeleton | 1/8 | 缺 useCSSVariable；缺 card/list/grid/text-content 等 7 个 demo |
| Separator | 1/7 | 缺 vertical/variants/with-content 等 6 个 |
| ScrollShadow | 0/6 | 6 个 demo 全缺（现有 basic 是自造）；缺 useSafeLayoutEffect |
| Link | 1/7 | 缺 icon-placement/underline-variants 等 6 个 |
| Kbd | 1/6 | **缺 KbdAbbr/KbdContent + KbdKey 符号映射表**（⌘⇧⌥ 不渲染）；`title=""` 无障碍缺失 |
| ProgressBar | 1/6 | 缺 Output/Track/Fill 子部件；缺 indeterminate/colors/sizes |
| ProgressCircle | 1/6 | 缺 indeterminate/custom-svg/with-label |
| Meter | 1/5 | 缺 Output/Track/Fill 子部件；缺 colors/sizes/custom-value |
| Textarea | 1/6 | 缺 controlled/variants/rows/full-width |
| ToggleButtonGroup | 1/9 | 缺 8 个（attached/orientation/selection-mode/sizes 等） |
| ToggleButton | 1/6 | 缺 5 个（variants/sizes/icon-only/disabled/controlled） |
| Toolbar | 1/4 | 缺 vertical/with-button-group/custom-styles |
| AlertDialog | 4/14 | 缺 10 个（close-methods/placements/statuses/custom-* 等） |
| Input | 2/6 | 缺 variants/on-surface/full-width/controlled |
| Surface | 0/1 | 缺 variants demo |

**中等（demo 50~90%，但有明确缺口）**
| 组件 | demo | 缺口 |
|---|---|---|
| CloseButton | 2/4 | 缺 default/variants |
| Fieldset | 1/2 | 缺 on-surface |
| ErrorMessage | 1/2 | 缺 with-tag-group |
| Breadcrumbs | 5/6 | 缺 custom-render-function |
| Accordion | 8/10 | 缺 custom-render-function / faq |
| Checkbox | 14/15 | **缺 Control/Indicator/Content 子部件**；缺 custom-render-function |
| CheckboxGroup | 7/9 | 缺 on-surface / with-custom-indicator |
| RadioGroup | 9/11 | 缺 custom-render-function / delivery-and-payment |
| Switch | 12/15 | **缺 Control/Thumb/Icon/Content 子部件**；缺 render-props/form/custom-render-function |
| Button | 10/14 | 缺 custom-render-function/custom-variants/outline-variant/ripple-effect |
| Autocomplete | 13/20 | 缺 7 个（user-selection/location-search/email-recipients 等） |

### C. 完全未做 — 21 个
`Calendar` `RangeCalendar` `DateField` `DatePicker` `DateRangePicker` `TimeField`（日期时间 6 个）
`ColorArea` `ColorField` `ColorSlider` `ColorSwatch` `ColorSwatchPicker` `ColorPicker`（颜色 6 个）
`ComboBox` `Dropdown` `Tooltip`（浮层/选择 3 个）
`Table` `Slider` `Toast` `Form`（其他 4 个）

对应 218 个 demo 未实现。注意：这 21 个的 **styles variants 已全部预移植好**，只差 Vue 组件层。

## 四、README 与实情的偏差

README 声称「52/71 parity」。按 demo 覆盖 ≥90% 且子组件对齐的严格口径，实际达标约 **12~16 个**，
其余 26 个属于「能渲染但未达交付」。README 的 52 是「有文档页」而非「1:1」，建议改为分档表述。

另外 `README.md` 首页把「Compound Components 灵活组合模式」列为特性，但该模式（点号 API）在 Vue 侧
实现率为 0，属于名不副实，应一并修正。

## 五、建议的推进顺序

**修订：先修 bug，再补基础层，最后才补 demo。**
第六章列的 7 个 P0 是真实功能错误（禁用 trigger 能开 modal、Select 显示原始 key、
ProgressCircle 弧长反了、Switch 受控失效、ToggleButtonGroup 选择模型空转、
Tabs vertical 样式整片失效），这些比"少 20 个 demo"严重得多——现有用户已经在踩。

0. **修 P0 bug（7 项）+ P1 a11y 硬伤（6 项）**。注意 `Modal.test.ts:285` 把 a11y 回归
   写成了期望断言，修焦点恢复时必须同步改测试。
1. **补两个基础层**（收益覆盖全库，不做会让后续组件重复踩坑）：
   - `composables/`：优先 `useOverlayState`（Tooltip/Dropdown/ComboBox 都要用）、`useCSSVariable`、`useListData`。
   - 复合点号 API：先给已有子部件的 A 档组件加 `Object.assign`，成本极低。
2. **补 B 档子部件**：Checkbox / Radio / Switch / Meter / ProgressBar / Kbd / Tabs / TagGroup。
   做完这批，`custom-render-function` / `custom-indicator` 类 demo 才具备实现前提。
3. **清理极粗糙组件**：InputGroup(0/20) 和 TextField(1/12) 缺口最大且是高频表单件。
4. **再做新组件**：Tooltip → Dropdown → ComboBox（复用 Popover/Select 经验）→ Slider → Table →
   日期族 → 颜色族。Toast 需要先有全局队列机制，单独排期。
5. **修 CI 隐患**：根 `package.json` 的 `"test": "vitest"` 是 watch 模式，CI 会挂死，应改 `vitest run`。

## 六、实测确认的功能性缺陷（不是缺功能，是 bug）

以下均由子代理实际运行/复现确认，非静态推断。**优先级高于任何 demo 补齐工作。**

### 🔴 P0 — 功能性错误

| # | 组件 | 缺陷 | 位置 |
|---|---|---|---|
| 1 | **Modal** | **禁用的 Trigger 仍能打开 modal**（实测 `opened=true`）。`handleRootClick` 吞不掉冒泡，且导致根 div 内**任意后代**点击都成为触发器 | `Modal.vue:46-49` |
| 2 | **Select** | **`defaultValue` 显示原始 key** 而非 label（`"california"` 而非 `"California"`；多选显示 `"1, 2"`）。`itemMap` 仅由 portal 内 item 挂载时填充，`isDisabled` 时永久错误 | — |
| 3 | **ProgressCircle** | 几何写死 `cx/cy=12 r=10 stroke=3 viewBox="0 0 24 24"`，React 是 `18/16/4` + `viewBox="0 0 36 36"`；且 indeterminate `dashOffset = 周长*0.25`，React 是 `*0.75` — **可见弧长完全反了** | — |
| 4 | **Switch** | `isSelected` 缺 `?? false` 兜底，`props.checked` 为 `undefined` 时传进 radix 会**静默切回非受控模式，受控失效**。同路径的 `Checkbox.vue:84-89` 有兜底 — 属漏改 | `Switch.vue:59-68` |
| 5 | **ToggleButtonGroup** | **选择模型形同虚设** — `selectedKeys`/`toggleKey` 经作用域插槽抛出，但 `ToggleButton` 从不 inject。缺 `selectionMode`/`selectedKeys`/`onSelectionChange` | — |
| 6 | ~~**Tabs**~~ | ~~`.tabs__list` 永不输出 `data-orientation`~~ **❌ 已证伪，勿采信**。实测 radix-vue **确实输出** `data-orientation="vertical"`（完整属性：`role="tablist" aria-orientation="vertical" data-orientation="vertical"`）。Tabs 的真实缺口是缺 `TabIndicator`/`TabListContainer` 子组件，与 orientation 无关 | — |
| 7 | **ModalBackdrop** | 独立使用（无 `<Modal>` 包裹，如 `modal-controlled.vue`）时 `data-placement` 恒为 `auto` → `top/center/bottom` 的 margin 规则全失效 | `ModalBackdrop.vue:414-418` |

### 🟡 P1 — 可访问性硬伤

| # | 组件 | 缺陷 |
|---|---|---|
| 8 | Modal/Drawer/Popover | dialog 无 `aria-labelledby`（heading 不生成 id）；关闭后焦点落 `<body>` **不回 trigger**。⚠️ **`Modal.test.ts:285` 把"不恢复焦点"写成了期望断言** — a11y 回归被测试固化，修复须同步改测试 |
| 9 | AlertDialog | 缺焦点陷阱/焦点还原/滚动锁；`data-entering` 硬编码常驻、`data-exiting` 从不发出 → 出场动画（`alert-dialog.css:56/125`）是死代码。同仓 `ModalContainer.vue:44-45` 才是正确写法 |
| 10 | Accordion/Disclosure | 折叠内容只有 `height:0`，无 `hidden`/`inert` → **折叠区内的按钮/链接仍可 Tab 聚焦并被读屏读出** |
| 11 | Breadcrumbs | 渲染裸 `<a>` 丢了 `.link` 类，而 `breadcrumbs.css` 自身无 focus 规则 → **键盘聚焦完全无视觉反馈** |
| 12 | Toolbar / ToggleButtonGroup | 缺 roving tabindex（toolbar 的 CSS 注释明写 "arrow key navigation"）→ Tab 键逐个穿过每个子控件 |
| 13 | Modal | 嵌套 modal 一次 Escape **全关**（每个 Backdrop 各挂一份 document keydown），React Aria 只关最上层；两份 trapFocus 互抢焦点 |

### 🟢 P2 — 契约/健壮性

| # | 问题 | 影响 |
|---|---|---|
| 14 | `provide()` 传快照而非 ref/computed — avatar/badge/card/link 的 `slots`，ButtonGroup 的 `size/variant/isDisabled/fullWidth` | 动态改 prop 子组件不更新。现有 demo 全是静态 `v-for`，恰好掩盖了它 |
| 15 | `SearchFieldClearButton` 缺 `slot="clear"` | `search-field.css:87` 的 `:has([slot="clear"])` 永不匹配，padding 不一致。对照：number-field **保留**了 `slot="increment"` — 纯遗漏，一行可修 |
| 16 | `InputGroup` root 没接 `useInteractionStates` | 不输出 `data-hovered`/`data-focus-within`，`input-group.css` 各 2 处依赖降级（触摸设备尤甚）。input-otp slot 同样缺 `data-hovered` |
| 17 | `RadioGroup` 不显式输出 `data-orientation` | `radio-group.css:5-15` 全挂在它上面，目前靠 radix `RovingFocusGroup` 内部实现代为输出 — **脆弱的第三方契约**；switch-group/button-group 都是自己显式写的 |
| 18 | `close-button` 缺 `isPending` | `close-button.css:34` 的 `[data-pending]` 块是死代码 |
| 19 | `Popover` 嵌套双 `role="dialog"`；`--trigger-anchor-point` 未映射 radix 的 transform-origin | `SelectPopover.vue:46` 已做对 — 同批改动内的遗漏 |
| 20 | `data-placement` 三处绑请求值而非 radix 已输出的 `data-side` | flip 后入场动画方向反 |
| 21 | `Input`/`TextField` 的 `type` 被限死为 7 值 | 缺 `date`/`time`/`datetime-local`/`file`/`color`；React 是原生透传 |
| 22 | `REGEXP_ONLY_CHARS_AND_DIGITS` 词序与 React 的 `REGEXP_ONLY_DIGITS_AND_CHARS` 颠倒，且类型是 RegExp 而非 string | **按 React 文档 import 会直接失败** |
| 23 | `Textarea` 用 `value`/`update:value`，但 `textarea.md` 示例和 API 表写的是 v-model/modelValue | **文档与实现直接冲突** |
| 24 | `card.css` 的 `.card__title` → `.card .card__title`，特异性 0,1,0→0,2,0 | 下游单类覆盖失效；这是 VitePress 补丁被写进了库 CSS |
| 25 | Alert 的 `provide` 传 `status` 静态快照 | 动态切换 status 图标不更新 |
| 26 | Accordion 的 `value` 强制必填（React `id` 可选自动生成） | 官方 6 个 demo 无法直接迁移 |
| 27 | Kbd 缺 `kbdKeysMap`/`kbdKeysLabelMap`（22 键） | ⌘⇧⌥ 等符号不渲染，`title=""` 空 |
| 28 | `modal-scroll-comparison.vue` 同一 Dialog 内渲染两个 `ModalCloseTrigger`（均 `absolute top-4 right-4`） | 两个 × 按钮完全重叠；React 侧只有 1 个 |

### 已排除的误报（勿采信）
- **Tabs 的 `data-orientation` 缺失 —— 已实测证伪**。radix-vue 的 `TabsList` 输出完整属性
  `role="tablist" aria-orientation="vertical" data-orientation="vertical"`，`tabs.css` 的 10 处
  `[data-orientation]` 规则正常生效。子代理声称"radix-vue 从不输出 data-orientation"且强调
  "纯读源码看不出来"，属自信的编造。
- close-button 内联 X 图标坐标写错 —— **不成立**，(18,6)→(6,18) 与 (6,6)→(18,18) 构成正确的 X。
- disclosure-group 缺方向键导航 —— **不成立**，React 侧该 hook 也只提供 prev/next 索引，Vue 与之对齐。
- Popover `data-focus`/`data-focused` 错配 —— 提出者自己撤回，两侧都是空规则且有 `:focus` 兜底。

### 关于本章证据等级的说明
本章 P0/P1 结论来自 5 个审计子代理，其运行过程有异常（重复空转、50+ 分钟不收敛、
需两次催促才交付、部分结果被截断）。因此**主审已逐条独立复验**：

- **实测复现**（写测试跑通）：Modal 禁用 trigger 能开弹窗 ✅、Modal 任意后代点击能开弹窗 ✅、
  Tabs data-orientation ❌（证伪）
- **源码核对属实**：Switch 缺 `?? false`（且 Checkbox 同路径有兜底）、ProgressCircle 几何与
  弧长（`r=10 viewBox=24 *0.25` vs React `r=16 viewBox=36 *0.75`）、ToggleButton 零 `inject`、
  AlertDialog `dataAttr(true)` 硬编码（且 ModalContainer 是正确写法）、ButtonGroup provide 裸值、
  `Modal.test.ts:284` 测试名直书 "does not restore focus"、close-button 缺 `isPending`、
  search-field 缺 `slot="clear"`（且 number-field 保留了 `slot="increment"`）、
  Input/TextField type 限死 7 值、`REGEXP_ONLY_CHARS_AND_DIGITS` 词序颠倒且类型为 RegExp
- **未逐条复验**：P2 中的 provide 快照类（14）、Select defaultValue 显示 key（2）、
  嵌套 Modal Escape（13）等。这些描述具体、与已验证项风格一致，但**动手修之前应先自行复现**。

结论：子代理的**内容准确率高**（复验 14 项中 13 项属实），但**存在编造**，
且恰好编在"外人难以验证"的点上。**不要不复现就直接改代码。**

### 一个正面结论
枚举值层面**零缺失**：16 个组件的 `*.styles.ts` 与 React 逐项比对，color/size/variant/placement/animationType 全齐。
data-* 契约在展示类组件里也是干净的。缺口集中在 **prop 名、子组件、行为** 三层，不在样式枚举。

## 七、附：CSS 实质差异（Vue 与 React 同名文件）

23 个 CSS 文件存在差异，差异行数最多的：
`autocomplete.css`(51) `modal.css`(46) `breadcrumbs.css`(26) `disclosure.css`(20)
`list-box-item.css`(20) `drawer.css`(17) `pagination.css`(16) `label.css`(14)
其余 <13 行。需逐个确认是有意适配还是移植遗漏。
