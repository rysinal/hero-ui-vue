<script setup lang="ts">
import { ref } from 'vue'
import { Description } from '../../description'
import { Input } from '../../input'
import { Label } from '../../label'
import { TextField } from '../index'

const name = ref('')
</script>

<template>
  <TextField v-model="name" name="name">
    <Label>Display name</Label>
    <Input placeholder="Jane" />
    <Description>{{ name.length }}</Description>
  </TextField>
</template>
