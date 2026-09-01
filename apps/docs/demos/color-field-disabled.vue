<template>
  <ColorField v-model="color" class="w-[280px]" name="color" is-disabled>
    <Label>Color</Label>
    <ColorField.Group>
      <ColorField.Prefix>
        <ColorSwatch v-if="color" :color="color" size="xs" />
      </ColorField.Prefix>
      <ColorField.Input />
    </ColorField.Group>
  </ColorField>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import { ColorField, ColorSwatch, Label, parseColor, type Color } from '@rysinal/heroui-vue'

const color = shallowRef<Color | null>(parseColor('#0485F7'))
</script>
