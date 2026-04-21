import type { BookmarkRepository } from '@/core/domain/repositories'

export class GetSearchSuggestionsUseCase {
  constructor(private repository: BookmarkRepository) {}

  execute(query: string): Promise<string[]> {
    return this.repository.getSearchSuggestions(query)
  }
}
