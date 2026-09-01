<template>
  <div class="flex max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-2">
      <h3 class="text-lg font-semibold">isDismissable</h3>
      <p class="text-sm text-muted">
        Controls whether clicking the backdrop closes the dialog. Alert dialogs usually require an
        explicit choice, so this defaults to <code>false</code>.
      </p>
      <AlertDialog>
        <Button variant="secondary">Not dismissable</Button>
        <AlertDialog.Backdrop :is-dismissable="false">
          <AlertDialog.Container>
            <AlertDialog.Dialog class="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
                <AlertDialog.Heading>Delete this file?</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>Clicking the backdrop will not close this dialog.</AlertDialog.Body>
              <AlertDialog.Footer v-slot="{ close }">
                <Button variant="secondary" @click="close">Cancel</Button>
                <Button variant="danger" @click="close">Delete</Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
    <div class="flex flex-col gap-2">
      <h3 class="text-lg font-semibold">Dismissable</h3>
      <p class="text-sm text-muted">Set it to <code>true</code> for less critical confirmations.</p>
      <AlertDialog>
        <Button variant="secondary">Dismissable</Button>
        <AlertDialog.Backdrop is-dismissable>
          <AlertDialog.Container>
            <AlertDialog.Dialog class="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
              <AlertDialog.Icon status="accent" />
                <AlertDialog.Heading>Discard draft?</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>Clicking the backdrop closes this dialog.</AlertDialog.Body>
              <AlertDialog.Footer v-slot="{ close }">
                <Button variant="secondary" @click="close">Keep</Button>
                <Button variant="primary" @click="close">Discard</Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AlertDialog, Button } from '@rysinal/heroui-vue'
</script>
