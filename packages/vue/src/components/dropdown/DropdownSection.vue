<script setup lang="ts">
import { computed } from 'vue'
import { DropdownMenuGroup, DropdownMenuLabel } from 'radix-vue'
import { menuSectionVariants } from '@rysinal/heroui-vue-styles'
import { composeTwClasses } from '../../utils'

interface DropdownSectionProps {
  class?: string
  /** Heading rendered above the section's items. */
  title?: string
}

const props = defineProps<DropdownSectionProps>()

const sectionClass = computed(() => composeTwClasses(props.class, menuSectionVariants()))
</script>

<template>
  <DropdownMenuGroup :class="sectionClass" data-slot="menu-section">
    <DropdownMenuLabel v-if="props.title || $slots.title" data-slot="menu-section-heading">
      <slot name="title">{{ props.title }}</slot>
    </DropdownMenuLabel>
    <slot />
  </DropdownMenuGroup>
</template>
