'use client'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { toggleSidebar } from '@/store/slices/sidebar-slice'

import { SIDEBAR_ID } from '@/core/constants/sidebar'
import { HamburgerMenu } from '../icons'

export const MenuButton = () => {
  const isSidebarOpen = useAppSelector((state) => state.sidebar.isOpen)
  const dispatch = useAppDispatch()

  return (
    <button
      className="bg-neutral-0 cursor-pointer rounded-lg border border-neutral-400 p-2.5 md:p-3 lg:hidden dark:bg-neutral-800"
      type="button"
      aria-label={isSidebarOpen ? 'Close sidebar menu' : 'Open sidebar menu'}
      aria-controls={SIDEBAR_ID}
      aria-expanded={isSidebarOpen}
      onClick={() => dispatch(toggleSidebar())}
    >
      <HamburgerMenu className="dark:text-neutral-0 text-neutral-900" />
    </button>
  )
}
