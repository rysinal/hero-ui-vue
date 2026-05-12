<template>
  <Button is-pending>
    <Spinner color="current" size="sm" />
    Uploading...
  </Button>
</template>

<script setup>
import { Button, Spinner } from '@rysinal/heroui-vue'
</script>
