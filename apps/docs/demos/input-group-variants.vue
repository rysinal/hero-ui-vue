<template>
  <div class="flex flex-col gap-4">
    <TextField class="w-[280px]" name="primary">
      <Label>Primary variant</Label>
      <InputGroup variant="primary">
        <InputGroup.Prefix>
          <GroupIcon name="envelope" class="text-muted" />
        </InputGroup.Prefix>
        <InputGroup.Input placeholder="name@email.com" />
      </InputGroup>
    </TextField>
    <TextField class="w-[280px]" name="secondary">
      <Label>Secondary variant</Label>
      <InputGroup variant="secondary">
        <InputGroup.Prefix>
          <GroupIcon name="envelope" class="text-muted" />
        </InputGroup.Prefix>
        <InputGroup.Input placeholder="name@email.com" />
      </InputGroup>
    </TextField>
  </div>
</template>

<script setup lang="ts">
import { InputGroup, Label, TextField } from '@rysinal/heroui-vue'
import GroupIcon from './input-group-icons.vue'
</script>
