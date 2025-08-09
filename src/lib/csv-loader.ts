import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { Subsidy } from '@/types/subsidy';

let cachedSubsidies: Subsidy[] | null = null;

// キャッシュをクリアする関数
export function clearCache() {
  cachedSubsidies = null;
}

export async function loadSubsidies(): Promise<Subsidy[]> {
  if (cachedSubsidies) {
    return cachedSubsidies;
  }

  try {
    const csvPath = path.join(process.cwd(), 'public', 'data', 'hojokin2024.csv');
    
    // BOM付きUTF-8ファイルを読み込む
    let csvContent = fs.readFileSync(csvPath, 'utf-8');
    
    // BOMを削除
    if (csvContent.charCodeAt(0) === 0xFEFF) {
      csvContent = csvContent.slice(1);
    }
    
    // csv-parseを使用してパース
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      relax_quotes: true,
      relax_column_count: true
    });
    
    const subsidies: Subsidy[] = records.map((record: any, index: number) => {
      const subsidy: Subsidy = {
        id: `${record['年度'] || ''}-${record['所管局№'] || ''}-${index + 1}`,
        '年度': record['年度'] || '',
        '所管局№': record['所管局№'] || '',
        '所管局': record['所管局'] || '',
        '施策分野№': record['施策分野№'] || '',
        '施策分野': record['施策分野'] || '',
        '事業名': record['事業名'] || '',
        '補助金名': record['補助金名'] || '',
        '補助金の概要': record['補助金の概要'] || '',
        '補助対象者№': record['補助対象者№'] || '',
        '補助対象者': record['補助対象者'] || '',
        '令和６年度予算額（千円）': record['令和６年度予算額（千円）'] || '',
        '所管部署': record['所管部署'] || '',
        '問い合わせ先': record['問い合わせ先'] || '',
        '各局HPリンク': record['各局HPリンク'] || ''
      };
      
      return subsidy;
    });
    
    cachedSubsidies = subsidies;
    return subsidies;
  } catch (error) {
    console.error('Error loading CSV:', error);
    throw error;
  }
}