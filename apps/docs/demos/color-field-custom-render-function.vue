<template>
  <ColorField v-slot="{ value }" v-model="color" class="w-[280px]" name="color">
    <Label>Color</Label>
    <ColorField.Group>
      <ColorField.Prefix>
        <ColorSwatch v-if="value" :color="value" size="xs" />
      </ColorField.Prefix>
      <ColorField.Input />
      <ColorField.Suffix>
        <span class="text-xs text-muted">{{ value ? 'ok' : '—' }}</span>
      </ColorField.Suffix>
    </ColorField.Group>
  </ColorField>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import { ColorField, ColorSwatch, Label, parseColor, type Color } from '@rysinal/heroui-vue'

const color = shallowRef<Color | null>(parseColor('#0485F7'))
</script>
