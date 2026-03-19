import { Add, HamburgerMenu } from '@/components/icons'
import { BookmarkCard } from '@/components/ui/bookmark-card'
import { getBookmarksUseCase } from '@/core/container'

export default async function Home() {
  const bookmarks = await getBookmarksUseCase.execute()

  return (
    <main className="min-h-screen w-full bg-neutral-100 dark:bg-neutral-900">
      <header className="bg-neutral-0 flex w-full items-center justify-between gap-2.5 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <button className="bg-neutral-0 cursor-pointer rounded-lg border border-neutral-400 p-2.5 md:p-3">
            <HamburgerMenu className="text-neutral-900" />
          </button>

          <input
            className="text-preset-4-medium bg-search-input w-full max-w-80 rounded-lg border border-neutral-300 bg-no-repeat py-2.5 pr-3 pl-10 text-neutral-800"
            placeholder="Search by title..."
            type="text"
          />
        </div>

        <div className="flex items-center gap-2.5">
          <button className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-teal-700 bg-teal-700 p-2.5 md:p-3">
            <Add className="text-neutral-0" size={20} />
            <span className="text-neutral-0 text-preset-3 hidden md:block">
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

      <section className="px-4 pt-6 pb-16">
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
    </main>
  )
}
