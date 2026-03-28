'use client'

import { useBookmarkDialog } from '../context'
import { useCreateBookmark } from '../hooks'

import { Add } from '@/components/icons'
import {
  BookmarkDialog,
  BookmarkDialogContent,
  BookmarkDialogTrigger,
} from '@/features/bookmarks/components/bookmark-dialog'
import { BookmarkForm } from './bookmark-form'

export const CreateBookmarkDialog = () => {
  return (
    <BookmarkDialog>
      <BookmarkDialogTrigger className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-teal-700 bg-teal-700 p-2.5 md:p-3">
        <Add className="text-neutral-0" size={20} />
        <span className="text-preset-3 text-neutral-0 hidden md:block">
          Add Bookmark
        </span>
      </BookmarkDialogTrigger>

      <BookmarkDialogContent>
        <CreateBookmarkContent />
      </BookmarkDialogContent>
    </BookmarkDialog>
  )
}

const CreateBookmarkContent = () => {
  const { handleSubmit } = useCreateBookmark()
  const { close } = useBookmarkDialog()

  return <BookmarkForm onSubmit={handleSubmit} onClose={close} />
}
