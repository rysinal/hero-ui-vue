<template>
  <div class="flex w-[280px] flex-col gap-3">
    <ColorField v-model="color" name="primary">
      <Label>Primary</Label>
      <ColorField.Group variant="primary">
        <ColorField.Prefix>
          <ColorSwatch v-if="color" :color="color" size="xs" />
        </ColorField.Prefix>
        <ColorField.Input />
      </ColorField.Group>
    </ColorField>
    <ColorField v-model="color" name="secondary">
      <Label>Secondary</Label>
      <ColorField.Group variant="secondary">
        <ColorField.Prefix>
          <ColorSwatch v-if="color" :color="color" size="xs" />
        </ColorField.Prefix>
        <ColorField.Input />
      </ColorField.Group>
    </ColorField>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import { ColorField, ColorSwatch, Label, parseColor, type Color } from '@rysinal/heroui-vue'

const color = shallowRef<Color | null>(parseColor('#0485F7'))
</script>
