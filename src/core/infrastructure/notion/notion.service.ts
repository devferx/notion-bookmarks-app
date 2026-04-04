import { Client } from '@notionhq/client'

import type { Tag } from '@/core/domain/models'

import { computeTagCounts } from './notion-bookmark.mapper'

import { NOTION_PROPERTIES } from '@/core/constants/notion-properties'

type UpdatePageProperties = NonNullable<
  Parameters<Client['pages']['update']>[0]['properties']
>
export type CreatePageProperties = NonNullable<
  Parameters<Client['pages']['create']>[0]['properties']
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

  async createPage(dataSourceId: string, properties: CreatePageProperties) {
    await this.client.pages.create({
      parent: { data_source_id: dataSourceId },
      properties,
    })
  }

  async getMultiSelectOptions(
    propertyName: string,
    dataSourceId?: string,
  ): Promise<string[]> {
    const resolvedDataSourceId =
      dataSourceId ?? (await this.getPrimaryDataSourceId())

    const dataSource = await this.client.dataSources.retrieve({
      data_source_id: resolvedDataSourceId,
    })

    if (!('properties' in dataSource) || !dataSource.properties) {
      return []
    }

    const property = dataSource.properties[propertyName]

    if (!property || property.type !== 'multi_select') {
      return []
    }

    return property.multi_select.options.map((option) => option.name)
  }

  async queryBookmarksByTags(tags: string[]) {
    const dataSourceId = await this.getPrimaryDataSourceId()

    const tagFilters = tags.map((tag) => ({
      property: NOTION_PROPERTIES.Tags,
      multi_select: { contains: tag },
    }))

    const filter = tagFilters.length === 1 ? tagFilters[0] : { or: tagFilters }

    return this.queryPages(dataSourceId, {
      filter,
      sorts: [
        { property: NOTION_PROPERTIES.Pinned, direction: 'descending' },
        { property: NOTION_PROPERTIES.CreatedTime, direction: 'descending' },
      ],
      result_type: 'page',
    })
  }

  async queryAllPages(dataSourceId: string, params: QueryPagesParams = {}) {
    let results: Awaited<ReturnType<typeof this.queryPages>>['results'] = []
    let cursor: string | undefined

    do {
      const response = await this.queryPages(dataSourceId, {
        ...params,
        start_cursor: cursor,
        result_type: 'page',
        page_size: params.page_size ?? 100,
      })

      results = results.concat(response.results)
      cursor = response.has_more
        ? (response.next_cursor ?? undefined)
        : undefined
    } while (cursor)

    return { results }
  }

  async getTagsWithCounts(): Promise<Tag[]> {
    const dataSourceId = await this.getPrimaryDataSourceId()

    const tagCountingFilter = {
      and: [
        {
          property: NOTION_PROPERTIES.Archived,
          checkbox: { equals: false },
        },
        {
          property: NOTION_PROPERTIES.Tags,
          multi_select: { is_not_empty: true as const },
        },
      ],
    }

    const [tagNames, rows] = await Promise.all([
      this.getMultiSelectOptions(NOTION_PROPERTIES.Tags, dataSourceId),
      this.queryAllPages(dataSourceId, { filter: tagCountingFilter }),
    ])

    const counts = computeTagCounts(rows)

    return this.buildTagsWithCounts(tagNames, counts)
  }

  async retrievePage(pageId: string) {
    return this.client.pages.retrieve({
      page_id: pageId,
    })
  }

  private buildTagsWithCounts(
    tagNames: string[],
    counts: Map<string, number>,
  ): Tag[] {
    return tagNames
      .map((name) => ({ name, count: counts.get(name) ?? 0 }))
      .filter((tag) => tag.count > 0)
      .sort((a, b) => b.count - a.count)
  }
}
