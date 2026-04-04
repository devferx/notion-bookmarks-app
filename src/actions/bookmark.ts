'use server'

import { revalidateTag } from 'next/cache'

import {
  createBookmarkUseCase,
  getBookmarksByTagsUseCase,
  getTagsUseCase,
  pinBookmarkUseCase,
  trackVisitUseCase,
} from '@/core/container'
import { BOOKMARK_CACHE_TAGS } from '@/core/constants/bookmark'
import type { CreateBookmarkInput } from '@/core/use-cases/bookmarks'
import { createBookmarkSchema } from '@/features/bookmarks/schemas'

export const createBookmark = async (payload: CreateBookmarkInput) => {
  const parsedPayload = createBookmarkSchema.parse(payload)

  await createBookmarkUseCase.execute(parsedPayload)
  revalidateTag(BOOKMARK_CACHE_TAGS.bookmarksList, 'max')
  revalidateTag(BOOKMARK_CACHE_TAGS.bookmarksTags, 'max')
}

export const trackBookmarkVisit = async (bookmarkId: string) => {
  await trackVisitUseCase.execute(bookmarkId)
  revalidateTag(BOOKMARK_CACHE_TAGS.bookmarksList, 'max')
}

export const setBookmarkPin = async (bookmarkId: string, isPinned: boolean) => {
  await pinBookmarkUseCase.execute(bookmarkId, isPinned)
  revalidateTag(BOOKMARK_CACHE_TAGS.bookmarksList, 'max')
}

export const getTags = async () => {
  return getTagsUseCase.execute()
}

export const getBookmarksByTag = async (tags: string[]) => {
  return getBookmarksByTagsUseCase.execute(tags)
}
