<template>
  <div class="w-full p-0 sm:max-w-sm">
    <ScrollShadow class="max-h-[240px] p-4">
      <div class="space-y-4">
        <p v-for="i in 10" :key="i">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam. Morbi accumsan cursus enim, sed ultricies sapien.</p>
      </div>
    </ScrollShadow>
  </div>
</template>

<script setup lang="ts">
import { ScrollShadow } from '@rysinal/heroui-vue'
</script>
