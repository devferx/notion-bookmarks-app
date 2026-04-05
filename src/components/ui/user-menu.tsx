'use client'

import { useEffect, useRef, useState } from 'react'

import { ThemeToggleButton } from './theme-toggle'

import { Logout, Palette } from '../icons'

export const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative h-10 w-10" ref={ref}>
      <button
        className="h-10 w-10 cursor-pointer overflow-hidden rounded-full"
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="User menu"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="aspect-square h-full w-full rounded-full object-cover"
          src="/avatar.png"
          alt="User avatar"
        />
      </button>

      {isOpen && (
        <menu
          aria-label="User menu"
          className="bg-neutral-0 menu-shadow absolute right-0 -bottom-2 flex w-62 translate-y-full flex-col gap-1 overflow-hidden rounded-lg border border-neutral-100 dark:border-neutral-500 dark:bg-neutral-600"
        >
          <li className="flex gap-3 border-b border-neutral-200 px-4 py-3 dark:border-neutral-500">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="aspect-square min-w-10 rounded-full object-cover"
              src="/avatar.png"
              alt="User avatar"
            />

            <div>
              <p className="text-preset-4 dark:text-neutral-0 text-neutral-900">
                Emily Carter
              </p>
              <p className="text-preset-4-medium text-neutral-800 dark:text-neutral-100">
                emily101@gmail.com
              </p>
            </div>
          </li>

          <li className="px-2 py-1">
            <div className="flex items-center justify-start gap-2.5 px-2 py-2">
              <Palette className="text-neutral-800 dark:text-neutral-100" />
              <label
                className="text-preset-4 flex-1 text-neutral-800 dark:text-neutral-100"
                htmlFor="theme-toggle"
              >
                Theme
              </label>

              <ThemeToggleButton />
            </div>
          </li>

          <li className="border-t border-neutral-200 hover:bg-neutral-300 dark:border-neutral-500 dark:hover:bg-neutral-500">
            <button
              className="flex w-full cursor-pointer gap-2.5 p-4"
              type="button"
            >
              <Logout className="text-neutral-800 dark:text-neutral-100" />
              <span className="text-preset-4 text-neutral-800 dark:text-neutral-100">
                Logout
              </span>
            </button>
          </li>
        </menu>
      )}
    </div>
  )
}
