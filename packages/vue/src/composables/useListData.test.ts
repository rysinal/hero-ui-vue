import { describe, expect, it } from 'vitest'
import { useListData } from './useListData'

interface User {
  id: string
  name: string
}

const users: User[] = [
  { id: 'a', name: 'Ann' },
  { id: 'b', name: 'Bob' },
  { id: 'c', name: 'Cal' },
]

const createList = () => useListData({ initialItems: users, getKey: (item: User) => item.id })

const names = (list: ReturnType<typeof createList>) => list.items.value.map((item) => item.name)

describe('useListData', () => {
  it('exposes the initial items', () => {
    expect(names(createList())).toEqual(['Ann', 'Bob', 'Cal'])
  })

  it('defaults getKey to the item id', () => {
    const list = useListData({ initialItems: users })

    expect(list.getItem('b')?.name).toBe('Bob')
  })

  it('appends and prepends', () => {
    const list = createList()

    list.append({ id: 'd', name: 'Dee' })
    list.prepend({ id: 'z', name: 'Zed' })

    expect(names(list)).toEqual(['Zed', 'Ann', 'Bob', 'Cal', 'Dee'])
  })

  it('inserts at an index and around a key', () => {
    const list = createList()

    list.insert(1, { id: 'x', name: 'Xan' })
    list.insertBefore('a', { id: 'y', name: 'Yui' })
    list.insertAfter('c', { id: 'w', name: 'Wes' })

    expect(names(list)).toEqual(['Yui', 'Ann', 'Xan', 'Bob', 'Cal', 'Wes'])
  })

  it('removes by key', () => {
    const list = createList()

    list.remove('b')

    expect(names(list)).toEqual(['Ann', 'Cal'])
  })

  it('updates an item by value and by updater', () => {
    const list = createList()

    list.update('a', { id: 'a', name: 'Ann Updated' })
    list.update('b', (previous) => ({ ...previous, name: `${previous.name}!` }))

    expect(names(list)).toEqual(['Ann Updated', 'Bob!', 'Cal'])
  })

  it('does not mutate the original array', () => {
    const original = [...users]
    const list = createList()

    list.append({ id: 'd', name: 'Dee' })
    list.remove('a')

    expect(users).toEqual(original)
  })

  it('moves an item to an index', () => {
    const list = createList()

    list.move('a', 2)

    expect(names(list)).toEqual(['Bob', 'Cal', 'Ann'])
  })

  it('moves keys before and after a target', () => {
    const list = createList()

    list.moveBefore('a', ['c'])
    expect(names(list)).toEqual(['Cal', 'Ann', 'Bob'])

    list.moveAfter('bogus', ['a'])
    expect(names(list)).toEqual(['Cal', 'Ann', 'Bob'])
  })

  it('tracks selection and drops keys removed from the list', () => {
    const list = createList()

    list.setSelectedKeys(new Set(['a', 'b']))
    expect(list.selectedKeys.value).toEqual(new Set(['a', 'b']))

    list.remove('a')
    expect(list.selectedKeys.value).toEqual(new Set(['b']))
  })

  it('adds and removes keys from the selection', () => {
    const list = createList()

    list.addKeysToSelection(new Set(['a']))
    list.addKeysToSelection(new Set(['c']))
    expect(list.selectedKeys.value).toEqual(new Set(['a', 'c']))

    list.removeKeysFromSelection(new Set(['a']))
    expect(list.selectedKeys.value).toEqual(new Set(['c']))
  })

  it('supports the "all" selection', () => {
    const list = useListData({
      getKey: (item: User) => item.id,
      initialItems: users,
      initialSelectedKeys: 'all',
    })

    expect(list.selectedKeys.value).toBe('all')

    list.addKeysToSelection(new Set(['a']))
    expect(list.selectedKeys.value).toBe('all')
  })

  it('removes the selected items', () => {
    const list = createList()

    list.setSelectedKeys(new Set(['a', 'c']))
    list.removeSelectedItems()

    expect(names(list)).toEqual(['Bob'])
    expect(list.selectedKeys.value).toEqual(new Set())
  })

  it('filters items by filterText when a filter is given', () => {
    const list = useListData({
      filter: (item: User, text: string) => item.name.toLowerCase().includes(text.toLowerCase()),
      getKey: (item: User) => item.id,
      initialItems: users,
    })

    list.setFilterText('a')

    expect(names(list)).toEqual(['Ann', 'Cal'])
    // The unfiltered collection stays intact.
    expect(list.getItem('b')?.name).toBe('Bob')
  })

  it('honours initialFilterText', () => {
    const list = useListData({
      filter: (item: User, text: string) => item.name.toLowerCase().includes(text.toLowerCase()),
      initialFilterText: 'bo',
      initialItems: users,
    })

    expect(names(list)).toEqual(['Bob'])
  })
})
