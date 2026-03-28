'use client'

import { useBookmarkDialog } from '@/features/bookmarks/context'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
}

export const BookmarkDialogTrigger = ({ children, ...props }: Props) => {
  const { open } = useBookmarkDialog()
  const { onClick, type, ...rest } = props

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    open()
    if (onClick) {
      onClick(event)
    }
  }

  return (
    <button {...rest} type={type ?? 'button'} onClick={handleClick}>
      {children}
    </button>
  )
}
