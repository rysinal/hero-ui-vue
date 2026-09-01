// Compound namespace: mirrors the React dot-notation API
// (Card.Header, Modal.Dialog, ...). Requires <script setup>; the
// options-API `components` option cannot resolve dotted tags.
import Accordion from './Accordion.vue'
import AccordionBody from './AccordionBody.vue'
import AccordionHeading from './AccordionHeading.vue'
import AccordionIndicator from './AccordionIndicator.vue'
import AccordionItem from './AccordionItem.vue'
import AccordionPanel from './AccordionPanel.vue'
import AccordionTrigger from './AccordionTrigger.vue'

type AccordionCompound = typeof Accordion & {
  Body: typeof AccordionBody
  Heading: typeof AccordionHeading
  Indicator: typeof AccordionIndicator
  Item: typeof AccordionItem
  Panel: typeof AccordionPanel
  Root: typeof Accordion
  Trigger: typeof AccordionTrigger
}

export const AccordionNamespace: AccordionCompound = Object.assign(Accordion, {
  Body: AccordionBody,
  Heading: AccordionHeading,
  Indicator: AccordionIndicator,
  Item: AccordionItem,
  Panel: AccordionPanel,
  Root: Accordion,
  Trigger: AccordionTrigger,
})
