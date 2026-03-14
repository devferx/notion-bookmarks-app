import { getBookmarks } from '@/core/services/bookmarks.service'

export default async function Home() {
  const bookmarks = await getBookmarks()

  return (
    <div>
      <pre>
        <code>{JSON.stringify(bookmarks, null, 2)}</code>
      </pre>
    </div>
  )
}
