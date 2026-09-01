<script setup lang="ts">
import { shallowRef } from 'vue'
import { Label } from '../../label'
import { parseColor, type Color } from '../../../utils'
import { ColorField } from '../index'

const color = shallowRef<Color | null>(parseColor('#0485F7'))
</script>

<template>
  <ColorField v-model="color" name="color">
    <Label>Color</Label>
    <ColorField.Group>
      <ColorField.Input />
    </ColorField.Group>
  </ColorField>
</template>
