<template>
  <div class="flex flex-wrap gap-4">
      <AlertDialog>
        <Button variant="secondary">Sign Out</Button>
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog class="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
              <AlertDialog.Icon status="accent" />
                <AlertDialog.Heading>Sign out of your account?</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>You'll need to sign in again to access your account. Any unsaved changes will be lost.</AlertDialog.Body>
              <AlertDialog.Footer v-slot="{ close }">
                <Button variant="secondary" @click="close">Stay Signed In</Button>
                <Button variant="primary" @click="close">Sign Out</Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
      <AlertDialog>
        <Button variant="secondary">Mark Complete</Button>
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog class="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
              <AlertDialog.Icon status="success" />
                <AlertDialog.Heading>Mark this task as complete?</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>The task will move to your completed list and stop appearing in active work.</AlertDialog.Body>
              <AlertDialog.Footer v-slot="{ close }">
                <Button variant="secondary" @click="close">Not Yet</Button>
                <Button variant="primary" @click="close">Mark Complete</Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
      <AlertDialog>
        <Button variant="secondary">Archive</Button>
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog class="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
              <AlertDialog.Icon status="warning" />
                <AlertDialog.Heading>Archive this project?</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>Archived projects become read-only. You can restore them later from the archive.</AlertDialog.Body>
              <AlertDialog.Footer v-slot="{ close }">
                <Button variant="secondary" @click="close">Cancel</Button>
                <Button variant="primary" @click="close">Archive</Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
      <AlertDialog>
        <Button variant="secondary">Delete</Button>
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog class="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
                <AlertDialog.Heading>Delete project permanently?</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>This action cannot be undone. This will permanently delete the project and remove all associated data.</AlertDialog.Body>
              <AlertDialog.Footer v-slot="{ close }">
                <Button variant="secondary" @click="close">Cancel</Button>
                <Button variant="danger" @click="close">Delete</Button>
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
