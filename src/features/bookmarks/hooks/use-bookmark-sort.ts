import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'

import { DEFAULT_BOOKMARK_SORT } from '@/core/constants/bookmark'
import { type BookmarkSort } from '@/core/domain/models'

import { parseBookmarkSort } from '../utils/bookmark-sort'

export const useBookmarkSort = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const selectedSort = useMemo(
    () => parseBookmarkSort(searchParams.get('sort')),
    [searchParams],
  )

  const buildUrl = useCallback(
    (params: URLSearchParams) => {
      const query = params.toString()
      return query ? `${pathname}?${query}` : pathname
    },
    [pathname],
  )

  const onSelectSort = useCallback(
    (sort: BookmarkSort) => {
      const params = new URLSearchParams(searchParams.toString())

      if (sort === DEFAULT_BOOKMARK_SORT) {
        params.delete('sort')
      } else {
        params.set('sort', sort)
      }

      router.push(buildUrl(params))
    },
    [searchParams, router, buildUrl],
  )

  return { selectedSort, onSelectSort }
}
