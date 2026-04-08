import type { BookmarkRepository } from '@/core/domain/repositories'

export class UpdateBookmarkArchiveStatusUseCase {
  constructor(private bookmarkRepository: BookmarkRepository) {}

  async execute(bookmarkId: string, isArchived: boolean): Promise<void> {
    await this.bookmarkRepository.setArchive(bookmarkId, isArchived)
  }
}
