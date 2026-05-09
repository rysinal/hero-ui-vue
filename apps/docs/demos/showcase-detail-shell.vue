<template>
  <div class="showcase-detail-page">
    <header class="showcase-detail-page__header">
      <a class="showcase-detail-page__icon-button" :href="returnHref" :aria-label="backLabel">
        <svg aria-hidden="true" viewBox="0 0 20 20">
          <path d="M12.5 4.5 7 10l5.5 5.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" />
        </svg>
      </a>
      <span class="showcase-detail-page__brand">HeroUI Vue</span>
      <a class="showcase-detail-page__icon-button" :href="returnHref" aria-label="Close showcase">
        <svg aria-hidden="true" viewBox="0 0 20 20">
          <path d="m5.5 5.5 9 9M14.5 5.5l-9 9" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.8" />
        </svg>
      </a>
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
  </div>
</template>

<script setup lang="ts">
interface ComponentLink {
  href: string
  label: string
}

interface ShowcaseDetailShellProps {
  backLabel?: string
  components: ComponentLink[]
  returnHref?: string
  selected: 'disclosure' | 'camera'
  title: string
}

withDefaults(defineProps<ShowcaseDetailShellProps>(), {
  backLabel: 'Back to Disclosure',
  returnHref: '/components/disclosure.html',
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
.showcase-detail-page {
  min-height: calc(100vh - var(--vp-nav-height, 64px));
  width: 100%;
  overflow: hidden;
  background: var(--color-background);
  color: var(--color-foreground);
}

.showcase-detail-page__header {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: color-mix(in oklab, var(--color-background) 70%, transparent);
  backdrop-filter: blur(16px);
}

.showcase-detail-page__brand {
  color: color-mix(in oklab, var(--color-foreground) 20%, transparent);
  font-weight: 700;
}

.showcase-detail-page__icon-button {
  display: inline-flex;
  width: 2.5rem;
  height: 2.5rem;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: var(--color-default);
  color: color-mix(in oklab, var(--color-foreground) 70%, transparent);
  text-decoration: none;
  transition:
    background-color 180ms var(--ease-out),
    color 180ms var(--ease-out);
}

.showcase-detail-page__icon-button:hover {
  background: var(--color-default-hover);
  color: var(--color-foreground);
}

.showcase-detail-page__icon-button svg {
  width: 1.25rem;
  height: 1.25rem;
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
  background: color-mix(in oklab, var(--color-background) 70%, transparent);
  color: color-mix(in oklab, var(--color-muted-foreground) 80%, transparent);
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
  background: var(--color-default);
  color: var(--color-muted-foreground);
  padding: 0.375rem 0.625rem;
  text-decoration: none;
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
}
</style>
