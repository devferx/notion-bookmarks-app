import { BOOKMARKS_PAGE_SIZE } from '@/core/constants/bookmark'
import type { Bookmark, NewBookmark, Tag } from '@/core/domain/models'
import type { BookmarkRepository } from '@/core/domain/repositories/bookmark.repository'
import {
  mapNewBookmarkToNotionProperties,
  mapNotionRowsToBookmarks,
} from './mappers'
import { NotionService } from './notion.service'
import { NOTION_PROPERTIES } from './constants'

export class NotionBookmarkRepository implements BookmarkRepository {
  constructor(private notionService: NotionService) {}

  async getAll(): Promise<Bookmark[]> {
    const dataSourceId = await this.notionService.getPrimaryDataSourceId()

    const rows = await this.notionService.queryPages(dataSourceId, {
      filter: {
        property: NOTION_PROPERTIES.Archived,
        checkbox: { equals: false },
      },
      sorts: [
        { property: NOTION_PROPERTIES.Pinned, direction: 'descending' },
        { property: NOTION_PROPERTIES.CreatedTime, direction: 'descending' },
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

  async getArchived(): Promise<Bookmark[]> {
    const dataSourceId = await this.notionService.getPrimaryDataSourceId()

    const rows = await this.notionService.queryPages(dataSourceId, {
      filter: {
        property: NOTION_PROPERTIES.Archived,
        checkbox: { equals: true },
      },
      sorts: [
        { property: NOTION_PROPERTIES.CreatedTime, direction: 'descending' },
      ],
      page_size: BOOKMARKS_PAGE_SIZE,
      result_type: 'page',
    })

    return mapNotionRowsToBookmarks(rows)
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

  async setArchive(bookmarkId: string, isArchived: boolean): Promise<void> {
    await this.notionService.updatePage(bookmarkId, {
      Archived: { checkbox: isArchived },
    })
  }

  async delete(bookmarkId: string): Promise<void> {
    await this.notionService.deletePage(bookmarkId)
  }
}
