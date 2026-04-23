import { BookmarkSort } from './bookmark-sort'

export type SearchBookmarksOptions = {
  sort?: BookmarkSort
  tags?: string[]
  isArchived?: boolean
}
