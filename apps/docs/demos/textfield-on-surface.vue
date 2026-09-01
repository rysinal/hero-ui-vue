<template>
  <Surface class="flex w-full min-w-[340px] flex-col gap-4 rounded-3xl p-6">
    <TextField name="name" variant="secondary">
      <Label>Your name</Label>
      <Input class="w-full" placeholder="John" />
      <Description>We'll never share this with anyone else</Description>
    </TextField>
    <TextField name="email" type="email" variant="secondary">
      <Label>Email</Label>
      <Input class="w-full" placeholder="john@example.com" />
    </TextField>
    <TextField name="bio" variant="secondary">
      <Label>Bio</Label>
      <Textarea class="w-full" placeholder="Tell us about yourself" :rows="3" />
    </TextField>
  </Surface>
</template>

<script setup lang="ts">
import { Description, Input, Label, Surface, TextField, Textarea } from '@rysinal/heroui-vue'
</script>
