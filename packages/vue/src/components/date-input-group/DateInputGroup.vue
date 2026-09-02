<script setup lang="ts">
import { computed, inject, provide } from 'vue'
import { dateInputGroupVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses, dataAttr } from '../../utils'
import { DATE_FIELD_CONTEXT_KEY } from '../date-field/context'
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

// Inside a DateField the group reads its segments and state from the field.
const field = inject(DATE_FIELD_CONTEXT_KEY, null)

const slots = computed(() =>
  dateInputGroupVariants({ fullWidth: props.fullWidth, variant: props.variant }),
)

provide(DATE_INPUT_GROUP_KEY, {
  adjustSegment: (type, delta) => field?.adjustSegment(type, delta),
  isDisabled: computed(() => field?.isDisabled.value ?? false),
  isInvalid: computed(() => field?.isInvalid.value ?? false),
  isReadOnly: computed(() => field?.isReadOnly.value ?? false),
  segments: computed(() => field?.segments.value ?? []),
  setSegment: (type, value) => field?.setSegment(type, value),
  slots,
  value: computed(() => field?.value.value ?? null),
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
