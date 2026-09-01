<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-2">
      <span class="text-sm text-muted">All buttons disabled</span>
      <ToggleButtonGroup is-disabled selection-mode="multiple">
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
      <span class="text-sm text-muted">Individual button disabled</span>
      <ToggleButtonGroup selection-mode="multiple">
        <ToggleButton id="bold" is-icon-only aria-label="Bold">
          <ToggleIcon name="bold" />
        </ToggleButton>
        <ToggleButton id="italic" is-disabled is-icon-only aria-label="Italic">
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
