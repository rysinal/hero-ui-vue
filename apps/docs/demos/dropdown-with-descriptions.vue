<template>
  <Dropdown>
    <Dropdown.Trigger>
      <Button aria-label="Menu" variant="secondary">Account</Button>
    </Dropdown.Trigger>
    <Dropdown.Popover class="min-w-[280px]">
      <Dropdown.Menu>
        <Dropdown.Item value="profile" text-value="Profile">
          <div class="flex flex-col">
            <Label>Profile</Label>
            <Description>Manage your public details</Description>
          </div>
        </Dropdown.Item>
        <Dropdown.Item value="billing" text-value="Billing">
          <div class="flex flex-col">
            <Label>Billing</Label>
            <Description>Plans and invoices</Description>
          </div>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown.Popover>
  </Dropdown>
</template>

<script setup lang="ts">
import { Button, Description, Dropdown, Label } from '@rysinal/heroui-vue'
</script>
