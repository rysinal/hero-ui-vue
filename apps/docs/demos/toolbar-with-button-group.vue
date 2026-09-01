<template>
  <Toolbar aria-label="Editor toolbar">
    <ButtonGroup variant="tertiary">
      <Button aria-label="Undo" is-icon-only>
        <svg class="size-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M9 14 4 9l5-5" />
          <path d="M4 9h11a5 5 0 0 1 0 10h-4" />
        </svg>
      </Button>
      <Button aria-label="Redo" is-icon-only>
        <svg class="size-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="m15 14 5-5-5-5" />
          <path d="M20 9H9a5 5 0 0 0 0 10h4" />
        </svg>
      </Button>
    </ButtonGroup>
    <Separator />
    <ToggleButtonGroup aria-label="Text style" selection-mode="multiple">
      <ToggleButton id="bold" is-icon-only aria-label="Bold">
        <ToggleIcon name="bold" />
      </ToggleButton>
      <ToggleButton id="italic" is-icon-only aria-label="Italic">
        <ToggleButtonGroupSeparator />
        <ToggleIcon name="italic" />
      </ToggleButton>
    </ToggleButtonGroup>
  </Toolbar>
</template>

<script setup lang="ts">
import {
  Button,
  ButtonGroup,
  Separator,
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonGroupSeparator,
  Toolbar,
} from '@rysinal/heroui-vue'
import ToggleIcon from './toggle-button-icons.vue'
</script>
