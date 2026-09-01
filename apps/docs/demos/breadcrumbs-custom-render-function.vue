<template>
  <Breadcrumbs as="ol" data-custom="foo">
    <Breadcrumbs.Item href="#">Home</Breadcrumbs.Item>
    <Breadcrumbs.Item href="#">Products</Breadcrumbs.Item>
    <Breadcrumbs.Item href="#">Electronics</Breadcrumbs.Item>
    <Breadcrumbs.Item>Laptop</Breadcrumbs.Item>
  </Breadcrumbs>
</template>

<script setup lang="ts">
import { Breadcrumbs } from '@rysinal/heroui-vue'
</script>
