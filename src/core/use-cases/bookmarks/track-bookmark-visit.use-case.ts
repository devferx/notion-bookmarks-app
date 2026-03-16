import type { BookmarkRepository } from '@/core/domain/bookmark.repository'

export class TrackBookmarkVisitUseCase {
  constructor(private repository: BookmarkRepository) {}

  execute(bookmarkId: string): Promise<void> {
    return this.repository.trackVisit(bookmarkId)
  }
}
