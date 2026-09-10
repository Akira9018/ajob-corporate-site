// プラットフォーム (管理画面) で公開したコラムを、このサイトのコラムの形に変換する。
// 取得は scripts/fetch-journal.mjs がビルド前に行い、結果が src/generated/journal.json に入る。
import journal from './generated/journal.json';

export interface JournalSection { title: string; paragraphs: string[] }
export interface JournalArticle {
  slug: string; category: string; color: string; number: string; symbol: string;
  title: string; description: string; service: string; intro: string;
  sections: JournalSection[]; sources?: { title: string; url: string }[];
}
interface PlatformArticle {
  slug: string; title: string; excerpt: string; body: string;
  article_type: string; keywords: string[]; published_at: string | null;
}

const COLORS = ['lavender', 'mint', 'peach'];
const CATEGORY_LABEL: Record<string, string> = { price: '費用について', howto: '進め方', case: '事例', season: '季節の話題' };

function pickService(a: PlatformArticle) {
  const text = [a.title, a.excerpt, a.body, ...a.keywords].join(' ');
  if (/ポータル|集客/.test(text)) return 'regional-portal';
  if (/LINE/i.test(text)) return 'line-app';
  return 'ai-advisory';
}

function pickCategory(a: PlatformArticle) {
  const kw = a.keywords.find(k => ['AI活用', '業務改善', '地域ビジネス'].includes(k));
  if (kw) return kw;
  if (a.keywords[0]) return a.keywords[0];
  return CATEGORY_LABEL[a.article_type] ?? 'コラム';
}

/** Markdown を「## 見出し」ごとの節に分け、段落の配列にする。箇条書きは「・」付きの1段落にまとめる。 */
function toSections(markdown: string, fallbackTitle: string): JournalSection[] {
  const sections: JournalSection[] = [];
  let current: JournalSection = { title: fallbackTitle, paragraphs: [] };
  let buffer: string[] = [];
  let list: string[] = [];
  const flushText = () => {
    if (buffer.length) current.paragraphs.push(buffer.join(''));
    buffer = [];
  };
  const flushList = () => {
    if (list.length) current.paragraphs.push(list.map(item => `・${item}`).join('　'));
    list = [];
  };
  const clean = (s: string) => s.replace(/\*\*(.+?)\*\*/g, '$1').replace(/`(.+?)`/g, '$1').replace(/\[(.+?)\]\((.+?)\)/g, '$1').replace(/!\[.*?\]\(.*?\)/g, '').trim();
  for (const raw of markdown.split(/\r?\n/)) {
    const line = raw.trimEnd();
    const h2 = line.match(/^##\s+(.+)/);
    if (h2 && !line.startsWith('###')) {
      flushText(); flushList();
      if (current.paragraphs.length || sections.length === 0 && current.title !== fallbackTitle) sections.push(current);
      current = { title: clean(h2[1]), paragraphs: [] };
      continue;
    }
    const h3 = line.match(/^###\s+(.+)/);
    if (h3) { flushText(); flushList(); current.paragraphs.push(clean(h3[1])); continue; }
    const li = line.match(/^\s*(?:[-*・]|\d+\.)\s+(.+)/);
    if (li) { flushText(); list.push(clean(li[1])); continue; }
    if (line.trim() === '') { flushText(); flushList(); continue; }
    if (/^\|/.test(line) || /^#/.test(line) || /^---/.test(line)) continue; // 表・h1・罫線は静的サイトでは省く
    flushList();
    buffer.push(clean(line));
  }
  flushText(); flushList();
  if (current.paragraphs.length) sections.push(current);
  return sections.length ? sections : [{ title: fallbackTitle, paragraphs: [markdown.trim()] }];
}

export function platformArticles(startNumber: number): JournalArticle[] {
  const rows = (journal as PlatformArticle[])
    .slice()
    .sort((a, b) => (b.published_at ?? '').localeCompare(a.published_at ?? ''));
  return rows.map((a, i) => ({
    slug: a.slug,
    category: pickCategory(a),
    color: COLORS[(startNumber - 1 + i) % COLORS.length],
    number: String(startNumber + i).padStart(2, '0'),
    symbol: '✎',
    title: a.title,
    description: a.excerpt || a.title,
    service: pickService(a),
    intro: a.excerpt || a.title,
    sections: toSections(a.body, a.title),
  }));
}
