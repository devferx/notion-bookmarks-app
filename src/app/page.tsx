import { getBookmarksUseCase } from '@/core/container'

import { Add } from '@/components/icons'
import { BookmarkCard } from '@/components/ui/bookmark-card'
import { MenuButton } from '@/components/ui/menu-button'
import { Sidebar } from '@/components/ui/sidebar'

export default async function Home() {
  const bookmarks = await getBookmarksUseCase.execute()

  return (
    <main className="flex min-h-screen w-full bg-neutral-100 dark:bg-neutral-900">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="bg-neutral-0 sticky top-0 right-0 left-0 z-30 flex w-full items-center justify-between gap-2.5 border-b border-neutral-300 px-4 py-3 dark:border-neutral-500 dark:bg-neutral-800">
          <div className="flex items-center gap-2.5">
            <MenuButton />

            <input
              className="text-preset-4-medium bg-search-input search-input-shadow dark:text-neutral-0 w-full max-w-80 rounded-lg border border-neutral-300 bg-no-repeat py-2.5 pr-3 pl-10 text-neutral-800 dark:border-neutral-500 dark:placeholder:text-neutral-100"
              placeholder="Search by title..."
              type="text"
            />
          </div>

          <div className="flex items-center gap-2.5">
            <button
              className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-teal-700 bg-teal-700 p-2.5 md:p-3"
              type="button"
            >
              <Add className="text-neutral-0" size={20} />
              <span className="text-preset-3 text-neutral-0 hidden md:block">
                Add Bookmark
              </span>
            </button>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="aspect-square min-h-10 min-w-10 rounded-full object-cover"
              src="/avatar.png"
              alt="User avatar"
            />
          </div>
        </header>

        <section className="px-4 pt-6 pb-16 md:px-8 md:pt-8">
          <header className="flex items-center justify-between gap-4">
            <h2 className="text-preset-1 dark:text-neutral-0 text-neutral-900">
              All bookmarks
            </h2>
          </header>

          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {bookmarks.map((bookmark) => (
              <BookmarkCard key={bookmark.id} bookmark={bookmark} />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
