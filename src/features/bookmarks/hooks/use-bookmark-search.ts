'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { useDebouncedValue } from '@/hooks/use-debounced-value'

import { parseSearchQueryParam } from '../utils/search'

const SEARCH_PARAM_KEY = 'query'
const SEARCH_DEBOUNCE_IN_MS = 750

export const useBookmarkSearch = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const searchQuery = useMemo(
    () => parseSearchQueryParam(searchParams.get(SEARCH_PARAM_KEY)),
    [searchParams],
  )

  const [inputValue, setInputValue] = useState(searchQuery)

  const normalizedInputValue = useMemo(
    () => parseSearchQueryParam(inputValue),
    [inputValue],
  )
  const debouncedQuery = useDebouncedValue(
    normalizedInputValue,
    SEARCH_DEBOUNCE_IN_MS,
  )

  useEffect(() => {
    setInputValue(searchQuery)
  }, [searchQuery])

  const buildUrl = useCallback(
    (params: URLSearchParams) => {
      const query = params.toString()
      return query ? `${pathname}?${query}` : pathname
    },
    [pathname],
  )

  useEffect(() => {
    if (debouncedQuery === searchQuery) {
      return
    }

    const params = new URLSearchParams(searchParams.toString())

    if (debouncedQuery) {
      params.set(SEARCH_PARAM_KEY, debouncedQuery)
    } else {
      params.delete(SEARCH_PARAM_KEY)
    }

    router.replace(buildUrl(params))
  }, [debouncedQuery, searchParams, router, searchQuery, buildUrl])

  return { inputValue, setInputValue }
}
