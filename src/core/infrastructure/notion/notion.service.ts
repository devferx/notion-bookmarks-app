import { Client } from '@notionhq/client'

type UpdatePageProperties = NonNullable<
  Parameters<Client['pages']['update']>[0]['properties']
>

export type QueryPagesParams = Omit<
  Parameters<Client['dataSources']['query']>[0],
  'data_source_id'
>

export class NotionService {
  private client: Client

  constructor() {
    const apiKey = process.env.NOTION_API_KEY

    if (!apiKey) {
      throw new Error('Missing NOTION_API_KEY in environment variables')
    }

    this.client = new Client({
      auth: apiKey,
    })
  }

  async getPrimaryDataSourceId(): Promise<string> {
    const databaseId = process.env.NOTION_DATABASE_ID

    if (!databaseId) {
      throw new Error('Missing NOTION_DATABASE_ID in environment variables')
    }

    const database = await this.client.databases.retrieve({
      database_id: databaseId,
    })

    const dataSourceId =
      'data_sources' in database && Array.isArray(database.data_sources)
        ? database.data_sources[0]?.id
        : undefined

    if (!dataSourceId) {
      throw new Error(`No data source found in database ${databaseId}`)
    }

    return dataSourceId
  }

  async queryPages(dataSourceId: string, params: QueryPagesParams = {}) {
    return this.client.dataSources.query({
      data_source_id: dataSourceId,
      ...params,
    })
  }

  async updatePage(pageId: string, properties: UpdatePageProperties) {
    await this.client.pages.update({
      page_id: pageId,
      properties,
    })
  }

  async retrievePage(pageId: string) {
    return this.client.pages.retrieve({
      page_id: pageId,
    })
  }
}
