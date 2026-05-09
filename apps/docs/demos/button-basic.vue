<template>
  <Button @click="handlePress">Click me</Button>
</template>

<script setup>
import { Button } from '@heroui-vue/vue'

const handlePress = () => {
  console.log('Button pressed')
}
</script>
