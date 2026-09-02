import type { DateValue } from '@internationalized/date'
import type { DateSegment, DateSegmentType } from './context'

export type DateGranularity = 'day' | 'hour' | 'minute' | 'second'

const PLACEHOLDERS: Partial<Record<DateSegmentType, string>> = {
  day: 'dd',
  dayPeriod: 'AM',
  hour: 'hh',
  minute: 'mm',
  month: 'mm',
  second: 'ss',
  year: 'yyyy',
}

const pad = (value: number, length: number) => String(value).padStart(length, '0')

/**
 * Splits a date into the editable parts plus the literals between them, using
 * the locale's own field order so day/month land the right way round.
 */
export function buildSegments(
  value: DateValue | null,
  locale: string,
  granularity: DateGranularity = 'day',
  hourCycle: 12 | 24 = 12,
): DateSegment[] {
  const withTime = granularity !== 'day'

  const formatter = new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    ...(withTime
      ? { hour: '2-digit', hour12: hourCycle === 12, minute: '2-digit' }
      : {}),
    ...(granularity === 'second' ? { second: '2-digit' } : {}),
  })

  // Format a reference date purely to learn the locale's part order.
  const reference = value ?? { day: 1, month: 1, year: 2000 }
  const parts = formatter.formatToParts(
    new Date(Date.UTC(reference.year, reference.month - 1, reference.day, 12, 0, 0)),
  )

  const readValue = (type: DateSegmentType): number | undefined => {
    if (!value) return undefined
    switch (type) {
      case 'year':
        return value.year
      case 'month':
        return value.month
      case 'day':
        return value.day
      case 'hour':
        return (value as { hour?: number }).hour
      case 'minute':
        return (value as { minute?: number }).minute
      case 'second':
        return (value as { second?: number }).second
      default:
        return undefined
    }
  }

  const rangeFor = (type: DateSegmentType) => {
    switch (type) {
      case 'year':
        return { maxValue: 9999, minValue: 1 }
      case 'month':
        return { maxValue: 12, minValue: 1 }
      case 'day':
        return { maxValue: 31, minValue: 1 }
      case 'hour':
        return hourCycle === 12 ? { maxValue: 12, minValue: 1 } : { maxValue: 23, minValue: 0 }
      case 'minute':
      case 'second':
        return { maxValue: 59, minValue: 0 }
      default:
        return {}
    }
  }

  const widthFor = (type: DateSegmentType) => (type === 'year' ? 4 : 2)

  return parts
    .filter((part) => part.type !== 'dayPeriod' || hourCycle === 12)
    .map((part) => {
      const type = part.type as DateSegmentType

      if (type === 'literal') {
        return { isEditable: false, isPlaceholder: false, text: part.value, type }
      }

      if (type === 'dayPeriod') {
        return {
          isEditable: true,
          isPlaceholder: value === null,
          text: value ? part.value : PLACEHOLDERS.dayPeriod!,
          type,
        }
      }

      const current = readValue(type)
      const isPlaceholder = current === undefined

      return {
        ...rangeFor(type),
        isEditable: true,
        isPlaceholder,
        text: isPlaceholder ? (PLACEHOLDERS[type] ?? part.value) : pad(current, widthFor(type)),
        type,
        value: current,
      }
    })
}
