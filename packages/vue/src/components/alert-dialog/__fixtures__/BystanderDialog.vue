<script setup lang="ts">
import { AlertDialog } from '../index'
</script>

<template>
  <AlertDialog>
    <span data-test="bystander">not a trigger</span>
    <AlertDialog.Backdrop>
      <AlertDialog.Container>
        <AlertDialog.Dialog>
          <AlertDialog.Heading>Are you sure?</AlertDialog.Heading>
        </AlertDialog.Dialog>
      </AlertDialog.Container>
    </AlertDialog.Backdrop>
  </AlertDialog>
</template>
