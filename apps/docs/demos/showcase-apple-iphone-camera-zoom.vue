<template>
  <section class="apple-camera-showcase">
    <div class="apple-camera-showcase__stage">
      <div class="apple-camera-showcase__image-frame">
        <img
          v-for="item in zoomItems"
          :key="item.value"
          :alt="`iPhone camera at ${item.label}`"
          class="apple-camera-showcase__image"
          :data-selected="selectedZoom === item.value ? 'true' : undefined"
          :src="item.imgSrc"
        >
      </div>

      <Tabs
        v-model:value="selectedZoom"
        class="apple-camera-showcase__tabs"
        default-value="200"
      >
        <TabList class="apple-camera-showcase__tab-list" aria-label="Camera zoom options">
          <Tab
            v-for="item in zoomItems"
            :key="item.value"
            class="apple-camera-showcase__tab"
            :value="item.value"
          >
            {{ item.label }}
          </Tab>
        </TabList>
      </Tabs>

      <div class="apple-camera-showcase__zoom-label">
        <p
          v-for="item in zoomItems"
          :key="item.value"
          :data-selected="selectedZoom === item.value ? 'true' : undefined"
        >
          {{ item.zoomText }}
        </p>
      </div>

      <footer class="apple-camera-showcase__footer">
        <a href="https://www.apple.com/iphone-17-pro/" rel="noopener noreferrer" target="_blank">
          Showcase based on Apple's iPhone 17 Pro camera zoom showcase
        </a>
      </footer>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Tab, TabList, Tabs } from '@heroui-vue/vue'

const zoomItems = [
  {
    imgSrc: 'https://www.apple.com/v/iphone-17-pro/a/images/overview/cameras/zoom/200mm__c8kya18imsqe_large_2x.jpg',
    label: '200 mm',
    value: '200',
    zoomText: '8x',
  },
  {
    imgSrc: 'https://www.apple.com/v/iphone-17-pro/a/images/overview/cameras/zoom/100mm__cykxcenbhvue_large_2x.jpg',
    label: '100 mm',
    value: '100',
    zoomText: '4x',
  },
  {
    imgSrc: 'https://www.apple.com/v/iphone-17-pro/a/images/overview/cameras/zoom/48mm__bmrwps1q6w76_large_2x.jpg',
    label: '48 mm',
    value: '48',
    zoomText: '2x',
  },
  {
    imgSrc: 'https://www.apple.com/v/iphone-17-pro/a/images/overview/cameras/zoom/35mm__k375wbkrjp2e_large_2x.jpg',
    label: '35 mm',
    value: '35',
    zoomText: '1.5x',
  },
  {
    imgSrc: 'https://www.apple.com/v/iphone-17-pro/a/images/overview/cameras/zoom/28mm__fylmxo06jq6i_large_2x.jpg',
    label: '28 mm',
    value: '28',
    zoomText: '1.2x',
  },
  {
    imgSrc: 'https://www.apple.com/v/iphone-17-pro/a/images/overview/cameras/zoom/24mm__e54cxtdkdrwy_large_2x.jpg',
    label: '24 mm',
    value: '24',
    zoomText: '1x',
  },
  {
    imgSrc: 'https://www.apple.com/v/iphone-17-pro/a/images/overview/cameras/zoom/13mm__dzafu9h1kaye_large_2x.jpg',
    label: '13 mm',
    value: '13',
    zoomText: '0.5x',
  },
  {
    imgSrc: 'https://www.apple.com/v/iphone-17-pro/a/images/overview/cameras/zoom/macro__bb7oud7ri2o2_large_2x.jpg',
    label: 'Macro',
    value: 'macro',
    zoomText: '0.2x',
  },
] as const

const selectedZoom = ref('200')
</script>

<style lang="less">
.apple-camera-showcase {
  width: 100%;
  min-height: min(760px, calc(100vh - 8rem));
  background: #000;
  color: #f5f5f7;
}

.apple-camera-showcase__stage {
  display: flex;
  min-height: inherit;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.apple-camera-showcase__image-frame {
  position: relative;
  width: min(840px, 100%);
  aspect-ratio: 7 / 5;
}

.apple-camera-showcase__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition:
    opacity 800ms ease-in-out 200ms,
    visibility 800ms ease-in-out 200ms;
  visibility: hidden;
}

.apple-camera-showcase__image[data-selected="true"] {
  opacity: 1;
  transition-delay: 0ms;
  visibility: visible;
}

.apple-camera-showcase__tabs {
  width: 100%;
  display: flex;
  justify-content: center;
}

.apple-camera-showcase__tab-list {
  scrollbar-width: none;
  display: flex;
  width: fit-content;
  max-width: 100%;
  overflow-x: auto;
  border-radius: 999px;
  background: rgb(42 42 45 / 88%);
  padding: 0.25rem;
  margin: 1.5rem 0 0;
  gap: 0;
}

.apple-camera-showcase__tab-list::-webkit-scrollbar {
  display: none;
}

.apple-camera-showcase__tab {
  height: 2.25rem;
  width: fit-content;
  border-radius: 999px;
  color: rgb(245 245 247 / 65%);
  padding: 0 1rem;
  font-size: 0.875rem;
  font-weight: 400;
  opacity: 0.8;
}

.apple-camera-showcase__tab:hover,
.apple-camera-showcase__tab[data-hovered="true"] {
  opacity: 1;
}

.apple-camera-showcase__tab[data-selected="true"] {
  background: #fff;
  color: #000;
  opacity: 1;
}

.apple-camera-showcase__zoom-label {
  position: relative;
  width: 2.5rem;
  height: 2.5rem;
  margin-top: 1rem;
}

.apple-camera-showcase__zoom-label p {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0;
  color: #f5f5f7;
  font-size: 1.3125rem;
  font-weight: 500;
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.75);
  transition:
    opacity 300ms ease-in-out,
    transform 300ms cubic-bezier(0.33, 1, 0.68, 1);
}

.apple-camera-showcase__zoom-label p[data-selected="true"] {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
  transition-delay: 200ms;
}

.apple-camera-showcase__footer {
  margin-top: 1rem;
  width: 100%;
  padding: 0 1rem;
  text-align: center;
}

.apple-camera-showcase__footer a {
  color: rgb(245 245 247 / 45%);
  font-size: 0.875rem;
  text-decoration: none;
}

.apple-camera-showcase__footer a:hover {
  color: rgb(245 245 247 / 70%);
}

@media (max-width: 760px) {
  .apple-camera-showcase {
    min-height: 680px;
  }

  .apple-camera-showcase__stage {
    padding: 1rem;
  }

  .apple-camera-showcase__tab {
    height: 2rem;
    padding: 0 0.75rem;
    font-size: 0.75rem;
  }
}
</style>
