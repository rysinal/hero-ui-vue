<template>
  <div class="flex flex-col gap-2">
    <p class="text-sm text-muted">
      React opens this menu on long press. Vue exposes the open state instead, so the same
      behaviour is built by holding the pointer down and toggling <code>isOpen</code>.
    </p>
    <Dropdown v-model:is-open="isOpen">
      <Dropdown.Trigger>
        <Button
          aria-label="Menu"
          variant="secondary"
          @pointerdown="startPress"
          @pointerleave="cancelPress"
          @pointerup="cancelPress"
        >
          Press and hold
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <Dropdown.Menu>
          <Dropdown.Item value="copy" text-value="Copy"><Label>Copy</Label></Dropdown.Item>
          <Dropdown.Item value="paste" text-value="Paste"><Label>Paste</Label></Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { Button, Dropdown, Label } from '@rysinal/heroui-vue'

const isOpen = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

const startPress = () => {
  timer = setTimeout(() => {
    isOpen.value = true
  }, 500)
}

const cancelPress = () => {
  if (timer) clearTimeout(timer)
  timer = undefined
}

onBeforeUnmount(cancelPress)
</script>
