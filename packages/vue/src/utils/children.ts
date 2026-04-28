import type { VNode } from 'vue'
import { Comment, Fragment, Text, isVNode } from 'vue'

export function getValidChildren(children: VNode[]): VNode[] {
  return children.filter((child) => {
    if (!isVNode(child)) return false
    if (child.type === Comment) return false
    if (child.type === Text && !child.children?.toString().trim()) {
      return false
    }
    return true
  })
}

export function pickChildren<T extends VNode>(
  children: VNode[] | undefined,
  targetType: any,
): [VNode[] | undefined, T[] | undefined] {
  if (!children) return [undefined, undefined]

  const target: T[] = []
  const withoutTarget: VNode[] = []

  children.forEach((child) => {
    if (!isVNode(child)) {
      withoutTarget.push(child)
      return
    }

    if (child.type === Fragment && Array.isArray(child.children)) {
      const [remaining, picked] = pickChildren<T>(child.children as VNode[], targetType)
      if (remaining) withoutTarget.push(...remaining)
      if (picked) target.push(...picked)
      return
    }

    if (child.type === targetType) {
      target.push(child as T)
    } else {
      withoutTarget.push(child)
    }
  })

  return [
    withoutTarget.length > 0 ? withoutTarget : undefined,
    target.length > 0 ? target : undefined,
  ]
}
