import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const csvPath = path.join(process.cwd(), 'public', 'data', 'hojokin2024.csv');
    
    // ファイルの存在確認
    const exists = fs.existsSync(csvPath);
    
    if (!exists) {
      return NextResponse.json({
        error: 'CSV file not found',
        path: csvPath
      });
    }
    
    // ファイルの最初の1000バイトを読み込む
    const buffer = fs.readFileSync(csvPath);
    const firstBytes = buffer.slice(0, 1000).toString('utf-8');
    
    // BOMの確認
    const hasBOM = buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF;
    
    // 改行で分割
    const lines = firstBytes.split(/\r?\n/);
    
    // 最初の行（ヘッダー）を取得
    const firstLine = lines[0];
    const secondLine = lines[1] || '';
    
    // カンマで分割（簡易的）
    const headers = firstLine.split(',');
    const firstRow = secondLine.split(',');
    
    return NextResponse.json({
      fileExists: exists,
      filePath: csvPath,
      fileSize: fs.statSync(csvPath).size,
      hasBOM,
      firstLineLength: firstLine.length,
      headerCount: headers.length,
      headers: headers.slice(0, 5).map(h => h.trim()),
      firstRowFieldCount: firstRow.length,
      firstRowSample: firstRow.slice(0, 5).map(f => f.trim()),
      debug: {
        firstLine: firstLine.substring(0, 200),
        secondLine: secondLine.substring(0, 200)
      }
    });
  } catch (error) {
    console.error('Debug error:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}