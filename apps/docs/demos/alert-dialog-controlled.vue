<template>
  <div class="flex flex-col gap-4">
    <p class="text-sm text-muted">
      Status: <span class="font-medium">{{ isOpen ? 'open' : 'closed' }}</span>
    </p>
    <div class="flex gap-2">
      <Button size="sm" variant="secondary" @click="isOpen = true">Open</Button>
      <Button size="sm" variant="tertiary" @click="isOpen = !isOpen">Toggle</Button>
    </div>
    <AlertDialog v-model:is-open="isOpen">
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog class="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="accent" />
              <AlertDialog.Heading>Controlled dialog</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>The open state lives in the parent component.</AlertDialog.Body>
            <AlertDialog.Footer>
              <Button variant="secondary" @click="isOpen = false">Close</Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AlertDialog, Button } from '@rysinal/heroui-vue'

const isOpen = ref(false)
</script>
