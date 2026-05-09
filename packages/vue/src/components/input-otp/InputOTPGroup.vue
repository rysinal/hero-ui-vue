<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { INPUT_OTP_CONTEXT_KEY } from './context'

interface InputOTPGroupProps {
  class?: string
}

const props = defineProps<InputOTPGroupProps>()
const inputOTPContext = inject(INPUT_OTP_CONTEXT_KEY, null)
const groupClass = computed(() =>
  composeTwClasses(props.class, inputOTPContext?.slots.value.group()),
)
</script>

<template>
  <div :class="groupClass" data-slot="input-otp-group">
    <slot />
  </div>
</template>
