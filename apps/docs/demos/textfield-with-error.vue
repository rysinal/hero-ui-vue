<template>
  <TextField class="w-full max-w-64" is-invalid name="email" type="email">
    <Label>Email</Label>
    <Input placeholder="user@example.com" />
    <FieldError>Please enter a valid email address</FieldError>
  </TextField>
</template>

<script setup lang="ts">
import { FieldError, Input, Label, TextField } from '@rysinal/heroui-vue'
</script>
