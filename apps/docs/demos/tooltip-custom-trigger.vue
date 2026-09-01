<template>
  <div class="flex items-center gap-6">
    <Tooltip :delay="0">
      <Tooltip.Trigger aria-label="User avatar">
        <Avatar size="sm">
          <AvatarImage alt="Jane Doe" src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </Tooltip.Trigger>
      <Tooltip.Content show-arrow>
        <Tooltip.Arrow />
        <p>Jane Doe</p>
      </Tooltip.Content>
    </Tooltip>
    <Tooltip :delay="0">
      <Tooltip.Trigger>
        <Chip color="accent" variant="soft">Pro</Chip>
      </Tooltip.Trigger>
      <Tooltip.Content show-arrow>
        <Tooltip.Arrow />
        <p>Upgraded account</p>
      </Tooltip.Content>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage, Chip, Tooltip } from '@rysinal/heroui-vue'
</script>
