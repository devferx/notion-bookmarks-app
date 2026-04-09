import { unstable_cache } from 'next/cache'

import {
  getArchivedBookmarksUseCase,
  getBookmarksByTagsUseCase,
  getBookmarksUseCase,
  getTagsUseCase,
} from '@/core/container'
import {
  BOOKMARK_CACHE_KEYS,
  BOOKMARK_CACHE_TAGS,
  TEN_MINUTES_IN_SECONDS,
  THIRTY_MINUTES_IN_SECONDS,
} from '@/core/constants/bookmark'

import { normalizeTags } from '@/features/bookmarks/utils/tags'

const getBookmarksCached = unstable_cache(
  async () => getBookmarksUseCase.execute(),
  BOOKMARK_CACHE_KEYS.allBookmarks,
  {
    revalidate: TEN_MINUTES_IN_SECONDS,
    tags: [BOOKMARK_CACHE_TAGS.bookmarksList],
  },
)

const getArchivedBookmarksCached = unstable_cache(
  async () => getArchivedBookmarksUseCase.execute(),
  BOOKMARK_CACHE_KEYS.archivedBookmarks,
  {
    revalidate: TEN_MINUTES_IN_SECONDS,
    tags: [BOOKMARK_CACHE_TAGS.archivedBookmarksList],
  },
)

const getBookmarksByTagsCached = unstable_cache(
  async (tags: string[]) => {
    return getBookmarksByTagsUseCase.execute(tags)
  },
  BOOKMARK_CACHE_KEYS.bookmarksByTags,
  {
    revalidate: TEN_MINUTES_IN_SECONDS,
    tags: [BOOKMARK_CACHE_TAGS.bookmarksList],
  },
)

const getTagsCached = unstable_cache(
  async () => getTagsUseCase.execute(),
  BOOKMARK_CACHE_KEYS.allTags,
  {
    revalidate: THIRTY_MINUTES_IN_SECONDS,
    tags: [BOOKMARK_CACHE_TAGS.bookmarksTags],
  },
)

export const getCachedBookmarks = (tags: string[]) => {
  const normalizedTags = normalizeTags(tags)
  const isNormalizedTagsEmpty = normalizedTags.length === 0

  if (isNormalizedTagsEmpty) {
    return getBookmarksCached()
  }

  return getBookmarksByTagsCached(normalizedTags)
}

export const getCachedTags = () => {
  return getTagsCached()
}

export const getCachedArchivedBookmarks = () => {
  return getArchivedBookmarksCached()
}
