import { computed, ref, type ComputedRef, type Ref } from 'vue'

export type Key = string | number
export type Selection = 'all' | Set<Key>

export interface ListOptions<T> {
  /** Items the list starts with. */
  initialItems?: T[]
  /** Keys selected initially, or "all". */
  initialSelectedKeys?: 'all' | Iterable<Key>
  /** Filter text the list starts with. */
  initialFilterText?: string
  /** Derives an item's key. Defaults to `item.id`. */
  getKey?: (item: T) => Key
  /** Predicate used to filter items against `filterText`. */
  filter?: (item: T, filterText: string) => boolean
}

export interface ListData<T> {
  /** Items after filtering. */
  items: ComputedRef<T[]>
  /** Currently selected keys. */
  selectedKeys: Ref<Selection>
  setSelectedKeys: (keys: Selection) => void
  addKeysToSelection: (keys: Selection) => void
  removeKeysFromSelection: (keys: Selection) => void
  /** Text used to filter the list. */
  filterText: Ref<string>
  setFilterText: (filterText: string) => void
  /** Looks an item up by key, ignoring the current filter. */
  getItem: (key: Key) => T | undefined
  insert: (index: number, ...values: T[]) => void
  insertBefore: (key: Key, ...values: T[]) => void
  insertAfter: (key: Key, ...values: T[]) => void
  append: (...values: T[]) => void
  prepend: (...values: T[]) => void
  remove: (...keys: Key[]) => void
  removeSelectedItems: () => void
  move: (key: Key, toIndex: number) => void
  moveBefore: (key: Key, keys: Iterable<Key>) => void
  moveAfter: (key: Key, keys: Iterable<Key>) => void
  update: (key: Key, newValue: T | ((previous: T) => T)) => void
}

const defaultGetKey = <T,>(item: T): Key => (item as { id: Key }).id

/**
 * Manages an immutable list with selection and filtering.
 *
 * Every mutation produces a new array rather than mutating in place, so the
 * caller's original data is never touched.
 *
 * @example
 * ```ts
 * const list = useListData({
 *   initialItems: users,
 *   getKey: (user) => user.id,
 *   filter: (user, text) => user.name.includes(text),
 * })
 *
 * list.append({ id: '4', name: 'Dee' })
 * list.remove('1')
 * ```
 */
export function useListData<T>(options: ListOptions<T> = {}): ListData<T> {
  const {
    filter,
    getKey = defaultGetKey<T>,
    initialFilterText = '',
    initialItems = [],
    initialSelectedKeys,
  } = options

  const allItems = ref<T[]>([...initialItems]) as Ref<T[]>
  const filterText = ref(initialFilterText)
  const selectedKeys = ref<Selection>(
    initialSelectedKeys === 'all'
      ? 'all'
      : new Set<Key>(initialSelectedKeys ? [...initialSelectedKeys] : []),
  ) as Ref<Selection>

  const items = computed(() => {
    if (!filter || filterText.value === '') return allItems.value
    return allItems.value.filter((item) => filter(item, filterText.value))
  })

  const indexOfKey = (key: Key) => allItems.value.findIndex((item) => getKey(item) === key)

  const setItems = (next: T[]) => {
    allItems.value = next
  }

  /** Drops selected keys that no longer exist after a removal. */
  const pruneSelection = (next: T[]) => {
    if (selectedKeys.value === 'all') return

    const remaining = new Set(next.map((item) => getKey(item)))
    const pruned = new Set<Key>()
    for (const key of selectedKeys.value) {
      if (remaining.has(key)) pruned.add(key)
    }
    selectedKeys.value = pruned
  }

  const insert = (index: number, ...values: T[]) => {
    const next = [...allItems.value]
    next.splice(index, 0, ...values)
    setItems(next)
  }

  const remove = (...keys: Key[]) => {
    const removing = new Set(keys)
    const next = allItems.value.filter((item) => !removing.has(getKey(item)))
    setItems(next)
    pruneSelection(next)
  }

  const moveKeysTo = (targetKey: Key, keys: Iterable<Key>, offset: 0 | 1) => {
    const moving = new Set([...keys])
    if (moving.size === 0) return

    const movedItems = allItems.value.filter((item) => moving.has(getKey(item)))
    if (movedItems.length === 0) return

    const remaining = allItems.value.filter((item) => !moving.has(getKey(item)))
    const targetIndex = remaining.findIndex((item) => getKey(item) === targetKey)
    if (targetIndex === -1) return

    const next = [...remaining]
    next.splice(targetIndex + offset, 0, ...movedItems)
    setItems(next)
  }

  return {
    addKeysToSelection: (keys) => {
      if (keys === 'all' || selectedKeys.value === 'all') {
        selectedKeys.value = 'all'
        return
      }
      selectedKeys.value = new Set([...selectedKeys.value, ...keys])
    },

    append: (...values) => insert(allItems.value.length, ...values),

    filterText,

    getItem: (key) => allItems.value.find((item) => getKey(item) === key),

    insert,

    insertAfter: (key, ...values) => {
      const index = indexOfKey(key)
      if (index === -1) return
      insert(index + 1, ...values)
    },

    insertBefore: (key, ...values) => {
      const index = indexOfKey(key)
      if (index === -1) return
      insert(index, ...values)
    },

    items,

    move: (key, toIndex) => {
      const index = indexOfKey(key)
      if (index === -1) return

      const next = [...allItems.value]
      const [moved] = next.splice(index, 1)
      if (moved === undefined) return
      next.splice(toIndex, 0, moved)
      setItems(next)
    },

    moveAfter: (key, keys) => moveKeysTo(key, keys, 1),
    moveBefore: (key, keys) => moveKeysTo(key, keys, 0),

    prepend: (...values) => insert(0, ...values),

    remove,

    removeKeysFromSelection: (keys) => {
      if (keys === 'all') {
        selectedKeys.value = new Set()
        return
      }
      if (selectedKeys.value === 'all') return

      const removing = new Set([...keys])
      const next = new Set<Key>()
      for (const key of selectedKeys.value) {
        if (!removing.has(key)) next.add(key)
      }
      selectedKeys.value = next
    },

    removeSelectedItems: () => {
      if (selectedKeys.value === 'all') {
        setItems([])
        selectedKeys.value = new Set()
        return
      }
      remove(...selectedKeys.value)
    },

    selectedKeys,

    setFilterText: (nextFilterText) => {
      filterText.value = nextFilterText
    },

    setSelectedKeys: (keys) => {
      selectedKeys.value = keys
    },

    update: (key, newValue) => {
      const index = indexOfKey(key)
      if (index === -1) return

      const previous = allItems.value[index]!
      const next = [...allItems.value]
      next[index] =
        typeof newValue === 'function' ? (newValue as (previous: T) => T)(previous) : newValue
      setItems(next)
    },
  }
}
