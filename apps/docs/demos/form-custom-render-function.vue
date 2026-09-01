<template>
  <Form
    class="flex w-96 flex-col gap-4"
    validation-behavior="aria"
    @submit.prevent="submitted = name"
  >
    <TextField v-model="name" is-required name="name">
      <Label>Name</Label>
      <Input placeholder="Jane Doe" />
      <Description>Native browser validation is turned off</Description>
    </TextField>
    <Button class="w-fit" type="submit">Submit</Button>
    <p v-if="submitted" class="text-sm text-muted">Submitted: {{ submitted }}</p>
  </Form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Description, Form, Input, Label, TextField } from '@rysinal/heroui-vue'

const name = ref('')
const submitted = ref('')
</script>
