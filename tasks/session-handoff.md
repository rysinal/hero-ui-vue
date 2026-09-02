# HeroUI Vue 迁移 · 进度与交接

> 更新：2026-09-02（全维度扫描 + 五个缺陷修复，已提交待推送）
> 分支 `develop`，HEAD = `f735e44`（**尚未 push**）

## 目标

把 Vue 版完全迁移 React 版（`react-source/heroui`）。判据是 **API / DOM / CSS / demo / a11y
五维对齐**，不接受"能渲染即可"。基准是 React 源码与 HeroUI 官方文档，不是印象。

## 当前状态

| 维度 | 数值 |
|---|---|
| React 组件覆盖 | **71 / 71** |
| React demo 逐名覆盖 | **594 / 595** |
| 测试 | 49 files / **326 tests** 全绿 |
| typecheck | 4 successful |
| docs build | 通过 |
| lint | **191 problems**（均为历史遗留，主要是 demo 缺 `/* global */`） |
| `pnpm compare` | 81 组件无差异（7 项检查） |
| 76 页浏览器审计 | 全绿（含点击触发后的 overlay） |

### 剩余缺口（1 个 demo）

- **button/ripple-effect**：已决策不移植。

日期族与 Autocomplete 均已 100% 逐名对齐。

## 两个审计工具（本轮强化，是"不用一个个手测"的答案）

```bash
pnpm compare [组件名]        # 静态源码比对，~1 秒，7 项检查
pnpm --filter @rysinal/heroui-vue-docs build
pnpm --filter @rysinal/heroui-vue-docs preview     # 审计需要先起服务
pnpm --filter @rysinal/heroui-vue-docs audit:demos # 真实浏览器量 76 页几何
```

`compare` 的 7 项：slot / 死 slot CSS / 点号部件 / prop / role / data-* 状态 /
死状态 CSS + 永不命中的自嵌套选择器。
`audit:demos` 会**点击 "show/open/toast" 类按钮**，否则 overlay 组件零覆盖。

**两者互补且都不可省**：`compare` 读源码找契约漂移，`audit:demos` 量真实浏览器找塌缩。
jsdom 永不布局（`getBoundingClientRect()` 恒为 0），所以单测抓不到任何布局问题。

**新增检查必须反证**：手动注入假缺陷 → 确认工具变红 → 删掉。本轮所有检查都这样验证过。


## 最近一轮：全维度扫描（2 个 commit）

`263241a` 修五个缺陷 + `f735e44` 沉淀教训（L22–L25）。

| 缺陷 | 表现 | 根因 |
|---|---|---|
| toast 宽度 | 渲染成 32×264 竖条，一字一行 | 漏移植 `width` prop（默认 460）→ `--toast-width` 未定义 → fixed region 宽 0 |
| `data-dragging` ×3 | slider/color-slider/color-area 拖拽无视觉反馈 | 三者自研 pointer 拖拽但从未写该属性，CSS 全是死规则 |
| 浅色勾选 | 浅色色板上白勾看不见 | 上游 CSS 笔误 `&[attr] &`（indicator 套 indicator，实测命中 0 个元素）|
| `data-resizing` | 列宽拖拽无反馈 | 同上，属性未写 |
| `data-index` | 堆叠层级信息缺失 | 属性未写 |

**顺带修了两个工具自身的盲区**（都用"撤销真实修复"反证过）：
- `compare` 的豁免条件在查**被检查方**（Vue 侧有没有 `isDragging`）——
  而那正是缺失的代码，导致真缺陷永远被跳过。已改为查证过的显式白名单。
- `compare` 的规则体正则要求无花括号，**所有嵌套规则不可见**；已改为数花括号配对。
- `audit:demos` 从不点击 → toast 类组件零覆盖；阈值只认绝对像素 → 32px 竖条漏过。

ColorArea 此前**零测试覆盖**，已补 6 个（含拖拽两分支 + 卸载清理）。

## 更早一轮的工作（8 个 commit）

1. `dcd7291` Calendar / RangeCalendar / DateField 的 47 个 demo + 3 个 docs 页 + "Date and Time"
   nav 分组；实现 YearPicker 六部件族；CalendarCell 暴露 `formattedDate`/`isUnavailable`/`isDisabled`
2. `d2506e2` TimeField（组件 + 14 demo + docs）；修 `buildSegments` 两处既有缺陷
3. `790b3c0` DatePicker（10 demo）+ DateRangePicker（11 demo）；修三处 data-slot 契约缺陷
4. `cf1bdf4` 补齐 eslint 需要的 `/* global */` 声明
5. `62ae17a` eslint 忽略 `.vitepress/cache`（6 个生成文件曾贡献 597 个问题，使 lint 数字看似不稳定）
6. `6f85340` 多月标题改由 `visibleMonths` slot 驱动；两个 with-validation demo 改用组件交出的 `isInvalid`
7. `e25dc19` Calendar/RangeCalendar 补 `firstDayOfWeek` prop + 回填 7 个 demo
8. `93f549f` Autocomplete 可组合化重构 + `useFilter` + 20 个 demo 逐名对齐

**日期族 6 个组件与 Autocomplete 现已 100% 逐名对齐。**


## 修掉的真实缺陷（都先复现再修）

