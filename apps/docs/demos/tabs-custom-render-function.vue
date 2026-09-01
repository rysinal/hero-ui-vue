<template>
  <Tabs v-slot="{ selectedValue }" class="w-full max-w-md" default-value="overview">
    <Tabs.ListContainer>
      <Tabs.List>
        <Tabs.Tab value="overview">
          Overview
          <Tabs.Indicator />
        </Tabs.Tab>
        <Tabs.Tab value="analytics">
          Analytics
          <Tabs.Indicator />
        </Tabs.Tab>
      </Tabs.List>
    </Tabs.ListContainer>
    <p class="pt-4 text-sm text-muted">
      Selected tab: <span class="font-medium">{{ selectedValue }}</span>
    </p>
  </Tabs>
</template>

<script setup lang="ts">
import { Tabs } from '@rysinal/heroui-vue'
</script>
