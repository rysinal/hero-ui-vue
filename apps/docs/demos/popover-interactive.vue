<template>
  <div class="flex items-center gap-6">
    <Popover>
      <PopoverTrigger
        aria-label="User profile"
      >
        <div class="flex items-center gap-2">
          <Avatar size="sm">
            <AvatarImage
              alt="Sarah Johnson"
              src="https://img.heroui.chat/image/avatar?w=400&h=400&u=1"
            />
            <AvatarFallback>SJ</AvatarFallback>
          </Avatar>
          <span class="flex flex-col">
            <span class="text-sm font-medium">Sarah Johnson</span>
            <span class="text-xs text-muted">@sarahj</span>
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent class="w-[320px]">
        <PopoverDialog>
          <PopoverHeading>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <Avatar size="md">
                  <AvatarImage
                    alt="Sarah Johnson"
                    src="https://img.heroui.chat/image/avatar?w=400&h=400&u=1"
                  />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div>
                  <p class="m-0 font-semibold">
                    Sarah Johnson
                  </p>
                  <p class="m-0 text-sm text-muted">
                    @sarahj
                  </p>
                </div>
              </div>
              <Button
                class="rounded-full"
                size="sm"
                :variant="isFollowing ? 'tertiary' : 'primary'"
                @click="isFollowing = !isFollowing"
              >
                {{ isFollowing ? 'Following' : 'Follow' }}
              </Button>
            </div>
          </PopoverHeading>
          <p class="mt-3 text-sm text-muted">
            Product designer and creative director. Building beautiful experiences that matter.
          </p>
          <div class="mt-3 flex gap-4">
            <div>
              <span class="font-semibold">892</span>
              <span class="ml-1 text-sm text-muted">Following</span>
            </div>
            <div>
              <span class="font-semibold">12.5K</span>
              <span class="ml-1 text-sm text-muted">Followers</span>
            </div>
          </div>
        </PopoverDialog>
      </PopoverContent>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Popover,
  PopoverContent,
  PopoverDialog,
  PopoverHeading,
  PopoverTrigger,
} from '@rysinal/heroui-vue'

const isFollowing = ref(false)
</script>
