<template>
  <Surface class="w-full rounded-3xl p-6">
    <CheckboxGroup name="interests" variant="secondary">
      <Label>Select your interests</Label>
      <Description>Choose all that apply</Description>
      <Checkbox v-for="item in interests" :key="item.value" :value="item.value">
        <Checkbox.Control><Checkbox.Indicator /></Checkbox.Control>
        <Checkbox.Content>
          <Label>{{ item.title }}</Label>
          <Description>{{ item.description }}</Description>
        </Checkbox.Content>
      </Checkbox>
    </CheckboxGroup>
  </Surface>
</template>

<script setup lang="ts">
import { Checkbox, CheckboxGroup, Description, Label, Surface } from '@rysinal/heroui-vue'

const interests = [
  { description: 'Love building software', title: 'Coding', value: 'coding' },
  { description: 'Exploring new places', title: 'Travel', value: 'travel' },
  { description: 'Trying new recipes', title: 'Cooking', value: 'cooking' },
]
</script>
