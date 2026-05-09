---
layout: page
---

<script setup lang="ts">
import AppleIphoneCameraZoomShowcase from '../demos/showcase-apple-iphone-camera-zoom.vue'
import ShowcaseDetailShell from '../demos/showcase-detail-shell.vue'
import sourceCode from '../demos/showcase-apple-iphone-camera-zoom.vue?raw'

const components = [
  { href: '/components/tabs.html', label: 'Tabs' },
]
</script>

<ShowcaseDetailShell
  :components="components"
  selected="camera"
  :source-code="sourceCode"
  source-label="showcase-apple-iphone-camera-zoom.vue"
  title="Apple iPhone 17 Pro Camera Zoom"
>
  <AppleIphoneCameraZoomShowcase />
</ShowcaseDetailShell>
