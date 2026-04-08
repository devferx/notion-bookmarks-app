'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

import { BOOKMARK_CACHE_TAGS } from '@/core/constants/bookmark'
import {
  createBookmarkUseCase,
  deleteBookmarkUseCase,
  pinBookmarkUseCase,
  updateBookmarkArchiveStatusUseCase,
  trackVisitUseCase,
} from '@/core/container'
import type { CreateBookmarkInput } from '@/core/use-cases/bookmarks'
import { createBookmarkSchema } from '@/features/bookmarks/schemas'

export const createBookmark = async (payload: CreateBookmarkInput) => {
  const parsedPayload = createBookmarkSchema.parse(payload)

  await createBookmarkUseCase.execute(parsedPayload)
  revalidateTag(BOOKMARK_CACHE_TAGS.bookmarksList, 'max')
  revalidateTag(BOOKMARK_CACHE_TAGS.bookmarksTags, 'max')
  revalidatePath('/')
}

export const trackBookmarkVisit = async (bookmarkId: string) => {
  await trackVisitUseCase.execute(bookmarkId)
  revalidateTag(BOOKMARK_CACHE_TAGS.bookmarksList, 'max')
  revalidateTag(BOOKMARK_CACHE_TAGS.archivedBookmarksList, 'max')
  revalidatePath('/')
  revalidatePath('/archived')
}

export const setBookmarkPin = async (bookmarkId: string, isPinned: boolean) => {
  await pinBookmarkUseCase.execute(bookmarkId, isPinned)
  revalidateTag(BOOKMARK_CACHE_TAGS.bookmarksList, 'max')
  revalidateTag(BOOKMARK_CACHE_TAGS.archivedBookmarksList, 'max')
  revalidatePath('/')
  revalidatePath('/archived')
}

export const setBookmarkArchive = async (
  bookmarkId: string,
  isArchived: boolean,
) => {
  await updateBookmarkArchiveStatusUseCase.execute(bookmarkId, isArchived)
  revalidateTag(BOOKMARK_CACHE_TAGS.bookmarksList, 'max')
  revalidateTag(BOOKMARK_CACHE_TAGS.bookmarksTags, 'max')
  revalidateTag(BOOKMARK_CACHE_TAGS.archivedBookmarksList, 'max')
  revalidatePath('/')
  revalidatePath('/archived')
}

export const deleteBookmark = async (bookmarkId: string) => {
  await deleteBookmarkUseCase.execute(bookmarkId)
  revalidateTag(BOOKMARK_CACHE_TAGS.bookmarksList, 'max')
  revalidateTag(BOOKMARK_CACHE_TAGS.bookmarksTags, 'max')
  revalidateTag(BOOKMARK_CACHE_TAGS.archivedBookmarksList, 'max')
  revalidatePath('/')
  revalidatePath('/archived')
}
