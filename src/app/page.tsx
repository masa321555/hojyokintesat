'use client';

import { useState } from 'react';
import SearchForm from '@/components/SearchForm';
import SubsidyCard from '@/components/SubsidyCard';
import Pagination from '@/components/Pagination';
import { useSubsidies } from '@/hooks/useSubsidies';
import { SearchFilters } from '@/types/subsidy';
import { FileText, Download, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [filters, setFilters] = useState<SearchFilters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);
  
  const { data, isLoading, error } = useSubsidies({
    filters,
    page: currentPage,
    pageSize: 20,
  });

  const handleSearch = (newFilters: SearchFilters) => {
    console.log('Search triggered with filters:', newFilters);
    setFilters(newFilters);
    setCurrentPage(1);
    setHasSearched(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold text-gray-900">
              東京都補助金検索システム
            </h1>
            <nav className="flex items-center gap-6">
              <Link
                href="/"
                className="text-gray-700 hover:text-gray-900 font-medium flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                補助金を探す
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-gray-900 font-medium flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4" />
                補助金の説明
              </Link>
              <Link
                href="/download"
                className="text-gray-700 hover:text-gray-900 font-medium flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                一覧ダウンロード
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative z-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4">補助金を検索</h2>
          <SearchForm onSearch={handleSearch} />
        </div>

        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2">検索中...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            エラーが発生しました。再度お試しください。
          </div>
        )}

        {!hasSearched && !isLoading && (
          <div className="text-center py-12">
            <div className="text-gray-600">
              <p className="text-lg mb-2">補助金を検索してください</p>
              <p className="text-sm">上記の検索フォームから条件を指定して検索ボタンをクリックしてください。</p>
            </div>
          </div>
        )}

        {hasSearched && data && (
          <>
            <div className="mb-4">
              <p className="text-gray-700">
                検索結果: <span className="font-bold">{data.totalCount}</span> 件
              </p>
            </div>

            {data.subsidies.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-gray-600">該当する補助金が見つかりませんでした。</p>
                <p className="text-gray-600 mt-2">検索条件を変更してお試しください。</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {data.subsidies.map((subsidy) => (
                    <SubsidyCard key={subsidy.id} subsidy={subsidy} />
                  ))}
                </div>

                <div className="flex justify-center">
                  <Pagination
                    currentPage={data.currentPage}
                    totalPages={data.totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}
