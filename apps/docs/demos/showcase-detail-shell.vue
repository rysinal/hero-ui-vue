<template>
  <div class="showcase-detail-page">
    <header class="showcase-detail-page__header">
      <a class="showcase-detail-page__icon-button" :href="returnHref" :aria-label="backLabel">
        <svg aria-hidden="true" viewBox="0 0 20 20">
          <path d="M12.5 4.5 7 10l5.5 5.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" />
        </svg>
      </a>
      <span class="showcase-detail-page__brand">HeroUI Vue</span>
      <div class="showcase-detail-page__actions">
        <button
          v-if="sourceCode"
          type="button"
          class="showcase-detail-page__icon-button"
          :aria-expanded="isCodeOpen"
          aria-controls="showcase-source-panel"
          aria-label="View source code"
          @click="isCodeOpen = true"
        >
          <svg aria-hidden="true" viewBox="0 0 20 20">
            <path d="m7.5 5-5 5 5 5M12.5 5l5 5-5 5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" />
          </svg>
        </button>
        <a class="showcase-detail-page__icon-button" :href="returnHref" aria-label="Close showcase">
          <svg aria-hidden="true" viewBox="0 0 20 20">
            <path d="m5.5 5.5 9 9M14.5 5.5l-9 9" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.8" />
          </svg>
        </a>
      </div>
    </header>

    <main class="showcase-detail-page__main">
      <section class="showcase-detail-page__preview">
        <slot />
      </section>

      <aside class="showcase-detail-page__rail" aria-label="Related showcases">
        <a
          v-for="item in showcaseItems"
          :key="item.name"
          class="showcase-detail-page__rail-item"
          :class="{ 'is-selected': item.name === selected }"
          :href="`${item.href}?returnUrl=/components/disclosure`"
          :aria-label="item.title"
        >
          <video autoplay loop muted playsinline :poster="item.posterUrl">
            <source :src="item.videoUrl">
          </video>
        </a>
      </aside>
    </main>

    <footer class="showcase-detail-page__footer">
      <p>By HeroUI Core Team</p>
      <div>
        <a
          v-for="component in components"
          :key="component.href"
          :href="component.href"
        >
          {{ component.label }}
        </a>
      </div>
      <p>{{ title }}</p>
    </footer>

    <div
      v-if="sourceCode"
      class="showcase-detail-page__source-backdrop"
      :data-open="isCodeOpen ? 'true' : undefined"
      @click.self="isCodeOpen = false"
    >
      <aside
        id="showcase-source-panel"
        class="showcase-detail-page__source"
        :aria-hidden="!isCodeOpen"
      >
        <div class="showcase-detail-page__source-header">
          <div>
            <p>Source</p>
            <span>{{ sourceLabel }}</span>
          </div>
          <div class="showcase-detail-page__source-actions">
            <button type="button" @click="copySource">
              {{ copyLabel }}
            </button>
            <button type="button" aria-label="Close source code" @click="isCodeOpen = false">
              <svg aria-hidden="true" viewBox="0 0 20 20">
                <path d="m5.5 5.5 9 9M14.5 5.5l-9 9" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.8" />
              </svg>
            </button>
          </div>
        </div>
        <pre><code>{{ sourceCode }}</code></pre>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'

interface ComponentLink {
  href: string
  label: string
}

interface ShowcaseDetailShellProps {
  backLabel?: string
  components: ComponentLink[]
  returnHref?: string
  selected: 'disclosure' | 'camera'
  sourceCode?: string
  sourceLabel?: string
  title: string
}

const props = withDefaults(defineProps<ShowcaseDetailShellProps>(), {
  backLabel: 'Back to Disclosure',
  returnHref: '/components/disclosure.html',
  sourceCode: '',
  sourceLabel: 'Showcase.vue',
})

const isCodeOpen = ref(false)
const isCopied = ref(false)
const copyLabel = computed(() => (isCopied.value ? 'Copied' : 'Copy'))

