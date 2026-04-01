'use server'

import { revalidatePath } from 'next/cache'

import {
  createBookmarkUseCase,
  getBookmarksByTagsUseCase,
  getTagsUseCase,
  pinBookmarkUseCase,
  trackVisitUseCase,
} from '@/core/container'
import type { CreateBookmarkInput } from '@/core/use-cases/bookmarks'
import { createBookmarkSchema } from '@/features/bookmarks/schemas'

export const createBookmark = async (payload: CreateBookmarkInput) => {
  const parsedPayload = createBookmarkSchema.parse(payload)

  await createBookmarkUseCase.execute(parsedPayload)
  revalidatePath('/')
}

export const trackBookmarkVisit = async (bookmarkId: string) => {
  await trackVisitUseCase.execute(bookmarkId)
  revalidatePath('/')
}

export const setBookmarkPin = async (bookmarkId: string, isPinned: boolean) => {
  await pinBookmarkUseCase.execute(bookmarkId, isPinned)
  revalidatePath('/')
}

export const getTags = async () => {
  return getTagsUseCase.execute()
}

export const getBookmarksByTag = async (tags: string[]) => {
  return getBookmarksByTagsUseCase.execute(tags)
}
