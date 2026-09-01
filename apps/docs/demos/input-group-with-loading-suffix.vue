<template>
  <TextField class="w-full max-w-[280px]" default-value="Sending..." name="status">
    <InputGroup>
      <InputGroup.Input class="w-full max-w-[280px]" />
      <InputGroup.Suffix>
        <Spinner class="size-4" />
      </InputGroup.Suffix>
    </InputGroup>
  </TextField>
</template>

<script setup lang="ts">
import { InputGroup, Spinner, TextField } from '@rysinal/heroui-vue'
</script>
