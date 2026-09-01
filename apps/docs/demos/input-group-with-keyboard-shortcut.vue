<template>
  <TextField aria-label="Command" class="w-full max-w-[280px]" name="command">
    <InputGroup>
      <InputGroup.Input class="w-full max-w-[280px]" placeholder="Command" />
      <InputGroup.Suffix class="pr-2">
        <Kbd>
          <Kbd.Abbr key-value="command" />
          <Kbd.Content>K</Kbd.Content>
        </Kbd>
      </InputGroup.Suffix>
    </InputGroup>
  </TextField>
</template>

<script setup lang="ts">
import { InputGroup, Kbd, TextField } from '@rysinal/heroui-vue'
</script>
