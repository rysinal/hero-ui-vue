<template>
  <div>
    <div ref="portalTarget" class="mb-4 rounded-xl border border-dashed border-default p-4">
      <p class="text-sm text-muted">The dialog is portalled into this container.</p>
    </div>
    <AlertDialog>
      <Button variant="secondary">Open in custom portal</Button>
      <AlertDialog.Backdrop :portal-container="portalTarget">
        <AlertDialog.Container>
          <AlertDialog.Dialog class="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="accent" />
              <AlertDialog.Heading>Custom portal</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>This dialog rendered into a specific element.</AlertDialog.Body>
            <AlertDialog.Footer v-slot="{ close }">
              <Button variant="secondary" @click="close">Close</Button>
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

const portalTarget = ref<HTMLElement | null>(null)
</script>
