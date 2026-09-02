# HeroUI Vue 迁移 · 进度与交接

> 更新：2026-09-02（日期族收尾完成并已推送）
> 分支 `develop`，已同步 `origin/develop`，HEAD = `cf1bdf4`

## 目标

把 Vue 版完全迁移 React 版（`react-source/heroui`）。判据是 **API / DOM / CSS / demo / a11y
五维对齐**，不接受"能渲染即可"。基准是 React 源码与 HeroUI 官方文档，不是印象。

## 当前状态

| 维度 | 数值 |
|---|---|
| React 组件覆盖 | **71 / 71** |
| React demo 逐名覆盖 | **587 / 595** |
| 测试 | 47 files / 287 tests 全绿 |
| typecheck | 4 successful |
| docs build | 通过 |
| lint | 214 problems（**均为历史遗留**，比本轮开始前少 1 个） |

### 剩余缺口（8 个 demo）

- **Autocomplete 7 个**：default / email-recipients / location-search / single-select /
  tag-group-selection / user-selection / user-selection-multiple
  → 需要可组合子部件 + `useFilter`。**用户已批准重构**，正在进行中。
- **button/ripple-effect 1 个**：已决策不移植。

## 本轮完成的工作（4 个 commit）

1. `dcd7291` Calendar / RangeCalendar / DateField 的 47 个 demo + 3 个 docs 页 + "Date and Time"
   nav 分组；实现 YearPicker 六部件族；CalendarCell 暴露 `formattedDate`/`isUnavailable`/`isDisabled`
2. `d2506e2` TimeField（组件 + 14 demo + docs）；修 `buildSegments` 两处既有缺陷
3. `790b3c0` DatePicker（10 demo）+ DateRangePicker（11 demo）；修三处 data-slot 契约缺陷
4. `cf1bdf4` 补齐 eslint 需要的 `/* global */` 声明

**日期族 6 个组件现已 100% 逐名对齐（82 个此前全缺的 demo 已补齐）。**

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
