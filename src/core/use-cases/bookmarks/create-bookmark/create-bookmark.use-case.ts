import type { BookmarkRepository } from '@/core/domain/repositories'
import type { CreateBookmarkInput } from '@/core/use-cases/bookmarks'

import { normalizeUrl } from '@/core/utils/url'

export class CreateBookmarkUseCase {
  constructor(private repository: BookmarkRepository) {}

  execute(input: CreateBookmarkInput): Promise<void> {
    const normalizedUrl = normalizeUrl(input.url)

    if (!normalizedUrl) {
      throw new Error('Invalid URL provided')
    }

    return this.repository.create({
      ...input,
      url: normalizedUrl,
      visitCount: 0,
      lastVisited: null,
      pinned: false,
      archived: false,
    })
  }
}
