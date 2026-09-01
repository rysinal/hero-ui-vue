<template>
  <Card class="max-w-[400px]">
    <Card.Header>
      <Card.Title>Terms and Conditions</Card.Title>
      <Card.Description>Please review before proceeding</Card.Description>
    </Card.Header>
    <Card.Content class="p-0">
      <ScrollShadow class="h-[300px] px-4" :size="80">
        <div class="space-y-4">
          <p v-for="i in 10" :key="i">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam. Morbi accumsan cursus enim, sed ultricies sapien.</p>
        </div>
      </ScrollShadow>
    </Card.Content>
  </Card>
</template>

<script setup lang="ts">
import { Card, ScrollShadow } from '@rysinal/heroui-vue'
</script>
