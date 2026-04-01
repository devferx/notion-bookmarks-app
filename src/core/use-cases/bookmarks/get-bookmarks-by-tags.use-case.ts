import type { BookmarkRepository } from '@/core/domain/repositories'
import type { Bookmark } from '@/core/domain/models'

export class GetBookmarksByTagsUseCase {
  constructor(private repository: BookmarkRepository) {}

  execute(tags: string[]): Promise<Bookmark[]> {
    return this.repository.getByTags(tags)
  }
}
