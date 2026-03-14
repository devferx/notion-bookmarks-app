import { Client } from '@notionhq/client'
import { toLocalDateString } from '@/core/utils/date'

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

function getRequiredNotionApiKey(): string {
  const notionApiKey = process.env.NOTION_API_KEY

  if (!notionApiKey) {
    throw new Error('Missing NOTION_API_KEY in .env.local')
  }

  return notionApiKey
}

export async function getPrimaryDataSourceId(
  databaseId: string,
): Promise<string> {
  getRequiredNotionApiKey()

  const database = await notion.databases.retrieve({
    database_id: databaseId,
  })

  const dataSourceId =
    'data_sources' in database && Array.isArray(database.data_sources)
      ? database.data_sources[0]?.id
      : undefined

  if (!dataSourceId) {
    throw new Error(
      `No data source found in database ${databaseId}. Confirm the integration has access.`,
    )
  }

  return dataSourceId
}

export async function queryDataSourcePages(
  dataSourceId: string,
  pageSize = 25,
) {
  getRequiredNotionApiKey()

  return notion.dataSources.query({
    data_source_id: dataSourceId,
    sorts: [
      { property: 'Pinned', direction: 'descending' },
      { property: 'CreatedTime', direction: 'descending' },
    ],
    page_size: pageSize,
    result_type: 'page',
  })
}

export async function registerBookmarkVisit(pageId: string): Promise<void> {
  getRequiredNotionApiKey()

  const page = await notion.pages.retrieve({
    page_id: pageId,
  })

  if (!('properties' in page)) {
    throw new Error(`Page ${pageId} has no properties to update.`)
  }

  const visitCountProperty = page.properties.VisitCount
  const currentVisitCount =
    visitCountProperty?.type === 'number' &&
    typeof visitCountProperty.number === 'number'
      ? visitCountProperty.number
      : 0

  await notion.pages.update({
    page_id: pageId,
    properties: {
      VisitCount: {
        number: currentVisitCount + 1,
      },
      LastVisited: {
        date: {
          start: toLocalDateString(new Date()),
        },
      },
    },
  })
}
