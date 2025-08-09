import { NextResponse } from 'next/server';
import { loadSubsidies } from '@/lib/csv-loader';

export async function GET() {
  try {
    console.log('Test endpoint called');
    const subsidies = await loadSubsidies();
    
    return NextResponse.json({
      success: true,
      totalCount: subsidies.length,
      firstItem: subsidies.length > 0 ? subsidies[0] : null,
      headers: subsidies.length > 0 ? Object.keys(subsidies[0]) : []
    });
  } catch (error) {
    console.error('Test endpoint error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}