import { DEFAULT_BOOKMARK_SORT } from '@/core/constants/bookmark'
import { type Bookmark, type BookmarkSort } from '@/core/domain/models'
import type { BookmarkRepository } from '@/core/domain/repositories'

export class GetArchivedBookmarksUseCase {
  constructor(private bookmarkRepository: BookmarkRepository) {}

  async execute(
    sort: BookmarkSort = DEFAULT_BOOKMARK_SORT,
  ): Promise<Bookmark[]> {
    return this.bookmarkRepository.getArchived(sort)
  }
}
