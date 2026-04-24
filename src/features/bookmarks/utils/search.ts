export const parseSearchQueryParam = (queryParam?: string | null): string => {
  return queryParam?.trim() ?? ''
}
