<template>
  <TextField class="w-full max-w-[280px]" name="search">
    <Label>Search</Label>
    <InputGroup>
      <InputGroup.Input class="w-full max-w-[280px]" placeholder="Search projects" />
      <InputGroup.Suffix>
        <GroupIcon name="search" class="text-muted" />
      </InputGroup.Suffix>
    </InputGroup>
  </TextField>
</template>

<script setup lang="ts">
import { InputGroup, Label, TextField } from '@rysinal/heroui-vue'
import GroupIcon from './input-group-icons.vue'
</script>
