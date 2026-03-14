import { NotionPropertyValue } from '@/interfaces/notion/notion-property-value.interface'

export interface NotionPageRow {
  object: 'page'
  id: string
  created_time: string
  archived?: boolean
  in_trash?: boolean
  properties: Record<string, NotionPropertyValue>
}
