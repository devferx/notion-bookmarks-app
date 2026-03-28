import { toast } from 'sonner'

import { createBookmark } from '@/actions/bookmark'
import { BookmarkFormValues, parseBookmarkTags } from '../schemas'

export const useCreateBookmark = () => {
  const handleSubmit = async (values: BookmarkFormValues) => {
    try {
      await createBookmark({
        title: values.title.trim(),
        description: values.description.trim(),
        url: values.url.trim(),
        tags: parseBookmarkTags(values.tags),
      })

      toast('Bookmark added successfully.')
    } catch {
      toast('Failed to add bookmark. Please try again.')
    }
  }

  return { handleSubmit }
}
