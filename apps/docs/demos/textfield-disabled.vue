<template>
  <TextField class="w-full max-w-64" is-disabled model-value="USR-12345" name="accountId">
    <Label>Account ID</Label>
    <Input placeholder="Auto-generated" />
    <Description>This field cannot be edited</Description>
  </TextField>
</template>

<script setup lang="ts">
import { Description, Input, Label, TextField } from '@rysinal/heroui-vue'
</script>
