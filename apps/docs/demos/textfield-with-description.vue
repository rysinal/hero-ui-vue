<template>
  <TextField class="w-full max-w-64" name="username">
    <Label>Username</Label>
    <Input placeholder="Enter username" />
    <Description>Choose a unique username for your account</Description>
  </TextField>
</template>

<script setup lang="ts">
import { Description, Input, Label, TextField } from '@rysinal/heroui-vue'
</script>
