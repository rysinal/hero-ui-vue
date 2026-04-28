import { cx } from 'tailwind-variants'

export function composeTwClassName<T extends Record<string, any>>(
  className: string | ((v: T) => string) | undefined,
  tailwind?: string | ((v: T) => string | undefined),
): string | ((v: T) => string) {
  if (!tailwind) {
    return className ?? ''
  }

  if (typeof className === 'function' || typeof tailwind === 'function') {
    return (renderProps: T): string => {
      const tw = typeof tailwind === 'function' ? (tailwind(renderProps) ?? '') : (tailwind ?? '')
      const cls = typeof className === 'function' ? (className(renderProps) ?? '') : (className ?? '')

      return cx(tw, cls) || ''
    }
  }

  return cx(tailwind, className) || ''
}

export const composeSlotClassName = (
  slotFn: ((args?: { className?: string; [key: string]: any }) => string) | undefined,
  className?: string,
  variants?: Record<string, any>,
): string | undefined => {
  return typeof slotFn === 'function' ? slotFn({ ...(variants ?? {}), className }) : className
}
