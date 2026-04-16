'use client'

import { useMenu } from '@/hooks/use-menu'
import { SwitchVertical } from '../icons'

export const SortMenu = () => {
  const { isOpen, triggerRef, menuId, menuRef, containerRef, onToggleMenu } =
    useMenu<HTMLDivElement>({ closeOnFocusOut: true })

  return (
    <div className="relative" ref={containerRef}>
      <button
        className="bg-neutral-0 flex cursor-pointer items-center gap-1 rounded-lg border border-neutral-400 px-3 py-2.5"
        type="button"
        ref={triggerRef}
        onClick={onToggleMenu}
        aria-label="Sort menu"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
      >
        <SwitchVertical className="text-neutral-900" />
        <span className="px-0.5">Sort by</span>
      </button>

      {isOpen && (
        <div
          className="bg-neutral-0 menu-shadow absolute right-0 -bottom-2 z-20 flex w-50 translate-y-full flex-col gap-1 overflow-hidden rounded-lg border border-neutral-100 dark:border-neutral-500 dark:bg-neutral-600"
          id={menuId}
          role="menu"
          aria-orientation="vertical"
          tabIndex={-1}
          ref={menuRef}
        ></div>
      )}
    </div>
  )
}
