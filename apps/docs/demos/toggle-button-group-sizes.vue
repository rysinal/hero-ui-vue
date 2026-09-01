<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-2">
      <span class="text-sm text-muted">Small</span>
      <ToggleButtonGroup selection-mode="multiple" size="sm">
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
    <div class="flex flex-col gap-2">
      <span class="text-sm text-muted">Medium (default)</span>
      <ToggleButtonGroup selection-mode="multiple" size="md">
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
    <div class="flex flex-col gap-2">
      <span class="text-sm text-muted">Large</span>
      <ToggleButtonGroup selection-mode="multiple" size="lg">
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
