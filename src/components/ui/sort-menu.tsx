'use client'

import { BookmarkSort } from '@/core/domain/models'

import { useBookmarkSort } from '@/features/bookmarks/hooks'
import { useMenu } from '@/hooks/use-menu'

import { Check, SwitchVertical } from '@/components/icons'

export const SortMenu = () => {
  const { isOpen, triggerRef, menuId, menuRef, containerRef, onToggleMenu } =
    useMenu<HTMLDivElement>({ closeOnFocusOut: true })
  const { selectedSort, onSelectSort } = useBookmarkSort()

  const sortOptions = [
    { value: BookmarkSort.RecentlyAdded, label: 'Recently added' },
    { value: BookmarkSort.RecentlyVisited, label: 'Recently visited' },
    { value: BookmarkSort.MostVisited, label: 'Most visited' },
  ] as const

  return (
    <div className="relative" ref={containerRef}>
      <button
        className="bg-neutral-0 flex cursor-pointer items-center gap-1 rounded-lg border border-neutral-400 px-3 py-2.5 dark:bg-neutral-800"
        type="button"
        ref={triggerRef}
        onClick={onToggleMenu}
        aria-label="Sort menu"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
      >
        <SwitchVertical className="dark:text-neutral-0 text-neutral-900" />
        <span className="dark:text-neutral-0 px-0.5 text-neutral-900">
          Sort by
        </span>
      </button>

      {isOpen && (
        <div
          className="bg-neutral-0 menu-shadow absolute right-0 -bottom-2 z-20 flex w-50 translate-y-full flex-col gap-1 overflow-hidden rounded-lg border border-neutral-100 p-2 dark:border-neutral-500 dark:bg-neutral-600"
          id={menuId}
          role="menu"
          aria-orientation="vertical"
          tabIndex={-1}
          ref={menuRef}
        >
          {sortOptions.map((option) => (
            <button
              key={option.value}
              className="flex cursor-pointer items-center gap-2.5 rounded-lg p-2 transition-colors duration-500 hover:bg-neutral-100 dark:hover:bg-neutral-500"
              role="menuitem"
              tabIndex={0}
              onClick={() => onSelectSort(option.value)}
            >
              <span className="text-preset-4 flex-1 text-start text-neutral-800 dark:text-neutral-100">
                {option.label}
              </span>
              {selectedSort === option.value && (
                <Check className="text-neutral-800 dark:text-neutral-100" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
