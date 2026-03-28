import { z } from 'zod'

import {
  BOOKMARK_DESCRIPTION_MAX_LENGTH,
  BOOKMARK_TITLE_MAX_LENGTH,
} from '@/core/constants/bookmark'
import { CreateBookmarkInput } from '@/core/use-cases/bookmarks'
import { normalizeUrl } from '@/core/utils'

export const createBookmarkSchema: z.ZodType<CreateBookmarkInput> = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .max(BOOKMARK_TITLE_MAX_LENGTH),
  description: z
    .string()
    .trim()
    .min(1, 'Description is required')
    .max(BOOKMARK_DESCRIPTION_MAX_LENGTH),
  url: z
    .string()
    .trim()
    .min(1, 'Website URL is required')
    .refine((value) => Boolean(normalizeUrl(value)), 'Enter a valid URL'),
  tags: z.array(z.string().trim().min(1)).min(1),
})
