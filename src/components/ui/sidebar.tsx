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

        <nav className="px-4" aria-label="Primary">
          <Link
            className="flex items-center justify-start gap-2 rounded-md border border-transparent px-3 py-2 hover:border-neutral-100 hover:bg-neutral-100 dark:hover:border-transparent dark:hover:bg-neutral-600"
            href="/"
            aria-current="page"
            ref={firstNavLinkRef}
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

        <section className="flex-1 overflow-y-auto px-4 pb-5">
          <header className="bg-neutral-0 sticky top-0 flex items-center justify-between px-3 py-2 dark:bg-neutral-800">
            <h3 className="tags-title text-dark-gray uppercase">Tags</h3>
            <button className="clear-tags-button cursor-pointer text-neutral-700 underline">
              Reset
            </button>
          </header>

          <ul>
            <li className="flex items-center justify-between gap-2 px-3 py-2.5">
              <input
                className="h-4 w-4 cursor-pointer appearance-none rounded border-2 border-neutral-500 bg-center bg-no-repeat checked:border-teal-700 checked:bg-teal-700 checked:bg-[url('/checkmark.svg')]"
                type="checkbox"
                name="tag1"
                id="tag1"
              />
              <label
                className="text-preset-3 flex-1 text-neutral-800 select-none"
                htmlFor="tag1"
              >
                AI
              </label>

              <span className="tags-counter flex h-6 w-6 items-center justify-center rounded-full border border-neutral-300 bg-neutral-100 text-neutral-800">
                1
              </span>
            </li>
            <li className="flex items-center justify-between gap-2 px-3 py-2.5">
              <input
                className="h-4 w-4 cursor-pointer appearance-none rounded border-2 border-neutral-500 bg-center bg-no-repeat checked:border-teal-700 checked:bg-teal-700 checked:bg-[url('/checkmark.svg')]"
                type="checkbox"
                name="tag2"
                id="tag2"
              />
              <label
                className="text-preset-3 flex-1 text-neutral-800 select-none"
                htmlFor="tag2"
              >
                Commynity
              </label>

              <span className="tags-counter flex h-6 w-6 items-center justify-center rounded-full border border-neutral-300 bg-neutral-100 text-neutral-800">
                5
              </span>
            </li>
            {new Array(20).fill(null).map((_, index) => (
              <li
                key={index}
                className="flex items-center justify-between gap-2 px-3 py-2.5"
              >
                <input
                  className="h-4 w-4 cursor-pointer appearance-none rounded border-2 border-neutral-500 bg-center bg-no-repeat checked:border-teal-700 checked:bg-teal-700 checked:bg-[url('/checkmark.svg')]"
                  type="checkbox"
                  name={`tag${index + 3}`}
                  id={`tag${index + 3}`}
                />
                <label
                  className="text-preset-3 flex-1 text-neutral-800 select-none"
                  htmlFor={`tag${index + 3}`}
                >
                  Tag {index + 3}
                </label>

                <span className="tags-counter flex h-6 w-6 items-center justify-center rounded-full border border-neutral-300 bg-neutral-100 text-neutral-800">
                  {Math.floor(Math.random() * 10) + 1}
                </span>
              </li>
            ))}
          </ul>
        </section>
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
