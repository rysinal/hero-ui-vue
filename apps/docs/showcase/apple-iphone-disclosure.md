---
layout: page
---

<script setup lang="ts">
import AppleIphoneDisclosureShowcase from '../demos/showcase-apple-iphone-disclosure.vue'
import ShowcaseDetailShell from '../demos/showcase-detail-shell.vue'
import sourceCode from '../demos/showcase-apple-iphone-disclosure.vue?raw'

const components = [
  { href: '/components/disclosure.html', label: 'Disclosure' },
  { href: '/components/button.html', label: 'Button' },
]
</script>

<ShowcaseDetailShell
  :components="components"
  selected="disclosure"
  :source-code="sourceCode"
  source-label="showcase-apple-iphone-disclosure.vue"
  title="Apple iPhone 17 Pro Disclosure"
>
  <AppleIphoneDisclosureShowcase />
</ShowcaseDetailShell>
