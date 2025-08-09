import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Building2, Users, DollarSign, Phone, ExternalLink, FileText } from 'lucide-react';
import { loadSubsidies } from '@/lib/csv-loader';

export default async function SubsidyDetailPage({
  params
}: {
  params: { id: string }
}) {
  // サーバーサイドでデータを取得
  const subsidies = await loadSubsidies();
  const subsidy = subsidies.find(s => s.id === params.id);

  if (!subsidy) {
    notFound();
  }

  const formatBudget = (budget: string) => {
    const num = parseInt(budget.replace(/,/g, ''));
    if (isNaN(num)) return budget;
    return new Intl.NumberFormat('ja-JP').format(num);
  };

  const formatDescription = (text: string) => {
    return text.split('\n').map((line, index) => (
      <p key={index} className="mb-2">
        {line}
      </p>
    ));
  };

  // 補助金の概要から重要な情報を抽出
  const extractKeyInfo = (description: string) => {
    const info = {
      purpose: '',
      targetDetails: '',
      amount: '',
      ratio: '',
      howToApply: ''
    };

    const lines = description.split('\n');
    lines.forEach(line => {
      if (line.includes('補助金の目的')) {
        info.purpose = line.replace(/補助金の目的[：:]/g, '').trim();
      } else if (line.includes('補助対象者')) {
        info.targetDetails = line.replace(/補助対象者[：:]/g, '').trim();
      } else if (line.includes('補助対象経費')) {
        info.howToApply = line.replace(/補助対象経費[：:]/g, '').trim();
      } else if (line.includes('負担割合') || line.includes('補助率')) {
        info.ratio = line.replace(/負担割合[：:]/g, '').replace(/補助率[：:]/g, '').trim();
      } else if (line.includes('上限') || line.includes('補助額')) {
        info.amount = line;
      }
    });

    return info;
  };

  const keyInfo = extractKeyInfo(subsidy['補助金の概要']);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>検索に戻る</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              {subsidy['補助金名']}
            </h1>

            {/* 重要情報カード */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <h3 className="font-bold text-blue-900">誰が申請できる？</h3>
                </div>
                <p className="text-blue-800 font-medium">{subsidy['補助対象者']}</p>
                {keyInfo?.targetDetails && (
                  <p className="text-sm text-blue-700 mt-2">{keyInfo.targetDetails}</p>
                )}
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <h3 className="font-bold text-green-900">いくらもらえる？</h3>
                </div>
                <p className="text-green-800 font-medium">
                  予算総額: {formatBudget(subsidy['令和６年度予算額（千円）'])} 千円
                </p>
                {keyInfo?.amount && (
                  <p className="text-sm text-green-700 mt-2">{keyInfo.amount}</p>
                )}
                {keyInfo?.ratio && (
                  <p className="text-sm text-green-700">{keyInfo.ratio}</p>
                )}
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-5 w-5 text-purple-600" />
                  <h3 className="font-bold text-purple-900">何のため？</h3>
                </div>
                <p className="text-purple-800 font-medium">{subsidy['施策分野']}</p>
                {keyInfo?.purpose && (
                  <p className="text-sm text-purple-700 mt-2">{keyInfo.purpose}</p>
                )}
              </div>
            </div>

            {/* 事業名 */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-bold text-gray-700 mb-2">関連する事業</h3>
              <p className="text-gray-700">{subsidy['事業名']}</p>
            </div>
          </div>

          {/* 詳しい説明 */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">詳しく</span>
              補助金について
            </h2>
            <div className="bg-orange-50 rounded-lg p-6 text-gray-700">
              {formatDescription(subsidy['補助金の概要'])}
            </div>
          </div>

          {/* 申請方法 */}
          <div className="border-t pt-6 mt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">申請</span>
              どうやって申請する？
            </h2>
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="font-bold text-gray-800">まず問い合わせる</h4>
                    <p className="text-gray-700">下記の連絡先に電話して、申請について相談しましょう。</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="font-bold text-gray-800">必要書類を準備</h4>
                    <p className="text-gray-700">担当者から必要な書類を教えてもらい、準備します。</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="font-bold text-gray-800">申請書を提出</h4>
                    <p className="text-gray-700">書類が揃ったら、指定された方法で申請します。</p>
                  </div>
                </div>
              </div>
              {keyInfo?.howToApply && (
                <div className="mt-4 p-4 bg-white rounded-lg">
                  <p className="text-sm text-gray-700">
                    <span className="font-bold">補助対象となる経費：</span>
                    {keyInfo.howToApply}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* お問い合わせ先 */}
          <div className="border-t pt-6 mt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">連絡先</span>
              お問い合わせはこちら
            </h2>
            <div className="bg-red-50 rounded-lg p-6 space-y-4">
              <div className="flex items-start gap-3">
                <Building2 className="h-6 w-6 text-red-600 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-800">担当部署</h4>
                  <p className="text-gray-700">{subsidy['所管部署']}</p>
                </div>
              </div>
              
              {subsidy['問い合わせ先'] && (
                <div className="flex items-start gap-3">
                  <Phone className="h-6 w-6 text-red-600 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-800">電話番号</h4>
                    <p className="text-gray-700 text-lg">{subsidy['問い合わせ先']}</p>
                    <p className="text-sm text-gray-600 mt-1">平日の営業時間内にお電話ください</p>
                  </div>
                </div>
              )}
              
              {subsidy['各局HPリンク'] && (
                <div className="mt-4 pt-4 border-t border-red-200">
                  <a
                    href={subsidy['各局HPリンク']}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    詳しい情報を見る
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}