# HeroUI Vue 1:1 迁移 · 长期执行计划

目标：将 HeroUI React 完整移植到 Vue 3，达到**可交付**标准（API/DOM/CSS/demo/a11y 五维对齐），
而非"能渲染即可"。基准：`react-source/heroui`。
详细缺口清单见 [parity-audit.md](./parity-audit.md)。

工作纪律：
- 每条 bug 修复**先写失败测试（RED）再改实现（GREEN）**，不复现不动手。
- 审计报告仅作线索，**子代理结论一律先复验**（已有 1 条编造前科：Tabs data-orientation）。
- 每个阶段结束跑 `pnpm typecheck` + `npx vitest run`，并更新 README 覆盖表。

---

## Phase 0 · 修已确证的 P0 功能 bug ✅ 全部完成

这些是现有用户正在踩的真实错误，优先级高于一切新功能。

- [x] **P0-1 Modal：禁用 trigger 仍能打开弹窗** ✅
  - 已实测复现：`opened from DISABLED trigger: true`
  - 附带：根 div 内**任意后代**点击都成触发器（`BYSTANDER span: true`）
  - 位置 `Modal.vue:46-49` `handleRootClick`
  - **修复**：改为只认「首个子元素内的可交互控件」，并放行 ModalTrigger 自行处理 disabled
  - 新增 `ModalTrigger.test.ts` 4 例（2 例锁 bug，2 例护住正常路径）
- [x] **P0-2 Switch：受控模式静默失效** ✅
  - `isSelected` 缺 `?? false`，`undefined` 传入 radix 会切回非受控
  - 对照组 `Checkbox.vue:84-89` 有兜底，属漏改
  - **实测确认**：`<Switch :checked="undefined" />` 点击后翻转成 true；Checkbox 同输入保持 false
  - **修复**：三处分支补 `?? false`，对齐 Checkbox。新增 `Switch.test.ts` 6 例
- [x] **P0-3 ProgressCircle：几何与弧长全错** ✅
  - Vue `r=10 viewBox="0 0 24 24" stroke=3`，React `r=16 viewBox="0 0 36 36" stroke=4`
  - indeterminate `dashOffset` 用 `周长*0.25`，React 是 `*0.75` — 弧长反了
  - **修复**：抽出 `STROKE_WIDTH/CENTER/RADIUS/CIRCUMFERENCE` 常量对齐 React；
    顺带补齐 React 的 `data-slot="progress-circle-track-circle"` / `-fill-circle`
  - 新增 `ProgressCircle.test.ts` 6 例（含 dashoffset 数值精度断言）
- [x] **P0-4 ToggleButtonGroup：选择模型空转** ✅
  - `ToggleButton` 从不 `inject`（grep 零命中），状态经插槽抛出后无人接收
  - **修复**：加 `selectionMode`/`selectedKeys`/`disallowEmptySelection`/`selectionChange`；
    context 改为响应式；ToggleButton 加 `id` 参与 group 选择
  - **顺带发现并修复 2 个额外 bug**：
    - `data-selected` 被 radix `Toggle` 吞掉 → `toggle-button.css:65` 的选中样式**从未生效**
    - `defaultSelected` 完全没生效
  - 补 8 个 group demo + 5 个 button demo，两个组件文档页从 25 行骨架重写为完整 API
- [x] **P0-5 ModalBackdrop 独立使用时 placement 恒为 auto** ✅
  - **修复**：加 `placement` prop + 本地状态，无 root context 时自己持有
- [x] **P0-6 Select `defaultValue` 显示原始 key** ✅ 已复现并修复
  - 复现结果：即便正确传 `text-value="California"`，关闭态仍显示 `"california"`
  - 根因：item 只在 popover 打开挂载时才注册 textValue，**17 个 demo 首屏全部显示错值**
  - **修复**：在 Select 根扫描 slot vnode 预解析 key→label（需调用子组件的 slot 函数
    才能深入到 SelectPopover/ListBox 内部），打开后仍以挂载注册表为准

## Phase 1 · P1 可访问性硬伤 ✅ 全部完成

