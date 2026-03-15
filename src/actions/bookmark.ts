'use server'

import {
  trackBookmarkVisit as recordBookmarkInteraction,
  pinBookmark,
} from '@/core/services/bookmarks.service'
import { revalidatePath } from 'next/cache'

export const trackBookmarkVisit = async (bookmarkId: string) => {
  await recordBookmarkInteraction(bookmarkId)
  revalidatePath('/')
}

export const setBookmarkPin = async (bookmarkId: string, isPinned: boolean) => {
  await pinBookmark(bookmarkId, isPinned)
  revalidatePath('/')
}
