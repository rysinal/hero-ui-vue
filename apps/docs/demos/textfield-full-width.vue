<template>
  <div class="w-[400px] space-y-4">
    <TextField full-width name="name">
      <Label>Your name</Label>
      <Input placeholder="John" />
    </TextField>
    <TextField full-width is-invalid is-required name="password" type="password">
      <Label>Password</Label>
      <Input />
      <FieldError>Password must be longer than 8 characters</FieldError>
    </TextField>
  </div>
</template>

<script setup lang="ts">
import { FieldError, Input, Label, TextField } from '@rysinal/heroui-vue'
</script>