let copyResetTimer: number | undefined

const copySource = async () => {
  if (!props.sourceCode) return

  await navigator.clipboard.writeText(props.sourceCode)
  isCopied.value = true

  window.clearTimeout(copyResetTimer)
  copyResetTimer = window.setTimeout(() => {
    isCopied.value = false
  }, 1600)
}

onBeforeUnmount(() => {
  window.clearTimeout(copyResetTimer)
})

const showcaseItems = [
  {
    href: '/showcase/apple-iphone-disclosure.html',
    name: 'disclosure',
    posterUrl: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/showcases/1.jpg',
    title: 'Apple iPhone 17 Pro Disclosure',
    videoUrl: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/showcases/1.mp4',
  },
  {
    href: '/showcase/apple-iphone-camera-zoom.html',
    name: 'camera',
    posterUrl: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/showcases/2.jpg',
    title: 'Apple iPhone 17 Pro Camera Zoom',
    videoUrl: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/showcases/2.mp4',
  },
] as const
</script>

<style lang="less">
body:has(.showcase-detail-page) {
  background: #030303;
}

body:has(.showcase-detail-page) .VPNav,
body:has(.showcase-detail-page) .VPFooter {
  display: none;
}

body:has(.showcase-detail-page) .VPContent,
body:has(.showcase-detail-page) .VPPage,
body:has(.showcase-detail-page) .VPDoc,
body:has(.showcase-detail-page) .vp-doc,
body:has(.showcase-detail-page) .container,
body:has(.showcase-detail-page) .content,
body:has(.showcase-detail-page) .content-container,
body:has(.showcase-detail-page) .main {
  max-width: none !important;
  margin: 0 !important;
  padding: 0 !important;
  background: #030303 !important;
}

.showcase-detail-page {
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  background:
    radial-gradient(rgb(255 255 255 / 8%) 1px, transparent 1px) 0 0 / 16px 16px,
    #030303;
  color: #f5f5f7;
}

.showcase-detail-page__header {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: rgb(0 0 0 / 70%);
  backdrop-filter: blur(16px);
}

.showcase-detail-page__brand {
  color: rgb(245 245 247 / 20%);
  font-weight: 700;
}

.showcase-detail-page__icon-button {
  display: inline-flex;
  width: 2.5rem;
  height: 2.5rem;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 0;
  background: rgb(255 255 255 / 12%);
  color: rgb(245 245 247 / 70%);
  cursor: pointer;
  font: inherit;
  text-decoration: none;
  transition:
    background-color 180ms var(--ease-out),
    color 180ms var(--ease-out);
}

.showcase-detail-page__icon-button:hover {
  background: rgb(255 255 255 / 20%);
  color: #f5f5f7;
}

.showcase-detail-page__icon-button svg {
  width: 1.25rem;
  height: 1.25rem;
}

.showcase-detail-page__actions {
  display: flex;
  gap: 0.5rem;
}

.showcase-detail-page__main {
  position: relative;
  z-index: 1;
  display: flex;
  min-height: calc(100vh - var(--vp-nav-height, 64px) - 8.75rem);
}

.showcase-detail-page__preview {
  display: flex;
  flex: 1;
  min-width: 0;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem 2rem 2rem;
}

.showcase-detail-page__preview > * {
  width: min(100%, 1160px);
}

.showcase-detail-page__rail {
  display: flex;
  width: 6rem;
  flex: 0 0 6rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgb(0 0 0 / 18%);
}

.showcase-detail-page__rail-item {
  width: 4rem;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border: 2px solid transparent;
  border-radius: 0.75rem;
  opacity: 0.72;
  transition:
    border-color 180ms var(--ease-out),
    opacity 180ms var(--ease-out),
    transform 180ms var(--ease-out);
}

.showcase-detail-page__rail-item:hover,
.showcase-detail-page__rail-item.is-selected {
  opacity: 1;
  transform: scale(1.04);
}

.showcase-detail-page__rail-item.is-selected {
  border-color: var(--color-primary);
}

