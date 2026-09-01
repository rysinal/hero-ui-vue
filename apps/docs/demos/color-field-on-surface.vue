<template>
  <Surface class="w-full max-w-[320px] rounded-3xl p-6">
    <ColorField v-model="color" class="w-full" full-width name="color">
      <Label>Color</Label>
      <ColorField.Group variant="secondary">
        <ColorField.Prefix>
          <ColorSwatch v-if="color" :color="color" size="xs" />
        </ColorField.Prefix>
        <ColorField.Input />
      </ColorField.Group>
    </ColorField>
  </Surface>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import { ColorField, ColorSwatch, Label, Surface, parseColor, type Color } from '@rysinal/heroui-vue'

const color = shallowRef<Color | null>(parseColor('#0485F7'))
</script>
