import type { Bookmark, NewBookmark } from '@/core/domain/models'

export interface BookmarkRepository {
  getAll(): Promise<Bookmark[]>
  create(bookmark: NewBookmark): Promise<void>
  trackVisit(bookmarkId: string): Promise<void>
  setPin(bookmarkId: string, isPinned: boolean): Promise<void>
}
