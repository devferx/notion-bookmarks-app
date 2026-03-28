import { z } from 'zod'

import {
  BOOKMARK_DESCRIPTION_MAX_LENGTH,
  BOOKMARK_TITLE_MAX_LENGTH,
} from '@/core/constants/bookmark'

export const parseBookmarkTags = (rawTags: string): string[] => {
  return Array.from(
    new Set(
      rawTags
        .replaceAll(', ', ',')
        .replaceAll(' ,', ',')
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    ),
  )
}

export const bookmarkFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .max(BOOKMARK_TITLE_MAX_LENGTH),
  description: z
    .string()
    .trim()
    .min(1, 'Description is required')
    .max(
      BOOKMARK_DESCRIPTION_MAX_LENGTH,
      `Description cannot exceed ${BOOKMARK_DESCRIPTION_MAX_LENGTH} characters`,
    ),
  url: z.url(),
  tags: z
    .string()
    .trim()
    .min(1, 'At least one tag is required')
    .refine(
      (value) => parseBookmarkTags(value).length > 0,
      'At least one tag is required',
    ),
})

export type BookmarkFormValues = z.infer<typeof bookmarkFormSchema>
