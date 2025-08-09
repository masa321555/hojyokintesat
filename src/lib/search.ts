import { Subsidy, SearchFilters, SearchResult } from '@/types/subsidy';

export function searchSubsidies(
  subsidies: Subsidy[],
  filters: SearchFilters,
  page: number = 1,
  pageSize: number = 20
): SearchResult {
  let filtered = [...subsidies];

  // キーワード検索
  if (filters.keyword) {
    const keyword = filters.keyword.toLowerCase();
    filtered = filtered.filter(subsidy => 
      subsidy['補助金名'].toLowerCase().includes(keyword) ||
      subsidy['補助金の概要'].toLowerCase().includes(keyword) ||
      subsidy['事業名'].toLowerCase().includes(keyword) ||
      subsidy['所管局'].toLowerCase().includes(keyword)
    );
  }

  // 補助対象者でフィルタリング
  if (filters.targetCategories && filters.targetCategories.length > 0) {
    filtered = filtered.filter(subsidy => 
      filters.targetCategories!.includes(subsidy['補助対象者№'])
    );
  }

  // 施策分野でフィルタリング
  if (filters.fieldCategories && filters.fieldCategories.length > 0) {
    filtered = filtered.filter(subsidy => 
      filters.fieldCategories!.includes(subsidy['施策分野№'])
    );
  }

  // ページネーション
  const totalCount = filtered.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedSubsidies = filtered.slice(startIndex, endIndex);

  return {
    subsidies: paginatedSubsidies,
    totalCount,
    currentPage: page,
    totalPages
  };
}