- [x] **P1-1 Modal/Drawer/Popover 焦点与标签** ✅
  - 三者都加 heading id 注册表 + `aria-labelledby`
  - Modal/Drawer 追踪触发元素并在关闭时恢复焦点
  - 关键细节：点击 `div[tabindex=0]` **不会**自动聚焦它，所以不能靠 `document.activeElement`
    推断 trigger，改由 ModalTrigger/DrawerTrigger 在激活时主动上报
  - ⚠️ 已按计划改掉 `Modal.test.ts` 里"断言不恢复焦点"的反向测试
- [x] **P1-2 AlertDialog 动画与焦点** ✅
  - `v-if` 会在退出动画前直接卸载，所以根本没有退出阶段
  - **修复**：仿 ModalBackdrop 实现 enter/exit 生命周期，保持挂载到动画结束；
    补焦点恢复与 `aria-labelledby`
- [x] **P1-3 Accordion/Disclosure 折叠内容仍可聚焦** ✅ 折叠时加 `inert`
- [x] **P1-4 Breadcrumbs 焦点环消失** ✅
  - React 走 `Link`（自带焦点样式），Vue 渲染裸 `<a>` 且 `breadcrumbs.css` 零 focus 规则
  - **修复**：在 `.breadcrumbs__link` 补 `:focus-visible` / `[data-focus-visible]` 规则
- [x] **P1-5 Toolbar / ToggleButtonGroup 缺 roving tabindex** ✅
  - 补方向键/Home/End 导航（含循环）
  - 顺带补 React 的 `SeparatorContext`：Toolbar/Group 向下注入**与自身垂直**的轴向，
    否则嵌套 Separator 方向是错的
- [ ] **P1-6 待复验**：嵌套 Modal 一次 Escape 全关（每个 Backdrop 各挂一份 document keydown）
  - 顺延到后续批次，需先构造嵌套场景复现

## Phase 2 · 补两个基础层（收益覆盖全库）✅ 完成

不先做这层，后续每个组件都会重复踩坑。

- [x] **P2-1 composables 层** ✅ 8 个已移植并公开导出
  - `useOverlayState` / `useCSSVariable` / `useListData` / `useMediaQuery` /
    `useTheme` / `useMeasuredHeight` / `useIsHydrated` / `useIsMounted`
  - 适配 Vue 习惯：响应式入参接受 值/ref/getter（`MaybeRefOrGetter`），
    监听器统一用 `onScopeDispose` 回收
  - 立刻兑现两个能力：Skeleton 能读 `--skeleton-animation` 了；
    `tag-group-with-list-data` 从手写 ref 换成 `useListData`，删除项时选中态会自动同步
- [x] **P2-2 复合点号 API** ✅ 34 个组件已支持
  - **关键验证**：点号 API 在 `<script setup>` 里可用，但**选项式 `components` 注册不支持**
    （会被当成原生标签渲染成 `<card.header>`）。真实用户写 `<script setup>`，所以可行。
  - namespace 由 React 自己的 `index.ts` 映射表生成，部件名与上游一致而非猜测
  - 需显式标注 `Object.assign` 的返回类型，否则 tsc 无法为 SFC prop 类型生成声明
  - 扁平导出（`CardHeader`）全部保留，向后兼容
- [x] **P2-3 修 CI 隐患**：根 `package.json` 的 `"test": "vitest"` 是 watch 模式，CI 会挂死 ✅
  - 改为 `"test": "vitest run"`，另加 `"test:watch": "vitest"` 保留本地开发用法

## Phase 3 · B 档子部件补全 ✅ 完成

这批做完，`custom-render-function` / `custom-indicator` 类 demo 才具备实现前提。

