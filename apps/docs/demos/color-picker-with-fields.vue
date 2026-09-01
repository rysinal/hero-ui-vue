<template>
  <ColorPicker v-model="color">
    <ColorPicker.Trigger>
      <ColorSwatch :color="color" size="lg" />
      <Label>Pick a color</Label>
    </ColorPicker.Trigger>
    <ColorPicker.Popover class="flex w-[260px] flex-col gap-3 p-3">
      <ColorArea v-model="color" class="max-w-full">
        <ColorArea.Thumb />
      </ColorArea>
      <ColorField v-model="fieldColor" full-width>
        <Label>Hex</Label>
        <ColorField.Group>
          <ColorField.Input />
        </ColorField.Group>
      </ColorField>
    </ColorPicker.Popover>
  </ColorPicker>
</template>

<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import {
  ColorArea,
  ColorField,
  ColorPicker,
  ColorSwatch,
  Label,
  parseColor,
  type Color,
} from '@rysinal/heroui-vue'

const color = shallowRef<Color>(parseColor('#0485F7'))

// The field edits the same colour, so keep the two in step.
const fieldColor = computed({
  get: () => color.value,
  set: (next: Color | null) => {
    if (next) color.value = next
  },
})
</script>
