import { adaptNotionRowsToBookmarks } from '@/core/adapters'
import type { Bookmark } from '@/core/models/bookmark'
import {
  getPrimaryDataSourceId,
  queryDataSourcePages,
  registerBookmarkVisit,
  setBookmarkPin,
} from '@/core/services/notion.service'

export async function getBookmarks(): Promise<Bookmark[]> {
  const databaseId = process.env.NOTION_DATABASE_ID

  if (!databaseId) {
    throw new Error('Missing NOTION_DATABASE_ID in .env.local')
  }

  const dataSourceId = await getPrimaryDataSourceId(databaseId)
  const rows = await queryDataSourcePages(dataSourceId)

  return adaptNotionRowsToBookmarks(rows)
}

export async function trackBookmarkVisit(bookmarkId: string): Promise<void> {
  if (!bookmarkId) {
    throw new Error('Missing bookmark id')
  }

  await registerBookmarkVisit(bookmarkId)
}

export async function pinBookmark(
  bookmarkId: string,
  isPinned: boolean,
): Promise<void> {
  if (!bookmarkId) {
    throw new Error('Missing bookmark id')
  }

  await setBookmarkPin(bookmarkId, isPinned)
}
