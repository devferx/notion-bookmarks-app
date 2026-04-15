import type {
  Bookmark,
  NewBookmark,
  Tag,
  UpdateBookmark,
} from '@/core/domain/models'

export interface BookmarkRepository {
  getAll(): Promise<Bookmark[]>
  getArchived(): Promise<Bookmark[]>
  getByTags(tags: string[]): Promise<Bookmark[]>
  getAllTags(): Promise<Tag[]>
  create(bookmark: NewBookmark): Promise<void>
  update(bookmarkId: string, bookmark: UpdateBookmark): Promise<void>
  trackVisit(bookmarkId: string): Promise<void>
  setPin(bookmarkId: string, isPinned: boolean): Promise<void>
  setArchive(bookmarkId: string, isArchived: boolean): Promise<void>
  delete(bookmarkId: string): Promise<void>
}
