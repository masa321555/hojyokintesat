# 東京都補助金検索システム

東京都および関連団体が提供する各種補助金・助成金情報を一元的に検索・閲覧できるWebアプリケーションです。

## 機能

- **検索機能**: キーワード、利用者区分、施策分野による絞り込み検索
- **一覧表示**: 検索結果の一覧表示とページネーション
- **詳細表示**: 各補助金の詳細情報表示
- **レスポンシブデザイン**: PC・タブレット・スマートフォンに対応

## 技術スタック

- **フロントエンド**: Next.js 15, React 19, TypeScript
- **スタイリング**: Tailwind CSS
- **データ取得**: React Query
- **アイコン**: Lucide React

## セットアップ

1. 依存関係のインストール
```bash
npm install
```

2. 開発サーバーの起動
```bash
npm run dev
```

3. ブラウザで http://localhost:3000 にアクセス

## プロジェクト構成

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   └── subsidies/     # 補助金検索API
│   ├── subsidies/[id]/    # 補助金詳細ページ
│   └── page.tsx           # トップページ
├── components/            # Reactコンポーネント
│   ├── SearchForm.tsx     # 検索フォーム
│   ├── SubsidyCard.tsx    # 補助金カード
│   └── Pagination.tsx     # ページネーション
├── hooks/                 # カスタムフック
│   └── useSubsidies.ts    # 補助金データ取得フック
├── lib/                   # ユーティリティ関数
│   ├── csv-parser.ts      # CSVパーサー
│   └── search.ts          # 検索ロジック
└── types/                 # TypeScript型定義
    └── subsidy.ts         # 補助金関連の型定義
```

## データソース

補助金データは`public/data/hojokin2024.csv`から読み込まれます。

## 今後の拡張予定

- 多言語対応（日本語・英語）
- AI/チャットボットによる補助金推薦機能
- 申請書類作成支援機能
- メール通知機能（新着・締切アラート）
# Force rebuild
