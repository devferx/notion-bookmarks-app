/* eslint-disable @next/next/no-img-element */
import { getBookmarks } from '@/core/services/bookmarks.service'
import { formatBookmarkDate } from '@/core/utils'

import { Calendar, Clock, DotsVertical, Eye, Pin } from '@/components/icons'

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
            <article
              className="bg-neutral-0 card-shadow grid gap-4 rounded-[10px]"
              key={bookmark.id}
            >
              <header className="flex items-start gap-4 px-4 pt-4">
                <img
                  className="aspect-square w-11 rounded-lg border border-neutral-100 object-cover"
                  src={bookmark.favicon}
                  alt={bookmark.title}
                />

                <div className="grid gap-1">
                  <h3 className="text-preset-2 text-neutral-900">
                    {bookmark.title}
                  </h3>
                  <p className="text-preset-5 text-neutral-800">
                    {bookmark.domain}
                  </p>
                </div>

                <div className="flex-1" />

                <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-neutral-400">
                  <DotsVertical />
                </div>
              </header>

              <div className="px-4">
                <div className="h-[1px] w-full bg-neutral-300" />
              </div>

              <div className="mx-4 grid gap-4">
                <p className="text-preset-4-medium">{bookmark.description}</p>
                <div className="flex items-center justify-start gap-2">
                  {bookmark.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-preset-5 rounded bg-neutral-100 px-2 py-0.5 text-neutral-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <footer className="flex items-center gap-4 border-t border-neutral-100 px-4 py-3">
                <div className="flex items-center justify-start gap-1.5">
                  <Eye size={18} />
                  <span className="text-preset-5 text-neutral-800">
                    {bookmark.visitCount}
                  </span>
                </div>
                {bookmark.lastVisited && (
                  <div className="flex items-center justify-start gap-1.5">
                    <Clock size={18} />
                    <span className="text-preset-5 text-neutral-800">
                      {formatBookmarkDate(bookmark.lastVisited)}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-start gap-1.5">
                  <Calendar size={18} />
                  <span className="text-preset-5 text-neutral-800">
                    {formatBookmarkDate(bookmark.createdAt)}
                  </span>
                </div>

                <div className="flex-1" />

                {bookmark.pinned && <Pin size={18} />}
              </footer>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
