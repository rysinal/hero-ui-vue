<template>
  <div class="grid grid-cols-3 gap-4">
    <div />
    <Popover>
      <PopoverTrigger as-child>
        <Button class="w-full" variant="tertiary">
          Top
        </Button>
      </PopoverTrigger>
      <PopoverContent placement="top">
        <PopoverDialog>
          <PopoverArrow />
          <p class="text-sm">Top placement</p>
        </PopoverDialog>
      </PopoverContent>
    </Popover>
    <div />

    <Popover>
      <PopoverTrigger as-child>
        <Button class="w-full" variant="tertiary">
          Left
        </Button>
      </PopoverTrigger>
      <PopoverContent placement="left">
        <PopoverDialog>
          <PopoverArrow />
          <p class="text-sm">Left placement</p>
        </PopoverDialog>
      </PopoverContent>
    </Popover>

    <div class="flex items-center justify-center">
      <span class="text-sm text-muted">Click buttons</span>
    </div>

    <Popover>
      <PopoverTrigger as-child>
        <Button class="w-full" variant="tertiary">
          Right
        </Button>
      </PopoverTrigger>
      <PopoverContent placement="right">
        <PopoverDialog>
          <PopoverArrow />
          <p class="text-sm">Right placement</p>
        </PopoverDialog>
      </PopoverContent>
    </Popover>

    <div />
    <Popover>
      <PopoverTrigger as-child>
        <Button class="w-full" variant="tertiary">
          Bottom
        </Button>
      </PopoverTrigger>
      <PopoverContent placement="bottom">
        <PopoverDialog>
          <PopoverArrow />
          <p class="text-sm">Bottom placement</p>
        </PopoverDialog>
      </PopoverContent>
    </Popover>
    <div />
  </div>
</template>

<script setup lang="ts">
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverDialog,
  PopoverTrigger,
} from '@rysinal/heroui-vue'
</script>
