<script setup lang="ts">
import { Radio } from '../index'
import { RadioGroup } from '../../radio-group'
</script>

<template>
  <RadioGroup>
    <Radio value="a">
      <Radio.Control><Radio.Indicator /></Radio.Control>
      <Radio.Content>Option A</Radio.Content>
    </Radio>
  </RadioGroup>
</template>
