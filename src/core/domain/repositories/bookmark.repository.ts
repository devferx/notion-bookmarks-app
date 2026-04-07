import type { Bookmark, NewBookmark, Tag } from '@/core/domain/models'

export interface BookmarkRepository {
  getAll(): Promise<Bookmark[]>
  getArchived(): Promise<Bookmark[]>
  getByTags(tags: string[]): Promise<Bookmark[]>
  getAllTags(): Promise<Tag[]>
  create(bookmark: NewBookmark): Promise<void>
  trackVisit(bookmarkId: string): Promise<void>
  setPin(bookmarkId: string, isPinned: boolean): Promise<void>
}
