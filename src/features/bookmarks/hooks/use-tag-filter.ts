import { useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { BOOKMARK_TAG_SEPARATOR } from '@/core/constants/bookmark'

export const useTagFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const onToggleTag = useCallback(
    (tagName: string) => {
      const params = new URLSearchParams(searchParams.toString())
      const current =
        params.get('tags')?.split(BOOKMARK_TAG_SEPARATOR).filter(Boolean) ?? []

      const updated = current.includes(tagName)
        ? current.filter((t) => t !== tagName)
        : [...current, tagName]

      if (updated.length > 0) {
        params.set('tags', updated.join(BOOKMARK_TAG_SEPARATOR))
      } else {
        params.delete('tags')
      }

      router.push(`/?${params.toString()}`)
    },
    [searchParams, router],
  )

  const onResetTags = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('tags')
    router.push(`/?${params.toString()}`)
  }, [searchParams, router])

  return { onToggleTag, onResetTags }
}
