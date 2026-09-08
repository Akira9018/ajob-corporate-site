import Marker from './Marker';
import BrandMark from './BrandMark';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { nav, services } from '../content';
export function Arrow({ diagonal = true }: {
  diagonal?: boolean;
}) { return <span aria-hidden="true" className="arrow">{diagonal ? '↗' : '→'}</span>; }
export function LinkButton({ href, children, light = false }: {
  href: string;
  children: ReactNode;
  light?: boolean;
}) {
  return <a className={`button ${light ? 'button-light' : ''}`} href={href}>{children}<Arrow />
  </a>;
}
export function Eyebrow({ en, children }: {
  en: string;
  children: ReactNode;
}) {
  return <p className="eyebrow">
    <span>{en}</span>
    <span className="eyebrow-dot" aria-hidden="true" />{children}</p>;
}
export function Header({ path }: {
  path: string;
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        document.getElementById('menu-toggle')?.focus();
      }
    };
    if (open) window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);
  return <header className="site-header">
    <a className="brand-home" href="/" aria-label="AJOB ホーム">
      <BrandMark variant="horizontal" className="header-brand-wide" />
      <BrandMark variant="symbol" className="header-brand-symbol" />
    </a>
    <button id="menu-toggle" className="menu-toggle" aria-controls="site-nav" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? '閉じる −' : 'メニュー ＋'}</button>
    <nav id="site-nav" aria-label="メインナビゲーション" className={open ? 'navigation is-open' : 'navigation'}>{nav.map(([text, url]) => <a href={url} key={url} aria-current={path.startsWith(url) ? 'page' : undefined}>{text}</a>)}<a className="header-contact" href="/contact/" aria-current={path === '/contact/' ? 'page' : undefined}>お問い合わせ <Arrow />
    </a>
    </nav>
  </header>;
}
export function Footer() {
  return <footer className="site-footer">
    <div className="footer-top">
      <div>
        <a className="footer-brand-link" href="/" aria-label="AJOB ホーム">
          <BrandMark variant="symbol" className="footer-brand" />
        </a>
        <p>AJOB合同会社</p>
        <p className="footer-tagline">アイデアに、実行力を。</p>
      </div>
      <div className="footer-links">
        <div>
          <a href="/about/">私たちについて</a>
          <a href="/company/">会社情報</a>
          <a href="/contact/">お問い合わせ</a>
          <a href="/privacy/">プライバシーポリシー</a>
        </div>
        <div>
          <a href="/services/">事業紹介</a>{services.map(s => <a className="footer-sub" href={`/services/${s.slug}/`} key={s.slug}>{s.title}</a>)}</div>
        <div>
          <a href="/projects/">取り組み</a>
          <a href="/journal/">コラム</a>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <span>© AJOB LLC.</span>
      <span>THINK. BUILD. IMPROVE.</span>
      <a href="#top">ページ上部へ ↑</a>
    </div>
  </footer>;
}
export function ContactBanner() {
  return <section className="contact-banner wrap reveal">
    <div>
      <Eyebrow en="LET’S TALK">無料相談</Eyebrow>
      <h2><Marker>まずは、お話ししませんか。</Marker></h2>
      <p>まだ言葉になっていないアイデアも、どうぞ。</p>
    </div>
    <LinkButton href="/contact/">無料で相談する</LinkButton>
    <span className="banner-star" aria-hidden="true">✳</span>
  </section>;
}
export function Breadcrumb({ items }: {
  items: [
    string,
    string?
  ][];
}) {
  return <nav aria-label="パンくずリスト" className="breadcrumb wrap">
    <a href="/">ホーム</a>{items.map(([text, url]) => <span key={text}>
      <span aria-hidden="true">／</span>{url ? <a href={url}>{text}</a> : <span aria-current="page">{text}</span>}</span>)}</nav>;
}
export function PageIntro({ en, title, text }: {
  en: string;
  title: string;
  text?: string;
}) {
  return <div className="page-intro wrap">
    <Eyebrow en={en}>AJOB</Eyebrow>
    <h1><Marker>{title}</Marker></h1>{text && <p>{text}</p>}</div>;
}
export function LineDiagram({ interactive = false }: {
  interactive?: boolean;
}) {
  const [role, setRole] = useState<'customer' | 'staff'>('customer');
  return <div className={`line-diagram ${interactive ? 'interactive' : ''}`}>
    <div className="line-entry">LINE公式アカウント<span>仕事につながる入口</span>
    </div>
    <div className="diagram-stem" aria-hidden="true">↓</div>
    {interactive && <div className="role-switch" role="group" aria-label="画面イメージの切り替え">
      <button onClick={() => setRole('customer')} aria-pressed={role === 'customer'}>お客様の画面</button>
      <button onClick={() => setRole('staff')} aria-pressed={role === 'staff'}>従業員の画面</button>
    </div>}
    <div className="phone-pair">{(['customer', 'staff'] as const).filter(r => !interactive || role === r).map(r => <div className={`phone ${r}`} key={r}>
      <span className="phone-speaker" aria-hidden="true" />
      <p>{r === 'customer' ? 'お客様メニュー' : 'スタッフメニュー'}</p>{(r === 'customer' ? ['依頼する', '利用状況', '支払い情報'] : ['勤怠を入力', '請求書を発行', '対応状況']).map((label, i) => <div className="phone-item" key={label}>
        <span aria-hidden="true">{['↗', '◷', '▤'][i]}</span>{label}<span aria-hidden="true">›</span>
      </div>)}<span className="phone-bottom" aria-hidden="true" />
    </div>)}</div>
    <small>機能・画面はイメージです</small>
  </div>;
}
