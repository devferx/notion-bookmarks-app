'use client'

import type { Tag } from '@/core/domain/models'
import { useTagFilter } from '@/features/bookmarks/hooks'

interface TagListProps {
  tags: Tag[]
  selectedTags: string[]
}

export const TagFilterSelector = ({ tags, selectedTags }: TagListProps) => {
  const { onToggleTag, onResetTags } = useTagFilter()

  return (
    <section className="bookmark-tags-scrollbar flex-1 overflow-y-auto px-4 pb-5">
      <header className="bg-neutral-0 sticky top-0 flex items-center justify-between px-3 py-2 dark:bg-neutral-800">
        <h3 className="tags-title text-dark-gray uppercase dark:text-neutral-100">
          Tags
        </h3>
        <button
          className="clear-tags-button cursor-pointer text-neutral-700 underline dark:text-neutral-100"
          onClick={onResetTags}
        >
          Reset
        </button>
      </header>

      <ul>
        {tags.map((tag) => {
          const tagId = `tag-${encodeURIComponent(tag.name)}`

          return (
            <li
              key={tag.name}
              className="flex items-center justify-between gap-2 px-3 py-2.5"
            >
              <input
                className="h-4 w-4 cursor-pointer appearance-none rounded border-2 border-neutral-500 bg-center bg-no-repeat checked:border-teal-700 checked:bg-teal-700 checked:bg-[url('/checkmark.svg')]"
                type="checkbox"
                name={tag.name}
                id={tagId}
                checked={selectedTags.includes(tag.name)}
                onChange={() => onToggleTag(tag.name)}
              />
              <label
                className="text-preset-3 flex-1 cursor-pointer text-neutral-800 select-none dark:text-neutral-100"
                htmlFor={tagId}
              >
                {tag.name}
              </label>

              <span className="tags-counter dark:text-neutral-0 flex h-6 w-6 items-center justify-center rounded-full border border-neutral-300 bg-neutral-100 text-center text-neutral-800 dark:border-neutral-400 dark:bg-neutral-600">
                {tag.count}
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
