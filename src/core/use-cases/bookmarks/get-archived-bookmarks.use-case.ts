import type { Bookmark } from '@/core/domain/models'
import type { BookmarkRepository } from '@/core/domain/repositories'

export class GetArchivedBookmarksUseCase {
  constructor(private bookmarkRepository: BookmarkRepository) {}

  async execute(): Promise<Bookmark[]> {
    return this.bookmarkRepository.getArchived()
  }
}
