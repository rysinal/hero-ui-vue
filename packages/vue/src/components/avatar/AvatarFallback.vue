<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, ref } from 'vue'
import { composeTwClasses } from '../../utils'
import { AVATAR_CONTEXT_KEY } from './context'

interface AvatarFallbackProps {
  class?: string
  color?: 'default' | 'accent' | 'success' | 'warning' | 'danger'
  delayMs?: number
}

const props = defineProps<AvatarFallbackProps>()
const avatarContext = inject(AVATAR_CONTEXT_KEY, null)
const canRender = ref(props.delayMs == null)
let delayTimer: number | undefined

const fallbackClass = computed(() =>
  composeTwClasses(props.class, avatarContext?.slots.fallback({ color: props.color })),
)

onMounted(() => {
  if (props.delayMs == null) return

  delayTimer = window.setTimeout(() => {
    canRender.value = true
  }, props.delayMs)
})

onBeforeUnmount(() => {
  if (delayTimer != null) window.clearTimeout(delayTimer)
})
</script>

<template>
  <span v-if="canRender" :class="fallbackClass" data-slot="avatar-fallback">
    <slot />
  </span>
</template>
