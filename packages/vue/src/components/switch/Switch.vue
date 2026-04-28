<script setup lang="ts">
import { computed } from 'vue'
import { SwitchRoot, SwitchThumb } from 'radix-vue'
import { switchVariants } from '@heroui/styles'
import { composeTwClasses } from '../../utils'

interface SwitchProps {
  class?: string
  size?: 'sm' | 'md' | 'lg'
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  required?: boolean
  name?: string
  value?: string
  id?: string
}

const props = withDefaults(defineProps<SwitchProps>(), {
  size: 'md'
})

const emit = defineEmits<{
  'update:checked': [checked: boolean]
}>()

const styles = computed(() => switchVariants({ size: props.size }))
const baseClass = computed(() => composeTwClasses(props.class, styles.value.base()))
const thumbClass = computed(() => styles.value.thumb())
</script>

<template>
  <SwitchRoot
    :class="baseClass"
    :checked="checked"
    :default-checked="defaultChecked"
    :disabled="disabled"
    :required="required"
    :name="name"
    :value="value"
    :id="id"
    data-slot="base"
    @update:checked="emit('update:checked', $event)"
  >
    <SwitchThumb :class="thumbClass" data-slot="thumb" />
  </SwitchRoot>
</template>
