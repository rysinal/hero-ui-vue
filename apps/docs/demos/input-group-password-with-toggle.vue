<template>
  <TextField class="w-full max-w-[280px]" name="password">
    <Label>Password</Label>
    <InputGroup>
      <InputGroup.Input
        class="w-full max-w-[280px]"
        :type="isVisible ? 'text' : 'password'"
        :value="isVisible ? '87$2h.3diua' : '••••••••'"
      />
      <InputGroup.Suffix class="pr-0">
        <Button
          :aria-label="isVisible ? 'Hide password' : 'Show password'"
          is-icon-only
          size="sm"
          variant="ghost"
          @click="isVisible = !isVisible"
        >
          <GroupIcon :name="isVisible ? 'eye' : 'eye-slash'" />
        </Button>
      </InputGroup.Suffix>
    </InputGroup>
  </TextField>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, InputGroup, Label, TextField } from '@rysinal/heroui-vue'
import GroupIcon from './input-group-icons.vue'

const isVisible = ref(false)
</script>
