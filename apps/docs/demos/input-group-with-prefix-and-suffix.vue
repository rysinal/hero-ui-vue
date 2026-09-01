<template>
  <TextField class="w-full max-w-[280px]" default-value="99.99" name="price">
    <Label>Price</Label>
    <InputGroup>
      <InputGroup.Prefix>$</InputGroup.Prefix>
      <InputGroup.Input class="w-full max-w-[280px]" />
      <InputGroup.Suffix>USD</InputGroup.Suffix>
    </InputGroup>
  </TextField>
</template>

<script setup lang="ts">
import { InputGroup, Label, TextField } from '@rysinal/heroui-vue'
</script>
