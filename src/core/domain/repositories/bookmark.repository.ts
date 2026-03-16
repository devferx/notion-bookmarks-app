import type { Bookmark } from '@/core/domain/models/bookmark'

export interface BookmarkRepository {
  getAll(): Promise<Bookmark[]>
  trackVisit(bookmarkId: string): Promise<void>
  setPin(bookmarkId: string, isPinned: boolean): Promise<void>
}
