<template>
  <TextField class="w-full max-w-[320px]" name="feedback">
    <Label>Feedback</Label>
    <InputGroup full-width>
      <InputGroup.TextArea placeholder="Tell us what you think" :rows="4" />
    </InputGroup>
  </TextField>
</template>

<script setup lang="ts">
import { InputGroup, Label, TextField } from '@rysinal/heroui-vue'
</script>
