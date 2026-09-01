<template>
  <Tabs class="w-full max-w-lg" default-value="account" orientation="vertical">
    <Tabs.ListContainer>
      <Tabs.List>
        <Tabs.Tab value="account">
          Account
          <Tabs.Indicator />
        </Tabs.Tab>
        <Tabs.Tab value="security">
          Security
          <Tabs.Indicator />
        </Tabs.Tab>
        <Tabs.Tab value="notifications">
          Notifications
          <Tabs.Indicator />
        </Tabs.Tab>
        <Tabs.Tab value="billing">
          Billing
          <Tabs.Indicator />
        </Tabs.Tab>
      </Tabs.List>
    </Tabs.ListContainer>
    <Tabs.Panel class="pt-4" value="account">Account content</Tabs.Panel>
    <Tabs.Panel class="pt-4" value="security">Security content</Tabs.Panel>
    <Tabs.Panel class="pt-4" value="notifications">Notifications content</Tabs.Panel>
    <Tabs.Panel class="pt-4" value="billing">Billing content</Tabs.Panel>
  </Tabs>
</template>

<script setup lang="ts">
import { Tabs } from '@rysinal/heroui-vue'
</script>
