'use server'

import { trackBookmarkVisit as recordBookmarkInteraction } from '@/core/services/bookmarks.service'
import { revalidatePath } from 'next/cache'

export const trackBookmarkVisit = async (bookmarkId: string) => {
  await recordBookmarkInteraction(bookmarkId)
  revalidatePath('/')
}
