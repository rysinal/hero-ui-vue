<template>
  <Tabs class="w-full max-w-md" default-value="active">
    <Tabs.ListContainer>
      <Tabs.List>
        <Tabs.Tab value="active">
          Active
          <Tabs.Indicator />
        </Tabs.Tab>
        <Tabs.Tab is-disabled value="disabled">
          Disabled
          <Tabs.Indicator />
        </Tabs.Tab>
        <Tabs.Tab value="available">
          Available
          <Tabs.Indicator />
        </Tabs.Tab>
      </Tabs.List>
    </Tabs.ListContainer>
    <Tabs.Panel class="pt-4" value="active">Active content</Tabs.Panel>
    <Tabs.Panel class="pt-4" value="disabled">Disabled content</Tabs.Panel>
    <Tabs.Panel class="pt-4" value="available">Available content</Tabs.Panel>
  </Tabs>
</template>

<script setup lang="ts">
import { Tabs } from '@rysinal/heroui-vue'
</script>
