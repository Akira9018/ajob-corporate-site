# アクセス解析の標準構成（AJOB HP・地域ポータル共通）

AJOBが運営するサイトはすべてこの3点セットで計測する。

| ツール | 目的 | 費用 | Claudeが数字を読める? |
|---|---|---|---|
| Google Search Console | SEO。どの検索語で表示・クリックされたか | 無料 | 所有権確認後、APIまたはブラウザ経由で可 |
| Google アナリティクス 4（GA4） | 訪問数・流入元・問い合わせ等のコンバージョン。Google広告/Meta広告と連携 | 無料 | サービスアカウントを閲覧者に追加すればAPIで可 |
| Vercel Web Analytics | 即日で見られる簡易ダッシュボード | Proプランに含む | Vercel MCPで直接可 |

ポータルサイト（広告費を使うサイト）はGA4が必須。広告のコンバージョン計測と参加企業別の問い合わせ集計に使う。

---

## 1. Vercel Web Analytics（5分）

1. https://vercel.com → 対象プロジェクト → 上部タブ **Analytics** → **Enable**
2. コード側は `index.html` に下記1行が入っていればよい（AJOB HPは追加済み）
   ```html
   <script defer src="/_vercel/insights/script.js"></script>
   ```
3. デプロイ後、数分で Analytics タブに訪問数が出る

## 2. Google アナリティクス 4（15分）

1. https://analytics.google.com → 左下の歯車 **管理** → **アカウントを作成**
   - アカウント名: `AJOB`（1つのアカウントに全サイトのプロパティをぶら下げる）
2. **プロパティを作成**
   - プロパティ名: `AJOB HP`（ポータルは `堺リフォームポータル` のようにサイト名）
   - タイムゾーン: 日本 / 通貨: 円
3. **データストリーム** → **ウェブ** → URL `https://www.ajobllc.com` → ストリーム名はサイト名
4. 表示される **測定ID（G-XXXXXXXXXX）** をClaudeに渡す → タグを埋め込んでデプロイ
5. 管理 → **データの収集と修正** → **データの保持** を「14か月」に変更（既定は2か月で短い）
6. 管理 → **プロダクトのリンク** → **Search Console のリンク** でSearch Consoleと接続

### コンバージョン（キーイベント）の定義
ポータルサイトでは以下をイベントとして送り、管理 → **キーイベント** で印を付ける。
- `contact_submit` … 問い合わせフォーム送信（パラメータ `company` に振り分け先の参加企業）
- `tel_click` … 電話番号タップ
- `line_click` … LINE友だち追加タップ

参加企業ごとの問い合わせ数は `company` パラメータで集計できる。

**AJOB HP での実装（2026-10-06）**: `src/analytics.ts` の `trackEvent()` 経由で送信。
- `contact_submit` … フォーム送信が受付サービスに受理されたとき（パラメータ `inquiry_type` = ご相談の内容）
- `contact_error` … 送信失敗（パラメータ `reason` = server / network / timeout）
- 電話・LINEのリンクは HP に無いため `tel_click` / `line_click` は未実装

GA4 の新UIでは、イベントが一度受信されてから **管理 → データの表示 → イベント → 最近のイベント** で☆を付けてキーイベントにする（事前登録はできない）。

## 3. Google Search Console（10分）

1. https://search.google.com/search-console → **プロパティを追加**
2. 右側の **URL プレフィックス** に `https://www.ajobllc.com/` を入力
3. 確認方法で **HTML タグ** を選び、表示される `content="..."` の値をClaudeに渡す → メタタグを埋め込んでデプロイ
4. **確認** を押す
5. 左メニュー **サイトマップ** → `https://www.ajobllc.com/sitemap.xml` を送信
6. 同じアカウントでGA4を作っていれば、上記2-6のリンクで両者が接続される

※ ドメインプロパティ（DNS確認）でもよいが、DNSレコードの追加が必要になるのでURLプレフィックスの方が簡単。

## 4. Claudeが数字を読めるようにする（任意・後で）

- GA4: Google Cloud でサービスアカウントを作り、そのメールアドレスをGA4プロパティの **閲覧者** に追加。鍵ファイルをMac Miniに置くと、月次レポートを自動生成できる
- Search Console: 同じサービスアカウントを **制限付きユーザー** として追加
- Vercel: 設定不要（MCP経由で読める）

## 5. 見る指標と頻度

| 頻度 | 見るもの | どこで |
|---|---|---|
| 毎週 | 訪問数、流入元、問い合わせ数 | Vercel Analytics / GA4 |
| 毎月 | 検索語ごとの表示回数・クリック率、伸びている記事、次に書くテーマ | Search Console |
| ポータル運用中は毎週 | 広告費、参加企業別の問い合わせ数、問い合わせ単価 | GA4 + 広告管理画面 |

## 6. 新しいサイトを作るときのチェックリスト

- [ ] Vercel Analytics を有効化し、scriptタグを入れる
- [ ] GA4プロパティを `AJOB` アカウント内に作り、測定IDを埋め込む
- [ ] Search Console にURLプレフィックスで登録、サイトマップ送信、GA4とリンク
- [ ] コンバージョンイベント（問い合わせ・電話・LINE）を実装し、キーイベントに登録
- [ ] プライバシーポリシーに解析ツールの利用を明記
- [ ] 広告を出す場合は Google広告 / Meta にGA4のコンバージョンを連携
