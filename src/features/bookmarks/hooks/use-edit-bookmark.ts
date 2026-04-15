import { BOOKMARK_TAG_SEPARATOR } from '@/core/constants/bookmark'
import type { Bookmark } from '@/core/domain/models/bookmark'

import type { BookmarkFormValues } from '../schemas'

export const useEditBookmark = (bookmark: Bookmark) => {
  const defaultValues: BookmarkFormValues = {
    title: bookmark.title,
    description: bookmark.description ?? '',
    url: bookmark.url,
    tags: bookmark.tags.join(`${BOOKMARK_TAG_SEPARATOR} `),
  }

  const handleSubmit = async (_values: BookmarkFormValues) => {}

  return { defaultValues, handleSubmit }
}
