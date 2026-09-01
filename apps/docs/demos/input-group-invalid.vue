<template>
  <TextField class="w-full max-w-[280px]" default-value="not-an-email" is-invalid name="email">
    <Label>Email address</Label>
    <InputGroup is-invalid>
      <InputGroup.Prefix>
        <GroupIcon name="envelope" class="text-muted" />
      </InputGroup.Prefix>
      <InputGroup.Input class="w-full max-w-[280px]" />
    </InputGroup>
    <FieldError>Enter a valid email address</FieldError>
  </TextField>
</template>

<script setup lang="ts">
import { FieldError, InputGroup, Label, TextField } from '@rysinal/heroui-vue'
import GroupIcon from './input-group-icons.vue'
</script>