.showcase-detail-page__rail-item video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.showcase-detail-page__footer {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1rem;
  align-items: center;
  padding: 1rem 1.5rem;
  background: rgb(0 0 0 / 70%);
  color: rgb(245 245 247 / 46%);
  font-size: 0.875rem;
  backdrop-filter: blur(16px);
}

.showcase-detail-page__footer p {
  margin: 0;
}

.showcase-detail-page__footer p:last-child {
  text-align: right;
}

.showcase-detail-page__footer div {
  display: flex;
  gap: 0.5rem;
}

.showcase-detail-page__footer a {
  border-radius: 999px;
  background: rgb(255 255 255 / 10%);
  color: rgb(245 245 247 / 84%);
  padding: 0.375rem 0.625rem;
  text-decoration: none;
}

.showcase-detail-page__source-backdrop {
  position: fixed;
  inset: 0;
  z-index: 10;
  display: flex;
  justify-content: flex-end;
  background: rgb(0 0 0 / 0%);
  opacity: 0;
  pointer-events: none;
  transition:
    background-color 220ms var(--ease-out),
    opacity 220ms var(--ease-out);
}

.showcase-detail-page__source-backdrop[data-open="true"] {
  background: rgb(0 0 0 / 58%);
  opacity: 1;
  pointer-events: auto;
}

.showcase-detail-page__source {
  display: flex;
  width: min(720px, 100%);
  height: 100%;
  min-width: 0;
  flex-direction: column;
  border-left: 1px solid rgb(255 255 255 / 12%);
  background: #0b0b0d;
  box-shadow: -24px 0 64px rgb(0 0 0 / 45%);
  color: #f5f5f7;
  transform: translateX(100%);
  transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
}

.showcase-detail-page__source-backdrop[data-open="true"] .showcase-detail-page__source {
  transform: translateX(0);
}

.showcase-detail-page__source-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 1px solid rgb(255 255 255 / 10%);
  padding: 1rem;
}

.showcase-detail-page__source-header p,
.showcase-detail-page__source-header span {
  margin: 0;
}

.showcase-detail-page__source-header p {
  font-weight: 700;
}

.showcase-detail-page__source-header span {
  color: rgb(245 245 247 / 48%);
  font-size: 0.8125rem;
}

.showcase-detail-page__source-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.showcase-detail-page__source-actions button {
  display: inline-flex;
  height: 2rem;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 999px;
  background: rgb(255 255 255 / 10%);
  color: rgb(245 245 247 / 84%);
  cursor: pointer;
  font: inherit;
  font-size: 0.8125rem;
  padding: 0 0.75rem;
}

.showcase-detail-page__source-actions button:hover {
  background: rgb(255 255 255 / 16%);
  color: #f5f5f7;
}

.showcase-detail-page__source-actions button:last-child {
  width: 2rem;
  padding: 0;
}

.showcase-detail-page__source-actions svg {
  width: 1rem;
  height: 1rem;
}

.showcase-detail-page__source pre {
  flex: 1;
  min-height: 0;
  overflow: auto;
  margin: 0;
  padding: 1rem;
  background: transparent;
  color: #e6edf3;
  font-size: 0.8125rem;
  line-height: 1.65;
  tab-size: 2;
  white-space: pre;
}

.showcase-detail-page__source code {
  color: inherit;
}

@media (max-width: 860px) {
  .showcase-detail-page__main {
    flex-direction: column;
  }

  .showcase-detail-page__preview {
    padding: 1rem;
  }

  .showcase-detail-page__rail {
    width: 100%;
    flex: 0 0 auto;
    flex-direction: row;
    padding: 0 1rem 1rem;
  }

  .showcase-detail-page__footer {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .showcase-detail-page__footer div {
    justify-content: center;
  }

  .showcase-detail-page__footer p:last-child {
    text-align: center;
  }

  .showcase-detail-page__source {
    width: 100%;
  }
}
</style>
