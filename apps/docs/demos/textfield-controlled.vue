<template>
  <div class="flex w-full max-w-64 flex-col gap-4">
    <TextField v-model="name" name="name">
      <Label>Display name</Label>
      <Input placeholder="Jane" />
      <Description>Characters: {{ name.length }}</Description>
    </TextField>
    <TextField v-model="bio" name="bio">
      <Label>Bio</Label>
      <Textarea placeholder="Tell us about yourself..." />
      <Description>Characters: {{ bio.length }} / 200</Description>
    </TextField>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Description, Input, Label, TextField, Textarea } from '@rysinal/heroui-vue'

const name = ref('')
const bio = ref('')
</script>
