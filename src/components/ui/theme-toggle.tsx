'use client'

import { useTheme } from 'next-themes'
import type { AriaRole } from 'react'

import { Moon, Sun } from '../icons'

interface ThemeToggleButtonProps {
  inputRole?: AriaRole
  ariaLabelledBy?: string
}

export const ThemeToggleButton = ({
  inputRole,
  ariaLabelledBy,
}: ThemeToggleButtonProps) => {
  const { theme, setTheme } = useTheme()

  const onToggleTheme = () => {
    const isDark = theme === 'dark'

    const nextTheme = isDark ? 'light' : 'dark'
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (!document.startViewTransition || prefersReducedMotion) {
      setTheme(nextTheme)
      return
    }

    document.startViewTransition(() => {
      setTheme(nextTheme)
    })
  }

  return (
    <label htmlFor="theme-toggle" className="inline-block cursor-pointer">
      <input
        id="theme-toggle"
        className="peer sr-only"
        type="checkbox"
        checked={theme === 'dark'}
        onChange={onToggleTheme}
        role={inputRole}
        aria-labelledby={ariaLabelledBy}
      />

      <div className="relative flex items-center justify-between rounded-sm bg-neutral-300 p-0.5 dark:bg-neutral-500">
        <div className="z-20 px-2 py-1.5">
          <Sun className="dark:text-neutral-0 text-neutral-900 transition-colors duration-300" />
        </div>

        <div className="z-20 px-2 py-1.5">
          <Moon className="dark:text-neutral-0 text-neutral-900 transition-colors duration-300" />
        </div>

        <div className="theme-toggle-thumb bg-neutral-0 absolute top-0.5 left-0.5 z-10 h-[calc(100%-4px)] w-[calc(50%-2px)] translate-x-0 rounded-sm transition-transform delay-300 duration-300 dark:translate-x-full dark:bg-neutral-600" />
      </div>
    </label>
  )
}
