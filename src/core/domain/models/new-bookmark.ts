export type NewBookmark = {
  title: string
  url: string
  description: string
  tags: string[]
  pinned: boolean
  archived: boolean
  visitCount: number
  lastVisited?: string | null
}
