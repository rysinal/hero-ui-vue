import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './styles.css'
import '../../../../packages/styles/src/styles.css'
import './custom.css'
import { AntDesignContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('demo-preview', AntDesignContainer)
  }
} satisfies Theme
