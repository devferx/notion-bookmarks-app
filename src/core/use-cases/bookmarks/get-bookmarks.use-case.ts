import type { BookmarkRepository } from '@/core/domain/repositories'
import type { Bookmark } from '@/core/domain/models/bookmark'

export class GetBookmarksUseCase {
  constructor(private repository: BookmarkRepository) {}

  execute(): Promise<Bookmark[]> {
    return this.repository.getAll()
  }
}
