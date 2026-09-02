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

const slots = computed(() =>
  dateInputGroupVariants({ fullWidth: props.fullWidth, variant: props.variant }),
)

provide(DATE_INPUT_GROUP_KEY, {
  adjustSegment: (type, delta) => field.value?.adjustSegment(type, delta),
  isDisabled: computed(() => field.value?.isDisabled.value ?? false),
  isInvalid: computed(() => field.value?.isInvalid.value ?? false),
  isReadOnly: computed(() => field.value?.isReadOnly.value ?? false),
  segments: computed(() => field.value?.segments.value ?? []),
  setSegment: (type, value) => field.value?.setSegment(type, value),
  slots,
  value: computed(() => field.value?.value.value ?? null),
})

const groupClass = computed(() => composeTwClasses(props.class, slots.value.base()))
</script>

<template>
  <div
    :data-disabled="dataAttr(field?.isDisabled.value)"
    :data-invalid="dataAttr(field?.isInvalid.value)"
    :class="groupClass"
    data-slot="date-input-group"
  >
    <slot />
  </div>
</template>
