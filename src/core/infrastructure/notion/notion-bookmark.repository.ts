import { BOOKMARKS_PAGE_SIZE } from '@/core/constants/bookmark'
import type { Bookmark, NewBookmark, Tag } from '@/core/domain/models'
import type { BookmarkRepository } from '@/core/domain/repositories/bookmark.repository'
import {
  mapNewBookmarkToNotionProperties,
  mapNotionRowsToBookmarks,
} from './mappers'
import { NotionService } from './notion.service'

export class NotionBookmarkRepository implements BookmarkRepository {
  constructor(private notionService: NotionService) {}

  async getAll(): Promise<Bookmark[]> {
    const dataSourceId = await this.notionService.getPrimaryDataSourceId()

    const rows = await this.notionService.queryPages(dataSourceId, {
      sorts: [
        { property: 'Pinned', direction: 'descending' },
        { property: 'CreatedTime', direction: 'descending' },
      ],
      page_size: BOOKMARKS_PAGE_SIZE,
      result_type: 'page',
    })

    return mapNotionRowsToBookmarks(rows)
  }

  async getByTags(tags: string[]): Promise<Bookmark[]> {
    const rows = await this.notionService.queryBookmarksByTags(tags)
    return mapNotionRowsToBookmarks(rows)
  }

  async getAllTags(): Promise<Tag[]> {
    return this.notionService.getTagsWithCounts()
  }

  async create(bookmark: NewBookmark): Promise<void> {
    const dataSourceId = await this.notionService.getPrimaryDataSourceId()

    await this.notionService.createPage(
      dataSourceId,
      mapNewBookmarkToNotionProperties(bookmark),
    )
  }

  async trackVisit(bookmarkId: string): Promise<void> {
    const page = await this.notionService.retrievePage(bookmarkId)

    if (!('properties' in page)) {
      throw new Error(
        `Notion page "${bookmarkId}" has no properties; cannot track visit.`,
      )
    }
    const visitCount =
      page.properties.VisitCount?.type === 'number'
        ? (page.properties.VisitCount.number ?? 0)
        : 0

    await this.notionService.updatePage(bookmarkId, {
      VisitCount: { number: visitCount + 1 },
      LastVisited: { date: { start: new Date().toISOString() } },
    })
  }

  async setPin(bookmarkId: string, isPinned: boolean): Promise<void> {
    await this.notionService.updatePage(bookmarkId, {
      Pinned: { checkbox: isPinned },
    })
  }
}
