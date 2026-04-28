import type { DateValue } from '@internationalized/date'
import { startOfYear } from '@internationalized/date'

export function getGregorianYearOffset(identifier: string): number {
  switch (identifier) {
    case 'buddhist':
      return 543
    case 'ethiopic':
    case 'ethioaa':
      return -8
    case 'coptic':
      return -284
    case 'hebrew':
      return 3760
    case 'indian':
      return -78
    case 'islamic-civil':
    case 'islamic-tbla':
    case 'islamic-umalqura':
      return -579
    case 'persian':
      return -600
    case 'roc':
    case 'japanese':
    case 'gregory':
    default:
      return 0
  }
}

export function getYearRange(start?: DateValue | null, end?: DateValue | null): DateValue[] {
  const years: DateValue[] = []

  if (!start || !end) return years

  let current = startOfYear(start)

  while (current.compare(end) <= 0) {
    years.push(current)
    current = startOfYear(current.add({ years: 1 }))
  }

  return years
}
