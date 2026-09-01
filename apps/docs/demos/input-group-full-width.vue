<template>
  <TextField class="w-full" name="email">
    <Label>Email address</Label>
    <InputGroup full-width>
      <InputGroup.Prefix>
        <GroupIcon name="envelope" class="text-muted" />
      </InputGroup.Prefix>
      <InputGroup.Input placeholder="name@email.com" />
    </InputGroup>
  </TextField>
</template>

<script setup lang="ts">
import { InputGroup, Label, TextField } from '@rysinal/heroui-vue'
import GroupIcon from './input-group-icons.vue'
</script>
