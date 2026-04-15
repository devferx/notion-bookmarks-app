/* eslint-disable @next/next/no-img-element */
'use client'

import clsx from 'clsx'
import { toast } from 'sonner'

import type { Bookmark } from '@/core/domain/models/bookmark'

import { formatBookmarkDate } from '@/core/utils'

import {
  deleteBookmark,
  setBookmarkArchive,
  setBookmarkPin,
  trackBookmarkVisit,
} from '@/actions/bookmark'

import { useMenu } from '@/hooks/use-menu'
import { useOptimisticAction } from '@/hooks/use-optimistic-action'

import {
  Archive,
  Calendar,
  Clock,
  Copy,
  DotsVertical,
  Eye,
  LinkExternal,
  Pin,
  Refresh,
  Trash,
  Unpin,
} from '@/components/icons'
import { BookmarkDialog } from './bookmark-dialog'
import {
  EditBookmarkDialogTrigger,
  EditBookmarkDialogContent,
} from './edit-bookmark-dialog'

type Props = {
  bookmark: Bookmark
}

export const BookmarkCard = ({ bookmark }: Props) => {
  const { optimisticState, runOptimisticAction } = useOptimisticAction({
    isArchived: bookmark.isArchived,
    isPending: false,
    isPinned: bookmark.pinned,
  })

  const {
    containerRef: menuContainerRef,
    isOpen: isMenuOpen,
    menuId,
    menuRef: menuItemRef,
    triggerRef: menuTriggerRef,
    closeMenu,
    onToggleMenu,
  } = useMenu<HTMLButtonElement>()

  const onOpenLink = () => {
    try {
      const safeUrl = new URL(bookmark.url)
      const newWindow = window.open(
        safeUrl.toString(),
        '_blank',
        'noopener,noreferrer',
      )

      void trackBookmarkVisit(bookmark.id)

      if (newWindow) {
        newWindow.opener = null
      }
    } catch {
      // Ignore invalid URLs
    } finally {
      closeMenu()
    }
  }

  const onCopyLink = () => {
    navigator.clipboard.writeText(bookmark.url)
    toast('Link copied to clipboard.', {
      icon: <Copy size={16} />,
      classNames: {
        title: 'text-preset-4-medium text-neutral-900',
      },
    })
    closeMenu()
  }

  const onPinBookmark = () => {
    void runOptimisticAction({
      action: () => setBookmarkPin(bookmark.id, true),
      errorIcon: <Pin size={16} />,
      errorMessage: 'Failed to pin bookmark. Please try again.',
      onFinally: closeMenu,
      optimisticUpdate: { isPinned: true },
    })
  }

  const onUnpinBookmark = () => {
    void runOptimisticAction({
      action: () => setBookmarkPin(bookmark.id, false),
      errorIcon: <Unpin size={16} />,
      errorMessage: 'Failed to unpin bookmark. Please try again.',
      onFinally: closeMenu,
      optimisticUpdate: { isPinned: false },
    })
  }

  const onArchiveBookmark = () => {
    void runOptimisticAction({
      action: () => setBookmarkArchive(bookmark.id, true),
      errorIcon: <Archive size={16} />,
      errorMessage: 'Failed to archive bookmark. Please try again.',
      onFinally: closeMenu,
      optimisticUpdate: { isArchived: true },
    })
  }

  const onUnarchiveBookmark = () => {
    void runOptimisticAction({
      action: () => setBookmarkArchive(bookmark.id, false),
      errorIcon: <Refresh size={16} />,
      errorMessage: 'Failed to unarchive bookmark. Please try again.',
      onFinally: closeMenu,
      optimisticUpdate: { isArchived: false },
    })
  }

  const onDeleteBookmark = () => {
    void runOptimisticAction({
      action: () => deleteBookmark(bookmark.id),
      errorIcon: <Trash size={16} />,
      errorMessage: 'Failed to delete bookmark. Please try again.',
      onFinally: closeMenu,
      optimisticUpdate: {},
    })
  }

  return (
    <BookmarkDialog>
      <article
        className={clsx(
          'bg-neutral-0 card-shadow flex flex-col gap-4 rounded-[10px] transition-opacity dark:bg-neutral-800',
          optimisticState.isPending && 'pointer-events-none opacity-50',
        )}
        key={bookmark.id}
        aria-busy={optimisticState.isPending}
      >
        <header className="flex items-start gap-4 px-4 pt-4">
          <img
            className="aspect-square w-11 rounded-lg border border-neutral-100 object-cover"
            src={bookmark.favicon}
            alt={bookmark.title}
          />

          <div className="grid gap-1">
            <h3 className="text-preset-2 dark:text-neutral-0 text-neutral-900">
              {bookmark.title}
            </h3>
            <p className="text-preset-5 text-neutral-800 dark:text-neutral-100">
              {bookmark.domain}
            </p>
          </div>

          <div className="flex-1" />

          <div className="relative" ref={menuContainerRef}>
            <button
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-neutral-400 transition-colors duration-300 hover:bg-neutral-200 dark:border-neutral-500 dark:hover:bg-neutral-600"
              ref={menuTriggerRef}
              type="button"
              aria-label={`Open actions for ${bookmark.title}`}
              aria-haspopup="menu"
              aria-expanded={isMenuOpen}
              aria-controls={menuId}
              onClick={onToggleMenu}
            >
              <DotsVertical className="dark:text-neutral-0 text-neutral-900" />
            </button>

            {isMenuOpen && (
              <div
                className="bg-neutral-0 menu-shadow absolute top-full right-0 mt-1.5 flex w-50 flex-col overflow-hidden rounded-lg border border-neutral-100 p-2 dark:border-neutral-500 dark:bg-neutral-600"
                id={menuId}
                role="menu"
                aria-label={`Actions for ${bookmark.title}`}
              >
                <button
                  className="bg-neutral-0 flex w-full cursor-pointer items-center gap-2.5 rounded-md p-2 hover:bg-neutral-100 dark:bg-neutral-600 dark:hover:bg-neutral-500"
                  ref={menuItemRef}
                  type="button"
                  role="menuitem"
                  onClick={onOpenLink}
                >
                  <LinkExternal
                    size={16}
                    className="text-neutral-800 dark:text-neutral-100"
                  />
                  <span className="text-preset-4 text-neutral-800 dark:text-neutral-100">
                    Visit
                  </span>
                </button>

                <button
                  className="bg-neutral-0 flex w-full cursor-pointer items-center gap-2.5 rounded-md p-2 hover:bg-neutral-100 dark:bg-neutral-600 dark:hover:bg-neutral-500"
                  type="button"
                  role="menuitem"
                  onClick={onCopyLink}
                >
                  <Copy
                    size={16}
                    className="text-neutral-800 dark:text-neutral-100"
                  />
                  <span className="text-preset-4 text-neutral-800 dark:text-neutral-100">
                    Copy URL
                  </span>
                </button>

                {!optimisticState.isPinned && (
                  <button
                    className="bg-neutral-0 flex w-full cursor-pointer items-center gap-2.5 rounded-md p-2 hover:bg-neutral-100 dark:bg-neutral-600 dark:hover:bg-neutral-500"
                    type="button"
                    role="menuitem"
                    onClick={onPinBookmark}
                  >
                    <Pin
                      size={16}
                      className="text-neutral-800 dark:text-neutral-100"
                    />
                    <span className="text-preset-4 text-neutral-800 dark:text-neutral-100">
                      Pin
                    </span>
                  </button>
                )}

                {optimisticState.isPinned && (
                  <button
                    className="bg-neutral-0 flex w-full cursor-pointer items-center gap-2.5 rounded-md p-2 hover:bg-neutral-100 dark:bg-neutral-600 dark:hover:bg-neutral-500"
                    type="button"
                    role="menuitem"
                    onClick={onUnpinBookmark}
                  >
                    <Unpin
                      size={16}
                      className="text-neutral-800 dark:text-neutral-100"
                    />
                    <span className="text-preset-4 text-neutral-800 dark:text-neutral-100">
                      Unpin
                    </span>
                  </button>
                )}

                {!optimisticState.isArchived && (
                  <>
                    <EditBookmarkDialogTrigger onOpen={closeMenu} />

                    <button
                      className="bg-neutral-0 flex w-full cursor-pointer items-center gap-2.5 rounded-md p-2 hover:bg-neutral-100 dark:bg-neutral-600 dark:hover:bg-neutral-500"
                      type="button"
                      role="menuitem"
                      onClick={onArchiveBookmark}
                    >
                      <Archive
                        size={16}
                        className="text-neutral-800 dark:text-neutral-100"
                      />
                      <span className="text-preset-4 text-neutral-800 dark:text-neutral-100">
                        Archive
                      </span>
                    </button>
                  </>
                )}

                {optimisticState.isArchived && (
                  <>
                    <button
                      className="bg-neutral-0 flex w-full cursor-pointer items-center gap-2.5 rounded-md p-2 hover:bg-neutral-100 dark:bg-neutral-600 dark:hover:bg-neutral-500"
                      type="button"
                      role="menuitem"
                      onClick={onUnarchiveBookmark}
                    >
                      <Refresh className="text-neutral-800 dark:text-neutral-100" />
                      <span className="text-preset-4 text-neutral-800 dark:text-neutral-100">
                        Unarchive
                      </span>
                    </button>

                    <button
                      className="bg-neutral-0 flex w-full cursor-pointer items-center gap-2.5 rounded-md p-2 hover:bg-neutral-100 dark:bg-neutral-600 dark:hover:bg-neutral-500"
                      type="button"
                      role="menuitem"
                      onClick={onDeleteBookmark}
                    >
                      <Trash className="text-neutral-800 dark:text-neutral-100" />
                      <span className="text-preset-4 text-neutral-800 dark:text-neutral-100">
                        Delete Permanently
                      </span>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </header>

        <div className="px-4">
          <div className="h-px w-full bg-neutral-300" />
        </div>

        <div className="mx-4 flex flex-1 flex-col gap-4">
          <p className="text-preset-4-medium dark:text-neutral-100">
            {bookmark.description}
          </p>
          <div className="flex-1"></div>
          <div className="flex items-center justify-start gap-2">
            {bookmark.tags.map((tag) => (
              <span
                key={tag}
                className="text-preset-5 rounded bg-neutral-100 px-2 py-0.5 text-neutral-800 dark:bg-neutral-600 dark:text-neutral-100"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <footer className="flex items-center gap-4 border-t border-neutral-100 px-4 py-3 dark:border-neutral-500">
          <div className="flex items-center justify-start gap-1.5">
            <Eye size={18} className="text-neutral-800 dark:text-neutral-100" />
            <span className="text-preset-5 text-neutral-800 dark:text-neutral-100">
              {bookmark.visitCount}
            </span>
          </div>
          {bookmark.lastVisited && (
            <div className="flex items-center justify-start gap-1.5">
              <Clock
                size={18}
                className="text-neutral-800 dark:text-neutral-100"
              />
              <span className="text-preset-5 text-neutral-800 dark:text-neutral-100">
                {formatBookmarkDate(bookmark.lastVisited)}
              </span>
            </div>
          )}
          <div className="flex items-center justify-start gap-1.5">
            <Calendar
              size={18}
              className="text-neutral-800 dark:text-neutral-100"
            />
            <span className="text-preset-5 text-neutral-800 dark:text-neutral-100">
              {formatBookmarkDate(bookmark.createdAt)}
            </span>
          </div>

          <div className="flex-1" />

          {optimisticState.isPinned && (
            <Pin size={18} className="text-neutral-800 dark:text-neutral-100" />
          )}
        </footer>

        <EditBookmarkDialogContent bookmark={bookmark} />
      </article>
    </BookmarkDialog>
  )
}
