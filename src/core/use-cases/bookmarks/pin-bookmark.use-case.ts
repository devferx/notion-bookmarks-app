import type { BookmarkRepository } from '@/core/domain/bookmark.repository'

export class PinBookmarkUseCase {
  constructor(private repository: BookmarkRepository) {}

  execute(bookmarkId: string, isPinned: boolean): Promise<void> {
    return this.repository.setPin(bookmarkId, isPinned)
  }
}
