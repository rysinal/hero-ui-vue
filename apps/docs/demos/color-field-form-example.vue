<template>
  <Form class="flex w-[280px] flex-col gap-4" @submit.prevent="submitted = color?.toString('hex') ?? ''">
    <ColorField v-model="color" is-required name="brandColor">
      <Label>Brand color</Label>
      <ColorField.Group>
        <ColorField.Prefix>
          <ColorSwatch v-if="color" :color="color" size="xs" />
        </ColorField.Prefix>
        <ColorField.Input />
      </ColorField.Group>
      <Description>Used across your workspace</Description>
    </ColorField>
    <Button class="w-fit" type="submit">Save</Button>
    <p v-if="submitted" class="text-sm text-muted">Saved {{ submitted }}</p>
  </Form>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import {
  Button,
  ColorField,
  ColorSwatch,
  Description,
  Form,
  Label,
  parseColor,
  type Color,
} from '@rysinal/heroui-vue'

const color = shallowRef<Color | null>(parseColor('#0485F7'))
const submitted = ref('')
</script>
