'use client'

import { createContext, useContext } from 'react'

export interface BookmarkDialogContextValue {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const BookmarkDialogContext =
  createContext<BookmarkDialogContextValue | null>(null)

export const useBookmarkDialog = () => {
  const context = useContext(BookmarkDialogContext)

  if (!context) {
    throw new Error('useBookmarkDialog must be used within <BookmarkDialog />')
  }

  return context
}
