<template>
  <div class="flex w-full max-w-2xl flex-col gap-8">
    <div v-for="category in categories" :key="category.title" class="flex flex-col gap-3">
      <h3 class="text-base font-semibold">{{ category.title }}</h3>
      <Accordion>
        <AccordionItem v-for="item in category.items" :key="item.title" :value="item.title">
          <AccordionHeading>
            <AccordionTrigger>
              {{ item.title }}
              <AccordionIndicator />
            </AccordionTrigger>
          </AccordionHeading>
          <AccordionPanel>
            <AccordionBody>{{ item.content }}</AccordionBody>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Accordion,
  AccordionBody,
  AccordionHeading,
  AccordionIndicator,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from '@rysinal/heroui-vue'

const categories = [
  {
    items: [
      {
        content:
          "Browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping and payment information to complete your purchase.",
        title: 'How do I place an order?',
      },
      {
        content:
          "Yes, you can modify or cancel your order before it's shipped. Once your order is processed, you can't make changes.",
        title: 'Can I modify or cancel my order?',
      },
    ],
    title: 'Orders',
  },
  {
    items: [
      {
        content:
          'Standard delivery takes 4-10 business days. Express delivery arrives in 2-5 business days.',
        title: 'How long does delivery take?',
      },
      {
        content: 'We ship to most countries. Rates are calculated at checkout.',
        title: 'Do you ship internationally?',
      },
    ],
    title: 'Shipping',
  },
]
</script>
