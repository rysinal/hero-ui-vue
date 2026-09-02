<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold">Single Select Variants</h3>
      <div class="flex flex-col gap-4">
        <Autocomplete
          v-for="variant in variants"
          :key="`single-${variant}`"
          v-model="singleKeys[variant]"
          :variant="variant"
          class="w-[256px]"
          placeholder="Select one"
        >
          <Label>{{ labelFor(variant) }}</Label>
          <Autocomplete.Trigger>
            <Autocomplete.Value />
            <Autocomplete.ClearButton />
            <Autocomplete.Indicator />
          </Autocomplete.Trigger>
          <Autocomplete.Popover>
            <Autocomplete.Filter :filter="contains">
              <template #default="{ inputValue }">
                <SearchField variant="secondary">
                  <SearchFieldGroup>
                    <SearchFieldSearchIcon />
                    <SearchFieldInput autofocus placeholder="Search..." />
                    <SearchFieldClearButton />
                  </SearchFieldGroup>
                </SearchField>
                <ListBox>
                  <ListBoxItem
                    v-for="option in options"
                    :key="option.id"
                    :text-value="option.name"
                    :value="option.id"
                  >
                    {{ option.name }}
                    <ListBoxItemIndicator />
                  </ListBoxItem>
                  <EmptyState v-if="!hasMatch(inputValue)">No results found</EmptyState>
                </ListBox>
              </template>
            </Autocomplete.Filter>
          </Autocomplete.Popover>
        </Autocomplete>
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold">Multiple Select Variants</h3>
      <div class="flex flex-col gap-4">
        <Autocomplete
          v-for="variant in variants"
          :key="`multiple-${variant}`"
          v-model="multipleKeys[variant]"
          :variant="variant"
          class="w-[256px]"
          placeholder="Select multiple"
          selection-mode="multiple"
        >
          <Label>{{ labelFor(variant) }}</Label>
          <Autocomplete.Trigger>
            <Autocomplete.Value>
              <template #default="{ defaultChildren, isPlaceholder, state }">
                <template v-if="isPlaceholder || state.selectedItems.length === 0">
                  {{ defaultChildren }}
                </template>
                <TagGroup
                  v-else
                  :variant="variant === 'secondary' ? 'surface' : 'default'"
                  size="sm"
                  @remove="removeKey(variant, $event)"
                >
                  <TagGroupList>
                    <Tag v-for="item in state.selectedItems" :key="item.key" :value="item.key">
                      {{ item.textValue }}
                      <TagRemoveButton />
                    </Tag>
                  </TagGroupList>
                </TagGroup>
              </template>
            </Autocomplete.Value>
            <Autocomplete.ClearButton />
            <Autocomplete.Indicator />
          </Autocomplete.Trigger>
          <Autocomplete.Popover>
            <Autocomplete.Filter :filter="contains">
              <template #default="{ inputValue }">
                <SearchField variant="secondary">
                  <SearchFieldGroup>
                    <SearchFieldSearchIcon />
                    <SearchFieldInput autofocus placeholder="Search..." />
                    <SearchFieldClearButton />
                  </SearchFieldGroup>
                </SearchField>
                <ListBox>
                  <ListBoxItem
                    v-for="option in options"
                    :key="option.id"
                    :text-value="option.name"
                    :value="option.id"
                  >
                    {{ option.name }}
                    <ListBoxItemIndicator />
                  </ListBoxItem>
                  <EmptyState v-if="!hasMatch(inputValue)">No results found</EmptyState>
                </ListBox>
              </template>
            </Autocomplete.Filter>
          </Autocomplete.Popover>
        </Autocomplete>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Autocomplete,
  EmptyState,
  Label,
  ListBox,
  ListBoxItem,
  ListBoxItemIndicator,
  SearchField,
  SearchFieldClearButton,
  SearchFieldGroup,
  SearchFieldInput,
  SearchFieldSearchIcon,
  Tag,
  TagGroup,
  TagGroupList,
  TagRemoveButton,
  useFilter,
} from '@rysinal/heroui-vue'
import { options } from './autocomplete-data'

type Variant = 'primary' | 'secondary'

const { contains } = useFilter({ sensitivity: 'base' })
const variants: Variant[] = ['primary', 'secondary']

const singleKeys = ref<Record<Variant, string | number | null>>({
  primary: null,
  secondary: null,
})
const multipleKeys = ref<Record<Variant, Array<string | number>>>({
  primary: [],
  secondary: [],
})

const labelFor = (variant: Variant) => `${variant === 'primary' ? 'Primary' : 'Secondary'} variant`

const hasMatch = (inputValue: string) =>
  options.some((option) => contains(option.name, inputValue))

const removeKey = (variant: Variant, key: string | number) => {
  multipleKeys.value[variant] = multipleKeys.value[variant].filter((selected) => selected !== key)
}
</script>
