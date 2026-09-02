<script setup lang="ts">
import { Label } from '../../label'
import { Autocomplete } from '../index'

/** Exercises the dot-notation parts that never need a popover. */
</script>

<template>
  <Autocomplete placeholder="Select one">
    <Label>State</Label>
    <Autocomplete.Trigger>
      <Autocomplete.Value />
      <Autocomplete.ClearButton />
      <Autocomplete.Indicator />
    </Autocomplete.Trigger>
  </Autocomplete>
</template>
