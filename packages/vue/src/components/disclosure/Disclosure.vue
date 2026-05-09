<script setup lang="ts">
import { computed, getCurrentInstance, provide, ref, watch } from 'vue'
import { disclosureVariants } from '@heroui/styles'
import { composeTwClasses, dataAttr } from '../../utils'
import { DISCLOSURE_CONTEXT_KEY } from './context'

interface DisclosureProps {
  as?: string
  class?: string
  defaultExpanded?: boolean
  disabled?: boolean
  expanded?: boolean
  isDisabled?: boolean
  isExpanded?: boolean
}

const props = withDefaults(defineProps<DisclosureProps>(), {
  as: 'div',
  defaultExpanded: false,
  disabled: undefined,
  expanded: undefined,
  isDisabled: undefined,
  isExpanded: undefined,
})

const emit = defineEmits<{
  'expanded-change': [isExpanded: boolean]
  'update:expanded': [isExpanded: boolean]
  'update:isExpanded': [isExpanded: boolean]
}>()

const instance = getCurrentInstance()
const hasProp = (name: string) => {
  const rawProps = instance?.vnode.props ?? {}
  const kebabName = name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)

  return name in rawProps || kebabName in rawProps
}

const internalExpanded = ref(props.defaultExpanded)
const slots = computed(() => disclosureVariants())
const isExpanded = computed(() =>
  hasProp('expanded')
    ? Boolean(props.expanded)
    : hasProp('isExpanded')
      ? Boolean(props.isExpanded)
      : internalExpanded.value,
)
const isDisabled = computed(() => props.disabled ?? props.isDisabled)
const disclosureClass = computed(() => composeTwClasses(props.class, slots.value.base()))

const setExpanded = (nextExpanded: boolean) => {
  if (isDisabled.value) return
  internalExpanded.value = nextExpanded
  emit('update:expanded', nextExpanded)
  emit('update:isExpanded', nextExpanded)
  emit('expanded-change', nextExpanded)
}

const toggle = () => {
  setExpanded(!isExpanded.value)
}

watch(
  () => props.defaultExpanded,
  (defaultExpanded) => {
    if (!hasProp('expanded') && !hasProp('isExpanded')) {
      internalExpanded.value = defaultExpanded
    }
  },
)

provide(DISCLOSURE_CONTEXT_KEY, {
  isDisabled,
  isExpanded,
  slots,
  toggle,
})
</script>

<template>
  <component
    :is="props.as"
    :aria-disabled="dataAttr(isDisabled)"
    :class="disclosureClass"
    :data-disabled="dataAttr(isDisabled)"
    :data-expanded="dataAttr(isExpanded)"
    data-slot="disclosure"
  >
    <slot :is-expanded="isExpanded" :is-disabled="isDisabled" :toggle="toggle" />
  </component>
</template>
