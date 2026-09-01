<template>
  <div class="flex max-w-md flex-col items-center gap-3">
    <div>Rendered as an hr element</div>
    <Separator as="hr" />
    <div>Rendered as a span</div>
    <Separator as="span" />
  </div>
</template>

<script setup lang="ts">
import { Separator } from '@rysinal/heroui-vue'
</script>
