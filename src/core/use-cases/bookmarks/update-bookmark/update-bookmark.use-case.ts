import type { BookmarkRepository } from '@/core/domain/repositories'
import type { UpdateBookmarkInput } from './update-bookmark.input'

import { normalizeUrl } from '@/core/utils/url'

export class UpdateBookmarkUseCase {
  constructor(private repository: BookmarkRepository) {}

  execute(bookmarkId: string, input: UpdateBookmarkInput): Promise<void> {
    const normalizedUrl = normalizeUrl(input.url)

    if (!normalizedUrl) {
      throw new Error('Invalid URL provided')
    }

    return this.repository.update(bookmarkId, {
      ...input,
      url: normalizedUrl,
    })
  }
}