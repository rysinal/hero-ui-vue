<script setup lang="ts">
import { Tabs } from '../index'
</script>

<template>
  <Tabs default-value="a">
    <Tabs.ListContainer>
      <Tabs.List>
        <Tabs.Tab value="a">
          First
          <Tabs.Indicator />
        </Tabs.Tab>
        <Tabs.Tab value="b">
          Second
          <Tabs.Indicator />
        </Tabs.Tab>
      </Tabs.List>
    </Tabs.ListContainer>
    <Tabs.Panel value="a">Panel A</Tabs.Panel>
    <Tabs.Panel value="b">Panel B</Tabs.Panel>
  </Tabs>
</template>
