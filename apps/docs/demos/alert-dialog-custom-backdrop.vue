<template>
  <div class="flex flex-wrap gap-4">
      <AlertDialog>
        <Button variant="secondary">Transparent</Button>
        <AlertDialog.Backdrop variant="transparent">
          <AlertDialog.Container>
            <AlertDialog.Dialog class="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
              <AlertDialog.Icon status="accent" />
                <AlertDialog.Heading>Transparent backdrop</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>This dialog uses the transparent backdrop variant.</AlertDialog.Body>
              <AlertDialog.Footer v-slot="{ close }">
                <Button variant="secondary" @click="close">Cancel</Button>
                <Button variant="primary" @click="close">Confirm</Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
      <AlertDialog>
        <Button variant="secondary">Opaque</Button>
        <AlertDialog.Backdrop variant="opaque">
          <AlertDialog.Container>
            <AlertDialog.Dialog class="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
              <AlertDialog.Icon status="accent" />
                <AlertDialog.Heading>Opaque backdrop</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>This dialog uses the opaque backdrop variant.</AlertDialog.Body>
              <AlertDialog.Footer v-slot="{ close }">
                <Button variant="secondary" @click="close">Cancel</Button>
                <Button variant="primary" @click="close">Confirm</Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
      <AlertDialog>
        <Button variant="secondary">Blur</Button>
        <AlertDialog.Backdrop variant="blur">
          <AlertDialog.Container>
            <AlertDialog.Dialog class="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
              <AlertDialog.Icon status="accent" />
                <AlertDialog.Heading>Blur backdrop</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>This dialog uses the blur backdrop variant.</AlertDialog.Body>
              <AlertDialog.Footer v-slot="{ close }">
                <Button variant="secondary" @click="close">Cancel</Button>
                <Button variant="primary" @click="close">Confirm</Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
  </div>
</template>

<script setup lang="ts">
import { AlertDialog, Button } from '@rysinal/heroui-vue'
</script>
