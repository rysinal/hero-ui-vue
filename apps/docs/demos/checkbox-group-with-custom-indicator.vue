<template>
  <CheckboxGroup name="features">
    <Label>Features</Label>
    <Description>Select the features you want</Description>
    <Checkbox v-for="item in features" :key="item.value" :value="item.value">
      <Checkbox.Control>
        <Checkbox.Indicator v-slot="{ isSelected }">
          <svg
            v-if="isSelected"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            viewBox="0 0 24 24"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
          <svg
            v-else
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="8" />
          </svg>
        </Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.Content>
        <Label>{{ item.title }}</Label>
      </Checkbox.Content>
    </Checkbox>
  </CheckboxGroup>
</template>

<script setup lang="ts">
import { Checkbox, CheckboxGroup, Description, Label } from '@rysinal/heroui-vue'

const features = [
  { title: 'Notifications', value: 'notifications' },
  { title: 'Auto-save', value: 'autosave' },
  { title: 'Dark mode', value: 'darkmode' },
]
</script>
