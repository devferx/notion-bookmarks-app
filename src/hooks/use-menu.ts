'use client'

import { useEffect, useId, useRef, useState } from 'react'

type UseMenuOptions = {
  closeOnFocusOut?: boolean
}

export function useMenu<TMenuElement extends HTMLElement = HTMLElement>(
  options: UseMenuOptions = {},
) {
  const { closeOnFocusOut = false } = options

  const [isOpen, setIsOpen] = useState(false)
  const menuId = useId()
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<TMenuElement>(null)

  useEffect(() => {
    if (!isOpen) return

    menuRef.current?.focus()

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current) return

      if (!containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return

      setIsOpen(false)
      triggerRef.current?.focus()
    }

    const onFocusIn = (event: FocusEvent) => {
      if (!containerRef.current) return

      if (!containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)

    if (closeOnFocusOut) {
      document.addEventListener('focusin', onFocusIn)
    }

    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)

      if (closeOnFocusOut) {
        document.removeEventListener('focusin', onFocusIn)
      }
    }
  }, [closeOnFocusOut, isOpen])

  const onToggleMenu = () => {
    setIsOpen((prev) => !prev)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return {
    isOpen,
    containerRef,
    triggerRef,
    menuRef,
    menuId,
    closeMenu,
    onToggleMenu,
  }
}
