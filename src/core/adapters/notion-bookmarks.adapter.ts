import { Bookmark } from '@/core/models/bookmark'
import {
  isNotionPageRow,
  joinPlainText,
  normalizeUrl,
  toDomain,
  toFaviconUrl,
} from '@/core/utils'

interface NotionRowsResult {
  results?: unknown[]
}

export function adaptNotionRowsToBookmarks(rows: NotionRowsResult): Bookmark[] {
  const results = Array.isArray(rows.results) ? rows.results : []

  return results.filter(isNotionPageRow).map((row) => {
    const props = row.properties

    const title = joinPlainText(props.Title?.title) || 'Untitled'
    const rawUrl = props.URL?.url ?? ''
    const url = normalizeUrl(rawUrl) ?? rawUrl
    const domain = toDomain(rawUrl) ?? ''
    const description = joinPlainText(props.Description?.rich_text) || undefined
    const tags = (props.Tags?.multi_select ?? [])
      .map((tag: { name?: string }) => tag.name ?? '')
      .filter(Boolean)
    const pinned = props.Pinned?.checkbox === true
    const isArchived =
      props.Archived?.checkbox === true ||
      row.archived === true ||
      row.in_trash === true
    const visitCount = props.VisitCount?.number ?? 0
    const createdAt = props.CreatedTime?.created_time ?? row.created_time
    const lastVisited = props.LastVisited?.date?.start ?? null

    return {
      id: row.id,
      title,
      url,
      domain,
      favicon: url ? toFaviconUrl(url) : undefined,
      description,
      tags,
      pinned,
      isArchived,
      visitCount,
      createdAt,
      lastVisited,
    }
  })
}
