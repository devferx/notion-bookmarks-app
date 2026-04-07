'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useAppDispatch } from '@/store/hooks'
import { closeSidebar } from '@/store/slices/sidebar-slice'

import { NAVIGATION_ROUTES } from '@/features/navigation/constants'

export const SidebarNavMenu = () => {
  const dispatch = useAppDispatch()
  const pathname = usePathname()

  const onCloseSidebar = () => {
    dispatch(closeSidebar())
  }

  return (
    <nav className="px-4" aria-label="Primary">
      {NAVIGATION_ROUTES.map((route) => {
        const Icon = route.icon
        const isActive = pathname === route.href

        return (
          <Link
            key={route.href}
            className={clsx(
              'flex items-center justify-start gap-2 rounded-md border border-transparent px-3 py-2 hover:border-neutral-100 hover:bg-neutral-100 dark:hover:border-transparent dark:hover:bg-neutral-600',
              isActive && 'bg-neutral-100 dark:bg-neutral-600',
            )}
            href={route.href}
            aria-current={isActive ? 'page' : undefined}
            onClick={onCloseSidebar}
          >
            <Icon
              className={clsx(
                isActive
                  ? 'dark:text-neutral-0 text-neutral-900'
                  : 'text-dark-gray dark:text-neutral-100',
              )}
            />
            <span
              className={clsx(
                'text-preset-3',
                isActive
                  ? 'dark:text-neutral-0 text-neutral-900'
                  : 'text-dark-gray dark:text-neutral-100',
              )}
            >
              {route.name}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
