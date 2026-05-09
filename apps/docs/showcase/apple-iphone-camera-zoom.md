---
layout: page
---

<script setup lang="ts">
import AppleIphoneCameraZoomShowcase from '../demos/showcase-apple-iphone-camera-zoom.vue'
import ShowcaseDetailShell from '../demos/showcase-detail-shell.vue'

const components = [
  { href: '/components/tabs.html', label: 'Tabs' },
]
</script>

<ShowcaseDetailShell
  :components="components"
  selected="camera"
  title="Apple iPhone 17 Pro Camera Zoom"
>
  <AppleIphoneCameraZoomShowcase />
</ShowcaseDetailShell>
