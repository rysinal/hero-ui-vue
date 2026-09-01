<script setup lang="ts">
import { Input } from '../../input'
import { Label } from '../../label'
import { TextField } from '../index'
</script>

<template>
  <TextField is-disabled is-invalid model-value="a@b.com" name="email" type="email">
    <Label>Email</Label>
    <Input placeholder="user@example.com" />
  </TextField>
</template>
