import { toast } from 'sonner'

import { updateBookmark } from '@/actions/bookmark'
import { BOOKMARK_TAG_SEPARATOR } from '@/core/constants/bookmark'
import type { Bookmark } from '@/core/domain/models/bookmark'

import { type BookmarkFormValues, parseBookmarkTags } from '../schemas'

export const useEditBookmark = (bookmark: Bookmark) => {
  const defaultValues: BookmarkFormValues = {
    title: bookmark.title,
    description: bookmark.description ?? '',
    url: bookmark.url,
    tags: bookmark.tags.join(`${BOOKMARK_TAG_SEPARATOR} `),
  }

  const handleSubmit = async (values: BookmarkFormValues) => {
    try {
      await updateBookmark(bookmark.id, {
        title: values.title.trim(),
        description: values.description.trim(),
        url: values.url.trim(),
        tags: parseBookmarkTags(values.tags),
      })

      toast('Bookmark updated successfully.')
    } catch (error) {
      toast('Failed to update bookmark. Please try again.')
      throw error
    }
  }

  return { defaultValues, handleSubmit }
}
