// Compound namespace: mirrors the React dot-notation API. The parts are
// Calendar's, driven by RangeCalendar's context, which is how React composes
// them too.
import {
  CalendarCell,
  CalendarCellIndicator,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeader,
  CalendarHeaderCell,
  CalendarHeading,
  CalendarNavButton,
} from '../calendar'
import {
  CalendarYearPickerCell,
  CalendarYearPickerGrid,
  CalendarYearPickerGridBody,
  CalendarYearPickerTrigger,
  CalendarYearPickerTriggerHeading,
  CalendarYearPickerTriggerIndicator,
} from '../calendar-year-picker'
import RangeCalendar from './RangeCalendar.vue'

type RangeCalendarCompound = typeof RangeCalendar & {
  Cell: typeof CalendarCell
  CellIndicator: typeof CalendarCellIndicator
  Grid: typeof CalendarGrid
  GridBody: typeof CalendarGridBody
  GridHeader: typeof CalendarGridHeader
  Header: typeof CalendarHeader
  HeaderCell: typeof CalendarHeaderCell
  Heading: typeof CalendarHeading
  NavButton: typeof CalendarNavButton
  Root: typeof RangeCalendar
  YearPickerCell: typeof CalendarYearPickerCell
  YearPickerGrid: typeof CalendarYearPickerGrid
  YearPickerGridBody: typeof CalendarYearPickerGridBody
  YearPickerTrigger: typeof CalendarYearPickerTrigger
  YearPickerTriggerHeading: typeof CalendarYearPickerTriggerHeading
  YearPickerTriggerIndicator: typeof CalendarYearPickerTriggerIndicator
}

export const RangeCalendarNamespace: RangeCalendarCompound = Object.assign(RangeCalendar, {
  Cell: CalendarCell,
  CellIndicator: CalendarCellIndicator,
  Grid: CalendarGrid,
  GridBody: CalendarGridBody,
  GridHeader: CalendarGridHeader,
  Header: CalendarHeader,
  HeaderCell: CalendarHeaderCell,
  Heading: CalendarHeading,
  NavButton: CalendarNavButton,
  Root: RangeCalendar,
  YearPickerCell: CalendarYearPickerCell,
  YearPickerGrid: CalendarYearPickerGrid,
  YearPickerGridBody: CalendarYearPickerGridBody,
  YearPickerTrigger: CalendarYearPickerTrigger,
  YearPickerTriggerHeading: CalendarYearPickerTriggerHeading,
  YearPickerTriggerIndicator: CalendarYearPickerTriggerIndicator,
})
