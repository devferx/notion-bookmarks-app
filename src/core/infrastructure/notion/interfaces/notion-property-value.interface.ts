export interface NotionPropertyValue {
  type: string
  title?: Array<{ plain_text?: string }>
  rich_text?: Array<{ plain_text?: string }>
  url?: string | null
  multi_select?: Array<{ name?: string }>
  checkbox?: boolean
  number?: number | null
  date?: { start?: string | null } | null
  created_time?: string
}
