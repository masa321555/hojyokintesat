import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SearchFilters, SearchResult, Subsidy } from '@/types/subsidy';

interface UseSubsidiesOptions {
  filters: SearchFilters;
  page?: number;
  pageSize?: number;
}

export function useSubsidies({ filters, page = 1, pageSize = 20 }: UseSubsidiesOptions) {
  return useQuery<SearchResult>({
    queryKey: ['subsidies', filters, page, pageSize],
    queryFn: async () => {
      const params = new URLSearchParams();
      
      if (filters.keyword) {
        params.append('keyword', filters.keyword);
      }
      if (filters.targetCategories?.length) {
        params.append('targetCategories', filters.targetCategories.join(','));
      }
      if (filters.fieldCategories?.length) {
        params.append('fieldCategories', filters.fieldCategories.join(','));
      }
      params.append('page', page.toString());
      params.append('pageSize', pageSize.toString());

      const { data } = await axios.get(`/api/subsidies?${params.toString()}`);
      return data;
    },
  });
}

export function useSubsidy(id: string) {
  return useQuery<Subsidy>({
    queryKey: ['subsidy', id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/subsidies/${id}`);
      return data;
    },
    enabled: !!id,
  });
}