- [x] Checkbox → `Control` / `Indicator` / `Content` ✅
- [x] Radio → `Control` / `Indicator` / `Content` ✅
- [x] Switch → `Control` / `Thumb` / `Icon` / `Content` ✅
- [x] Meter → `Output` / `Track` / `Fill` ✅
- [x] ProgressBar → `Output` / `Track` / `Fill` + `isIndeterminate`/`formatOptions`/`valueLabel` ✅
- [x] ProgressCircle → `Track` / `TrackCircle` / `FillCircle`（部件可覆盖 cx/cy/r/strokeWidth）✅
- [x] Kbd → `Abbr` / `Content` + 22 键符号映射表 ✅ 现在渲染 ⌘ 且 `title="Command"`
- [x] TagGroup → `List` ✅
- [x] Tabs → `Indicator` / `ListContainer` ✅ **修正了我第一版的错误实现**：指示器应在**每个 Tab 内部**、只为选中项渲染（tabs.css 让它填满父 Tab），而不是放在容器里靠测量移动

## Phase 4 · 粗糙组件补齐（26 个）

按缺口严重度排序，每个组件"补 prop + 补 demo + 对 CSS + 加测试"一次做透。

- [ ] **InputGroup**（0/20 demo，最大缺口，高频表单件）
  - 补 20 个 demo；root 接 `useInteractionStates` 输出 `data-hovered`/`data-focus-within`
- [ ] **TextField**（1/12）+ `type` 枚举放开（缺 `date`/`time`/`datetime-local`/`file`/`color`）
- [ ] **Tabs**（1/8）+ vertical/secondary 变体
- [ ] **Skeleton**（1/8）+ 接 `useCSSVariable`
- [ ] **ScrollShadow**（0/6）+ `onVisibilityChange` emit + `ResizeObserver`
- [ ] **Link**（1/7）+ `isCurrent`/`download`/`ping`/`referrerPolicy`；`isDisabled` 需阻止跳转
- [ ] **Kbd**（1/6）· **Separator**（1/7，补 `SeparatorContext`）· **Meter**（1/5）
- [ ] **ProgressBar/Circle**（各 1/6）· **Textarea**（1/6，且 `value` vs 文档写的 `modelValue` **冲突**）
- [ ] **ToggleButtonGroup**（1/9）· **ToggleButton**（1/6）· **Toolbar**（1/4）
- [ ] **AlertDialog**（4/14）· **Input**（2/6）· **Surface**（0/1）
- [ ] **CloseButton**（2/4，补 `isPending`）· **Fieldset**（1/2）· **ErrorMessage**（1/2）
- [ ] **Breadcrumbs**（5/6，补 `onAction`/`items`/`separator` 支持任意节点）
- [ ] **Accordion**（8/10，`value` 应可选自动生成，否则官方 6 个 demo 无法迁移）
- [ ] **Checkbox**（14/15）· **CheckboxGroup**（7/9）· **RadioGroup**（9/11，显式输出 `data-orientation`）
- [ ] **Switch**（12/15）· **Button**（10/14）· **Autocomplete**（13/20）
- [ ] **Select**（17/18，补 `disabled` demo — 需先修 P0-6）
- [ ] 修 `SearchFieldClearButton` 缺 `slot="clear"`（`search-field.css:87` 永不匹配，一行可修）
- [ ] 修 `REGEXP_ONLY_CHARS_AND_DIGITS` → React 名为 `REGEXP_ONLY_DIGITS_AND_CHARS`，且类型应为 string
- [ ] 修 provide 传快照问题（avatar/badge/card/link 的 `slots`，ButtonGroup 的 `size/variant/...`）
- [ ] 修 `card.css` 特异性污染（`.card__title` → `.card .card__title` 是 VitePress 补丁写进了库）
- [ ] 修 `modal-scroll-comparison.vue` 重复 CloseTrigger（两个 × 按钮重叠）

## Phase 5 · 21 个未实现组件

styles variants **已 100% 预移植**（含 table/toast/tooltip/slider/calendar/dropdown/combo-box
的 `.styles.ts`，与 React 行数 1:1），只差 Vue 组件层。

