import { redirect } from 'next/navigation'

import {
  getCachedArchivedBookmarks,
  getCachedSearchedBookmarks,
} from '@/features/bookmarks/cache/bookmark-cache'

import { auth } from '@/auth'
import { SortMenu } from '@/components/ui/sort-menu'
import { BookmarkCard } from '@/features/bookmarks/components'

import { parseBookmarkSort } from '@/features/bookmarks/utils/bookmark-sort'
import { parseSearchQueryParam } from '@/features/bookmarks/utils/search'

interface ArchivedBookmarksPageProps {
  searchParams: Promise<{ sort?: string; query?: string }>
}

export default async function ArchivedBookmarksPage({
  searchParams,
}: ArchivedBookmarksPageProps) {
  const session = await auth()
  if (!session?.user) redirect('/sign-in')

  const { sort: sortParam, query: queryParam } = await searchParams

  const selectedSort = parseBookmarkSort(sortParam)
  const searchQuery = parseSearchQueryParam(queryParam)

  const archivedBookmarks = searchQuery
    ? await getCachedSearchedBookmarks(searchQuery, {
        sort: selectedSort,
        isArchived: true,
      })
    : await getCachedArchivedBookmarks(selectedSort)

  return (
    <section className="px-4 pt-6 pb-16 md:px-8 md:pt-8">
      <header className="flex items-center justify-between gap-4">
        <h2 className="text-preset-1 dark:text-neutral-0 text-neutral-900">
          {searchQuery
            ? `Search results for: "${searchQuery}"`
            : 'Archived Bookmarks'}
        </h2>

        <SortMenu />
      </header>

      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {archivedBookmarks.map((bookmark) => (
          <BookmarkCard key={bookmark.id} bookmark={bookmark} />
        ))}
      </div>
    </section>
  )
}
