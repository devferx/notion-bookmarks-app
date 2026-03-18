import type { BookmarkRepository } from '@/core/domain/repositories'

export class TrackBookmarkVisitUseCase {
  constructor(private repository: BookmarkRepository) {}

  execute(bookmarkId: string): Promise<void> {
    return this.repository.trackVisit(bookmarkId)
  }
}
