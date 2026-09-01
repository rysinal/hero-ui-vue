<template>
  <ComboBox class="w-[256px]">
    <Label>Country</Label>
    <ComboBox.InputGroup>
      <Input placeholder="Search countries..." />
      <ComboBox.Trigger />
    </ComboBox.InputGroup>
    <ComboBox.Popover>
      <ListBox>
        <ListBoxSection v-for="region in regions" :key="region" :title="region">
          <ListBoxItem
            v-for="country in byRegion(region)"
            :key="country.id"
            :text-value="country.name"
            :value="country.id"
          >
            {{ country.name }}
            <ListBoxItemIndicator />
          </ListBoxItem>
        </ListBoxSection>
      </ListBox>
    </ComboBox.Popover>
  </ComboBox>
</template>

<script setup lang="ts">
import {
  ComboBox,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  ListBoxItemIndicator,
  ListBoxSection,
} from '@rysinal/heroui-vue'
import { countries } from './combo-box-data'

const regions = [...new Set(countries.map((country) => country.region))]
const byRegion = (region: string) => countries.filter((country) => country.region === region)
</script>
