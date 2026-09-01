// Compound namespace: mirrors the React dot-notation API
// (Calendar.Grid, Calendar.Cell, ...). Requires <script setup>; the
// options-API `components` option cannot resolve dotted tags.
import Calendar from './Calendar.vue'
import CalendarCell from './CalendarCell.vue'
import CalendarCellIndicator from './CalendarCellIndicator.vue'
import CalendarGrid from './CalendarGrid.vue'
import CalendarGridBody from './CalendarGridBody.vue'
import CalendarGridHeader from './CalendarGridHeader.vue'
import CalendarHeader from './CalendarHeader.vue'
import CalendarHeaderCell from './CalendarHeaderCell.vue'
import CalendarHeading from './CalendarHeading.vue'
import CalendarNavButton from './CalendarNavButton.vue'

type CalendarCompound = typeof Calendar & {
  Cell: typeof CalendarCell
  CellIndicator: typeof CalendarCellIndicator
  Grid: typeof CalendarGrid
  GridBody: typeof CalendarGridBody
  GridHeader: typeof CalendarGridHeader
  Header: typeof CalendarHeader
  HeaderCell: typeof CalendarHeaderCell
  Heading: typeof CalendarHeading
  NavButton: typeof CalendarNavButton
  Root: typeof Calendar
}

export const CalendarNamespace: CalendarCompound = Object.assign(Calendar, {
  Cell: CalendarCell,
  CellIndicator: CalendarCellIndicator,
  Grid: CalendarGrid,
  GridBody: CalendarGridBody,
  GridHeader: CalendarGridHeader,
  Header: CalendarHeader,
  HeaderCell: CalendarHeaderCell,
  Heading: CalendarHeading,
  NavButton: CalendarNavButton,
  Root: Calendar,
})
