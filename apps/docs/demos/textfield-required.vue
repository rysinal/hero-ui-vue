<template>
  <TextField class="w-full max-w-64" is-required name="fullName">
    <Label>Full Name</Label>
    <Input placeholder="John Doe" />
    <Description>This field is required</Description>
  </TextField>
</template>

<script setup lang="ts">
import { Description, Input, Label, TextField } from '@rysinal/heroui-vue'
</script>