- [x] **Tooltip**（5 demo）✅ 基于 radix-vue Tooltip，裸控件可直接作触发器
- [x] **Dropdown**（16 demo）✅ 9 个子部件，含 section / 多选 / 子菜单
- [ ] **ComboBox**（18 demo）
- [x] **Slider**（5 demo）✅ 值进值出保持形状；修了未受控被冻结与浮点精度两个问题
- [x] **Form**（2 demo）✅ 顺带补上 TextField 的 validate 与 FieldError 自动显示
- [ ] **Table**（12 demo，依赖 `useListData`；含排序/选择/展开/虚拟化/列宽调整）
- [ ] **日期时间族**（6 个，86 demo）—— 需先选定日期库（React 用 `@internationalized/date`）
  - [ ] Calendar（15）→ RangeCalendar（16）→ DateField（16）→ TimeField（14）
        → DatePicker（10）→ DateRangePicker（11）
- [ ] **颜色族**（6 个，47 demo）
  - [ ] ColorArea（6）→ ColorSlider（8）→ ColorField（12）→ ColorSwatch（7）
        → ColorSwatchPicker（9）→ ColorPicker（5）
- [ ] **Toast**（9 demo）—— 需先设计全局队列机制

## Phase 6 · 文档与收尾

- [ ] 补 15 个骨架文档页（23~25 行 vs React 108~217 行）：
      tabs / skeleton / scroll-shadow / meter / progress-bar / progress-circle /
      toolbar / surface / header / empty-state / fieldset / switch-group / tag /
      toggle-button / toggle-button-group / input-group
- [ ] 修 `textarea.md`：示例写 v-model/modelValue 但实现是 `value`/`update:value`，**文档与实现冲突**
- [ ] **修正 README 虚假宣传**：
  - [ ] "52/71 parity" → 改为分档表述（真实 1:1 约 10 个）
  - [ ] "Compound Components 灵活组合模式" 是首页卖点但实现率 **0%**，需在 P2-2 完成后才成立
- [ ] 逐个确认 23 个 CSS 文件差异是有意适配还是移植遗漏
      （差异最大：autocomplete 51 行 / modal 46 / breadcrumbs 26 / disclosure 20 / list-box-item 20）
- [ ] 测试覆盖率提升至 80%（当前仅 6 个组件有测试）

---

## 结果复盘

（每阶段完成后在此追加：做了什么、验证方式、遗留问题）

### Phase 0 + Phase 1（2026-09-01）

**成果**：12 个确证缺陷全部修复，测试从 68 → 111 例（+43），全绿；
`pnpm typecheck` 4/4 通过；`pnpm docs:build` 通过。

**修复清单**

| 阶段 | 项 | 用户可见影响 |
|---|---|---|
| P0-1 | Modal 禁用 trigger 能开弹窗；任意后代点击也能开 | 功能错误 |
| P0-2 | Switch 受控静默失效 | 功能错误 |
| P0-3 | ProgressCircle 几何错 + indeterminate 弧长反了 | 视觉错误 |
| P0-4 | ToggleButtonGroup 选择模型空转 | 功能完全不可用 |
| P0-4a | `data-selected` 被 radix 吞掉 → 选中样式**从未生效** | 视觉错误（额外发现）|
| P0-4b | `defaultSelected` 无效 | 功能错误（额外发现）|
| P0-5 | ModalBackdrop 独立使用 placement 恒为 auto | 布局错误 |
| P0-6 | Select 关闭态显示原始 key | **17 个 demo 首屏全错** |
| P1-1 | Modal/Drawer/Popover 无 `aria-labelledby`、焦点不回归 | a11y |
| P1-2 | AlertDialog 退出动画是死代码 | a11y + 动画 |
| P1-3 | 折叠面板内容仍可 Tab 聚焦 | a11y |
| P1-4 | Breadcrumbs 焦点环不可见 | a11y |
| P1-5 | Toolbar/ToggleButtonGroup 无方向键导航 | a11y |

**同时补齐的文档预览**：ToggleButtonGroup 1→9 demo、ToggleButton 1→6 demo，
两个文档页从 25 行骨架重写为完整 API（含 data 属性表）。

**过程教训（写给后续批次）**

1. **先看全部真实用例再定判据**。P0-1 第一版用「点击落在首个子元素内」，
   但 bystander 测试的 `<span>` 恰好就是首个子元素。翻完 13 个 modal demo 才发现
   真实用法里首个子元素**总是可交互控件**，加 `INTERACTIVE_TRIGGER_SELECTOR` 才对。
