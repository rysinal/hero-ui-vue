<template>
  <AlertDialog>
    <Button variant="secondary">Reset Password</Button>
    <AlertDialog.Backdrop>
      <AlertDialog.Container>
        <AlertDialog.Dialog class="sm:max-w-[400px]">
        <AlertDialog.CloseTrigger />
          <AlertDialog.Header>
          <AlertDialog.Icon status="warning">
            <svg class="size-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 9.9-1" />
            </svg>
          </AlertDialog.Icon>
            <AlertDialog.Heading>Reset your password?</AlertDialog.Heading>
          </AlertDialog.Header>
          <AlertDialog.Body>We'll send a password reset link to your email address.</AlertDialog.Body>
          <AlertDialog.Footer v-slot="{ close }">
            <Button variant="secondary" @click="close">Cancel</Button>
            <Button variant="primary" @click="close">Send Link</Button>
          </AlertDialog.Footer>
        </AlertDialog.Dialog>
      </AlertDialog.Container>
    </AlertDialog.Backdrop>
  </AlertDialog>
</template>

<script setup lang="ts">
import { AlertDialog, Button } from '@rysinal/heroui-vue'
</script>
