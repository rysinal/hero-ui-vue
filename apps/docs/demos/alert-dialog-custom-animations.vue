<template>
  <AlertDialog>
    <Button variant="secondary">Kinematic Scale</Button>
    <AlertDialog.Backdrop class="duration-500">
      <AlertDialog.Container>
        <AlertDialog.Dialog class="sm:max-w-[400px]">
        <AlertDialog.CloseTrigger />
          <AlertDialog.Header>
          <AlertDialog.Icon status="accent" />
            <AlertDialog.Heading>Custom animation</AlertDialog.Heading>
          </AlertDialog.Header>
          <AlertDialog.Body>The backdrop and dialog use custom transition classes.</AlertDialog.Body>
          <AlertDialog.Footer v-slot="{ close }">
            <Button variant="secondary" @click="close">Cancel</Button>
            <Button variant="primary" @click="close">Confirm</Button>
          </AlertDialog.Footer>
        </AlertDialog.Dialog>
      </AlertDialog.Container>
    </AlertDialog.Backdrop>
  </AlertDialog>
</template>

<script setup lang="ts">
import { AlertDialog, Button } from '@rysinal/heroui-vue'
</script>
