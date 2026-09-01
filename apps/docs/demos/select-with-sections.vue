<template>
  <Select class="w-[256px]" placeholder="Select a country">
    <Label>Country</Label>
    <SelectTrigger>
      <SelectValue />
      <SelectIndicator />
    </SelectTrigger>
    <SelectPopover>
      <ListBox>
        <template v-for="(section, index) in countrySections" :key="section.id">
          <ListBoxSection>
            <Header>{{ section.name }}</Header>
            <ListBoxItem
              v-for="country in section.items"
              :key="country.id"
              :text-value="country.name"
              :value="country.id"
            >
              {{ country.name }}
              <ListBoxItemIndicator />
            </ListBoxItem>
          </ListBoxSection>
          <Separator v-if="index < countrySections.length - 1" />
        </template>
      </ListBox>
    </SelectPopover>
  </Select>
</template>

<script setup lang="ts">
import {
  Header,
  Label,
  ListBox,
  ListBoxItem,
  ListBoxItemIndicator,
  ListBoxSection,
  Select,
  SelectIndicator,
  SelectPopover,
  SelectTrigger,
  SelectValue,
  Separator,
} from '@rysinal/heroui-vue'
import { countrySections } from './select-data'
</script>
