<template>
  <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
    <SwitchGroup>
      <Switch name="notifications" value="on">
        <Switch.Control><Switch.Thumb /></Switch.Control>
        <Switch.Content><Label class="text-sm">Notifications</Label></Switch.Content>
      </Switch>
      <Switch default-selected name="marketing" value="on">
        <Switch.Control><Switch.Thumb /></Switch.Control>
        <Switch.Content><Label class="text-sm">Marketing emails</Label></Switch.Content>
      </Switch>
    </SwitchGroup>
    <Button class="w-fit" type="submit">Submit</Button>
    <p v-if="submitted" class="text-sm text-muted">Submitted: {{ submitted }}</p>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Label, Switch, SwitchGroup } from '@rysinal/heroui-vue'

const submitted = ref('')

const handleSubmit = (event: Event) => {
  const formData = new FormData(event.target as HTMLFormElement)
  submitted.value =
    [...formData.entries()].map(([key, value]) => `${key}: ${value}`).join(', ') || 'nothing'
}
</script>
