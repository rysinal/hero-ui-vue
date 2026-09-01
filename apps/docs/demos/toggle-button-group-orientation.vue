<template>
  <div class="flex items-start gap-8">
    <div class="flex flex-col gap-2">
      <span class="text-sm text-muted">Horizontal</span>
      <ToggleButtonGroup orientation="horizontal" selection-mode="multiple">
        <ToggleButton id="bold" is-icon-only aria-label="Bold">
          <ToggleIcon name="bold" />
        </ToggleButton>
        <ToggleButton id="italic" is-icon-only aria-label="Italic">
          <ToggleButtonGroupSeparator />
          <ToggleIcon name="italic" />
        </ToggleButton>
        <ToggleButton id="underline" is-icon-only aria-label="Underline">
          <ToggleButtonGroupSeparator />
          <ToggleIcon name="underline" />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
    <div class="flex flex-col gap-2">
      <span class="text-sm text-muted">Vertical</span>
      <ToggleButtonGroup orientation="vertical" selection-mode="multiple">
        <ToggleButton id="bold" is-icon-only aria-label="Bold">
          <ToggleIcon name="bold" />
        </ToggleButton>
        <ToggleButton id="italic" is-icon-only aria-label="Italic">
          <ToggleButtonGroupSeparator />
          <ToggleIcon name="italic" />
        </ToggleButton>
        <ToggleButton id="underline" is-icon-only aria-label="Underline">
          <ToggleButtonGroupSeparator />
          <ToggleIcon name="underline" />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ToggleButton, ToggleButtonGroup, ToggleButtonGroupSeparator } from '@rysinal/heroui-vue'
import ToggleIcon from './toggle-button-icons.vue'
</script>
