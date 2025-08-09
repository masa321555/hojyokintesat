import { searchSubsidies } from '../search';
import { Subsidy, SearchFilters } from '@/types/subsidy';

const mockSubsidies: Subsidy[] = [
  {
    id: '2024-01-1',
    年度: '2024',
    所管局№: '01',
    所管局: '政策企画局',
    施策分野№: '17',
    施策分野: 'その他',
    事業名: 'テスト事業1',
    補助金名: 'テスト補助金1',
    補助金の概要: 'これはテスト用の補助金です',
    補助対象者№: '5',
    補助対象者: '民間団体',
    令和６年度予算額（千円）: '100,000',
    所管部署: 'テスト部署',
    問い合わせ先: '03-1234-5678',
    各局HPリンク: 'https://example.com'
  },
  {
    id: '2024-02-2',
    年度: '2024',
    所管局№: '02',
    所管局: '子供政策連携室',
    施策分野№: '01',
    施策分野: '子供家庭',
    事業名: 'テスト事業2',
    補助金名: '子供支援補助金',
    補助金の概要: '子供向けの支援補助金',
    補助対象者№: '1',
    補助対象者: '区市町村',
    令和６年度予算額（千円）: '200,000',
    所管部署: 'テスト部署2',
    問い合わせ先: '03-2345-6789',
    各局HPリンク: ''
  }
];

describe('searchSubsidies', () => {
  it('すべての補助金を返す（フィルタなし）', () => {
    const result = searchSubsidies(mockSubsidies, {});
    expect(result.subsidies).toHaveLength(2);
    expect(result.totalCount).toBe(2);
  });

  it('キーワード検索が正しく動作する', () => {
    const filters: SearchFilters = { keyword: '子供' };
    const result = searchSubsidies(mockSubsidies, filters);
    expect(result.subsidies).toHaveLength(1);
    expect(result.subsidies[0].補助金名).toBe('子供支援補助金');
  });

  it('補助対象者でフィルタリングできる', () => {
    const filters: SearchFilters = { targetCategories: ['1'] };
    const result = searchSubsidies(mockSubsidies, filters);
    expect(result.subsidies).toHaveLength(1);
    expect(result.subsidies[0].補助対象者).toBe('区市町村');
  });

  it('施策分野でフィルタリングできる', () => {
    const filters: SearchFilters = { fieldCategories: ['01'] };
    const result = searchSubsidies(mockSubsidies, filters);
    expect(result.subsidies).toHaveLength(1);
    expect(result.subsidies[0].施策分野).toBe('子供家庭');
  });

  it('ページネーションが正しく動作する', () => {
    const result = searchSubsidies(mockSubsidies, {}, 1, 1);
    expect(result.subsidies).toHaveLength(1);
    expect(result.currentPage).toBe(1);
    expect(result.totalPages).toBe(2);
  });
});