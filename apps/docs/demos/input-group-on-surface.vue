<template>
  <Surface class="w-full max-w-[320px] rounded-xl p-4">
    <TextField class="w-full" name="email">
      <Label>Email address</Label>
      <InputGroup full-width>
        <InputGroup.Prefix>
          <GroupIcon name="envelope" class="text-muted" />
        </InputGroup.Prefix>
        <InputGroup.Input placeholder="name@email.com" />
      </InputGroup>
    </TextField>
  </Surface>
</template>

<script setup lang="ts">
import { InputGroup, Label, Surface, TextField } from '@rysinal/heroui-vue'
import GroupIcon from './input-group-icons.vue'
</script>
