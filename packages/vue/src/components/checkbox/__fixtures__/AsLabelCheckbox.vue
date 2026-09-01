<script setup lang="ts">
import { Checkbox } from '../index'
</script>

<template>
  <Checkbox as="label" data-custom="bar">
    <Checkbox.Control><Checkbox.Indicator /></Checkbox.Control>
  </Checkbox>
</template>
