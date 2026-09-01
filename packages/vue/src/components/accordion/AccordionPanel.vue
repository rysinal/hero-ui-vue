<script setup lang="ts">
import { computed, inject, nextTick, onMounted, ref, watch } from 'vue'
import { composeTwClasses, dataAttr } from '../../utils'
import { ACCORDION_CONTEXT_KEY, ACCORDION_ITEM_CONTEXT_KEY } from './context'

interface AccordionPanelProps {
  class?: string
}

const props = defineProps<AccordionPanelProps>()
const accordionContext = inject(ACCORDION_CONTEXT_KEY, null)
const itemContext = inject(ACCORDION_ITEM_CONTEXT_KEY, null)
const panelRef = ref<HTMLElement>()
const panelHeight = ref('0px')
const isExpanded = computed(() => itemContext?.expanded.value ?? false)
const panelClass = computed(() => composeTwClasses(props.class, accordionContext?.slots.panel()))
const panelStyle = computed(() => ({
  '--disclosure-panel-height': isExpanded.value ? panelHeight.value : '0px',
}))

const measureHeight = async () => {
  await nextTick()
  panelHeight.value = `${panelRef.value?.scrollHeight ?? 0}px`
}

watch(isExpanded, measureHeight, { immediate: true })
onMounted(measureHeight)
</script>

<template>
  <div
    :id="itemContext?.panelId"
    ref="panelRef"
    :aria-labelledby="itemContext?.triggerId"
    :class="panelClass"
    :data-expanded="dataAttr(isExpanded)"
    :inert="!isExpanded || undefined"
    :style="panelStyle"
    data-slot="accordion-panel"
    role="region"
  >
    <slot :is-expanded="isExpanded" />
  </div>
</template>
