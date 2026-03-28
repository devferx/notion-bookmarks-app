'use client'

import { useBookmarkDialog } from '@/features/bookmarks/context'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
}

export const BookmarkDialogTrigger = ({ children, ...props }: Props) => {
  const { open } = useBookmarkDialog()

  return (
    <button type="button" onClick={open} {...props}>
      {children}
    </button>
  )
}