2. **复现 bug 要还原精确条件**。P0-2 先写常规 `checked: false` 测试是**全绿**的，
   必须精确构造 `:checked="undefined"`（hasProp 为 true 但值 undefined）才复现。
3. **不确定就先探针**。P0-6 第一版遍历 slot vnode 没生效，写了个 20 行探针打印
   vnode 树，才看到子组件的 children 是**未求值的 slot 函数**，必须调用才能深入。
   猜三次不如探一次。
4. **测试失败先判断是实现问题还是测试问题**。ToggleButtonGroup 键盘测试报
   `activeElement` 是 `<body>`，原因是没加 `attachTo: document.body`，元素不在真实
   文档里 focus 无效 —— 是测试写错了，不是实现。
5. **子代理结论必须复验**。本批复验中又证伪 1 条（Popover「嵌套双 role=dialog」
   —— Vue 侧只有一处 `role="dialog"`）。加上此前的 Tabs `data-orientation`，
   已累计 2 条编造。

**遗留**

- P1-6（嵌套 Modal 一次 Escape 全关）未复现，顺延。
- 未做浏览器目视验收。按 `AGENTS.md` 须走 Chrome 插件 skill；
  ProgressCircle 半径 10→16 与 ToggleButton 选中态由「从未生效」变为生效，
  这两处视觉变化建议目视确认。

### Phase 2 + Phase 3 + Phase 4（部分）（2026-09-01）

**成果**：测试 111 → 162 例全绿；typecheck 与 docs build 通过；
**已实现组件的 demo 覆盖从约 70% 提升到 97%（391/399）**，全库口径 65%（391/595，
差额全在 19 个未实现组件）。

**两个基础层（Phase 2）**

| 层 | 之前 | 现在 |
|---|---|---|
| composables | 空目录 | 8 个，公开导出 |
| 复合点号 API | 0 个组件 | 34 个组件 |

**补齐的组件（Phase 3 + 4）**

Checkbox / Radio / Switch / Meter / ProgressBar / ProgressCircle / Kbd /
TagGroup / Tabs 补齐子部件；InputGroup(0→20 demo) / TextField(1→12) /
AlertDialog(4→14) / ScrollShadow(0→6) / Skeleton(1→8) / Tabs(1→8) /
Kbd(1→6) / Separator(1→7) / Link(1→7) / Toolbar(1→4) 等补齐 demo 与 API 文档。

**写 demo 时挖出的真实缺陷**（不是补文档，是补能力）

1. **TextField 根本不支持组合** —— 它硬编码 label+input+description 并忽略 children，
   而 React 的 TextField 是纯容器。所有上游 demo 都在 TextField 里组合 InputGroup，
   因此一个都搬不过来。现已改为：有 children 就当容器，没有就保留简写用法；
   并通过 context 下发 type/value/state，组合的 Input/Textarea 能双向绑定。
2. **AlertDialog 的裸 Button 触发器完全无效** —— 根元素没有任何点击处理，
   而上游 demo 都把 Button 直接作为第一个子元素。已套用 Modal 的同款规则。
3. **Textarea 的 v-model 与文档不符** —— 实现是 `value`/`update:value`，
   文档写的是 modelValue。已补 `modelValue` 并保留旧写法。
4. **ScrollShadow 阴影会过期** —— 只在 scroll 时重算，容器/内容尺寸变化后不刷新。
   已加 ResizeObserver + rAF 批处理 + `visibility-change` 事件。
5. **Link 的 isDisabled 只是看起来禁用** —— 仍可点击跳转、仍可 Tab 聚焦。
   已改为移除 href 并设 `tabindex="-1"`。
6. **Meter/ProgressBar 无法格式化输出** —— 只能显示取整百分比。已补
   `formatOptions`/`valueLabel`，现在能显示 `US$750.00`。

**过程教训（新增）**

6. **点号 API 的可行性验证差点得出错误结论**。第一次探针用选项式 `components: {}`
   注册，`<Card.Header>` 被渲染成原生标签 `<card.header>`，看起来"Vue 不支持"。
   改用真实 SFC + `<script setup>` 后完全正常。**探针要还原真实用法，否则结论是反的。**
