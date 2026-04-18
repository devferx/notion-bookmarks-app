import { useCallback } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { BOOKMARK_TAG_SEPARATOR } from '@/core/constants/bookmark'
import { normalizeTags, parseTagsParam } from '@/features/bookmarks/utils/tags'

export const useTagFilter = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const buildUrl = useCallback(
    (params: URLSearchParams) => {
      const query = params.toString()
      return query ? `${pathname}?${query}` : pathname
    },
    [pathname],
  )

  const onToggleTag = useCallback(
    (tagName: string) => {
      const params = new URLSearchParams(searchParams.toString())
      const current = parseTagsParam(params.get('tags') ?? undefined)
      const normalizedTagName = tagName.trim()

      if (!normalizedTagName) {
        return
      }

      const updated = current.includes(normalizedTagName)
        ? current.filter((t) => t !== normalizedTagName)
        : normalizeTags([...current, normalizedTagName])

      if (updated.length > 0) {
        params.set('tags', updated.join(BOOKMARK_TAG_SEPARATOR))
      } else {
        params.delete('tags')
      }

      router.push(buildUrl(params))
    },
    [searchParams, router, buildUrl],
  )

  const onResetTags = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('tags')
    router.push(buildUrl(params))
  }, [searchParams, router, buildUrl])

  return { onToggleTag, onResetTags }
}
