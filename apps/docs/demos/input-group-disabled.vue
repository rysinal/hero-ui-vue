<template>
  <TextField class="w-full max-w-[280px]" is-disabled name="email">
    <Label>Email address</Label>
    <InputGroup is-disabled>
      <InputGroup.Prefix>
        <GroupIcon name="envelope" class="text-muted" />
      </InputGroup.Prefix>
      <InputGroup.Input class="w-full max-w-[280px]" placeholder="name@email.com" />
    </InputGroup>
  </TextField>
</template>

<script setup lang="ts">
import { InputGroup, Label, TextField } from '@rysinal/heroui-vue'
import GroupIcon from './input-group-icons.vue'
</script>
