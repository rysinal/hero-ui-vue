<template>
  <!--
    React ships this as a `next/dynamic` import with `ssr: false`. VitePress
    prerenders too, so the Vue equivalent is the same demo wrapped in
    `<ClientOnly>`, which skips it during SSR and mounts it on the client.
  -->
  <ClientOnly>
    <DateRangePickerFormatOptions />
  </ClientOnly>
</template>

<script setup lang="ts">
import DateRangePickerFormatOptions from './date-range-picker-format-options.vue'
</script>
