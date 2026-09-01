<template>
  <div class="flex flex-col gap-4">
    <Select class="w-[256px]" placeholder="Select one" variant="primary">
      <Label>Primary variant</Label>
      <SelectTrigger>
        <SelectValue />
        <SelectIndicator />
      </SelectTrigger>
      <SelectPopover>
        <ListBox>
          <ListBoxItem value="option1" text-value="Option 1">
            Option 1
            <ListBoxItemIndicator />
          </ListBoxItem>
          <ListBoxItem value="option2" text-value="Option 2">
            Option 2
            <ListBoxItemIndicator />
          </ListBoxItem>
        </ListBox>
      </SelectPopover>
    </Select>

    <Select class="w-[256px]" placeholder="Select one" variant="secondary">
      <Label>Secondary variant</Label>
      <SelectTrigger>
        <SelectValue />
        <SelectIndicator />
      </SelectTrigger>
      <SelectPopover>
        <ListBox>
          <ListBoxItem value="option1" text-value="Option 1">
            Option 1
            <ListBoxItemIndicator />
          </ListBoxItem>
          <ListBoxItem value="option2" text-value="Option 2">
            Option 2
            <ListBoxItemIndicator />
          </ListBoxItem>
        </ListBox>
      </SelectPopover>
    </Select>
  </div>
</template>

<script setup lang="ts">
import {
  Label,
  ListBox,
  ListBoxItem,
  ListBoxItemIndicator,
  Select,
  SelectIndicator,
  SelectPopover,
  SelectTrigger,
  SelectValue,
} from '@rysinal/heroui-vue'
</script>
