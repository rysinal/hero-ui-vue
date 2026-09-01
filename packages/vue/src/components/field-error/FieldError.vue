<script setup lang="ts">
import { computed, inject, useSlots } from 'vue'
import { fieldErrorVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses } from '../../utils'
import { TEXT_FIELD_CONTEXT_KEY } from '../textfield/context'

interface FieldErrorProps {
  class?: string
}

const props = defineProps<FieldErrorProps>()
const slotContent = useSlots()

// Inside a TextField with a validate prop, an empty FieldError renders that
// message and disappears once the value is valid.
const field = inject(TEXT_FIELD_CONTEXT_KEY, null)
const message = computed(() => field?.validationMessage.value)
const shouldRender = computed(() => Boolean(slotContent.default) || Boolean(message.value))

const fieldErrorClass = computed(() => {
  const styles = fieldErrorVariants()
  return composeTwClasses(props.class, styles)
})
</script>

<template>
  <div
    v-if="shouldRender"
    :class="fieldErrorClass"
    data-slot="field-error"
    data-visible="true"
  >
    <slot>{{ message }}</slot>
  </div>
</template>
