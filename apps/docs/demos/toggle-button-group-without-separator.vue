<template>
  <ToggleButtonGroup selection-mode="multiple">
    <ToggleButton id="bold" is-icon-only aria-label="Bold">
      <ToggleIcon name="bold" />
    </ToggleButton>
    <ToggleButton id="italic" is-icon-only aria-label="Italic">
      <ToggleIcon name="italic" />
    </ToggleButton>
    <ToggleButton id="underline" is-icon-only aria-label="Underline">
      <ToggleIcon name="underline" />
    </ToggleButton>
    <ToggleButton id="strikethrough" is-icon-only aria-label="Strikethrough">
      <ToggleIcon name="strikethrough" />
    </ToggleButton>
  </ToggleButtonGroup>
</template>

<script setup lang="ts">
import { ToggleButton, ToggleButtonGroup } from '@rysinal/heroui-vue'
import ToggleIcon from './toggle-button-icons.vue'
</script>
