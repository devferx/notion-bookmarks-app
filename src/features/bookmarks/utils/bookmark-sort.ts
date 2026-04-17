import { DEFAULT_BOOKMARK_SORT } from '@/core/constants/bookmark'
import { BookmarkSort } from '@/core/domain/models/bookmark-sort'

const BOOKMARK_SORT_VALUES = new Set<BookmarkSort>(Object.values(BookmarkSort))

export function parseBookmarkSort(sortParam?: string | null): BookmarkSort {
  if (!sortParam) return DEFAULT_BOOKMARK_SORT

  return BOOKMARK_SORT_VALUES.has(sortParam as BookmarkSort)
    ? (sortParam as BookmarkSort)
    : DEFAULT_BOOKMARK_SORT
}
