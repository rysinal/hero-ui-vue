<script setup lang="ts">
import { computed } from 'vue'
import { RadioGroupItem, RadioGroupIndicator } from 'radix-vue'
import { radioVariants } from '@heroui/styles'
import { composeTwClasses } from '../../utils'

interface RadioProps {
  class?: string
  value: string
  disabled?: boolean
  required?: boolean
  id?: string
}

const props = defineProps<RadioProps>()

const styles = computed(() => radioVariants())
const baseClass = computed(() => composeTwClasses(props.class, styles.value.base()))
const controlClass = computed(() => styles.value.control())
const indicatorClass = computed(() => styles.value.indicator())
const contentClass = computed(() => styles.value.content())
</script>

<template>
  <RadioGroupItem
    :class="baseClass"
    :value="value"
    :disabled="disabled"
    :required="required"
    :id="id"
    data-slot="base"
  >
    <div :class="controlClass" data-slot="control">
      <RadioGroupIndicator :class="indicatorClass" data-slot="indicator" />
    </div>
    <div v-if="$slots.default" :class="contentClass" data-slot="content">
      <slot />
    </div>
  </RadioGroupItem>
</template>