| # | 缺陷 | 影响 |
|---|---|---|
| 1 | `Tooltip.test.ts` 抛未处理的 `ResizeObserver` 拒绝 | 测试通过但有假阳性风险；stub 移到 `vitest.setup.ts`（用 `??=` 保留 Slider 局部 stub） |
| 2 | `buildSegments` 用 `Date.UTC` 造参考时刻却按本机时区格式化，且小时硬编码 12 | DateField 在时间粒度下 `dayPeriod` **恒为 PM** |
| 3 | 12 小时制直接 pad 0-23 原值 | 下午显示 "20 PM"，午夜显示 "00" |
| 4 | RangeCalendar 复用 Calendar 部件，全发 `calendar-*` 而 React 发 `range-calendar-*` | 预移植的 `calendar-year-picker.css` 选择器 `[data-slot="range-calendar-grid"]` **永不匹配**，年份选择器淡入淡出完全失效 |
| 5 | Range cell 缺 React 的内层 span | `range-calendar.css` 挂在 `.range-calendar__cell-button` 上的圆形/焦点环/今日标记/hover **全部丢失** |
| 6 | `CalendarYearPickerGrid` 按 CSS 类名命名 data-slot；nav chevron 漏 data-slot | DOM 契约不符 |
| 7 | `DateInputGroup` 重新 provide 同 key 覆盖外层 | DateRangePicker 两个 input 渲染出 0 个 segment |
| 8 | `DatePickerTrigger` 的布尔 prop 缺省为 `false`，`??` 不回退 | 禁用态不继承 |
| 9 | README 覆盖表把整个颜色族/ComboBox/Slider/Table/Toast/Tooltip 列为缺口 | 实际都已实现；已按实测改为 71/71 |

## 关键技术定论（新增，务必与 tasks/lessons.md 合读）

- **Vue Calendar/RangeCalendar 的 slot 契约与 React 不同**：React 用 render-function children，
  Vue 用 slot props。`Grid` 暴露 `weeks`（自己 v-for `<tr>`），`GridHeader` 默认就渲染 7 个表头，
  `DateField.Input` 暴露 `segments`（复数，自己 v-for）。写 demo 必须按 Vue 形态。
- **选择宿主桥接**：`DATE_SELECTION_HOST_KEY` / `RANGE_SELECTION_HOST_KEY` 让 Calendar/RangeCalendar
  在被 Picker 包裹时交出值的所有权（对应 React 的 DatePickerStateContext）。
  所以 Picker 内的 Calendar **不要传 v-model**。
- **slot 前缀机制**：`CalendarContextValue.slotPrefix` + `calendarSlotName(context, part)`，
  RangeCalendar 设为 `'range-calendar'`。新增 Calendar 子部件必须走这个 helper。
- **`TimeValue` 是本地声明的联合类型**（`Time | CalendarDateTime | ZonedDateTime`），
  `@internationalized/date` 不导出它（React 从 react-aria 拿）。
- **`apps/docs` 已加 `@internationalized/date` 依赖** —— demo 直接 import 它，缺了就编译失败。
- `packages/styles` 的 variants 已 100% 预移植；**实现新组件前先读对应 `.styles.ts` 和 CSS**，
  CSS 是契约，能反推出正确结构（本轮第 4、5 号缺陷就是这样发现的）。

## 验证手法（建议沿用）

```bash
# 逐名比对 demo（不要只比数量，Vue 有额外 demo 会掩盖缺口）
R=react-source/heroui/apps/docs/src/demos
for c in <组件名>; do
  comm -23 <(ls $R/$c | grep -v '^index.ts$' | sed 's/\.tsx$//' | sort) \
           <(ls apps/docs/demos | grep "^$c-" | sed "s/^$c-//;s/\.vue$//" | sort)
done

# data-slot 契约审计（用生产产物，dev server 是客户端渲染看不到 DOM）
npx vitepress build apps/docs
grep -o 'data-slot="[a-z-]*"' apps/docs/.vitepress/dist/components/<页>.html | sort -u
grep -rho 'data-slot="[a-z-]*"' react-source/heroui/packages/react/src/components/<目录>/ | sort -u
```

## 环境注意

`~/.claude/settings.json` 已加 `CLAUDE_CODE_AUTO_COMPACT_WINDOW=950000`
修复自动压缩失效（详见 `tasks/lessons.md` L1）。上一个会话是被这个问题撑爆 1M 上下文报废的。

## Autocomplete 可组合化（用户批准的破坏性重构）

原先是 724 行单组件 + `:items` 数组 prop；现在对齐 React 的七部件：
`Root` / `Trigger` / `Value` / `Indicator` / `Popover` / `Filter` / `ClearButton`。

- **`useFilter`**（`packages/vue/src/composables/useFilter.ts`）对齐 react-aria：
  `Intl.Collator` 无法回答「是否包含」，所以按切片逐段比较。`sensitivity: 'base'` 下
  "cafe" 匹配 "Café"（已独立验证 base/variant 两档行为）。
- **`useSelectState`**（`packages/vue/src/components/select/useSelectState.ts`）
  由 Select 与 Autocomplete 共用，避免复制选择/开合/注册逻辑。
  **`Select.test.ts` 刻意未改**，其原有断言就是行为等价性的守卫。
- **删除 6 个 Vue 独有 demo**（basic / controlled-multiple / custom-value / in-surface /
  states / with-clear-button）：React 侧均不存在，且已确认无任何页面引用。

### 有意差异（代码内有注释）

- `Autocomplete.Filter` 从 DOM 读查询词 —— SearchField 在兄弟子树独立 provide，值无法 inject。
  附带好处：SearchField 自带清除按钮（不派发 `input`）也能被捕获。
- `Trigger` 用 `<div role="button">` —— 内部要嵌 ClearButton，按钮不能嵌按钮（React 用 `Group` 同理）。
- 浮层宽度用 radix 的 `--radix-popover-trigger-width` 别名，省掉 ResizeObserver
  （与 SelectPopover / ComboBoxPopover 现有做法一致）。
- **点号 API 只在 `<script setup>` 可解析**，故测试必须用 `__fixtures__/*.vue`，
  在 `mount()` 里写内联 template 会报 `Failed to resolve component: Autocomplete.Value`。
