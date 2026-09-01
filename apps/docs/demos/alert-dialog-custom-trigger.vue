<template>
  <AlertDialog>
    <AlertDialog.Trigger class="cursor-pointer rounded-xl border border-default p-4 text-left">
      <p class="text-sm font-medium">Delete workspace</p>
      <p class="text-sm text-muted">Click this card to confirm</p>
    </AlertDialog.Trigger>
    <AlertDialog.Backdrop>
      <AlertDialog.Container>
        <AlertDialog.Dialog class="sm:max-w-[400px]">
          <AlertDialog.CloseTrigger />
          <AlertDialog.Header>
            <AlertDialog.Icon status="danger" />
            <AlertDialog.Heading>Delete this workspace?</AlertDialog.Heading>
          </AlertDialog.Header>
          <AlertDialog.Body>Every project inside it will be removed.</AlertDialog.Body>
          <AlertDialog.Footer v-slot="{ close }">
            <Button variant="secondary" @click="close">Cancel</Button>
            <Button variant="danger" @click="close">Delete</Button>
          </AlertDialog.Footer>
        </AlertDialog.Dialog>
      </AlertDialog.Container>
    </AlertDialog.Backdrop>
  </AlertDialog>
</template>

<script setup lang="ts">
import { AlertDialog, Button } from '@rysinal/heroui-vue'
</script>
