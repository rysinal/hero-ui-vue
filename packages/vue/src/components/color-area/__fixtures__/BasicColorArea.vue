<script setup lang="ts">
import { ColorArea } from '../index'

const props = defineProps<{ isDisabled?: boolean }>()
</script>

<template>
  <ColorArea :is-disabled="props.isDisabled" default-value="hsl(220, 100%, 50%)">
    <ColorArea.Thumb />
  </ColorArea>
</template>
