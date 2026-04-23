import {
  Bookmark,
  BookmarkSort,
  NewBookmark,
  SearchBookmarksOptions,
  Tag,
  UpdateBookmark,
} from '@/core/domain/models'

import type { BookmarkRepository } from '@/core/domain/repositories/bookmark.repository'

import { NotionService, type QueryPagesParams } from './notion.service'

import {
  mapNewBookmarkToNotionProperties,
  mapNotionRowsToBookmarks,
  mapUpdateBookmarkToNotionProperties,
} from './mappers'

import { BOOKMARKS_PAGE_SIZE } from '@/core/constants/bookmark'
import { NOTION_PROPERTIES } from './constants'

export class NotionBookmarkRepository implements BookmarkRepository {
  constructor(private notionService: NotionService) {}

  async getAll(sort: BookmarkSort): Promise<Bookmark[]> {
    const dataSourceId = await this.notionService.getPrimaryDataSourceId()

    const rows = await this.notionService.queryPages(dataSourceId, {
      filter: {
        property: NOTION_PROPERTIES.Archived,
        checkbox: { equals: false },
      },
      sorts: this.resolveSorts(sort),
      page_size: BOOKMARKS_PAGE_SIZE,
      result_type: 'page',
    })

    return mapNotionRowsToBookmarks(rows)
  }

  async getByTags(tags: string[], sort: BookmarkSort): Promise<Bookmark[]> {
    const rows = await this.notionService.queryBookmarksByTags(
      tags,
      this.resolveSorts(sort),
    )
    return mapNotionRowsToBookmarks(rows)
  }

  async getAllTags(): Promise<Tag[]> {
    return this.notionService.getTagsWithCounts()
  }

  async searchByQuery(
    query: string,
    options?: SearchBookmarksOptions,
  ): Promise<Bookmark[]> {
    const rows = await this.notionService.searchByQuery(query, {
      isArchived: options?.isArchived,
      sorts: options?.sort ? this.resolveSorts(options.sort) : undefined,
      tags: options?.tags,
    })

    return mapNotionRowsToBookmarks(rows)
  }

  async getArchived(sort: BookmarkSort): Promise<Bookmark[]> {
    const dataSourceId = await this.notionService.getPrimaryDataSourceId()

    const rows = await this.notionService.queryPages(dataSourceId, {
      filter: {
        property: NOTION_PROPERTIES.Archived,
        checkbox: { equals: true },
      },
      sorts: this.resolveSorts(sort),
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

  async update(bookmarkId: string, bookmark: UpdateBookmark): Promise<void> {
    await this.notionService.updatePage(
      bookmarkId,
      mapUpdateBookmarkToNotionProperties(bookmark),
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

  private resolveSorts(sort: BookmarkSort): QueryPagesParams['sorts'] {
    const pinSort = {
      property: NOTION_PROPERTIES.Pinned,
      direction: 'descending' as const,
    }
    const createdTimeSort = {
      property: NOTION_PROPERTIES.CreatedTime,
      direction: 'descending' as const,
    }

    const sortsByBookmarkSort: Record<BookmarkSort, QueryPagesParams['sorts']> =
      {
        [BookmarkSort.RecentlyAdded]: [pinSort, createdTimeSort],
        [BookmarkSort.RecentlyVisited]: [
          pinSort,
          { property: NOTION_PROPERTIES.LastVisited, direction: 'descending' },
          createdTimeSort,
        ],
        [BookmarkSort.MostVisited]: [
          pinSort,
          { property: NOTION_PROPERTIES.VisitCount, direction: 'descending' },
          createdTimeSort,
        ],
      }

    return sortsByBookmarkSort[sort]
  }
}
