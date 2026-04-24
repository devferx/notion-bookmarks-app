'use client'

import { useBookmarkSearch } from '@/features/bookmarks/hooks'

export const SearchBookmarksInput = () => {
  const { inputValue, setInputValue } = useBookmarkSearch()

  return (
    <input
      className="text-preset-4-medium bg-search-input dark:text-neutral-0 text-input-shadow w-full max-w-80 rounded-lg border border-neutral-300 bg-no-repeat py-2.5 pr-3 pl-10 text-neutral-800 md:min-w-80 dark:border-neutral-500 dark:placeholder:text-neutral-100"
      placeholder="Search by title..."
      aria-label="Search bookmarks"
      type="text"
      value={inputValue}
      onChange={(event) => setInputValue(event.target.value)}
    />
  )
}
