<template>
  <div class="flex w-full flex-col gap-4">
    <!--
      Vue's DateRangePicker expresses the format through `granularity` /
      `hour-cycle` / `locale`. It has no `hideTimeZone` or
      `shouldForceLeadingZeros` prop, and no time-value bridge for a TimeField in
      the popover, so those React knobs are left out; segments are always
      zero-padded here and the clock parts are edited in the field itself.
    -->
    <DateRangePicker
      :key="granularity"
      :default-value="defaultValue"
      :granularity="granularity"
      :hour-cycle="hourCycle"
      class="w-max min-w-72"
      end-name="endDate"
      start-name="startDate"
    >
      <template #default="{ value }">
        <Label>Date range</Label>
        <DateField.Group>
          <DateField.InputContainer>
            <DateField.Input v-slot="{ segments }" slot="start">
              <DateField.Segment
                v-for="(segment, index) in segments"
                :key="index"
                :segment="segment"
              />
            </DateField.Input>
            <DateRangePicker.RangeSeparator />
            <DateField.Input v-slot="{ segments }" slot="end">
              <DateField.Segment
                v-for="(segment, index) in segments"
                :key="index"
                :segment="segment"
              />
            </DateField.Input>
          </DateField.InputContainer>
          <DateField.Suffix>
            <DateRangePicker.Trigger>
              <DateRangePicker.TriggerIndicator />
            </DateRangePicker.Trigger>
          </DateField.Suffix>
        </DateField.Group>
        <DateRangePicker.Popover class="flex w-full flex-col gap-3">
          <RangeCalendar aria-label="Trip dates" class="w-full">
            <RangeCalendar.Header>
              <RangeCalendar.YearPickerTrigger>
                <RangeCalendar.YearPickerTriggerHeading />
                <RangeCalendar.YearPickerTriggerIndicator />
              </RangeCalendar.YearPickerTrigger>
              <RangeCalendar.NavButton slot="previous" />
              <RangeCalendar.NavButton slot="next" />
            </RangeCalendar.Header>
            <RangeCalendar.Grid v-slot="{ weeks }">
              <RangeCalendar.GridHeader />
              <RangeCalendar.GridBody>
                <tr v-for="(week, index) in weeks" :key="index">
                  <RangeCalendar.Cell v-for="day in week" :key="day.toString()" :date="day" />
                </tr>
              </RangeCalendar.GridBody>
            </RangeCalendar.Grid>
            <RangeCalendar.YearPickerGrid>
              <RangeCalendar.YearPickerGridBody v-slot="{ years }">
                <RangeCalendar.YearPickerCell v-for="year in years" :key="year" :year="year" />
              </RangeCalendar.YearPickerGridBody>
            </RangeCalendar.YearPickerGrid>
          </RangeCalendar>
          <span class="mt-1 text-xs text-muted">
            Selected: {{ value ? formatRange(value) : 'No date selected' }}
          </span>
        </DateRangePicker.Popover>
      </template>
    </DateRangePicker>

    <Separator class="my-5" />

    <Label class="text-xs font-medium text-muted">Format Options</Label>

    <div class="flex flex-wrap gap-4">
      <Select :value="granularity" class="w-[120px]" variant="secondary" @change="onGranularity">
        <Label>Granularity</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            <ListBox.Item
              v-for="option in granularityOptions"
              :key="option.value"
              :text-value="option.label"
              :value="option.value"
            >
              {{ option.label }}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox>
        </Select.Popover>
      </Select>

      <Select :value="hourCycle" class="w-[120px]" variant="secondary" @change="onHourCycle">
        <Label>Hour cycle</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            <ListBox.Item
              v-for="option in hourCycleOptions"
              :key="option.value"
              :text-value="option.label"
              :value="option.value"
            >
              {{ option.label }}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox>
        </Select.Popover>
      </Select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  DateField,
  DateRangePicker,
  Label,
  ListBox,
  RangeCalendar,
  Select,
  Separator,
  type DateRange,
  type SelectKey,
} from '@rysinal/heroui-vue'
import {
  DateFormatter,
  getLocalTimeZone,
  parseDate,
  parseDateTime,
} from '@internationalized/date'

type Granularity = 'day' | 'hour' | 'minute' | 'second'
type HourCycle = 12 | 24

const granularityOptions: { label: string; value: Granularity }[] = [
  { label: 'Day', value: 'day' },
  { label: 'Hour', value: 'hour' },
  { label: 'Minute', value: 'minute' },
  { label: 'Second', value: 'second' },
]
const hourCycleOptions: { label: string; value: HourCycle }[] = [
  { label: '12-hour', value: 12 },
  { label: '24-hour', value: 24 },
]

const locale = 'en-US'
const granularity = ref<Granularity>('minute')
const hourCycle = ref<HourCycle>(12)

const dateFormatter = new DateFormatter(locale, {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

const formatRange = (range: DateRange) => {
  const timeZone = getLocalTimeZone()

  return dateFormatter.formatRange(range.start.toDate(timeZone), range.end.toDate(timeZone))
}

// `default-value` is only read once, so the picker is re-keyed on granularity to
// pick up a value that carries the clock parts the new granularity asks for.
const defaultValue = computed<DateRange>(() =>
  granularity.value === 'day'
    ? { end: parseDate('2025-02-10'), start: parseDate('2025-02-03') }
    : { end: parseDateTime('2026-02-10T18:45:00'), start: parseDateTime('2026-02-03T08:45:00') },
)

type SelectChangeValue = SelectKey | SelectKey[] | null

const onGranularity = (value: SelectChangeValue) => {
  if (Array.isArray(value) || value == null) return
  granularity.value = String(value) as Granularity
}

const onHourCycle = (value: SelectChangeValue) => {
  if (Array.isArray(value) || value == null) return
  hourCycle.value = Number(value) as HourCycle
}
</script>
