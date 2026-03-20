'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { closeSidebar } from '@/store/slices/sidebar-slice'

import { Archive, Home as HomeIcon, Logo } from '@/components/icons'

import { SIDEBAR_ID } from '../../core/constants/sidebar'

export const Sidebar = () => {
  const dispatch = useAppDispatch()
  const isSidebarOpen = useAppSelector((state) => state.sidebar.isOpen)
  const firstNavLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!isSidebarOpen) return

    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [isSidebarOpen])

  const onCloseSidebar = () => {
    dispatch(closeSidebar())
  }

  return (
    <>
      <aside
        className={`bg-neutral-0 fixed top-0 left-0 z-50 flex h-screen max-h-screen w-75 flex-col gap-4 border-r border-neutral-300 transition-transform duration-300 lg:sticky lg:top-0 lg:z-auto lg:translate-x-0 dark:border-neutral-500 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        id={SIDEBAR_ID}
        aria-label="Sidebar"
      >
        <header className="px-5 pt-5 pb-2.5">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            onClick={onCloseSidebar}
          >
            <Logo />
            <h1 className="font-roboto text text-xl leading-5 font-bold -tracking-[0.2px]">
              Bookmark Manager
            </h1>
          </Link>
        </header>

        <nav className="px-5" aria-label="Primary">
          <Link
            className="flex items-center justify-start gap-2 rounded-md border border-transparent px-3 py-2 hover:border-neutral-100 hover:bg-neutral-100"
            href="/"
            aria-current="page"
            ref={firstNavLinkRef}
            onClick={onCloseSidebar}
          >
            <HomeIcon className="dark:text-neutral-0 text-neutral-900" />
            <span className="text-preset-3 text-neutral-900">Home</span>
          </Link>

          <Link
            className="flex items-center justify-start gap-2 rounded-md border border-transparent px-3 py-2 text-center hover:border-neutral-100 hover:bg-neutral-100"
            href="/"
            onClick={onCloseSidebar}
          >
            <Archive className="dark:text-neutral-0 text-neutral-800" />
            <span className="text-preset-3 text-neutral-800">Archived</span>
          </Link>
        </nav>
      </aside>

      {isSidebarOpen && (
        <button
          className="bg-overlay fixed inset-0 z-40 lg:hidden"
          type="button"
          aria-label="Close sidebar"
          onClick={onCloseSidebar}
        />
      )}
    </>
  )
}
