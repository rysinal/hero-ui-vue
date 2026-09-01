<template>
  <TextField class="w-full max-w-[280px]" default-value="heroui.com" name="website">
    <Label>Website</Label>
    <InputGroup>
      <InputGroup.Prefix>https://</InputGroup.Prefix>
      <InputGroup.Input class="w-full max-w-[280px]" />
    </InputGroup>
  </TextField>
</template>

<script setup lang="ts">
import { InputGroup, Label, TextField } from '@rysinal/heroui-vue'
</script>
