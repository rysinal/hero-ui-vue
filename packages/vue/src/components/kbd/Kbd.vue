<script setup lang="ts">
import { computed, provide } from 'vue'
import { kbdVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses } from '../../utils'
import KbdAbbr from './KbdAbbr.vue'
import KbdContent from './KbdContent.vue'
import type { KbdKey } from './constants'
import { KBD_CONTEXT_KEY } from './context'

interface KbdProps {
  class?: string
  variant?: 'default' | 'light'
  /** Shortcut keys rendered as symbols ahead of the content, e.g. ['command']. */
  keys?: KbdKey[]
}

const props = defineProps<KbdProps>()

const slots = computed(() => kbdVariants({ variant: props.variant }))

provide(KBD_CONTEXT_KEY, { slots })

const baseClass = computed(() => composeTwClasses(props.class, slots.value.base()))
</script>

<template>
  <kbd :class="baseClass" data-slot="kbd">
    <KbdAbbr v-for="key in props.keys" :key="key" :key-value="key" />
    <KbdContent v-if="$slots.default">
      <slot />
    </KbdContent>
  </kbd>
</template>
