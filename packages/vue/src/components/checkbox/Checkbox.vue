<script setup lang="ts">
import { computed } from 'vue'
import { CheckboxIndicator, CheckboxRoot } from 'radix-vue'
import { checkboxVariants } from '@heroui/styles'
import { composeTwClasses } from '../../utils'
import CheckIcon from '../icons/CheckIcon.vue'

interface CheckboxProps {
  class?: string
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  required?: boolean
  name?: string
  value?: string
  id?: string
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  checked: undefined,
  defaultChecked: false,
})

const emit = defineEmits<{
  'update:checked': [checked: boolean]
}>()

const styles = computed(() => checkboxVariants())

const baseClass = computed(() => composeTwClasses(props.class, styles.value.base()))
const contentClass = computed(() => styles.value.content())
const controlClass = computed(() => styles.value.control())
const indicatorClass = computed(() => styles.value.indicator())

const handleCheckedChange = (checked: boolean) => {
  emit('update:checked', checked)
}
</script>

<template>
  <CheckboxRoot
    :id="props.id"
    :class="baseClass"
    :checked="props.checked"
    :default-checked="props.defaultChecked"
    :disabled="props.disabled"
    :required="props.required"
    :name="props.name"
    :value="props.value"
    data-slot="checkbox-base"
    @update:checked="handleCheckedChange"
  >
    <div :class="contentClass" data-slot="checkbox-content">
      <slot />
    </div>

    <div :class="controlClass" data-slot="checkbox-control">
      <CheckboxIndicator :class="indicatorClass" data-slot="checkbox-indicator">
        <CheckIcon />
      </CheckboxIndicator>
    </div>
  </CheckboxRoot>
</template>
