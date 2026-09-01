<script setup lang="ts">
import { Input } from '../../input'
import { Label } from '../../label'
import { ListBox, ListBoxItem, ListBoxItemIndicator } from '../../list-box'
import { ComboBox } from '../index'

const animals = ['Aardvark', 'Cat', 'Dog', 'Kangaroo', 'Panda']
</script>

<template>
  <ComboBox class="w-[256px]" default-open>
    <Label>Favorite Animal</Label>
    <ComboBox.InputGroup>
      <Input placeholder="Search animals..." />
      <ComboBox.Trigger />
    </ComboBox.InputGroup>
    <ComboBox.Popover>
      <ListBox>
        <ListBoxItem
          v-for="animal in animals"
          :key="animal"
          :text-value="animal"
          :value="animal.toLowerCase()"
        >
          {{ animal }}
          <ListBoxItemIndicator />
        </ListBoxItem>
      </ListBox>
    </ComboBox.Popover>
  </ComboBox>
</template>