7. **我把 Tabs.Indicator 实现错了一版**。先按"容器里一个指示器 + 测量选中 Tab 位置移动"
   实现，能跑。但读 React 源码 + tabs.css 才发现：CSS 写的是 `width:100%;height:100%`，
   意味着指示器应当**填满父 Tab**，React 是在每个 Tab 内渲染、只画选中的那个。
   改对之后测量代码整段删除。**CSS 也是契约，能反推出正确结构。**
8. **jsdom 里 radix 组件不响应合成 click**。Tabs/ToggleButton 的选中测试要用
   键盘事件（ArrowRight）或完整 pointer 序列；浏览器里 `.click()` 同样无效，
   必须派发 pointerdown/mousedown/pointerup/click 全序列。
   **测试失败先判断是实现问题还是驱动方式问题。**
9. **删文件要连带查引用**。删掉 `skeleton-basic.vue` 后 docs build 直接失败，
   因为 md 还在引用；而且 React 侧其实**有**这个 demo，是我误删。

**明确不移植的两处**（已在 commit 说明）

- `button/ripple-effect`：依赖第三方 React 包 `m3-ripple`，Vue 无对应实现。
- `button/custom-variants`：React 用 tailwind-variants 的 `extend` 扩展 buttonVariants，
  Vue demo 改为直接组合 class，是等价的惯用写法。

**已知结构性差异（待决策）**

- **Autocomplete**：Vue 是 724 行单体组件（`items` prop 驱动），
  React 是 6 个子部件的可组合结构（Trigger/Value/Indicator/Popover/Filter/ClearButton）。
  剩余 7 个 demo（default / user-selection / email-recipients 等）都依赖可组合结构
  与 `useFilter`。**改造会重写整个组件，且现有 19 个 demo 全部依赖当前 API**，
  风险与收益需权衡，暂缓并单独排期。

### Phase 5 首批（2026-09-02）

**新增 4 个组件**：Tooltip、Slider、Form、Dropdown。
测试 162 → 179 例全绿；demo 覆盖 65% → **70%（419/595）**；
未实现组件从 19 降到 15。

**每个都在实现中发现了真问题**

| 组件 | 发现 |
|---|---|
| Slider | 未受控时被冻结：根把静态 `defaultValue` 喂给 radix，覆盖掉每次变更 |
| Slider | 填充宽度算出 `55.00000000000001%`，浮点噪声会进 DOM |
| Form | TextField 没有 `validate`，FieldError 也不会自动显示消息 |
| Form | 校验若不等交互就跑，未触碰的必填空字段一挂载就标红 |
| Dropdown | radix 写的是 `data-disabled=""`，而 `menu-item.css` 匹配 `[data-disabled="true"]` |

**两处与 React 的有意差异（已在文档注明）**

- **Dropdown 触发器必须包 `Dropdown.Trigger`**。React 允许裸 `<Button>` 作第一个子元素，
  但 Vue 模板无法在不改变书写形态的前提下重新包裹任意子节点。
  （Tooltip 能做到是因为它只有一个触发器，可以整体包住。）
- **Dropdown 的 `selectionMode` 两处都能写**：React 声明在 `Menu` 上，
  Vue 两处都接受，状态统一由根持有。

**过程教训（新增）**

10. **CSS 能反推出结构错误**。Tabs.Indicator 那次是靠 `width:100%;height:100%` 反推出
    "应该填满父 Tab"；这次 Dropdown 的 `[data-disabled="true"]` 又暴露了 radix 的空值属性。
    **移植时把 CSS 选择器当契约读，比只读组件源码发现得多。**
11. **浏览器验证要按组件的真实交互方式驱动**。radix 的子菜单不响应合成 `pointerenter`，
    要用 `ArrowRight`；Tabs 不响应 `.click()`，要用完整 pointer 序列。
    第一次探针失败**先怀疑驱动方式，再怀疑实现**——这几次全是驱动方式的问题。
12. **别用"标题的下一个兄弟节点"定位 demo**。多次因此拿到空结果，
    改用触发器文案等内容特征定位才稳定。
