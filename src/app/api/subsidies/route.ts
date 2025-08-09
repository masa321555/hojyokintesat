import { NextRequest, NextResponse } from 'next/server';
import { loadSubsidies } from '@/lib/csv-loader';
import { searchSubsidies } from '@/lib/search';
import { SearchFilters } from '@/types/subsidy';

export async function GET(request: NextRequest) {
  try {
    // CSVデータを読み込み
    const subsidies = await loadSubsidies();

    // URLパラメータから検索条件を取得
    const searchParams = request.nextUrl.searchParams;
    const keyword = searchParams.get('keyword') || undefined;
    const targetCategories = searchParams.get('targetCategories')?.split(',').filter(Boolean) || undefined;
    const fieldCategories = searchParams.get('fieldCategories')?.split(',').filter(Boolean) || undefined;
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');

    const filters: SearchFilters = {
      keyword,
      targetCategories,
      fieldCategories
    };

    const result = searchSubsidies(subsidies, filters, page, pageSize);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error processing subsidies:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process subsidies',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}