<script setup lang="ts">
import { computed, inject } from 'vue'
import { composeTwClasses, dataAttr } from '../../utils'
import { COMBO_BOX_CONTEXT_KEY } from './context'

interface ComboBoxTriggerProps {
  class?: string
}

const props = defineProps<ComboBoxTriggerProps>()
const context = inject(COMBO_BOX_CONTEXT_KEY, null)

const triggerClass = computed(() => composeTwClasses(props.class, context?.slots.value.trigger()))
const isOpen = computed(() => context?.isOpen.value ?? false)

const toggle = () => context?.setOpen(!isOpen.value)
</script>

<template>
  <button
    :aria-expanded="isOpen"
    :class="triggerClass"
    :data-disabled="dataAttr(context?.isDisabled.value)"
    :data-open="dataAttr(isOpen)"
    :disabled="context?.isDisabled.value"
    aria-label="Show suggestions"
    data-slot="combo-box-trigger"
    tabindex="-1"
    type="button"
    @click="toggle"
  >
    <slot>
      <!--
        The stylesheet sizes and rotates this fallback via
        `.combo-box__trigger [data-slot="combo-box-trigger-default-icon"]`, so the
        slot belongs on the icon, not the button — custom children stay untouched.
      -->
      <svg
        data-slot="combo-box-trigger-default-icon"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </slot>
  </button>
</template>
