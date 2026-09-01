<script setup lang="ts">
/* global Event, HTMLInputElement */
import { computed, inject } from 'vue'
import { composeTwClasses, dataAttr } from '../../utils'
import { COLOR_FIELD_CONTEXT_KEY } from '../color-field/context'
import { COLOR_INPUT_GROUP_KEY } from './context'

interface ColorInputGroupInputProps {
  class?: string
}

const props = defineProps<ColorInputGroupInputProps>()
const group = inject(COLOR_INPUT_GROUP_KEY, null)
// Inside a ColorField the input reads and writes the field's colour text.
const field = inject(COLOR_FIELD_CONTEXT_KEY, null)

const inputClass = computed(() => composeTwClasses(props.class, group?.slots.value.input()))

const handleInput = (event: Event) => {
  field?.setText((event.target as HTMLInputElement).value)
}
</script>

<template>
  <input
    :aria-invalid="dataAttr(field?.isInvalid.value)"
    :class="inputClass"
    :data-disabled="dataAttr(field?.isDisabled.value)"
    :disabled="field?.isDisabled.value"
    :placeholder="field?.placeholder.value"
    :required="field?.isRequired.value"
    :value="field?.text.value"
    data-slot="color-input-group-input"
    type="text"
    @input="handleInput"
  />
</template>
