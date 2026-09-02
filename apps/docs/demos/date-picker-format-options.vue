<template>
  <div class="flex flex-col gap-4">
    <!--
      Vue's DatePicker expresses the format through `granularity` / `hour-cycle`
      / `locale`. It has no `hideTimeZone` or `shouldForceLeadingZeros` prop, and
      no time-value bridge for a TimeField in the popover, so those React knobs
      are left out; segments are always zero-padded here.
    -->
    <DatePicker
      :key="granularity"
      :default-value="defaultValue"
      :granularity="granularity"
      :hour-cycle="hourCycle"
      class="w-fit min-w-64"
      name="date"
    >
      <Label>Date and time</Label>
      <DateField.Group full-width>
        <DateField.Input v-slot="{ segments }">
          <DateField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
        </DateField.Input>
        <DateField.Suffix>
          <DatePicker.Trigger>
            <DatePicker.TriggerIndicator />
          </DatePicker.Trigger>
        </DateField.Suffix>
      </DateField.Group>
      <DatePicker.Popover>
        <Calendar aria-label="Event date">
          <Calendar.Header>
            <Calendar.YearPickerTrigger>
              <Calendar.YearPickerTriggerHeading />
              <Calendar.YearPickerTriggerIndicator />
            </Calendar.YearPickerTrigger>
            <Calendar.NavButton slot="previous" />
            <Calendar.NavButton slot="next" />
          </Calendar.Header>
          <Calendar.Grid v-slot="{ weeks }">
            <Calendar.GridHeader />
            <Calendar.GridBody>
              <tr v-for="(week, index) in weeks" :key="index">
                <Calendar.Cell v-for="day in week" :key="day.toString()" :date="day" />
              </tr>
            </Calendar.GridBody>
          </Calendar.Grid>
          <Calendar.YearPickerGrid>
            <Calendar.YearPickerGridBody v-slot="{ years }">
              <Calendar.YearPickerCell v-for="year in years" :key="year" :year="year" />
            </Calendar.YearPickerGridBody>
          </Calendar.YearPickerGrid>
        </Calendar>
      </DatePicker.Popover>
    </DatePicker>

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
  Calendar,
  DateField,
  DatePicker,
  Label,
  ListBox,
  Select,
  type SelectKey,
} from '@rysinal/heroui-vue'
import { parseDate, parseDateTime, type DateValue } from '@internationalized/date'

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

const granularity = ref<Granularity>('minute')
const hourCycle = ref<HourCycle>(12)

const defaultValue = computed<DateValue>(() =>
  granularity.value === 'day' ? parseDate('2026-02-03') : parseDateTime('2026-02-03T08:45:00'),
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
