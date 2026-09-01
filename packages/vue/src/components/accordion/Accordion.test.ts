/* global document */
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from './index'

enableAutoUnmount(afterEach)

const createAccordion = () =>
  mount(
    {
      components: { Accordion, AccordionItem, AccordionPanel, AccordionTrigger },
      template: `
        <Accordion>
          <AccordionItem value="one">
            <AccordionTrigger>First</AccordionTrigger>
            <AccordionPanel>
              <button data-test="inside">Inside panel</button>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      `,
    },
    { attachTo: document.body },
  )

describe('Accordion collapsed panel', () => {
  it('hides collapsed content from the tab order and assistive tech', async () => {
    const wrapper = createAccordion()
    await nextTick()

    const panel = wrapper.get('[data-slot="accordion-panel"]')
    // A collapsed panel is only height:0, so its contents stay focusable and
    // are still announced unless it is explicitly inert/hidden.
    expect(panel.attributes('inert')).toBeDefined()

    wrapper.unmount()
  })

  it('exposes the content again once expanded', async () => {
    const wrapper = createAccordion()
    await wrapper.get('[data-slot="accordion-trigger"]').trigger('click')
    await nextTick()

    const panel = wrapper.get('[data-slot="accordion-panel"]')
    expect(panel.attributes('inert')).toBeUndefined()

    wrapper.unmount()
  })
})
