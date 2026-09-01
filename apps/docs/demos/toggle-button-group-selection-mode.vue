<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-2">
      <span class="text-sm text-muted">Single selection</span>
      <ToggleButtonGroup :default-selected-keys="['center']" selection-mode="single">
        <ToggleButton id="left">
          <ToggleIcon name="left" />
          Left
        </ToggleButton>
        <ToggleButton id="center">
          <ToggleButtonGroupSeparator />
          <ToggleIcon name="center" />
          Center
        </ToggleButton>
        <ToggleButton id="right">
          <ToggleButtonGroupSeparator />
          <ToggleIcon name="right" />
          Right
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
    <div class="flex flex-col gap-2">
      <span class="text-sm text-muted">Multiple selection</span>
      <ToggleButtonGroup :default-selected-keys="['bold', 'underline']" selection-mode="multiple">
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
        <ToggleButton id="strikethrough" is-icon-only aria-label="Strikethrough">
          <ToggleButtonGroupSeparator />
          <ToggleIcon name="strikethrough" />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ToggleButton, ToggleButtonGroup, ToggleButtonGroupSeparator } from '@rysinal/heroui-vue'
import ToggleIcon from './toggle-button-icons.vue'
</script>
