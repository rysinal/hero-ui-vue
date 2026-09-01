<template>
  <div class="flex w-[280px] flex-col gap-2">
    <ColorField v-model="color" name="color">
      <Label>Color</Label>
      <ColorField.Group>
        <ColorField.Prefix>
          <ColorSwatch v-if="color" :color="color" size="xs" />
        </ColorField.Prefix>
        <ColorField.Input />
      </ColorField.Group>
    </ColorField>
    <p class="text-sm text-muted">Value: {{ color?.toString('hex') ?? 'none' }}</p>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import { ColorField, ColorSwatch, Label, parseColor, type Color } from '@rysinal/heroui-vue'

const color = shallowRef<Color | null>(parseColor('#0485F7'))
</script>
