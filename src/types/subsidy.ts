export interface Subsidy {
  id: string;
  '年度': string;
  '所管局№': string;
  '所管局': string;
  '施策分野№': string;
  '施策分野': string;
  '事業名': string;
  '補助金名': string;
  '補助金の概要': string;
  '補助対象者№': string;
  '補助対象者': string;
  '令和６年度予算額（千円）': string;
  '所管部署': string;
  '問い合わせ先': string;
  '各局HPリンク': string;
}

export enum TargetCategory {
  区市町村 = "1",
  企業個人事業主 = "2",
  医療福祉関係者 = "3",
  その他民間団体 = "4",
  民間団体 = "5",
  一般都民 = "6",
}

export enum FieldCategory {
  子供家庭 = "01",
  高齢者支援 = "02",
  障害者支援 = "03",
  都民生活支援 = "04",
  健康医療 = "05",
  産業労働 = "06",
  環境エネルギー = "07",
  まちづくり = "08",
  教育 = "09",
  文化スポーツ = "10",
  防災 = "11",
  デジタル = "12",
  交通政策 = "13",
  上下水道 = "14",
  病院経営 = "15",
  国際金融都市特区外国企業誘致 = "16",
  その他 = "17",
}

export interface SearchFilters {
  keyword?: string;
  targetCategories?: string[];
  fieldCategories?: string[];
}

export interface SearchResult {
  subsidies: Subsidy[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}