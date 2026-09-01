<template>
  <div class="flex flex-col gap-4">
    <ToggleButtonGroup
      v-model:selected-keys="selectedKeys"
      selection-mode="multiple"
    >
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
    <p class="text-sm text-muted">
      Selected:
      <span class="font-medium">{{ selectedKeys.length > 0 ? selectedKeys.join(', ') : 'None' }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ToggleButton, ToggleButtonGroup, ToggleButtonGroupSeparator } from '@rysinal/heroui-vue'
import ToggleIcon from './toggle-button-icons.vue'

const selectedKeys = ref<Array<string | number>>(['bold'])
</script>
