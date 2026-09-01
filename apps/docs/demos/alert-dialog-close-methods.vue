<template>
  <div class="flex max-w-2xl flex-col gap-8">
    <div class="flex flex-col gap-2">
      <h3 class="text-lg font-semibold">Using the footer slot</h3>
      <p class="text-sm text-muted">
        The footer slot exposes <code>close</code>, which closes the dialog when called.
      </p>
      <AlertDialog>
        <Button variant="secondary">Open Dialog</Button>
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog class="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
              <AlertDialog.Icon status="accent" />
                <AlertDialog.Heading>Closing from the footer</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>Both buttons below call the close function from the slot.</AlertDialog.Body>
              <AlertDialog.Footer v-slot="{ close }">
                <Button variant="secondary" @click="close">Cancel</Button>
                <Button variant="primary" @click="close">Confirm</Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
    <div class="flex flex-col gap-2">
      <h3 class="text-lg font-semibold">Using CloseTrigger</h3>
      <p class="text-sm text-muted">
        <code>AlertDialog.CloseTrigger</code> renders a dismiss button in the corner.
      </p>
      <AlertDialog>
        <Button variant="secondary">Open Dialog</Button>
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog class="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
              <AlertDialog.Icon status="accent" />
                <AlertDialog.Heading>Closing from the corner</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>Use the × in the top-right corner, or press Escape.</AlertDialog.Body>
              <AlertDialog.Footer v-slot="{ close }">
                <Button variant="secondary" @click="close">Cancel</Button>
                <Button variant="primary" @click="close">Confirm</Button>
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
