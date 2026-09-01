<template>
  <div class="flex items-center gap-4">
    <Popover>
      <PopoverTrigger as-child>
        <Button>Click me</Button>
      </PopoverTrigger>
      <PopoverContent
        class="max-w-64"
        data-custom="foo"
      >
        <PopoverDialog>
          <PopoverHeading>Popover Title</PopoverHeading>
          <p class="mt-2 text-sm text-muted">
            This is the popover content. You can put any content here.
          </p>
        </PopoverDialog>
      </PopoverContent>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import {
  Button,
  Popover,
  PopoverContent,
  PopoverDialog,
  PopoverHeading,
  PopoverTrigger,
} from '@rysinal/heroui-vue'
</script>
