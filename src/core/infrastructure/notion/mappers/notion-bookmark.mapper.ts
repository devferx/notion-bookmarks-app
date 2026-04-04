import { Bookmark, NewBookmark } from '@/core/domain/models'

import type { CreatePageProperties } from '@/core/infrastructure/notion/notion.service'

import { normalizeUrl, toDomain, toFaviconUrl } from '@/core/utils'
import { extractRichText, isNotionPageRow } from '../utils/notion-parsing.utils'

interface NotionRowsResult {
  results?: unknown[]
}

export function mapNewBookmarkToNotionProperties(
  bookmark: NewBookmark,
): CreatePageProperties {
  return {
    Title: {
      title: [{ type: 'text', text: { content: bookmark.title } }],
    },
    URL: { url: bookmark.url },
    Description: {
      rich_text: [{ type: 'text', text: { content: bookmark.description } }],
    },
    Tags: {
      multi_select: bookmark.tags.map((tag) => ({ name: tag })),
    },
    Pinned: { checkbox: bookmark.pinned },
    Archived: { checkbox: bookmark.archived },
    VisitCount: { number: bookmark.visitCount },
    LastVisited: {
      date: bookmark.lastVisited ? { start: bookmark.lastVisited } : null,
    },
  }
}

export function mapNotionRowsToBookmarks(rows: NotionRowsResult): Bookmark[] {
  const results = Array.isArray(rows.results) ? rows.results : []

  return results.filter(isNotionPageRow).map((row) => {
    const props = row.properties

    const title = extractRichText(props.Title?.title) || 'Untitled'
    const rawUrl = props.URL?.url ?? ''
    const url = normalizeUrl(rawUrl) ?? rawUrl
    const domain = toDomain(rawUrl) ?? ''
    const description =
      extractRichText(props.Description?.rich_text) || undefined
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

export function computeTagCounts(rows: NotionRowsResult): Map<string, number> {
  const results = Array.isArray(rows.results) ? rows.results : []
  const tagCounts = new Map<string, number>()

  for (const row of results.filter(isNotionPageRow)) {
    const isArchived =
      row.properties.Archived?.checkbox === true ||
      row.archived === true ||
      row.in_trash === true

    if (isArchived) {
      continue
    }

    const tags = (row.properties.Tags?.multi_select ?? [])
      .map((tag: { name?: string }) => tag.name ?? '')
      .filter(Boolean)

    for (const tag of tags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1)
    }
  }

  return tagCounts
}
