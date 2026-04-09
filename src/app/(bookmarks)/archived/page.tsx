import { getCachedArchivedBookmarks } from '@/features/bookmarks/cache/bookmark-cache'
import { BookmarkCard } from '@/features/bookmarks/components'

export default async function ArchivedBookmarksPage() {
  const archivedBookmarks = await getCachedArchivedBookmarks()

  return (
    <section className="px-4 pt-6 pb-16 md:px-8 md:pt-8">
      <header className="flex items-center justify-between gap-4">
        <h2 className="text-preset-1 dark:text-neutral-0 text-neutral-900">
          Archived Bookmarks
        </h2>
      </header>

      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {archivedBookmarks.map((bookmark) => (
          <BookmarkCard key={bookmark.id} bookmark={bookmark} />
        ))}
      </div>
    </section>
  )
}
