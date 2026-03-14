import { adaptNotionRowsToBookmarks } from '@/core/adapters'
import type { Bookmark } from '@/core/models/bookmark'
import {
  getPrimaryDataSourceId,
  queryDataSourcePages,
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
