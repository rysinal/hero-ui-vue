<template>
  <div class="flex w-full max-w-md flex-col gap-6">
    <RadioGroup default-value="standard" name="delivery">
      <Label>Delivery</Label>
      <Radio v-for="option in deliveryOptions" :key="option.value" :value="option.value">
        <Radio.Control><Radio.Indicator /></Radio.Control>
        <Radio.Content>
          <div class="flex w-full items-center justify-between gap-4">
            <div class="flex flex-col">
              <Label>{{ option.title }}</Label>
              <Description>{{ option.description }}</Description>
            </div>
            <span class="text-sm font-medium">{{ option.price }}</span>
          </div>
        </Radio.Content>
      </Radio>
    </RadioGroup>
    <RadioGroup default-value="card" name="payment">
      <Label>Payment</Label>
      <Radio v-for="option in paymentOptions" :key="option.value" :value="option.value">
        <Radio.Control><Radio.Indicator /></Radio.Control>
        <Radio.Content>
          <Label>{{ option.title }}</Label>
          <Description>{{ option.description }}</Description>
        </Radio.Content>
      </Radio>
    </RadioGroup>
  </div>
</template>

<script setup lang="ts">
import { Description, Label, Radio, RadioGroup } from '@rysinal/heroui-vue'

const deliveryOptions = [
  { description: '4-10 business days', price: '$5.00', title: 'Standard', value: 'standard' },
  { description: '2-5 business days', price: '$16.00', title: 'Express', value: 'express' },
  { description: 'Next business day', price: '$32.00', title: 'Overnight', value: 'overnight' },
]

const paymentOptions = [
  { description: 'Visa, Mastercard, Amex', title: 'Card', value: 'card' },
  { description: 'Pay with your PayPal balance', title: 'PayPal', value: 'paypal' },
]
</script>
