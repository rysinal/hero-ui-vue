<template>
  <div class="flex gap-4">
    <DateField
      v-model="value"
      :granularity="granularity"
      class="w-[256px]"
      name="granularity-date"
    >
      <Label>Appointment Date</Label>
      <DateField.Group>
        <DateField.Input v-slot="{ segments }">
          <DateField.Segment v-for="(segment, index) in segments" :key="index" :segment="segment" />
        </DateField.Input>
      </DateField.Group>
    </DateField>
    <div class="flex flex-col gap-1">
      <div class="flex items-center gap-2">
        <Label>Granularity</Label>
        <Tooltip :delay="0">
          <Tooltip.Trigger>
            <button aria-label="Granularity information" type="button">
              <svg aria-hidden="true" class="size-4 text-muted" fill="none" viewBox="0 0 16 16">
                <path
                  d="M6.25 6a1.75 1.75 0 1 1 2.63 1.52c-.54.31-.88.86-.88 1.48M8 11.25h.01M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0Z"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
              </svg>
            </button>
          </Tooltip.Trigger>
          <Tooltip.Content align="start" placement="bottom">
            <p>
              Determines the smallest unit displayed in the date picker. By default, this is "day"
              for dates, and "minute" for times.
            </p>
          </Tooltip.Content>
        </Tooltip>
      </div>
      <Select
        :model-value="granularity"
        class="w-[110px]"
        placeholder="Select granularity"
        variant="secondary"
        @update:model-value="granularity = $event as DateGranularity"
      >
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            <ListBox.Item
              v-for="option in granularityOptions"
              :key="option.id"
              :text-value="option.label"
              :value="option.id"
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
import { ref, shallowRef, watch } from 'vue'
import {
  DateField,
  Label,
  ListBox,
  Select,
  Tooltip,
  type DateGranularity,
} from '@rysinal/heroui-vue'
import { parseDate, parseZonedDateTime, type DateValue } from '@internationalized/date'

const granularityOptions = [
  { id: 'day', label: 'Day' },
  { id: 'hour', label: 'Hour' },
  { id: 'minute', label: 'Minute' },
  { id: 'second', label: 'Second' },
] as const

const dayValue = () => parseDate('2025-02-03')
const timeValue = () => parseZonedDateTime('2025-02-03T08:45:00[America/Los_Angeles]')

const granularity = ref<DateGranularity>('day')
// `defaultValue` is only read once, so swap the value when granularity changes
// to keep the time segments populated.
const value = shallowRef<DateValue | null>(dayValue())

watch(granularity, (next) => {
  value.value = next === 'day' ? dayValue() : timeValue()
})
</script>
