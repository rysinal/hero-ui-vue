<template>
  <Toolbar aria-label="Tools" orientation="vertical">
    <ToggleButtonGroup aria-label="Text style" selection-mode="multiple">
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
    <Separator />
    <ToggleButtonGroup :default-selected-keys="['left']" aria-label="Alignment" selection-mode="single">
      <ToggleButton id="left" is-icon-only aria-label="Align left">
        <ToggleIcon name="left" />
      </ToggleButton>
      <ToggleButton id="center" is-icon-only aria-label="Align center">
        <ToggleButtonGroupSeparator />
        <ToggleIcon name="center" />
      </ToggleButton>
      <ToggleButton id="right" is-icon-only aria-label="Align right">
        <ToggleButtonGroupSeparator />
        <ToggleIcon name="right" />
      </ToggleButton>
    </ToggleButtonGroup>
  </Toolbar>
</template>

<script setup lang="ts">
import { Separator, ToggleButton, ToggleButtonGroup, ToggleButtonGroupSeparator, Toolbar } from '@rysinal/heroui-vue'
import ToggleIcon from './toggle-button-icons.vue'
</script>
