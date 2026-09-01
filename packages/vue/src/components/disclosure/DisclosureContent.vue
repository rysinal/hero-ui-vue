<script setup lang="ts">
import { computed, inject, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { composeTwClasses, dataAttr } from '../../utils'
import { DISCLOSURE_CONTEXT_KEY } from './context'

interface DisclosureContentProps {
  as?: string
  class?: string
}

const props = withDefaults(defineProps<DisclosureContentProps>(), {
  as: 'div',
})
const disclosureContext = inject(DISCLOSURE_CONTEXT_KEY, null)
const contentRef = ref<HTMLElement | null>(null)
const contentHeight = ref(0)
let resizeObserver: ResizeObserver | undefined

const contentClass = computed(() =>
  composeTwClasses(props.class, disclosureContext?.slots.value.content()),
)
const panelHeight = computed(() =>
  disclosureContext?.isExpanded.value ? `${contentHeight.value}px` : '0px',
)

const updateHeight = async () => {
  await nextTick()
  contentHeight.value = contentRef.value?.scrollHeight ?? 0
}

onMounted(() => {
  updateHeight()
  if (typeof ResizeObserver === 'undefined' || !contentRef.value) return

  resizeObserver = new ResizeObserver(() => {
    updateHeight()
  })
  resizeObserver.observe(contentRef.value)
})

onUnmounted(() => {
  resizeObserver?.disconnect()
})

watch(() => disclosureContext?.isExpanded.value, updateHeight)
</script>

<template>
  <component
    :is="props.as"
    :aria-hidden="disclosureContext?.isExpanded.value ? 'false' : 'true'"
    :class="contentClass"
    :data-expanded="dataAttr(disclosureContext?.isExpanded.value)"
    :inert="!disclosureContext?.isExpanded.value || undefined"
    :style="{ '--disclosure-panel-height': panelHeight }"
    data-slot="disclosure-content"
  >
    <div ref="contentRef" data-slot="disclosure-body-inner">
      <slot :is-expanded="disclosureContext?.isExpanded.value" />
    </div>
  </component>
</template>
