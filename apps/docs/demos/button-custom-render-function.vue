<template>
  <div class="flex items-center gap-3">
    <Button as="a" href="#">Rendered as a link</Button>
    <Button v-slot="{ isPressed }" :data-custom="isPressed ? 'pressed' : 'bar'">
      {{ isPressed ? 'Pressing' : 'Press me' }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@rysinal/heroui-vue'
</script>
