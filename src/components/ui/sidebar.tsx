'use client'

import Link from 'next/link'
import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { closeSidebar } from '@/store/slices/sidebar-slice'

import { Logo } from '@/components/icons'

import { SIDEBAR_ID } from '../../core/constants/sidebar'

interface SidebarProps {
  children?: React.ReactNode
}

export const Sidebar = ({ children }: SidebarProps) => {
  const dispatch = useAppDispatch()

  const isSidebarOpen = useAppSelector((state) => state.sidebar.isOpen)

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
        className={`bg-neutral-0 fixed top-0 left-0 z-50 flex h-screen max-h-screen w-75 flex-col gap-4 border-r border-neutral-300 transition-transform duration-300 lg:sticky lg:top-0 lg:z-auto lg:translate-x-0 dark:border-neutral-500 dark:bg-neutral-800 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
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
            <h1 className="font-roboto text dark:text-neutral-0 text-xl leading-5 font-bold -tracking-[0.2px]">
              Bookmark Manager
            </h1>
          </Link>
        </header>

        {children}
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
