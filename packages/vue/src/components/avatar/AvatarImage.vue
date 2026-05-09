<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { composeTwClasses } from '../../utils'
import { AVATAR_CONTEXT_KEY } from './context'

interface AvatarImageProps {
  alt?: string
  class?: string
  src?: string
  srcset?: string
  sizes?: string
  crossorigin?: 'anonymous' | 'use-credentials'
  loading?: 'eager' | 'lazy'
}

const props = defineProps<AvatarImageProps>()
const emit = defineEmits<{
  error: [event: Event]
  load: [event: Event]
}>()

const avatarContext = inject(AVATAR_CONTEXT_KEY, null)
const hasError = ref(false)
const imageClass = computed(() =>
  composeTwClasses(props.class, avatarContext?.slots.image()),
)

const handleError = (event: Event) => {
  hasError.value = true
  emit('error', event)
}
</script>

<template>
  <img
    v-if="props.src && !hasError"
    :alt="props.alt"
    :class="imageClass"
    :crossorigin="props.crossorigin"
    :loading="props.loading"
    :sizes="props.sizes"
    :src="props.src"
    :srcset="props.srcset"
    data-slot="avatar-image"
    @error="handleError"
    @load="emit('load', $event)"
  />
</template>
