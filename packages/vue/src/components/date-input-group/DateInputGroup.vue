<script setup lang="ts">
import { computed, inject, provide } from 'vue'
import { dateInputGroupVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses, dataAttr } from '../../utils'
import { DATE_FIELD_CONTEXT_KEY } from '../date-field/context'
import { TIME_FIELD_CONTEXT_KEY } from '../time-field/context'
import { DATE_INPUT_GROUP_KEY } from './context'

interface DateInputGroupProps {
  class?: string
  variant?: 'primary' | 'secondary'
  fullWidth?: boolean
}

const props = withDefaults(defineProps<DateInputGroupProps>(), {
  fullWidth: false,
  variant: 'primary',
})

// Inside a DateField or TimeField the group reads its segments and state from
// whichever field wraps it; React shares these parts between the two the same way.
const dateField = inject(DATE_FIELD_CONTEXT_KEY, null)
const timeField = inject(TIME_FIELD_CONTEXT_KEY, null)
const field = computed(() => dateField ?? timeField)

// A range picker provides this context itself, since one value feeds two
// inputs and there is no single field above the group. Its state is kept.
const host = inject(DATE_INPUT_GROUP_KEY, null)

const slots = computed(() =>
  dateInputGroupVariants({ fullWidth: props.fullWidth, variant: props.variant }),
)

const isDisabled = computed(() => field.value?.isDisabled.value ?? host?.isDisabled.value ?? false)
const isInvalid = computed(() => field.value?.isInvalid.value ?? host?.isInvalid.value ?? false)
const isReadOnly = computed(() => field.value?.isReadOnly.value ?? host?.isReadOnly.value ?? false)

provide(DATE_INPUT_GROUP_KEY, {
  adjustSegment: (type, delta, end) =>
    field.value
      ? field.value.adjustSegment(type, delta)
      : host?.adjustSegment(type, delta, end),
  isDisabled,
  isInvalid,
  isReadOnly,
  segments: computed(() => field.value?.segments.value ?? host?.segments.value ?? []),
  segmentsFor: host?.segmentsFor,
  setSegment: (type, value, end) =>
    field.value ? field.value.setSegment(type, value) : host?.setSegment(type, value, end),
  // Only the variants are re-derived, so the group's own props still apply.
  slots,
  value: computed(() => field.value?.value.value ?? host?.value.value ?? null),
})

const groupClass = computed(() => composeTwClasses(props.class, slots.value.base()))
</script>

<template>
  <div
    :data-disabled="dataAttr(isDisabled)"
    :data-invalid="dataAttr(isInvalid)"
    :class="groupClass"
    data-slot="date-input-group"
  >
    <slot />
  </div>
</template>
