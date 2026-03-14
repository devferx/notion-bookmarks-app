import { getBookmarks } from '@/core/services/bookmarks.service'

import { BookmarkCard } from '@/components/ui/bookmark-card'

export default async function Home() {
  const bookmarks = await getBookmarks()

  return (
    <main className="min-h-screen w-full bg-neutral-100">
      <section className="px-4 pt-6 pb-16">
        <header className="flex items-center justify-between gap-4">
          <h2 className="text-preset-1 text-neutral-900">All bookmarks</h2>
        </header>

        <div className="mt-5 flex flex-col gap-4">
          {bookmarks.map((bookmark) => (
            <BookmarkCard key={bookmark.id} bookmark={bookmark} />
          ))}
        </div>
      </section>
    </main>
  )
}
