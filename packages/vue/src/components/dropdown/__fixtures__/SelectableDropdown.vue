<script setup lang="ts">
import { Button } from '../../button'
import { Dropdown } from '../index'
</script>

<template>
  <Dropdown :default-selected-keys="['list']" default-open selection-mode="single">
    <Dropdown.Trigger><Button>View</Button></Dropdown.Trigger>
    <Dropdown.Popover>
      <Dropdown.Menu>
        <Dropdown.Item value="list">
          List
          <Dropdown.ItemIndicator />
        </Dropdown.Item>
        <Dropdown.Item value="grid">
          Grid
          <Dropdown.ItemIndicator />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown.Popover>
  </Dropdown>
</template>
