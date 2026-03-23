import { getBookmarksUseCase } from '@/core/container'

import { Add, Close } from '@/components/icons'
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
              className="text-preset-4-medium bg-search-input dark:text-neutral-0 text-input-shadow w-full max-w-80 rounded-lg border border-neutral-300 bg-no-repeat py-2.5 pr-3 pl-10 text-neutral-800 dark:border-neutral-500 dark:placeholder:text-neutral-100"
              placeholder="Search by title..."
              aria-label="Search bookmarks"
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

        <div className="bg-overlay fixed inset-0 z-50 flex h-screen w-full items-center justify-center px-4">
          <form className="bg-neutral-0 relative flex w-full max-w-[500px] flex-col gap-8 rounded-2xl border border-transparent px-5 py-6 dark:border-neutral-500 dark:bg-neutral-800">
            <button
              className="absolute top-5 right-5 cursor-pointer rounded-lg border border-neutral-400 p-1.5"
              type="button"
            >
              <Close className="dark:text-neutral-0 text-neutral-900" />
            </button>

            <div className="flex flex-col gap-2">
              <h3 className="text-preset-1 dark:text-neutral-0 text-neutral-900">
                Add a Bookmark
              </h3>
              <p className="text-preset-4-medium text-neutral-800 dark:text-neutral-100">
                Save a link with details to keep your collection organized.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="text-preset-4 dark:text-neutral-0 flex gap-0.5 text-neutral-900"
                htmlFor="title"
              >
                Title
                <span className="text-preset-sm text-teal-700 dark:text-neutral-100">
                  *
                </span>
              </label>
              <input
                className="text-preset-4-medium text-input-shadow dark:text-neutral-0 rounded-lg border border-neutral-500 p-3 dark:border-neutral-300 dark:bg-neutral-600"
                id="title"
                type="text"
                name="title"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="text-preset-4 dark:text-neutral-0 flex gap-0.5 text-neutral-900"
                htmlFor="description"
              >
                Description
                <span className="text-preset-sm text-teal-700 dark:text-neutral-100">
                  *
                </span>
              </label>
              <textarea
                className="text-preset-4-medium dark:text-neutral-0 max-h-60 min-h-22.5 resize-y rounded-lg border border-neutral-500 p-3 dark:border-neutral-300 dark:bg-neutral-600"
                id="description"
                name="description"
              />

              <span className="text-preset-5 ml-auto text-neutral-800 dark:text-neutral-100">
                0/280
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="text-preset-4 dark:text-neutral-0 flex gap-0.5 text-neutral-900"
                htmlFor="url"
              >
                Website URL{' '}
                <span className="text-preset-sm text-teal-700 dark:text-neutral-100">
                  *
                </span>
              </label>
              <input
                className="text-preset-4-medium text-input-shadow dark:text-neutral-0 rounded-lg border border-neutral-500 p-3 dark:border-neutral-300 dark:bg-neutral-600"
                id="url"
                type="url"
                name="url"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="text-preset-4 dark:text-neutral-0 flex gap-0.5 text-neutral-900"
                htmlFor="tags"
              >
                Tags{' '}
                <span className="text-preset-sm text-teal-700 dark:text-neutral-100">
                  *
                </span>
              </label>
              <input
                className="text-preset-4-medium text-input-shadow dark:text-neutral-0 rounded-lg border border-neutral-500 p-3 dark:border-neutral-300 dark:bg-neutral-600"
                id="tags"
                type="text"
                name="tags"
                placeholder="e.g. design, learning, tools"
              />
            </div>

            <div className="flex items-center justify-end gap-4">
              <button
                className="bg-neutral-0 text-preset-3 w-full cursor-pointer rounded-lg border border-neutral-400 p-3 text-neutral-900 md:max-w-[95px]"
                type="button"
              >
                Cancel
              </button>
              <button
                className="text-preset-3 text-neutral-0 button-shadow w-full cursor-pointer rounded-lg border border-transparent bg-teal-700 p-3 md:max-w-[145px]"
                type="submit"
              >
                Add Bookmark
              </button>
            </div>
          </form>
        </div>

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
