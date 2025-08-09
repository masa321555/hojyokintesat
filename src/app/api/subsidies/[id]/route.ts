import { NextRequest, NextResponse } from 'next/server';
import { loadSubsidies } from '@/lib/csv-loader';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // CSVデータを読み込み
    const subsidies = await loadSubsidies();

    const subsidy = subsidies.find(s => s.id === params.id);

    if (!subsidy) {
      return NextResponse.json(
        { error: 'Subsidy not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(subsidy);
  } catch (error) {
    console.error('Error fetching subsidy:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subsidy' },
      { status: 500 }
    );
  }
}