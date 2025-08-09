'use client';

import Link from 'next/link';
import { Subsidy } from '@/types/subsidy';
import { Building2, Users, DollarSign, ExternalLink } from 'lucide-react';

interface SubsidyCardProps {
  subsidy: Subsidy;
}

export default function SubsidyCard({ subsidy }: SubsidyCardProps) {
  const formatBudget = (budget: string) => {
    const num = parseInt(budget.replace(/,/g, ''));
    if (isNaN(num)) return budget;
    return new Intl.NumberFormat('ja-JP').format(num);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            <Link
              href={`/subsidies/${subsidy.id}`}
              className="hover:text-blue-600 transition-colors"
            >
              {subsidy['補助金名']}
            </Link>
          </h3>
          <p className="text-sm text-gray-600 line-clamp-3">
            {subsidy['補助金の概要']}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Building2 className="h-4 w-4" />
            <span>{subsidy['所管局']}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="h-4 w-4" />
            <span>{subsidy['補助対象者']}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <DollarSign className="h-4 w-4" />
            <span>{formatBudget(subsidy['令和６年度予算額（千円）'])} 千円</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <span className="text-xs text-gray-500">
            分野: {subsidy['施策分野']}
          </span>
          {subsidy['各局HPリンク'] && (
            <a
              href={subsidy['各局HPリンク']}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
            >
              詳細情報
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}