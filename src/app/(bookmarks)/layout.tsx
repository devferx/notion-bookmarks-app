import type { ReactNode } from 'react'

import { MenuButton } from '@/components/ui/menu-button'
import { Sidebar } from '@/components/ui/sidebar'
import { UserMenu } from '@/components/ui/user-menu'
import { getCachedTags } from '@/features/bookmarks/cache/bookmark-cache'
import {
  CreateBookmarkDialog,
  TagFilterSelector,
} from '@/features/bookmarks/components'
import { SidebarNavMenu } from '@/features/navigation/components'

type Props = {
  children: ReactNode
}

export default async function BookmarksLayout({ children }: Props) {
  const tags = await getCachedTags()

  return (
    <main className="flex min-h-screen w-full bg-neutral-100 dark:bg-neutral-900">
      <Sidebar>
        <SidebarNavMenu />
        <TagFilterSelector tags={tags} />
      </Sidebar>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="bg-neutral-0 sticky top-0 right-0 left-0 z-30 flex items-center justify-between gap-2.5 border-b border-neutral-300 px-4 py-3 dark:border-neutral-500 dark:bg-neutral-800">
          <div className="flex items-center justify-start gap-2.5">
            <MenuButton />

            <input
              className="text-preset-4-medium bg-search-input dark:text-neutral-0 text-input-shadow w-full max-w-80 rounded-lg border border-neutral-300 bg-no-repeat py-2.5 pr-3 pl-10 text-neutral-800 md:min-w-80 dark:border-neutral-500 dark:placeholder:text-neutral-100"
              placeholder="Search by title..."
              aria-label="Search bookmarks"
              type="text"
            />
          </div>

          <div className="flex items-center gap-2.5">
            <CreateBookmarkDialog />

            <UserMenu />
          </div>
        </header>

        {children}
      </div>
    </main>
  )
}
