// ビルド前にプラットフォーム (ajob-portal の Supabase) から公開済みコラムを取得して src/generated/journal.json に書く。
// 環境変数が無い・取得に失敗したときは既存ファイルを残して終了する (ビルドは落とさない)。
import { writeFile } from 'node:fs/promises'

const url = process.env.SUPABASE_URL
const key = process.env.SUPABASE_ANON_KEY
const out = new URL('../src/generated/journal.json', import.meta.url)

if (!url || !key) {
  console.warn('[journal] SUPABASE_URL / SUPABASE_ANON_KEY が未設定のため、既存の journal.json を使います')
  process.exit(0)
}
try {
  const res = await fetch(`${url.replace(/\/$/, '')}/rest/v1/rpc/published_articles`, {
    method: 'POST',
    headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ p_site_slug: 'ajob-hp' }),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`)
  const rows = await res.json()
  if (!Array.isArray(rows)) throw new Error('unexpected response')
  const articles = rows.map(r => ({
    slug: r.slug, title: r.title, excerpt: r.excerpt ?? '', body: r.body ?? '',
    article_type: r.article_type ?? 'general', keywords: r.keywords ?? [], published_at: r.published_at ?? r.created_at ?? null,
  }))
  await writeFile(out, JSON.stringify(articles, null, 2) + '\n')
  console.log(`[journal] ${articles.length} 本のコラムを取得しました`)
} catch (e) {
  console.warn('[journal] 取得に失敗したため、既存の journal.json を使います:', e.message)
}
