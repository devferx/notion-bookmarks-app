export function toFaviconUrl(rawUrl: string): string | undefined {
  try {
    const host = new URL(rawUrl).hostname
    return `https://www.google.com/s2/favicons?domain=${host}&sz=64`
  } catch {
    return undefined
  }
}
