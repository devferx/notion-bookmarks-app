import type { Bookmark } from '@/core/domain/models'
import type { BookmarkRepository } from '@/core/domain/repositories'

export class SearchBookmarksUseCase {
  constructor(private repository: BookmarkRepository) {}

  execute(query: string): Promise<Bookmark[]> {
    return this.repository.searchByQuery(query)
  }
}
