<script setup lang="ts">
/* global Event, HTMLFormElement */
interface FormProps {
  class?: string
  /** Skips native browser validation, as React Aria's Form does. */
  validationBehavior?: 'native' | 'aria'
}

const props = withDefaults(defineProps<FormProps>(), {
  validationBehavior: 'native',
})

const emit = defineEmits<{
  submit: [event: Event]
  reset: [event: Event]
}>()

const handleSubmit = (event: Event) => {
  emit('submit', event)
}
</script>

<template>
  <form
    :class="props.class"
    :novalidate="props.validationBehavior === 'aria' || undefined"
    data-slot="form"
    @reset="emit('reset', $event)"
    @submit="handleSubmit"
  >
    <slot />
  </form>
</template>
