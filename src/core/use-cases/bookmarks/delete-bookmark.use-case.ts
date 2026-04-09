import type { BookmarkRepository } from '@/core/domain/repositories'

export class DeleteBookmarkUseCase {
  constructor(private bookmarkRepository: BookmarkRepository) {}

  async execute(bookmarkId: string): Promise<void> {
    await this.bookmarkRepository.delete(bookmarkId)
  }
}
