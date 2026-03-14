'use client'

import { useEffect, useId, useRef, useState } from 'react'

export function useMenuActions() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuId = useId()
  const menuTriggerRef = useRef<HTMLButtonElement>(null)
  const menuItemRef = useRef<HTMLButtonElement>(null)
  const menuContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isMenuOpen) return

    menuItemRef.current?.focus()

    const onPointerDown = (event: PointerEvent) => {
      if (!menuContainerRef.current) return

      if (!menuContainerRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return

      setIsMenuOpen(false)
      menuTriggerRef.current?.focus()
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isMenuOpen])

  const onToggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return {
    isMenuOpen,
    menuContainerRef,
    menuId,
    menuItemRef,
    menuTriggerRef,
    closeMenu,
    onToggleMenu,
  }
}
