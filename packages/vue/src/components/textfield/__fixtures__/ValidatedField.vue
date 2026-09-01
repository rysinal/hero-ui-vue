<script setup lang="ts">
import { ref } from 'vue'
import { FieldError } from '../../field-error'
import { Input } from '../../input'
import { Label } from '../../label'
import { TextField } from '../index'

const email = ref('')
const validate = (value: string) => (value.includes('@') ? null : 'Must contain an @')
</script>

<template>
  <TextField v-model="email" :validate="validate" name="email" type="email">
    <Label>Email</Label>
    <Input />
    <FieldError />
  </TextField>
</template>
