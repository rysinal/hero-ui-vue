---
layout: page
---

<script setup lang="ts">
import AppleIphoneDisclosureShowcase from '../demos/showcase-apple-iphone-disclosure.vue'
import ShowcaseDetailShell from '../demos/showcase-detail-shell.vue'

const components = [
  { href: '/components/disclosure.html', label: 'Disclosure' },
  { href: '/components/button.html', label: 'Button' },
]
</script>

<ShowcaseDetailShell
  :components="components"
  selected="disclosure"
  title="Apple iPhone 17 Pro Disclosure"
>
  <AppleIphoneDisclosureShowcase />
</ShowcaseDetailShell>
