<template>
  <TextField class="w-full max-w-64" name="message">
    <Label>Message</Label>
    <Textarea placeholder="Write your message here..." :rows="4" />
    <Description>Maximum 500 characters</Description>
  </TextField>
</template>

<script setup lang="ts">
import { Description, Label, TextField, Textarea } from '@rysinal/heroui-vue'
</script>
