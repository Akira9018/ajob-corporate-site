import Marker from './Marker';
import { Arrow, Eyebrow } from './Site';
import Icon from './Icon';

const projects = [
  { id: 'line', en: 'BUSINESS WORKFLOW', title: 'LINEを窓口にした\n社内システム制作', lead: 'いつもの入口から、仕事が進む。', text: 'LINE公式アカウントを入口に、ブラウザで使える業務システムを制作。タイムカード、シフト希望、経費申請、雇用契約、掲示板まで、従業員が持っているLINEの中で完結します。実際に触れるデモを公開しています。', focus: '勤怠・請求書発行など、社内の業務に合わせて設計。利用者の権限はシステム側でも管理します。', note: 'LINE連携アプリはエステサロン・害虫駆除事業者への導入事例があります。デモは架空の会社・ダミーデータです。', tags: ['LINE連携', '業務設計', 'システム開発'], href: '/demo/kintai/', link: 'デモを触ってみる', external: true },
  { id: 'portal', en: 'REGIONAL PLATFORM', title: '地域限定の\n共同集客ポータル', lead: '5社で出し合い、地域を絞って集客する。', text: '自社サイトがない地域の中小企業が5社ほど集まり、広告費を出し合って自分たち専用の集客ポータルを持つ事業。制作・運用・広告までAJOBが担い、まずは堺・南大阪のリフォーム領域で試作サイトを構築しています。', focus: '全国ポータルでは競合に取られる問い合わせを、参加企業と地域を絞ることで取りこぼさない設計。AIで複数のポータルを少人数で運用できることが前提です。', note: '試作サイト内の口コミ・実績件数などはダミーデータです。運営成果を示すものではありません。', tags: ['共同集客', '地域限定広告', '事業の試作'], href: 'https://sakai-reform-portal.vercel.app/', link: '試作サイトを見る', external: true },
  { id: 'qr', en: 'CARE WORKFLOW', title: '服薬時の\nQR確認システム', lead: '現場の確認を、仕組みで支える。', text: '介護施設での服薬確認を支えるシステムづくり。QRを用いた確認の流れと、現場で扱いやすい操作を検討しています。', focus: '読み取った内容を確認するまでの流れを整理。現場の業務に合う操作や表示を考えながら開発を進めています。', note: '運用・有効性の検証を終えた製品ではありません。事故防止の効果を保証するものではありません。', tags: ['介護施設', '業務フロー', 'システム開発'] },
  { id: 'medical', en: 'ONLINE CONSULTATION', title: 'オンライン\n診療システム', lead: 'アクセスから診療まで、ひと続きに。', text: '医療法人向けに、URLからのアクセス、問診、オンライン診療へとつながる独自システムを開発しています。', focus: '利用者がたどる手順を整理し、問診から診療につながる導線を設計。個別の運用に合わせた仕組みづくりに取り組んでいます。', note: '個別の開発案件です。このサイトでは一般向けの診療受付は行っていません。', tags: ['医療法人', '導線設計', 'システム開発'] },
];

function ProjectVisual({ kind }: { kind: string }) {
  return <div className={`case-visual case-visual-${kind}`} aria-hidden="true">
    <span className="case-visual-label">{kind === 'portal' ? 'AREA CONNECTION' : kind === 'line' ? 'LIVE DEMO' : 'WORKFLOW DESIGN'}</span>
    {kind === 'portal' ? <><img className="case-town" src="/assets/illustrations/portal.webp" width="1536" height="1024" alt="" loading="lazy" /><div className="case-visual-strip"><span>参加5社</span><Arrow diagonal={false} /><strong>専用ポータル</strong><Arrow diagonal={false} /><span>地域のお客様</span></div></> : kind === 'line' ? <img className="case-phone" src="/assets/illustrations/line-demo.webp" width="780" height="1624" alt="" loading="lazy" /> : kind === 'qr' ? <div className="case-check-system"><div className="case-scan"><svg viewBox="0 0 100 100" fill="none"><path d="M5 30V5h25m40 0h25v25M5 70v25h25m40 0h25V70" stroke="currentColor" strokeWidth="3"/><path d="M22 22h18v18H22zm38 0h18v18H60zM22 60h18v18H22z" stroke="currentColor" strokeWidth="7"/><path d="M58 54h9v9h-9zm12 12h10v12H70zM50 72h10v8H50z" fill="currentColor"/></svg><span>QRを読み取る</span></div><span className="case-connector">→</span><div className="case-check-sheet"><Icon name="journal" size={42} /><strong>内容の確認</strong><div><span>対象の情報</span><i /></div><div><span>確認する内容</span><i /></div><p>表示内容と照合する</p></div></div> : <div className="case-medical-system">{[ ['01', 'URLから', 'アクセス', 'line-connect'], ['02', '事前の', '問診', 'journal'], ['03', 'オンライン', '診療', 'dialogue'] ].map(([n,a,b,icon]) => <div className="case-stage" key={n}><span>{n}</span><Icon name={icon as 'journal' | 'dialogue' | 'line-connect'} size={48} /><strong>{a}<br />{b}</strong></div>)}</div>}
    <span className="case-visual-caption">{kind === 'portal' ? '共同集客のコンセプト' : kind === 'line' ? 'デモ画面（ダミーデータ）' : '仕組みの構成イメージ'}</span>
  </div>;
}

export default function ProjectsSection({ full = false }: { full?: boolean }) {
  return <section id="projects" className={`case-section wrap ${full ? 'case-index' : 'section-space'} reveal`}>
    {!full && <div className="section-heading"><div><Eyebrow en="OUR PROJECTS">取り組み</Eyebrow><h2><Marker>現場の課題から、<br />生まれる仕組み。</Marker></h2></div><p>目の前の「困った」に向き合い、<br />一つずつ、かたちにしています。</p></div>}
    <div className="case-list">{(full ? projects : projects.slice(0, 2)).map((project, index) => <article className={`case-study case-${project.id}`} id={`project-${project.id}`} key={project.id}>
      <div className="case-topline"><span className="case-number">0{index + 1}<span> / {project.en}</span></span></div>
      <ProjectVisual kind={project.id} />
      <div className="case-copy"><p className="case-lead">{project.lead}</p><h3><Marker>{project.title.split('\n').map((line, i) => <span key={i}>{line}</span>)}</Marker></h3><ul className="case-tags">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul><p>{project.text}</p>{full && <div className="case-focus"><span>設計のポイント</span><p>{project.focus}</p></div>}
        {project.href && <a className="text-link" href={project.href} {...('external' in project && project.external ? { target: '_blank', rel: 'noreferrer' } : {})}>{project.link}{'external' in project && project.external && <span className="sr-only">（別タブ）</span>}<Arrow /></a>}<small>{project.note}</small></div>
    </article>)}</div>
    {!full && <a className="text-link case-all" href="/projects/">すべての取り組みを見る（全{projects.length}件） <Arrow /></a>}
  </section>;
}
