import type {
  Bookmark,
  BookmarkSort,
  NewBookmark,
  Tag,
  UpdateBookmark,
} from '@/core/domain/models'

export interface BookmarkRepository {
  getAll(sort: BookmarkSort): Promise<Bookmark[]>
  getArchived(sort: BookmarkSort): Promise<Bookmark[]>
  getByTags(tags: string[], sort: BookmarkSort): Promise<Bookmark[]>
  getSearchSuggestions(query: string): Promise<string[]>
  searchByQuery(query: string): Promise<Bookmark[]>
  getAllTags(): Promise<Tag[]>
  create(bookmark: NewBookmark): Promise<void>
  update(bookmarkId: string, bookmark: UpdateBookmark): Promise<void>
  trackVisit(bookmarkId: string): Promise<void>
  setPin(bookmarkId: string, isPinned: boolean): Promise<void>
  setArchive(bookmarkId: string, isArchived: boolean): Promise<void>
  delete(bookmarkId: string): Promise<void>
}
