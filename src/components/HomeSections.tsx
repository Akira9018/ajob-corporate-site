import Marker from './Marker';
import type { CSSProperties } from 'react';
import AnimatedHeading from './AnimatedHeading';
import BrandMark from './BrandMark';
import Icon from './Icon';
import { serviceIcons, articleIcons } from '../iconMap';
import { articles, company, services } from '../content';
import { Arrow, Eyebrow, LineDiagram, LinkButton } from './Site';
export function Hero() {
  return <>
    <section className="hero hero-impact wrap">
      <span className="hero-outline-word" aria-hidden="true">MAKE IT</span>
      <div className="hero-copy">
        <p className="hero-kicker">THINK. BUILD. IMPROVE.</p>
        <h1 aria-label="アイデアに、実行力を。"><span className="hero-idea-spark" aria-hidden="true">✦</span>{['アイデアに、', '実行力を。'].map((line, row) => <span className={`hero-title-mask hero-title-row-${row}`} aria-hidden="true" key={line}><span>{Array.from(line).map((character, index) => <span className="hero-glyph" key={index} style={{ '--glyph-order': index + row * 6, '--glyph-accent': ['#8b74c9', '#4f9c7c', '#d98b5e'][index % 3] } as CSSProperties}><span className="hero-glyph-ink">{character}</span></span>)}</span></span>)}</h1>
        <p className="hero-lead">AIの相談から、仕組みの開発まで。<br />会社の「次」を、一緒につくる。</p>
        <div className="hero-actions">
          <LinkButton href="/about/">AJOBについて</LinkButton>
          <LinkButton href="/contact/" light>無料で相談する</LinkButton>
        </div>
      </div>
      <div className="hero-art">
        <img src="/assets/illustrations/hero.webp" width="1536" height="1024" alt="アイデアを仕組みにつなげる二人のパートナー" fetchPriority="high" />
        <span className="hero-spark" aria-hidden="true">✦</span>
        <span className="hero-art-orbit" aria-hidden="true" />
        <div className="hero-note" aria-hidden="true">FROM IDEA<br />
          <span>TO ACTION.</span>
        </div>
      </div>
      <span className="scroll-cue" aria-hidden="true">SCROLL TO EXPLORE ↓</span>
    </section>
    <div className="ribbon-window" aria-hidden="true">
      <div className="ribbon">MAKE IT HAPPEN.<span>MAKE IT HAPPEN.</span>
      </div>
    </div>
  </>;
}
export function AboutSection({ full = false }: {
  full?: boolean;
}) {
  return <section id="about" className="about-section wrap section-space reveal">
    <div className="about-copy">
      <Eyebrow en="ABOUT US">私たちについて</Eyebrow>
      <AnimatedHeading lines={['会社のそばに、', 'つくれるパートナーを。']} />
      <p>AJOBは、経営者のアイデアと現場の課題を、<br className="desktop-break" />使える仕組みに変える会社です。</p>
      <p>話を聞く。整理する。つくる。そして、育てる。<br className="desktop-break" />相談から開発、その後の改善まで、<br className="desktop-break" />一緒に考え、一緒に動きます。</p>{!full && <a className="text-link" href="/about/">私たちの考え方 <Arrow />
      </a>}</div>
    <div className="about-art">
      <img src="/assets/illustrations/about.webp" width="1536" height="1024" alt="同じ計画を手に、一緒に次の一歩を考える二人" loading="lazy" />
      <span className="art-caption">YOUR IDEA, OUR NEXT STEP.</span>
    </div>
  </section>;
}
export function ServicesSection({ full = false }: {
  full?: boolean;
}) {
  return <section id="services" className={`services-section wrap ${full ? '' : 'section-space'} reveal`}>{!full && <div className="section-heading">
    <div>
      <Eyebrow en="OUR BUSINESS">事業紹介</Eyebrow>
      <AnimatedHeading lines={['実行力を、', 'いろいろなかたちで。']} />
    </div>
    <p>相談から、日々の業務、地域の集客まで。<br />三つの事業で、会社の次の一歩を支えます。</p>
  </div>}<div className="service-grid">{services.map(s => <a href={`/services/${s.slug}/`} className={`service-card ${s.color}`} key={s.slug}>
    <div className="service-top">
      <span className="service-number">{s.number}</span>
      <div className="service-meta"><Icon name={serviceIcons[s.slug]} size={44} /><span className="service-en">{s.en}</span></div>
    </div>
    <h3><Marker>{s.title}</Marker></h3>
    <p className="service-headline">{s.headline}</p>
    <p className="service-description">{s.description}</p>
    <div className="service-art">{s.image ? <img src={`/assets/illustrations/${s.image}.webp`} width="1536" height="1024" alt="" loading="lazy" /> : <LineDiagram />}</div>
    <span className="service-link">詳しく見る <span className="circle-arrow">
      <Arrow />
    </span>
    </span>
  </a>)}</div>
  </section>;
}
export { default as ProjectsSection } from './ProjectsSection';
export function ArticleCards() {
  return <div className="article-grid">{articles.map(a => <a className="article-card" href={`/journal/${a.slug}/`} key={a.slug}>
    <div className={`article-cover ${a.color}`} aria-hidden="true">
      <span className="cover-label">AJOB JOURNAL — {a.number}</span>
      <span className="cover-word">{a.category === 'AI活用' ? 'THINK' : a.category === '業務改善' ? 'CONNECT' : 'TOGETHER'}<br />
        <i>{a.category === 'AI活用' ? 'FIRST.' : a.category === '業務改善' ? 'THE DOTS.' : 'IS BETTER.'}</i>
      </span>
      <Icon name={articleIcons[a.service]} size={112} className="cover-icon" />
    </div>
    <span className="article-category">{a.category}</span>
    <h3><Marker>{a.title}</Marker></h3>
    <span className="article-read">コラムを読む <Arrow />
    </span>
  </a>)}</div>;
}
export function JournalSection() {
  return <section id="journal" className="journal-section wrap section-space reveal">
    <div className="section-heading">
      <div>
        <Eyebrow en="JOURNAL">コラム</Eyebrow>
        <AnimatedHeading lines={['仕事の「これから」を、', '少しずつ。']} />
      </div>
      <a className="text-link" href="/journal/">コラム一覧 <Arrow />
      </a>
    </div>
    <ArticleCards />
  </section>;
}
export function MessageSection() {
  return <section id="philosophy" className="message-section wrap reveal">
    <div>
      <Eyebrow en="OUR PHILOSOPHY">代表の考え</Eyebrow>
      <AnimatedHeading lines={['「やってみたい」を、', 'そのままにしない。']} />
      <p>何から始めるかを一緒に考え、小さくつくり、改善する。<br className="desktop-break" />経営者の身近な相談相手として、実行まで支えたい。<br className="desktop-break" />そんな思いで、AJOBは事業に向き合っています。</p>
      <p className="representative">代表社員 <strong>{company.representative}</strong>
      </p>
    </div>
    <div className="philosophy-art" aria-hidden="true">
      <span className="thought-square" />
      <span className="thought-line">⤳</span>
      <span className="thought-circle" />
      <span className="thought-arrow">↗</span>
      <span className="thought-label">THINK → BUILD → IMPROVE</span>
    </div>
  </section>;
}
export function CompanySection() {
  return <section id="company" className="company-section wrap section-space reveal">
    <div className="company-photo">
      <img src="/assets/photos/office.webp" width="1659" height="948" alt="木の机と自然光のあるワークスペースのイメージ写真" loading="lazy" />
    </div>
    <div className="company-panel">
      <Eyebrow en="COMPANY"><Marker>会社情報</Marker></Eyebrow>
      <h2 className="company-brand-heading"><BrandMark variant="horizontal" label="AJOB合同会社" /></h2>
      <dl>
        <div>
          <dt>設立</dt>
          <dd>{company.established}</dd>
        </div>
        <div>
          <dt>代表者</dt>
          <dd>代表社員 {company.representative}</dd>
        </div>
        <div>
          <dt>所在地</dt>
          <dd>{company.address}</dd>
        </div>
      </dl>
      <a href="/company/" className="text-link">会社情報を詳しく見る <Arrow />
      </a>
    </div>
  </section>;
}
