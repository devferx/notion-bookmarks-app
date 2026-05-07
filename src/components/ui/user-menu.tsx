'use client'

import { useId } from 'react'

import { signOutAction } from '@/actions/auth'

import { useMenu } from '@/hooks/use-menu'

import { ThemeToggleButton } from './theme-toggle'

import { Logout, Palette } from '../icons'

import { getGravatarUrl } from '@/core/utils'

type Props = {
  name: string
  email: string
}

export const UserMenu = ({ name: userName, email: userEmail }: Props) => {
  const { isOpen, containerRef, menuRef, triggerRef, menuId, onToggleMenu } =
    useMenu<HTMLDivElement>({ closeOnFocusOut: true })

  const menuTitleId = useId()
  const themeToggleId = useId()
  const themeToggleLabelId = useId()

  const userImage = userEmail ? getGravatarUrl(userEmail) : '/avatar.png'

  return (
    <div className="relative h-10 w-10" ref={containerRef}>
      <button
        className="h-10 w-10 cursor-pointer overflow-hidden rounded-full"
        type="button"
        ref={triggerRef}
        onClick={onToggleMenu}
        aria-label="User menu"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="aspect-square h-full w-full rounded-full object-cover"
          src={userImage}
          alt="User avatar"
        />
      </button>

      {isOpen && (
        <div
          id={menuId}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby={menuTitleId}
          tabIndex={-1}
          ref={menuRef}
          className="bg-neutral-0 menu-shadow absolute right-0 -bottom-2 flex w-62 translate-y-full flex-col gap-1 overflow-hidden rounded-lg border border-neutral-100 dark:border-neutral-500 dark:bg-neutral-600"
        >
          <h2 id={menuTitleId} className="sr-only">
            User menu
          </h2>

          <div className="flex gap-3 border-b border-neutral-200 px-4 py-3 dark:border-neutral-500">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="aspect-square max-w-10 min-w-10 rounded-full object-cover"
              src={userImage}
              alt="User avatar"
            />

            <div>
              <p className="text-preset-4 dark:text-neutral-0 text-neutral-900">
                {userName}
              </p>
              <p className="text-preset-4-medium text-neutral-800 dark:text-neutral-100">
                {userEmail}
              </p>
            </div>
          </div>

          <div className="px-2 py-1" role="none">
            <div
              className="flex items-center justify-start gap-2.5 px-2 py-2"
              role="none"
            >
              <Palette className="text-neutral-800 dark:text-neutral-100" />
              <label
                className="text-preset-4 flex-1 text-neutral-800 dark:text-neutral-100"
                htmlFor={themeToggleId}
                id={themeToggleLabelId}
              >
                Theme
              </label>

              <ThemeToggleButton
                id={themeToggleId}
                inputRole="menuitemcheckbox"
                ariaLabelledBy={themeToggleLabelId}
              />
            </div>
          </div>

          <div
            className="border-t border-neutral-200 hover:bg-neutral-300 dark:border-neutral-500 dark:hover:bg-neutral-500"
            role="none"
          >
            <button
              className="flex w-full cursor-pointer gap-2.5 p-4"
              type="button"
              aria-label="Logout"
              role="menuitem"
              onClick={() => signOutAction()}
            >
              <Logout className="text-neutral-800 dark:text-neutral-100" />
              <span className="text-preset-4 text-neutral-800 dark:text-neutral-100">
                Logout
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
