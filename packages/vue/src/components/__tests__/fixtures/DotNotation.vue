<script setup lang="ts">
import { Card, Modal, Select } from '../../../index'
</script>

<template>
  <div>
    <Card>
      <Card.Header>
        <Card.Title>Dotted title</Card.Title>
        <Card.Description>Dotted description</Card.Description>
      </Card.Header>
      <Card.Content>Body</Card.Content>
      <Card.Footer>Footer</Card.Footer>
    </Card>

    <Modal>
      <Modal.Trigger>Open</Modal.Trigger>
    </Modal>

    <Select>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
    </Select>
  </div>
</template>
