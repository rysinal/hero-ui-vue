<template>
  <Accordion as="section" class="w-full max-w-2xl" data-custom="foo">
    <AccordionItem v-for="item in items" :key="item.title" :value="item.title">
      <AccordionHeading>
        <AccordionTrigger>
          <span class="flex items-center gap-2">
            <span aria-hidden="true">{{ item.icon }}</span>
            {{ item.title }}
          </span>
          <AccordionIndicator />
        </AccordionTrigger>
      </AccordionHeading>
      <AccordionPanel>
        <AccordionBody>{{ item.content }}</AccordionBody>
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
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

const items = [
  {
    content: 'Browse our products, add items to your cart, and proceed to checkout.',
    icon: '🛍',
    title: 'How do I place an order?',
  },
  {
    content: 'Standard delivery takes 4-10 business days.',
    icon: '🌍',
    title: 'How long does delivery take?',
  },
  {
    content: 'Returns are free within 30 days of delivery.',
    icon: '↩',
    title: 'What is your return policy?',
  },
]
</script>
