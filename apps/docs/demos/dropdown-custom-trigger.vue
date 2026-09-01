<template>
  <Dropdown>
    <Dropdown.Trigger>
      <Avatar class="cursor-pointer" size="sm">
        <AvatarImage
          alt="Jane Doe"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg"
        />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    </Dropdown.Trigger>
    <Dropdown.Popover class="min-w-[200px]">
      <Dropdown.Menu>
        <Dropdown.Item value="profile" text-value="Profile"><Label>Profile</Label></Dropdown.Item>
        <Dropdown.Item value="settings" text-value="Settings"><Label>Settings</Label></Dropdown.Item>
        <Dropdown.Item value="signout" text-value="Sign out" variant="danger">
          <Label>Sign out</Label>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown.Popover>
  </Dropdown>
</template>

<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage, Dropdown, Label } from '@rysinal/heroui-vue'
</script>
