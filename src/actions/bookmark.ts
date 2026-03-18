'use server'

import { pinBookmarkUseCase, trackVisitUseCase } from '@/core/container'
import { revalidatePath } from 'next/cache'

export const trackBookmarkVisit = async (bookmarkId: string) => {
  await trackVisitUseCase.execute(bookmarkId)
  revalidatePath('/')
}

export const setBookmarkPin = async (bookmarkId: string, isPinned: boolean) => {
  await pinBookmarkUseCase.execute(bookmarkId, isPinned)
  revalidatePath('/')
}
