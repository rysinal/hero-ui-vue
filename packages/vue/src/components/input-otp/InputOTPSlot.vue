<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses, dataAttr } from '../../utils'
import { INPUT_OTP_CONTEXT_KEY } from './context'

interface InputOTPSlotProps {
  class?: string
  index: number
}

const props = defineProps<InputOTPSlotProps>()
const inputOTPContext = inject(INPUT_OTP_CONTEXT_KEY, null)
const character = computed(() => inputOTPContext?.value.value[props.index] ?? '')
const isActive = computed(() =>
  Boolean(inputOTPContext?.isFocused.value && inputOTPContext?.activeIndex.value === props.index),
)
const isFilled = computed(() => character.value.length > 0)
const slotClass = computed(() =>
  composeTwClasses(props.class, inputOTPContext?.slots.value.slot()),
)
const valueClass = computed(() => inputOTPContext?.slots.value.slotValue())
const caretClass = computed(() => inputOTPContext?.slots.value.caret())
</script>

<template>
  <span
    :class="slotClass"
    :data-active="dataAttr(isActive)"
    :data-disabled="dataAttr(inputOTPContext?.isDisabled.value)"
    :data-filled="dataAttr(isFilled)"
    :data-invalid="dataAttr(inputOTPContext?.isInvalid.value)"
    :aria-hidden="true"
    data-slot="input-otp-slot"
  >
    <span v-if="isFilled" :class="valueClass" data-slot="input-otp-slot-value">
      {{ character }}
    </span>
    <span v-else-if="isActive" :class="caretClass" data-slot="input-otp-caret" />
  </span>
</template>
