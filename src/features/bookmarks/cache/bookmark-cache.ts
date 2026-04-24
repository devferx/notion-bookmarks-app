import { unstable_cache } from 'next/cache'

import { type BookmarkSort } from '@/core/domain/models'

import {
  getArchivedBookmarksUseCase,
  getBookmarksByTagsUseCase,
  getBookmarksUseCase,
  searchBookmarksUseCase,
  getTagsUseCase,
} from '@/core/container'
import {
  BOOKMARK_CACHE_KEYS,
  BOOKMARK_CACHE_TAGS,
  DEFAULT_BOOKMARK_SORT,
  TEN_MINUTES_IN_SECONDS,
  THIRTY_MINUTES_IN_SECONDS,
} from '@/core/constants/bookmark'

import { normalizeTags } from '@/features/bookmarks/utils/tags'

const getBookmarksCached = unstable_cache(
  async (sort: BookmarkSort) => getBookmarksUseCase.execute(sort),
  BOOKMARK_CACHE_KEYS.allBookmarks,
  {
    revalidate: TEN_MINUTES_IN_SECONDS,
    tags: [BOOKMARK_CACHE_TAGS.bookmarksList],
  },
)

const getArchivedBookmarksCached = unstable_cache(
  async (sort: BookmarkSort) => getArchivedBookmarksUseCase.execute(sort),
  BOOKMARK_CACHE_KEYS.archivedBookmarks,
  {
    revalidate: TEN_MINUTES_IN_SECONDS,
    tags: [BOOKMARK_CACHE_TAGS.archivedBookmarksList],
  },
)

const getBookmarksByTagsCached = unstable_cache(
  async (tags: string[], sort: BookmarkSort) => {
    return getBookmarksByTagsUseCase.execute(tags, sort)
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

const getSearchedBookmarksCached = unstable_cache(
  async (
    query: string,
    sort: BookmarkSort,
    tags: string[],
    isArchived: boolean,
  ) => {
    return searchBookmarksUseCase.execute(query, {
      sort,
      tags,
      isArchived,
    })
  },
  BOOKMARK_CACHE_KEYS.searchedBookmarks,
  {
    revalidate: TEN_MINUTES_IN_SECONDS,
    tags: [
      BOOKMARK_CACHE_TAGS.bookmarksList,
      BOOKMARK_CACHE_TAGS.archivedBookmarksList,
    ],
  },
)

export const getCachedBookmarks = (
  tags: string[],
  sort: BookmarkSort = DEFAULT_BOOKMARK_SORT,
) => {
  const normalizedTags = normalizeTags(tags)
  const isNormalizedTagsEmpty = normalizedTags.length === 0

  if (isNormalizedTagsEmpty) {
    return getBookmarksCached(sort)
  }

  return getBookmarksByTagsCached(normalizedTags, sort)
}

export const getCachedTags = () => {
  return getTagsCached()
}

export const getCachedArchivedBookmarks = (
  sort: BookmarkSort = DEFAULT_BOOKMARK_SORT,
) => {
  return getArchivedBookmarksCached(sort)
}

export const getCachedSearchedBookmarks = (
  query: string,
  {
    sort = DEFAULT_BOOKMARK_SORT,
    tags = [],
    isArchived = false,
  }: {
    sort?: BookmarkSort
    tags?: string[]
    isArchived?: boolean
  } = {},
) => {
  const normalizedQuery = query.trim()

  if (!normalizedQuery) {
    return isArchived
      ? getCachedArchivedBookmarks(sort)
      : getCachedBookmarks(tags, sort)
  }

  return getSearchedBookmarksCached(
    normalizedQuery,
    sort,
    normalizeTags(tags),
    isArchived,
  )
}
