import { NotionBookmarkRepository } from './infrastructure/notion/notion-bookmark.repository'
import { NotionService } from './infrastructure/notion/notion.service'

import {
  CreateBookmarkUseCase,
  GetArchivedBookmarksUseCase,
  GetBookmarksByTagsUseCase,
  GetBookmarksUseCase,
  GetTagsUseCase,
  PinBookmarkUseCase,
  TrackBookmarkVisitUseCase,
} from './use-cases/bookmarks'

const notionService = new NotionService()
const bookmarkRepo = new NotionBookmarkRepository(notionService)

export const getTagsUseCase = new GetTagsUseCase(bookmarkRepo)
export const createBookmarkUseCase = new CreateBookmarkUseCase(bookmarkRepo)
export const trackVisitUseCase = new TrackBookmarkVisitUseCase(bookmarkRepo)
export const pinBookmarkUseCase = new PinBookmarkUseCase(bookmarkRepo)

export const getBookmarksUseCase = new GetBookmarksUseCase(bookmarkRepo)
export const getArchivedBookmarksUseCase = new GetArchivedBookmarksUseCase(
  bookmarkRepo,
)
export const getBookmarksByTagsUseCase = new GetBookmarksByTagsUseCase(
  bookmarkRepo,
)
