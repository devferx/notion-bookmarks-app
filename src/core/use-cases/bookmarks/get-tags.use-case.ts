import type { BookmarkRepository } from '@/core/domain/repositories'
import type { Tag } from '@/core/domain/models'

export class GetTagsUseCase {
  constructor(private repository: BookmarkRepository) {}

  execute(): Promise<Tag[]> {
    return this.repository.getAllTags()
  }
}
