<script setup lang="ts">
import { Button } from '../../button'
import { AlertDialog } from '../index'
</script>

<template>
  <AlertDialog>
    <Button variant="secondary">Open</Button>
    <AlertDialog.Backdrop>
      <AlertDialog.Container>
        <AlertDialog.Dialog>
          <AlertDialog.Heading>Are you sure?</AlertDialog.Heading>
        </AlertDialog.Dialog>
      </AlertDialog.Container>
    </AlertDialog.Backdrop>
  </AlertDialog>
</template>
