<template>
  <TextField class="w-full max-w-[280px]" default-value="name@email.com" name="email">
    <Label>Email address</Label>
    <InputGroup>
      <InputGroup.Prefix>
        <GroupIcon name="envelope" class="text-muted" />
      </InputGroup.Prefix>
      <InputGroup.Input class="w-full max-w-[280px]" />
      <InputGroup.Suffix class="pr-0">
        <Button aria-label="Copy" is-icon-only size="sm" variant="ghost">
          <GroupIcon name="copy" />
        </Button>
      </InputGroup.Suffix>
    </InputGroup>
  </TextField>
</template>

<script setup lang="ts">
import { Button, InputGroup, Label, TextField } from '@rysinal/heroui-vue'
import GroupIcon from './input-group-icons.vue'
</script>
