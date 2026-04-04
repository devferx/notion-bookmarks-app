import type { NotionPageRow } from '@/core/infrastructure/notion/interfaces'

export function extractRichText(
  items?: Array<{ plain_text?: string }>,
): string {
  if (!items || items.length === 0) return ''

  return items
    .map((item) => item.plain_text ?? '')
    .join('')
    .trim()
}

export function isNotionPageRow(value: unknown): value is NotionPageRow {
  if (typeof value !== 'object' || value === null) return false

  const candidate = value as {
    object?: unknown
    id?: unknown
    created_time?: unknown
    properties?: unknown
  }

  return (
    candidate.object === 'page' &&
    typeof candidate.id === 'string' &&
    typeof candidate.created_time === 'string' &&
    typeof candidate.properties === 'object' &&
    candidate.properties !== null
  )
}
