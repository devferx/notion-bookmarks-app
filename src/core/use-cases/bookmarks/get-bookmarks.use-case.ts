import type { BookmarkRepository } from '@/core/domain/bookmark.repository'
import type { Bookmark } from '@/core/domain/models/bookmark'

export class GetBookmarksUseCase {
  constructor(private repository: BookmarkRepository) {}

  execute(): Promise<Bookmark[]> {
    return this.repository.getAll()
  }
}
