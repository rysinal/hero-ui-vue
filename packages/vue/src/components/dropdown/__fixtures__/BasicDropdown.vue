<script setup lang="ts">
import { Button } from '../../button'
import { Dropdown } from '../index'
</script>

<template>
  <Dropdown default-open>
    <Dropdown.Trigger><Button>Open</Button></Dropdown.Trigger>
    <Dropdown.Popover>
      <Dropdown.Menu>
        <Dropdown.Item value="new">New file</Dropdown.Item>
        <Dropdown.Item value="copy">Copy link</Dropdown.Item>
        <Dropdown.Item is-disabled value="edit">Edit</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown.Popover>
  </Dropdown>
</template>
