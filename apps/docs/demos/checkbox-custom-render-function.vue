<template>
  <div class="flex items-center gap-3">
    <Checkbox id="basic-terms" as="label" data-custom="bar">
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
    </Checkbox>
    <Label for="basic-terms">Accept terms and conditions</Label>
  </div>
</template>

<script setup lang="ts">
import { Checkbox, Label } from '@rysinal/heroui-vue'
</script>
