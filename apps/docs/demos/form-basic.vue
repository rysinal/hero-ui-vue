<template>
  <Form class="flex w-96 flex-col gap-4" @submit.prevent="onSubmit">
    <TextField v-model="email" is-required name="email" type="email" :validate="validateEmail">
      <Label>Email</Label>
      <Input placeholder="john@example.com" />
      <FieldError />
    </TextField>
    <TextField
      v-model="password"
      is-required
      name="password"
      type="password"
      :validate="validatePassword"
    >
      <Label>Password</Label>
      <Input placeholder="Enter your password" />
      <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
      <FieldError />
    </TextField>
    <div class="flex gap-2">
      <Button type="submit">Submit</Button>
      <Button type="reset" variant="secondary" @click="reset">Reset</Button>
    </div>
    <p v-if="submitted" class="text-sm text-muted">Submitted: {{ submitted }}</p>
  </Form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from '@rysinal/heroui-vue'

const email = ref('')
const password = ref('')
const submitted = ref('')

const validateEmail = (value: string) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
    ? null
    : 'Please enter a valid email address'

const validatePassword = (value: string) => {
  if (value.length < 8) return 'Password must be at least 8 characters'
  if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter'
  if (!/[0-9]/.test(value)) return 'Password must contain at least one number'
  return null
}

const onSubmit = () => {
  submitted.value = JSON.stringify({ email: email.value, password: '•'.repeat(password.value.length) })
}

const reset = () => {
  email.value = ''
  password.value = ''
  submitted.value = ''
}
</script>
