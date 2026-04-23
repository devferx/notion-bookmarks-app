import {
  getCachedBookmarks,
  getCachedSearchedBookmarks,
} from '@/features/bookmarks/cache/bookmark-cache'

import { SortMenu } from '@/components/ui/sort-menu'
import { BookmarkCard } from '@/features/bookmarks/components'

import { parseBookmarkSort } from '@/features/bookmarks/utils/bookmark-sort'
import { parseSearchQueryParam } from '@/features/bookmarks/utils/search'
import { parseTagsParam } from '@/features/bookmarks/utils/tags'

interface HomeProps {
  searchParams: Promise<{ sort?: string; tags?: string; query?: string }>
}

export default async function Home({ searchParams }: HomeProps) {
  const {
    tags: tagsParam,
    sort: sortParam,
    query: queryParam,
  } = await searchParams

  const selectedTags = parseTagsParam(tagsParam)
  const selectedSort = parseBookmarkSort(sortParam)
  const searchQuery = parseSearchQueryParam(queryParam)

  const bookmarks = searchQuery
    ? await getCachedSearchedBookmarks(searchQuery, {
        sort: selectedSort,
        tags: selectedTags,
      })
    : await getCachedBookmarks(selectedTags, selectedSort)

  return (
    <section className="px-4 pt-6 pb-16 md:px-8 md:pt-8">
      <header className="flex items-center justify-between gap-4">
        <h2 className="text-preset-1 dark:text-neutral-0 text-neutral-900">
          {searchQuery
            ? `Search results for: "${searchQuery}"`
            : selectedTags.length > 0
              ? `Bookmarks tagged: ${selectedTags.join(', ')}`
              : 'All bookmarks'}
        </h2>

        <SortMenu />
      </header>

      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {bookmarks.map((bookmark) => (
          <BookmarkCard key={bookmark.id} bookmark={bookmark} />
        ))}
      </div>
    </section>
  )
}
