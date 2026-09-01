<template>
  <Tabs class="w-full max-w-lg text-center" default-value="daily">
    <Tabs.ListContainer>
      <Tabs.List
        class="w-fit *:h-6 *:w-fit *:px-3 *:text-sm *:font-normal *:data-[selected=true]:text-accent-foreground"
      >
        <Tabs.Tab value="daily">
          Daily
          <Tabs.Indicator class="bg-accent" />
        </Tabs.Tab>
        <Tabs.Tab value="weekly">
          Weekly
          <Tabs.Indicator class="bg-accent" />
        </Tabs.Tab>
        <Tabs.Tab value="bi-weekly">
          Bi-Weekly
          <Tabs.Indicator class="bg-accent" />
        </Tabs.Tab>
      </Tabs.List>
    </Tabs.ListContainer>
    <Tabs.Panel class="pt-4" value="daily">Daily content</Tabs.Panel>
    <Tabs.Panel class="pt-4" value="weekly">Weekly content</Tabs.Panel>
    <Tabs.Panel class="pt-4" value="bi-weekly">Bi-Weekly content</Tabs.Panel>
  </Tabs>
</template>

<script setup lang="ts">
import { Tabs } from '@rysinal/heroui-vue'
</script>
