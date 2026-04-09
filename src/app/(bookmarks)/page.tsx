import { getCachedBookmarks } from '@/features/bookmarks/cache/bookmark-cache'
import { BookmarkCard } from '@/features/bookmarks/components'
import { parseTagsParam } from '@/features/bookmarks/utils/tags'

interface HomeProps {
  searchParams: Promise<{ tags?: string }>
}

export default async function Home({ searchParams }: HomeProps) {
  const { tags: tagsParam } = await searchParams
  const selectedTags = parseTagsParam(tagsParam)
  const bookmarks = await getCachedBookmarks(selectedTags)

  return (
    <section className="px-4 pt-6 pb-16 md:px-8 md:pt-8">
      <header className="flex items-center justify-between gap-4">
        <h2 className="text-preset-1 dark:text-neutral-0 text-neutral-900">
          {selectedTags.length > 0
            ? `Bookmarks tagged: ${selectedTags.join(', ')}`
            : 'All bookmarks'}
        </h2>
      </header>

      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {bookmarks.map((bookmark) => (
          <BookmarkCard key={bookmark.id} bookmark={bookmark} />
        ))}
      </div>
    </section>
  )
}
