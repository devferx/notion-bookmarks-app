import type { ReactNode } from 'react'

import { auth } from '@/auth'
import { MenuButton } from '@/components/ui/menu-button'
import { Sidebar } from '@/components/ui/sidebar'
import { UserMenu } from '@/components/ui/user-menu'
import { getCachedTags } from '@/features/bookmarks/cache/bookmark-cache'
import {
  CreateBookmarkDialog,
  SearchBookmarksInput,
  TagFilterSelector,
} from '@/features/bookmarks/components'
import { SidebarNavMenu } from '@/features/navigation/components'
import { getUserInfo } from '@/actions/auth'

type Props = {
  children: ReactNode
}

export default async function BookmarksLayout({ children }: Props) {
  const [tags, userInfo] = await Promise.all([getCachedTags(), getUserInfo()])

  const { name, email } = userInfo

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

            <SearchBookmarksInput />
          </div>

          <div className="flex items-center gap-2.5">
            <CreateBookmarkDialog />

            <UserMenu name={name} email={email} />
          </div>
        </header>

        {children}
      </div>
    </main>
  )
}
