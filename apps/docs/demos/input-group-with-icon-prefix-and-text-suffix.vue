<template>
  <TextField class="w-full max-w-[280px]" default-value="heroui" name="handle">
    <Label>Username</Label>
    <InputGroup>
      <InputGroup.Prefix>
        <GroupIcon name="user" class="text-muted" />
      </InputGroup.Prefix>
      <InputGroup.Input class="w-full max-w-[280px]" />
      <InputGroup.Suffix>@heroui.com</InputGroup.Suffix>
    </InputGroup>
  </TextField>
</template>

<script setup lang="ts">
import { InputGroup, Label, TextField } from '@rysinal/heroui-vue'
import GroupIcon from './input-group-icons.vue'
</script>
