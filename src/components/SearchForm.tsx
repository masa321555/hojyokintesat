'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { SearchFilters } from '@/types/subsidy';

interface SearchFormProps {
  onSearch: (filters: SearchFilters) => void;
}

const targetOptions = [
  { value: '1', label: '区市町村' },
  { value: '3', label: '医療・福祉関係者' },
  { value: '4', label: 'その他民間団体' },
  { value: '5', label: '民間団体' },
  { value: '6', label: '一般都民' },
];

const fieldOptions = [
  { value: '01', label: '子供・子育て家庭への支援' },
  { value: '02', label: '高齢者への支援' },
  { value: '03', label: '障害者への支援' },
  { value: '04', label: '都民生活の支援' },
  { value: '05', label: '都民の健康づくりや医療提供体制' },
  { value: '06', label: '産業・労働' },
  { value: '07', label: '環境・エネルギー' },
  { value: '08', label: 'まちづくり' },
  { value: '09', label: '教育' },
  { value: '10', label: '文化・スポーツ' },
  { value: '11', label: '防災' },
  { value: '12', label: 'デジタル' },
  { value: '13', label: '交通政策' },
  { value: '14', label: '上下水道' },
  { value: '15', label: '病院経営' },
  { value: '16', label: '国際金融都市・特区・外国企業誘致' },
  { value: '17', label: 'その他' },
];

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [keyword, setKeyword] = useState('');
  const [selectedTargets, setSelectedTargets] = useState<string[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      keyword: keyword || undefined,
      targetCategories: selectedTargets.length > 0 ? selectedTargets : undefined,
      fieldCategories: selectedFields.length > 0 ? selectedFields : undefined,
    });
  };

  const handleTargetToggle = (value: string) => {
    setSelectedTargets(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  const handleFieldToggle = (value: string) => {
    setSelectedFields(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  const clearFilters = () => {
    setKeyword('');
    setSelectedTargets([]);
    setSelectedFields([]);
    onSearch({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-2">
          キーワード検索
        </label>
        <div className="relative">
          <input
            type="text"
            id="keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="補助金名、事業名、概要で検索"
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          利用者区分
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {targetOptions.map(option => (
            <label
              key={option.value}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                value={option.value}
                checked={selectedTargets.includes(option.value)}
                onChange={() => handleTargetToggle(option.value)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          補助金分野
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {fieldOptions.map(option => (
            <label
              key={option.value}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                value={option.value}
                checked={selectedFields.includes(option.value)}
                onChange={() => handleFieldToggle(option.value)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => console.log('Search button clicked')}
        >
          検索する
        </button>
        <button
          type="button"
          onClick={clearFilters}
          className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          <X className="h-4 w-4" />
          クリア
        </button>
      </div>
    </form>
  );
}