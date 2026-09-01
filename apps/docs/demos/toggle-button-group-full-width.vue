<template>
  <div class="w-full max-w-md space-y-3">
    <ToggleButtonGroup full-width selection-mode="multiple">
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
    <ToggleButtonGroup full-width :default-selected-keys="['center']" selection-mode="single">
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
</template>

<script setup lang="ts">
import { ToggleButton, ToggleButtonGroup, ToggleButtonGroupSeparator } from '@rysinal/heroui-vue'
import ToggleIcon from './toggle-button-icons.vue'
</script>
