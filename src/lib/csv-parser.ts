import { Subsidy } from '@/types/subsidy';

export async function parseCSV(csvPath: string): Promise<Subsidy[]> {
  const response = await fetch(csvPath);
  const text = await response.text();
  
  const lines = text.split('\n').filter(line => line.trim());
  const headers = lines[0].split(',');
  
  const subsidies: Subsidy[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length === headers.length) {
      const subsidy: any = {};
      headers.forEach((header, index) => {
        subsidy[header.trim().replace(/^"|"$/g, '')] = values[index];
      });
      subsidy.id = `${subsidy['年度']}-${subsidy['所管局№']}-${i}`;
      subsidies.push(subsidy as Subsidy);
    }
  }
  
  return subsidies;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}