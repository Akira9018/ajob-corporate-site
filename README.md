# AJOB合同会社 — corporate website

React 19 / TypeScript / Vite 7 / npm を維持したコーポレートサイトです。既存の GitHub → Vercel の公開フローを引き続き利用します。Sites への移行は行っていません。

## 開発・検証

Node.js 22.18 以降または 24、npm、Python 3（静的HTML検証のみ）を使用します。

```sh
npm ci
npm run dev
```

本番相当の確認：

```sh
npm run build
npm test
npm run lint
npm run preview -- --host 127.0.0.1 --port 4173
```

`build` はクライアントのビルド後、Vite のSSRビルドと React の `renderToString` で14ページと404を静的HTML化します。追加フレームワーク・サーバー・CMSは不要です。`dist/` がVercelへの配信対象です。ページは通常のリンクで遷移し、各URLに直接アクセスできます。既存のVercelプロジェクトで `npm run build` / `dist` を使用してください。

`npm test` は問い合わせの模擬通信テストと、ビルド済みHTML・内部リンク・画像・サイトマップ・フォーム属性の検証を行います。実際のFormspreeへの通信は一切行いません。ブラウザ表示の検証は別途必要です。

## 構成

- `src/content.ts`：会社情報、事業3件、コラム3件、ルートとメタデータ
- `src/components/HomeSections.tsx`：トップページの構成
- `src/components/DetailPages.tsx`：事業詳細、会社情報、コラム本文など
- `src/components/Site.tsx`：共通ヘッダー・フッター・CTA・LINE画面イメージ
- `src/components/Contact.tsx` / `src/contactTransport.ts`：フォームと送信処理
- `src/index.css`：レスポンシブ、フォーカス、動きを抑える設定を含むスタイル
- `scripts/prerender.mjs`：静的HTML・ページ別メタデータ・構造化データ・sitemap / robotsの生成
- `public/assets/`：提供された個別画像から変換した軽量素材、独自SVGアイコン10種、正式ロゴ原本2点
- `src/components/Icon.tsx` / `BrandMark.tsx`：再利用アイコンと原本を保持したロゴの表示範囲調整
- `review/icon-catalog.html` / `review/icon-catalog.png`：公開ナビには載せないアイコン一覧

## 問い合わせ

既存の `https://formspree.io/f/mqalbgwy` を保持しています（メール通知）。受付成功後に、同じ内容を AJOBポータルの DB（管理画面 https://ajob-portal.vercel.app/admin の「問い合わせ」）にも記録します。記録先は環境変数 `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` で設定し、未設定なら記録をスキップします。DB 側の失敗は送信結果に影響しません。成功表示は受付サービスのHTTP成功応答後のみ表示します。失敗・タイムアウト時は入力を保持し、結果を確認できなかったことを表示します。ネイティブHTMLフォームにも同じPOST先を指定し、JavaScript無効時に個人情報がGETクエリへ入らないようにしています。

ユーザーの最終指示によりFormspreeの既存受信設定を維持しています。管理画面の受信先と実メール着信は未確認で、宛先変更・テストメール送信は行っていません。

## 原稿の更新

コラムは管理画面（https://ajob-portal.vercel.app/admin）の「記事」からサイト「AJOB合同会社 HP」を選んで書き、「公開」を押すと追加されます。公開・非公開・削除のたびに Vercel の Deploy Hook が呼ばれて自動で再ビルドされます（ビルド時に `scripts/fetch-journal.mjs` が Supabase から公開済みコラムを取得し、`src/generated/journal.json` に書き出して `src/journal.ts` で既存の形に変換）。Vercel の環境変数 `SUPABASE_URL` / `SUPABASE_ANON_KEY` が必要です。ローカルでビルドすると `journal.json` が書き換わりますが、リポジトリには空配列 `[]` のままで構いません。

コラムは `articles` に `slug`・カテゴリ・タイトル・説明・段落・関連事業を追加します。ルートとサイトマップは自動で更新されます。公開日の指定や架空の過去日付はありません。今回追加したコラム3本、代表メッセージ、サービス説明、プライバシー説明は、公開前に確認する新規原稿です。

会社概要は既存ソースの正しい表記を踏襲。オフィス写真は架空の生成画像として明示し、実在の執務場所や社員写真として扱っていません。試作サイトの口コミや件数を実績として転用していません。

## 公開前レビュー

進捗・検証結果・制約は [IMPLEMENTATION-REPORT.md](IMPLEMENTATION-REPORT.md)、具体的な画面確認手順は [REVIEW-CHECKLIST.md](REVIEW-CHECKLIST.md) を参照してください。独自ドメインの本番切り替えは、プレビューの確認後に行います。
