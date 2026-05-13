import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import type { DisclosureGroupKey } from './context'

export interface UseDisclosureGroupNavigationProps {
  allowsMultipleExpanded?: MaybeRefOrGetter<boolean | undefined>
  expandedKeys: MaybeRefOrGetter<Set<DisclosureGroupKey>>
  itemIds: MaybeRefOrGetter<DisclosureGroupKey[]>
  onExpandedChange: (keys: Set<DisclosureGroupKey>) => void
}

export function useDisclosureGroupNavigation({
  allowsMultipleExpanded = false,
  expandedKeys,
  itemIds,
  onExpandedChange,
}: UseDisclosureGroupNavigationProps) {
  const currentIndex = computed(() => {
    const ids = toValue(itemIds)
    const keys = toValue(expandedKeys)
    const expandedItems = ids.filter(id => keys.has(id))
    const currentItem = expandedItems[0] ?? ids[0]

    return currentItem === undefined ? -1 : ids.indexOf(currentItem)
  })

  const isPrevDisabled = computed(() => currentIndex.value <= 0)
  const isNextDisabled = computed(() => {
    const ids = toValue(itemIds)

    return currentIndex.value >= ids.length - 1
  })

  const navigateTo = (index: number) => {
    const ids = toValue(itemIds)
    const nextId = ids[index]

    if (nextId === undefined) return

    if (toValue(allowsMultipleExpanded)) {
      const nextKeys = new Set(toValue(expandedKeys))

      nextKeys.add(nextId)
      onExpandedChange(nextKeys)
      return
    }

    onExpandedChange(new Set([nextId]))
  }

  const onPrevious = () => {
    if (isPrevDisabled.value) return
    navigateTo(currentIndex.value - 1)
  }

  const onNext = () => {
    if (isNextDisabled.value) return
    navigateTo(currentIndex.value + 1)
  }

  return {
    currentIndex,
    isNextDisabled,
    isPrevDisabled,
    onNext,
    onPrevious,
  }
}
