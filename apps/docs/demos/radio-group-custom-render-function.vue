<template>
  <RadioGroup default-value="premium" name="plan">
    <Label>Plan selection</Label>
    <Description>Choose the plan that suits you best</Description>
    <Radio value="basic">
      <Radio.Control><Radio.Indicator /></Radio.Control>
      <Radio.Content>
        <Label>Basic Plan</Label>
        <Description>Includes 100 messages per month</Description>
      </Radio.Content>
    </Radio>
    <Radio value="premium">
      <Radio.Control><Radio.Indicator /></Radio.Control>
      <Radio.Content>
        <Label>Premium Plan</Label>
        <Description>Includes unlimited messages</Description>
      </Radio.Content>
    </Radio>
  </RadioGroup>
</template>

<script setup lang="ts">
import { Description, Label, Radio, RadioGroup } from '@rysinal/heroui-vue'
</script>
