<template>
  <div class="flex flex-wrap gap-4">
      <AlertDialog>
        <Button variant="secondary">Auto</Button>
        <AlertDialog.Backdrop>
          <AlertDialog.Container placement="auto">
            <AlertDialog.Dialog class="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
              <AlertDialog.Icon status="accent" />
                <AlertDialog.Heading>Auto Placement</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>This dialog uses the auto placement.</AlertDialog.Body>
              <AlertDialog.Footer v-slot="{ close }">
                <Button variant="secondary" @click="close">Cancel</Button>
                <Button variant="primary" @click="close">Confirm</Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
      <AlertDialog>
        <Button variant="secondary">Top</Button>
        <AlertDialog.Backdrop>
          <AlertDialog.Container placement="top">
            <AlertDialog.Dialog class="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
              <AlertDialog.Icon status="accent" />
                <AlertDialog.Heading>Top Placement</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>This dialog uses the top placement.</AlertDialog.Body>
              <AlertDialog.Footer v-slot="{ close }">
                <Button variant="secondary" @click="close">Cancel</Button>
                <Button variant="primary" @click="close">Confirm</Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
      <AlertDialog>
        <Button variant="secondary">Center</Button>
        <AlertDialog.Backdrop>
          <AlertDialog.Container placement="center">
            <AlertDialog.Dialog class="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
              <AlertDialog.Icon status="accent" />
                <AlertDialog.Heading>Center Placement</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>This dialog uses the center placement.</AlertDialog.Body>
              <AlertDialog.Footer v-slot="{ close }">
                <Button variant="secondary" @click="close">Cancel</Button>
                <Button variant="primary" @click="close">Confirm</Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
      <AlertDialog>
        <Button variant="secondary">Bottom</Button>
        <AlertDialog.Backdrop>
          <AlertDialog.Container placement="bottom">
            <AlertDialog.Dialog class="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
              <AlertDialog.Icon status="accent" />
                <AlertDialog.Heading>Bottom Placement</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>This dialog uses the bottom placement.</AlertDialog.Body>
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
