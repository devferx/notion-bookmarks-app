'use client'

import { type ReactNode, useCallback, useMemo, useState } from 'react'

import { BookmarkDialogContext } from '@/features/bookmarks/context'

type Props = {
  children: ReactNode
}

export const BookmarkDialog = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close])

  return (
    <BookmarkDialogContext.Provider value={value}>
      {children}
    </BookmarkDialogContext.Provider>
  )
}
