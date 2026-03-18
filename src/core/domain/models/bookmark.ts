export type Bookmark = {
  id: string
  title: string
  url: string
  favicon?: string
  description?: string
  domain: string
  tags: string[]
  pinned: boolean
  isArchived: boolean
  visitCount: number
  createdAt: string
  lastVisited?: string | null
}
