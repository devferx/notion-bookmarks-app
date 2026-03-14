export function normalizeUrl(rawUrl: string): string | undefined {
  const trimmedUrl = rawUrl.trim()

  if (!trimmedUrl) {
    return undefined
  }

  const normalizedUrl = /^[a-z][a-z\d+.-]*:\/\//i.test(trimmedUrl)
    ? trimmedUrl
    : `https://${trimmedUrl}`

  try {
    return new URL(normalizedUrl).toString()
  } catch {
    return undefined
  }
}

export function toDomain(rawUrl: string): string | undefined {
  const normalizedUrl = normalizeUrl(rawUrl)

  if (!normalizedUrl) {
    return undefined
  }

  return new URL(normalizedUrl).hostname
}

export function toFaviconUrl(rawUrl: string): string | undefined {
  const host = toDomain(rawUrl)

  if (!host) {
    return undefined
  }

  return `https://www.google.com/s2/favicons?domain=${host}&sz=64`
}
