'use client'

import type { ReactNode } from 'react'

import { useBookmarkDialog } from '@/features/bookmarks/context'

type Props = {
  children: ReactNode
}

export const BookmarkDialogContent = ({ children }: Props) => {
  const { isOpen } = useBookmarkDialog()

  if (!isOpen) return null

  return (
    <div className="bg-overlay fixed inset-0 z-50 flex h-screen w-full items-center justify-center px-4">
      {children}
    </div>
  )
}
