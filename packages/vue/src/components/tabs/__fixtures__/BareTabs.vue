<script setup lang="ts">
import { Tabs } from '../index'
</script>

<template>
  <Tabs default-value="a">
    <Tabs.List>
      <Tabs.Tab value="a">First</Tabs.Tab>
      <Tabs.Tab value="b">Second</Tabs.Tab>
    </Tabs.List>
    <Tabs.Panel value="a">Panel A</Tabs.Panel>
  </Tabs>
</template>
