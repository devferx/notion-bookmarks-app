'use server'

import {
  createBookmarkUseCase,
  pinBookmarkUseCase,
  trackVisitUseCase,
} from '@/core/container'
import type { CreateBookmarkInput } from '@/core/use-cases/bookmarks'
import { createBookmarkSchema } from '@/features/bookmarks/schemas/bookmark-form.schema'

import { revalidatePath } from 'next/cache'

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
