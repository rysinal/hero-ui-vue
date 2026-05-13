<template>
  <Drawer>
    <Button variant="secondary">
      <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 6h16" />
        <path d="M4 12h16" />
        <path d="M4 18h16" />
      </svg>
      Menu
    </Button>
    <DrawerBackdrop>
      <DrawerContent placement="left">
        <DrawerDialog>
          <DrawerCloseTrigger />
          <DrawerHeader>
            <DrawerHeading>Navigation</DrawerHeading>
          </DrawerHeader>
          <DrawerBody>
            <nav class="flex flex-col gap-1">
              <button
                v-for="item in navItems"
                :key="item.label"
                class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                type="button"
              >
                <svg
                  class="size-5 text-muted"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path :d="item.path" />
                </svg>
                {{ item.label }}
              </button>
            </nav>
          </DrawerBody>
        </DrawerDialog>
      </DrawerContent>
    </DrawerBackdrop>
  </Drawer>
</template>

<script setup lang="ts">
import {
  Button,
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerDialog,
  DrawerHeader,
  DrawerHeading,
} from '@rysinal/heroui-vue'

const navItems = [
  { label: 'Home', path: 'm3 11 9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z' },
  { label: 'Search', path: 'm21 21-4.3-4.3M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4z' },
  { label: 'Notifications', path: 'M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0' },
  { label: 'Messages', path: 'M4 4h16v12H6l-4 4V6a2 2 0 0 1 2-2z' },
  { label: 'Profile', path: 'M20 21a8 8 0 1 0-16 0M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' },
  { label: 'Settings', path: 'M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5zM19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1A2 2 0 1 1 4.6 17l.1-.1A1.7 1.7 0 0 0 5 15a1.7 1.7 0 0 0-1.6-1H3a2 2 0 1 1 0-4h.4A1.7 1.7 0 0 0 5 9a1.7 1.7 0 0 0-.3-1.9L4.6 7A2 2 0 1 1 7.4 4.2l.1.1A1.7 1.7 0 0 0 9.4 5a1.7 1.7 0 0 0 1-1.6V3a2 2 0 1 1 4 0v.4a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1A2 2 0 1 1 20.2 7l-.1.1A1.7 1.7 0 0 0 19.8 9a1.7 1.7 0 0 0 1.6 1h.6a2 2 0 1 1 0 4h-.6a1.7 1.7 0 0 0-1.6 1z' },
]
</script>
