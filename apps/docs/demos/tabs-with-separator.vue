<template>
  <Tabs class="w-full max-w-md" default-value="overview">
    <Tabs.ListContainer>
      <Tabs.List>
        <Tabs.Tab value="overview">
          Overview
          <Tabs.Indicator />
        </Tabs.Tab>
        <Tabs.Tab value="analytics">
          <Tabs.Separator />
          Analytics
          <Tabs.Indicator />
        </Tabs.Tab>
        <Tabs.Tab value="reports">
          <Tabs.Separator />
          Reports
          <Tabs.Indicator />
        </Tabs.Tab>
      </Tabs.List>
    </Tabs.ListContainer>
    <Tabs.Panel class="pt-4" value="overview">Overview content</Tabs.Panel>
    <Tabs.Panel class="pt-4" value="analytics">Analytics content</Tabs.Panel>
    <Tabs.Panel class="pt-4" value="reports">Reports content</Tabs.Panel>
  </Tabs>
</template>

<script setup lang="ts">
import { Tabs } from '@rysinal/heroui-vue'
</script>
