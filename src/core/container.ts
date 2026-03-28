import { NotionBookmarkRepository } from './infrastructure/notion/notion-bookmark.repository'
import { NotionService } from './infrastructure/notion/notion.service'

import {
  CreateBookmarkUseCase,
  GetBookmarksUseCase,
  PinBookmarkUseCase,
  TrackBookmarkVisitUseCase,
} from './use-cases/bookmarks'

const notionService = new NotionService()
const bookmarkRepo = new NotionBookmarkRepository(notionService)

export const getBookmarksUseCase = new GetBookmarksUseCase(bookmarkRepo)
export const createBookmarkUseCase = new CreateBookmarkUseCase(bookmarkRepo)
export const trackVisitUseCase = new TrackBookmarkVisitUseCase(bookmarkRepo)
export const pinBookmarkUseCase = new PinBookmarkUseCase(bookmarkRepo)
