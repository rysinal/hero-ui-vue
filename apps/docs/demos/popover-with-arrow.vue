<template>
  <div class="flex items-center gap-4">
    <Popover>
      <PopoverTrigger as-child>
        <Button variant="secondary">
          With Arrow
        </Button>
      </PopoverTrigger>
      <PopoverContent class="max-w-64">
        <PopoverDialog>
          <PopoverArrow />
          <PopoverHeading>Popover with Arrow</PopoverHeading>
          <p class="mt-2 text-sm text-muted">
            The arrow shows which element triggered the popover.
          </p>
        </PopoverDialog>
      </PopoverContent>
    </Popover>

    <Popover>
      <PopoverTrigger as-child>
        <Button
          aria-label="More"
          is-icon-only
          variant="tertiary"
        >
          <svg
            aria-hidden="true"
            fill="none"
            viewBox="0 0 16 16"
          >
            <path
              clip-rule="evenodd"
              d="M3 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M9.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"
              fill="currentColor"
              fill-rule="evenodd"
            />
          </svg>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        class="max-w-64"
        :offset="10"
      >
        <PopoverDialog>
          <PopoverArrow />
          <PopoverHeading>Popover with Arrow</PopoverHeading>
          <p class="mt-2 text-sm text-muted">
            The arrow shows which element triggered the popover.
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
  PopoverArrow,
  PopoverContent,
  PopoverDialog,
  PopoverHeading,
  PopoverTrigger,
} from '@rysinal/heroui-vue'
</script>
