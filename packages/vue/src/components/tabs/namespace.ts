// Compound namespace: mirrors the React dot-notation API
// (Tabs.List, Tabs.Indicator, ...). Requires <script setup>; the
// options-API `components` option cannot resolve dotted tags.
import Tab from './Tab.vue'
import TabIndicator from './TabIndicator.vue'
import TabList from './TabList.vue'
import TabPanel from './TabPanel.vue'
import TabSeparator from './TabSeparator.vue'
import Tabs from './Tabs.vue'

type TabsCompound = typeof Tabs & {
  Indicator: typeof TabIndicator
  List: typeof TabList
  Panel: typeof TabPanel
  Root: typeof Tabs
  Separator: typeof TabSeparator
  Tab: typeof Tab
}

export const TabsNamespace: TabsCompound = Object.assign(Tabs, {
  Indicator: TabIndicator,
  List: TabList,
  Panel: TabPanel,
  Root: Tabs,
  Separator: TabSeparator,
  Tab,
})
