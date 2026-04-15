'use client'

import type { Bookmark } from '@/core/domain/models/bookmark'

import { useBookmarkDialog } from '../context'
import { useEditBookmark } from '../hooks'

import { Edit } from '@/components/icons'
import {
  BookmarkDialogContent,
  BookmarkDialogTrigger,
} from '@/features/bookmarks/components/bookmark-dialog'
import { BookmarkForm } from './bookmark-form'

type EditBookmarkDialogTriggerProps = {
  onOpen?: () => void
}

export const EditBookmarkDialogTrigger = ({
  onOpen,
}: EditBookmarkDialogTriggerProps) => {
  return (
    <BookmarkDialogTrigger
      className="bg-neutral-0 flex w-full cursor-pointer items-center gap-2.5 rounded-md p-2 hover:bg-neutral-100 dark:bg-neutral-600 dark:hover:bg-neutral-500"
      role="menuitem"
      onClick={onOpen}
    >
      <Edit size={16} className="text-neutral-800 dark:text-neutral-100" />
      <span className="text-preset-4 text-neutral-800 dark:text-neutral-100">
        Edit
      </span>
    </BookmarkDialogTrigger>
  )
}

type EditBookmarkDialogContentProps = {
  bookmark: Bookmark
}

export const EditBookmarkDialogContent = ({
  bookmark,
}: EditBookmarkDialogContentProps) => {
  return (
    <BookmarkDialogContent>
      <EditBookmarkContent bookmark={bookmark} />
    </BookmarkDialogContent>
  )
}

type EditBookmarkContentProps = {
  bookmark: Bookmark
}

const EditBookmarkContent = ({ bookmark }: EditBookmarkContentProps) => {
  const { close } = useBookmarkDialog()
  const { defaultValues, handleSubmit } = useEditBookmark(bookmark)

  return (
    <BookmarkForm
      defaultValues={defaultValues}
      onClose={close}
      onSubmit={handleSubmit}
      formTitle="Edit Bookmark"
      formDescription="Update the details of this bookmark."
      submitLabel="Save Changes"
      submittingLabel="Saving..."
    />
  )
}
