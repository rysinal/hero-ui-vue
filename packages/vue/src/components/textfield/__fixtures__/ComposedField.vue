<script setup lang="ts">
import { InputGroup } from '../../input-group'
import { Label } from '../../label'
import { TextField } from '../index'
</script>

<template>
  <TextField name="website">
    <Label>Website</Label>
    <InputGroup>
      <InputGroup.Prefix>https://</InputGroup.Prefix>
      <InputGroup.Input />
    </InputGroup>
  </TextField>
</template>
