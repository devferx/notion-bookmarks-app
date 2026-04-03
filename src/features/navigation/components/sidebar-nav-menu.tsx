'use client'

import Link from 'next/link'

import { useAppDispatch } from '@/store/hooks'
import { closeSidebar } from '@/store/slices/sidebar-slice'

import { Archive, Home as HomeIcon } from '@/components/icons'

export const SidebarNavMenu = () => {
  const dispatch = useAppDispatch()

  const onCloseSidebar = () => {
    dispatch(closeSidebar())
  }

  return (
    <nav className="px-4" aria-label="Primary">
      <Link
        className="flex items-center justify-start gap-2 rounded-md border border-transparent px-3 py-2 hover:border-neutral-100 hover:bg-neutral-100 dark:hover:border-transparent dark:hover:bg-neutral-600"
        href="/"
        aria-current="page"
        onClick={onCloseSidebar}
      >
        <HomeIcon className="dark:text-neutral-0 text-neutral-900" />
        <span className="text-preset-3 dark:text-neutral-0 text-neutral-900">
          Home
        </span>
      </Link>

      <Link
        className="flex items-center justify-start gap-2 rounded-md border border-transparent px-3 py-2 hover:border-neutral-100 hover:bg-neutral-100 dark:hover:border-transparent dark:hover:bg-neutral-600"
        href="/"
        onClick={onCloseSidebar}
      >
        <Archive className="dark:text-neutral-0 text-neutral-800" />
        <span className="text-preset-3 dark:text-neutral-0 text-neutral-800">
          Archived
        </span>
      </Link>
    </nav>
  )
}