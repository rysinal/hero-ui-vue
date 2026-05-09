<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses } from '../../utils'
import { INPUT_OTP_CONTEXT_KEY } from './context'

interface InputOTPSeparatorProps {
  class?: string
}

const props = defineProps<InputOTPSeparatorProps>()
const inputOTPContext = inject(INPUT_OTP_CONTEXT_KEY, null)
const separatorClass = computed(() =>
  composeTwClasses(props.class, inputOTPContext?.slots.value.separator()),
)
</script>

<template>
  <span :class="separatorClass" data-slot="input-otp-separator" />
</template>
