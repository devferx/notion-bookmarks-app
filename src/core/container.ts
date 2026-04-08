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
import { DeleteBookmarkUseCase } from './use-cases/bookmarks/delete-bookmark.use-case'
import { UpdateBookmarkArchiveStatusUseCase } from './use-cases/bookmarks/update-bookmark-archive-status.use-case'

const notionService = new NotionService()
const bookmarkRepo = new NotionBookmarkRepository(notionService)

export const createBookmarkUseCase = new CreateBookmarkUseCase(bookmarkRepo)
export const deleteBookmarkUseCase = new DeleteBookmarkUseCase(bookmarkRepo)
export const getTagsUseCase = new GetTagsUseCase(bookmarkRepo)
export const pinBookmarkUseCase = new PinBookmarkUseCase(bookmarkRepo)
export const updateBookmarkArchiveStatusUseCase =
  new UpdateBookmarkArchiveStatusUseCase(bookmarkRepo)
export const trackVisitUseCase = new TrackBookmarkVisitUseCase(bookmarkRepo)

export const getBookmarksUseCase = new GetBookmarksUseCase(bookmarkRepo)
export const getArchivedBookmarksUseCase = new GetArchivedBookmarksUseCase(
  bookmarkRepo,
)
export const getBookmarksByTagsUseCase = new GetBookmarksByTagsUseCase(
  bookmarkRepo,
)
