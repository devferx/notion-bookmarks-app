import { BOOKMARK_TAG_SEPARATOR } from '@/core/constants/bookmark'

export function normalizeTags(tags: string[]): string[] {
  const normalizeTag = (tag: string) => tag.trim()
  const sortTag = (a: string, b: string) => a.localeCompare(b)

  const trimmedTags: string[] = tags.map(normalizeTag)
  const filteredUniqueTags: string[] = [...new Set(trimmedTags.filter(Boolean))]
  const sortedTags: string[] = filteredUniqueTags.toSorted(sortTag)

  return sortedTags
}

export function parseTagsParam(tagsParam?: string): string[] {
  if (!tagsParam) return []

  const separatedTags: string[] = tagsParam.split(BOOKMARK_TAG_SEPARATOR)
  return normalizeTags(separatedTags)
}
