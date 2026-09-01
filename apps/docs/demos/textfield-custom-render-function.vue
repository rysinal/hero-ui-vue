<template>
  <TextField
    as="section"
    class="w-full max-w-64"
    data-custom="foo"
    name="email"
    type="email"
  >
    <Label>Email</Label>
    <Input placeholder="Enter your email" />
  </TextField>
</template>

<script setup lang="ts">
import { Input, Label, TextField } from '@rysinal/heroui-vue'
</script>
