/* global document */
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import SortableTable from './__fixtures__/SortableTable.vue'

enableAutoUnmount(afterEach)

describe('Table', () => {
  it('renders every part and resolves the dotted names', async () => {
    const wrapper = mount(SortableTable, { attachTo: document.body })
    await nextTick()

    expect(wrapper.html()).not.toMatch(/<table\.[a-z]+/i)
    expect(wrapper.find('[data-slot="table-root"]').exists()).toBe(true)
    expect(wrapper.findAll('[data-slot="table-column"]')).toHaveLength(2)
    expect(wrapper.findAll('[data-slot="table-row"]')).toHaveLength(3)
    expect(wrapper.findAll('[data-slot="table-cell"]')).toHaveLength(6)
  })

  it('marks a sortable column so table.css can style it', async () => {
    const wrapper = mount(SortableTable, { attachTo: document.body })
    await nextTick()

    const [name, role] = wrapper.findAll('[data-slot="table-column"]')
    expect(name?.attributes('data-allows-sorting')).toBe('true')
    expect(name?.attributes('aria-sort')).toBe('none')
    expect(role?.attributes('data-allows-sorting')).toBeUndefined()
  })

  it('sorts ascending, then flips direction on a second click', async () => {
    const wrapper = mount(SortableTable, { attachTo: document.body })
    await nextTick()

    const nameColumn = wrapper.findAll('[data-slot="table-column"]')[0]!
    await nameColumn.trigger('click')
    expect(nameColumn.attributes('aria-sort')).toBe('ascending')
    expect(wrapper.findAll('[data-slot="table-row"]')[0]?.text()).toContain('Alan')

    await nameColumn.trigger('click')
    expect(nameColumn.attributes('aria-sort')).toBe('descending')
    expect(wrapper.findAll('[data-slot="table-row"]')[0]?.text()).toContain('Zoe')
  })

  it('reflects the default selection and toggles a row', async () => {
    const wrapper = mount(SortableTable, { attachTo: document.body })
    await nextTick()

    const rows = wrapper.findAll('[data-slot="table-row"]')
    // Alan is id 2, selected by default.
    const alan = rows.find((row) => row.text().includes('Alan'))!
    expect(alan.attributes('data-selected')).toBe('true')

    const kate = rows.find((row) => row.text().includes('Kate'))!
    await kate.trigger('click')
    expect(kate.attributes('data-selected')).toBe('true')

    await kate.trigger('click')
    expect(kate.attributes('data-selected')).toBeUndefined()
  })
})
