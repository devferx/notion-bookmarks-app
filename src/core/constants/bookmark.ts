import { BookmarkSort } from '@/core/domain/models'

export const BOOKMARK_TITLE_MAX_LENGTH = 120 as const
export const BOOKMARK_DESCRIPTION_MAX_LENGTH = 280 as const

export const TEN_MINUTES_IN_SECONDS = 600 as const
export const THIRTY_MINUTES_IN_SECONDS = 1800 as const

export const BOOKMARK_CACHE_KEYS = {
  allBookmarks: ['bookmarks', 'all'],
  bookmarksByTags: ['bookmarks', 'by-tags'],
  archivedBookmarks: ['bookmarks', 'archived'],
  allTags: ['bookmarks', 'all-tags'],
}

export const BOOKMARK_CACHE_TAGS = {
  bookmarksList: 'bookmarks:list',
  bookmarksTags: 'bookmarks:tags',
  archivedBookmarksList: 'bookmarks:archived-list',
} as const

export const DEFAULT_BOOKMARK_SORT = BookmarkSort.RecentlyAdded as const

export const BOOKMARK_TAG_SEPARATOR = ',' as const
export const BOOKMARKS_PAGE_SIZE = 25 as const
