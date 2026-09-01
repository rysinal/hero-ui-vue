<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-col gap-2">
      <p class="text-sm font-medium text-muted">Separator on default surface</p>
      <Surface class="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6" variant="default">
        <h3 class="text-base font-semibold text-foreground">Surface Content</h3>
        <Separator />
        <p class="text-sm text-muted">The separator adapts to the surface background.</p>
      </Surface>
    </div>
    <div class="flex flex-col gap-2">
      <p class="text-sm font-medium text-muted">Manual override to tertiary</p>
      <Surface class="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6" variant="secondary">
        <h3 class="text-base font-semibold text-foreground">Surface Content</h3>
        <Separator variant="tertiary" />
        <p class="text-sm text-muted">An explicit variant always wins.</p>
      </Surface>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Separator, Surface } from '@rysinal/heroui-vue'
</script>
