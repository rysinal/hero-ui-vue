<template>
  <div class="flex w-full max-w-64 flex-col gap-4">
    <TextField v-model="username" :is-invalid="isUsernameInvalid" is-required name="username">
      <Label>Username</Label>
      <Input placeholder="jane_doe" />
      <FieldError v-if="isUsernameInvalid">Username must be at least 3 characters.</FieldError>
      <Description v-else>Choose a unique username for your profile.</Description>
    </TextField>
    <TextField v-model="bio" :is-invalid="isBioInvalid" name="bio">
      <Label>Bio</Label>
      <Textarea placeholder="Tell us about yourself..." :rows="3" />
      <FieldError v-if="isBioInvalid">Bio must be at least 20 characters.</FieldError>
      <Description v-else>Share a short introduction.</Description>
    </TextField>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Description, FieldError, Input, Label, TextField, Textarea } from '@rysinal/heroui-vue'

const username = ref('')
const bio = ref('')
const isUsernameInvalid = computed(() => username.value.length > 0 && username.value.length < 3)
const isBioInvalid = computed(() => bio.value.length > 0 && bio.value.length < 20)
</script>
