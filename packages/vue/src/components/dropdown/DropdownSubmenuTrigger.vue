<script setup lang="ts">
import { provide } from 'vue'
import { DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent } from 'radix-vue'
import { DROPDOWN_SUBMENU_KEY } from './context'

interface DropdownSubmenuTriggerProps {
  class?: string
  offset?: number
}

const props = withDefaults(defineProps<DropdownSubmenuTriggerProps>(), {
  offset: 4,
})

// Tell the child item to render as a sub trigger and show its chevron.
provide(DROPDOWN_SUBMENU_KEY, true)
</script>

<template>
  <DropdownMenuSub data-slot="dropdown-submenu-trigger">
    <!-- First child is the trigger item; the rest becomes the submenu. -->
    <slot name="trigger" />
    <DropdownMenuPortal>
      <DropdownMenuSubContent
        :class="props.class"
        :side-offset="props.offset"
        data-slot="dropdown-popover"
      >
        <slot />
      </DropdownMenuSubContent>
    </DropdownMenuPortal>
  </DropdownMenuSub>
</template>
