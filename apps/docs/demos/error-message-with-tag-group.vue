<template>
  <TagGroup v-model:selected-keys="selected" selection-mode="multiple">
    <Label>Required Categories</Label>
    <TagGroup.List>
      <Tag value="news">News</Tag>
      <Tag value="travel">Travel</Tag>
      <Tag value="gaming">Gaming</Tag>
      <Tag value="shopping">Shopping</Tag>
    </TagGroup.List>
    <ErrorMessage v-if="isInvalid">Select at least one category</ErrorMessage>
    <Description v-else>{{ selected.length }} selected</Description>
  </TagGroup>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Description, ErrorMessage, Label, Tag, TagGroup } from '@rysinal/heroui-vue'

const selected = ref<Array<string | number>>([])
const isInvalid = computed(() => selected.value.length === 0)
</script>
