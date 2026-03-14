/* eslint-disable @next/next/no-img-element */
'use client'

import type { Bookmark } from '@/core/models/bookmark'
import { formatBookmarkDate } from '@/core/utils'

import {
  Calendar,
  Clock,
  DotsVertical,
  Eye,
  Pin,
  LinkExternal,
} from '@/components/icons'
import { useMenuActions } from '@/hooks/use-menu-actions'

type Props = {
  bookmark: Bookmark
}

export const BookmarkCard = ({ bookmark }: Props) => {
  const {
    isMenuOpen,
    menuContainerRef,
    menuId,
    menuItemRef,
    menuTriggerRef,
    closeMenu,
    onToggleMenu,
  } = useMenuActions()

  const onOpenLink = () => {
    try {
      const safeUrl = new URL(bookmark.url)
      const newWindow = window.open(
        safeUrl.toString(),
        '_blank',
        'noopener,noreferrer',
      )

      if (newWindow) {
        newWindow.opener = null
      }
    } catch {
      // Ignore invalid URLs
    } finally {
      closeMenu()
    }
  }

  return (
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
          <h3 className="text-preset-2 text-neutral-900">{bookmark.title}</h3>
          <p className="text-preset-5 text-neutral-800">{bookmark.domain}</p>
        </div>

        <div className="flex-1" />

        <div className="relative" ref={menuContainerRef}>
          <button
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-neutral-400 transition-colors duration-300 hover:bg-neutral-200"
            ref={menuTriggerRef}
            type="button"
            aria-label={`Open actions for ${bookmark.title}`}
            aria-haspopup="menu"
            aria-expanded={isMenuOpen}
            aria-controls={menuId}
            onClick={onToggleMenu}
          >
            <DotsVertical />
          </button>

          {isMenuOpen && (
            <div
              className="bg-neutral-0 menu-shadow absolute top-full right-0 mt-1.5 flex w-50 flex-col overflow-hidden rounded-lg border border-neutral-100 p-2"
              id={menuId}
              role="menu"
              aria-label={`Actions for ${bookmark.title}`}
            >
              <button
                className="bg-neutral-0 flex w-full cursor-pointer items-center gap-2.5 rounded-md p-2 hover:bg-neutral-100"
                ref={menuItemRef}
                type="button"
                role="menuitem"
                onClick={onOpenLink}
              >
                <LinkExternal size={16} />
                <span className="text-preset-4 text-neutral-800">Visit</span>
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="px-4">
        <div className="h-px w-full bg-neutral-300" />
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
  )
}
