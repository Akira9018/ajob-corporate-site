import Marker from './Marker';
import Icon from './Icon';
import { serviceIcons, articleIcons, processIcons, articleSectionIcons } from '../iconMap';
import { articles, company, services } from '../content';
import { AboutSection, ArticleCards, MessageSection, ProjectsSection, ServicesSection } from './HomeSections';
import Contact from './Contact';
import { Arrow, Breadcrumb, Eyebrow, LineDiagram, LinkButton, PageIntro } from './Site';
function DemoEmbed() {
  return <div className="demo-embed">
    <div className="demo-frame"><iframe src="/demo/kintai/?embed=1" title="LINE勤怠システムのデモ。画面の中を操作できます" loading="lazy" /></div>
    <p className="demo-caption">勤怠・シフト・経費・掲示板まで、画面の中を実際に操作できます（ダミーデータ）。<a href="/demo/kintai/" target="_blank" rel="noreferrer">別タブで大きく開く<span className="sr-only">（別タブ）</span></a></p>
  </div>;
}
export function ServicePage({ slug }: {
  slug: string;
}) {
  const service = services.find(s => s.slug === slug)!;
  return <>
    <Breadcrumb items={[["事業紹介", "/services/"], [service.title]]} />
    <section className={`service-detail-hero ${service.color}`}>
      <div className="wrap detail-hero-grid">
        <div>
          <div className="service-identity"><Icon name={serviceIcons[service.slug]} size={48} /><Eyebrow en={service.en}>SERVICE {service.number}</Eyebrow></div>
          <h1><Marker>{service.title}</Marker></h1>
          <h2><Marker>{service.headline}</Marker></h2>
          <p>{service.description}</p>
          <div className="detail-actions">
            <LinkButton href="/contact/">この事業について相談する</LinkButton>
            {service.slug === 'line-app' && <a className="button button-light" href="/demo/kintai/" target="_blank" rel="noreferrer">デモを触ってみる<span className="sr-only">（別タブ）</span><Arrow /></a>}
          </div>
        </div>
        <div className="detail-art">{service.slug === 'line-app' ? <DemoEmbed /> : service.image ? <img src={`/assets/illustrations/${service.image}.webp`} width="1536" height="1024" alt="" /> : <LineDiagram interactive />}</div>
      </div>
    </section>
    <div className="detail-intro wrap narrow section-space">
      <h2><Marker>{service.lead}</Marker></h2>
      <p>{service.intro}</p>
    </div>
    <section className="wrap detail-points">
      <Eyebrow en="HOW WE HELP">支援のかたち</Eyebrow>{service.points.map(([title, text], i) => <div className="detail-point reveal" key={title}>
        <span>0{i + 1}</span>
        <h2><Marker>{title}</Marker></h2>
        <p>{text}</p>
      </div>)}<p className={`service-scope ${service.color}`}>{service.note}</p>{service.slug === 'regional-portal' && <a className="text-link" href="/projects/">試作・構築例について <Arrow />
      </a>}</section>
    <section className="faq wrap narrow section-space reveal">
      <Eyebrow en="QUESTIONS & ANSWERS">よくあるご質問</Eyebrow>
      <h2><Marker>相談する前に。</Marker></h2>{service.faq.map(([q, a]) => <details key={q}>
        <summary>{q}<span aria-hidden="true">＋</span>
        </summary>
        <p>{a}</p>
      </details>)}</section>
    <div className="wrap other-services">
      <h2><Marker>ほかの事業を見る</Marker></h2>{services.filter(s => s !== service).map(s => <a href={`/services/${s.slug}/`} key={s.slug}>{s.number} {s.title}<Arrow />
      </a>)}</div>
  </>;
}
export function AboutPage() {
  return <>
    <Breadcrumb items={[["私たちについて"]]} />
    <PageIntro en="ABOUT US" title="一緒に考える。一緒につくる。" text="会社の次の一歩に、相談と実行の両方を。" />
    <AboutSection full />
    <section className="wrap about-principles">
      <Eyebrow en="OUR APPROACH">大切にしていること</Eyebrow>{[['話すことから始める。', 'どんな仕事をしていて、どこで困っているか。経営者の考えと現場のやり方を理解することから始めます。'], ['手段を決めつけない。', 'AI、Webサイト、業務システム。使う技術を先に決めず、課題に合った方法を選びます。'], ['使いながら育てる。', 'つくった仕組みが仕事の中で役立つように。使う人の声を聞き、優先順位を見直しながら改善します。']].map(([title, text], i) => <div className="principle reveal" key={title}>
        <span>0{i + 1}</span>
        <h2><Marker>{title}</Marker></h2>
        <p>{text}</p>
      </div>)}</section>
    <MessageSection />
    <div className="wrap about-context narrow section-space">
      <h2><Marker>相談の先に、実装がある。</Marker></h2>
      <p>AI顧問、LINE連携アプリ、地域ポータルを三つの柱に、Webサイト・LPや業務システムの開発、医療法人への顧問支援にも取り組んでいます。</p>
      <p>代表が事業と開発に向き合い、必要に応じて外部のパートナーと連携します。会社ごとの課題を理解し、無理なく進められる範囲を一緒に決めることを大切にしています。</p>
      <LinkButton href="/services/">三つの事業を見る</LinkButton>
    </div>
  </>;
}
export function ServicesPage() {
  return <>
    <Breadcrumb items={[["事業紹介"]]} />
    <PageIntro en="OUR BUSINESS" title="実行力を、いろいろなかたちで。" text="AIの相談、日々の業務、地域の集客。会社の課題に合った入口から、一緒に考えます。" />
    <ServicesSection full />
    <section className="wrap process section-space">
      <Eyebrow en="GETTING STARTED">ご一緒する流れ</Eyebrow>
      <div className="process-grid">{[['まず、話す。', '無料相談で、今の課題と実現したいことを伺います。'], ['一緒に、決める。', '取り組む内容・優先順位・費用・進め方を合意します。'], ['つくって、育てる。', '決めた範囲で実装し、使い方を確かめながら改善します。']].map(([title, text], i) => <div key={title}>
        <div className="process-mark"><span>0{i + 1}</span><Icon name={processIcons[i]} size={48} /></div>
        <h2><Marker>{title}</Marker></h2>
        <p>{text}</p>
      </div>)}</div>
    </section>
  </>;
}
export function ProjectsPage() {
  return <>
    <Breadcrumb items={[["取り組み"]]} />
    <PageIntro en="IN PROGRESS" title="現場から、次の仕組みへ。" text="日々の社内業務から、地域の集客、介護・医療の現場まで。導入した仕組みと、現在進めている試作・開発をご紹介します。" />
    <ProjectsSection full />
    <div className="wrap narrow section-space">
      <h2><Marker>このほかのご相談も。</Marker></h2>
      <p>WebサイトやLP、個別の業務システム開発にも対応しています。「こういうことはできる？」という段階から、お聞かせください。対象業務と必要な範囲を整理し、実現方法を検討します。</p>
    </div>
  </>;
}
export function JournalPage() {
  return <>
    <Breadcrumb items={[["コラム"]]} />
    <PageIntro en="AJOB JOURNAL" title="仕事の「これから」を、少しずつ。" text="AI活用、業務改善、地域のビジネス。会社の次の一歩を考えるためのヒントを届けます。" />
    <section className="wrap journal-index">
      <ArticleCards />
    </section>
  </>;
}
export function ArticlePage({ slug }: {
  slug: string;
}) {
  const article = articles.find(a => a.slug === slug)!;
  return <>
    <Breadcrumb items={[["コラム", "/journal/"], [article.category]]} />
    <article className="article-page">
      <header className={`article-header ${article.color}`}>
        <div className="wrap narrow">
          <Eyebrow en={`JOURNAL ${article.number}`}>{article.category}</Eyebrow>
          <h1><Marker>{article.title}</Marker></h1>
          <p className="article-author">AJOB</p>
        </div>
        <Icon name={articleIcons[article.service]} size={144} className="article-heading-icon" />
      </header>
      <div className="article-body wrap narrow">
        <p className="article-intro">{article.intro}</p>
        <nav className="toc" aria-label="この記事の目次">
          <strong>この記事の内容</strong>
          <ol>{article.sections.map((s, i) => <li key={s.title}>
            <a href={`#section-${i + 1}`}>{s.title}</a>
          </li>)}</ol>
        </nav>{article.sections.map((s, i) => <section id={`section-${i + 1}`} key={s.title}>
          <h2 className="article-section-heading"><Marker><Icon name={articleSectionIcons[i]} size={30} /><span>{s.title}</span></Marker></h2>{s.paragraphs.map(p => <p key={p}>{p}</p>)}</section>)}{'sources' in article && article.sources && <aside className="article-sources">
            <h2><Marker>参考資料</Marker></h2>{article.sources.map(s => <a key={s.url} href={s.url} target="_blank" rel="noreferrer">{s.title} <span className="sr-only">（別タブ）</span>
              <Arrow />
            </a>)}</aside>}<aside className="article-related">
          <Eyebrow en="RELATED SERVICE">関連する事業</Eyebrow>
          <h2><Marker>{services.find(s => s.slug === article.service)!.title}</Marker></h2>
          <a className="text-link" href={`/services/${article.service}/`}>支援内容を詳しく見る <Arrow />
          </a>
        </aside>
        <a className="text-link" href="/journal/">← コラム一覧へ戻る</a>
      </div>
    </article>
  </>;
}
export function CompanyPage() {
  return <>
    <Breadcrumb items={[["会社情報"]]} />
    <PageIntro en="COMPANY" title="AJOB合同会社" text="会社のそばに、つくれるパートナーを。" />
    <div className="wrap company-detail">
      <dl>{[['会社名', company.name], ['設立', company.established], ['代表者', `代表社員 ${company.representative}`], ['所在地', company.address], ['事業内容', 'AI顧問、LINE連携アプリ、地域ポータル、Webサイト・LP制作、業務システム開発、医療法人への顧問支援']].map(([k, v]) => <div key={k}>
        <dt>{k}</dt>
        <dd>{v}</dd>
      </div>)}</dl>
      <figure>
        <img src="/assets/photos/office.webp" width="1659" height="948" alt="自然光が入るオフィスのイメージ" />
      </figure>
    </div>
    <MessageSection />
  </>;
}
export function ContactPage() {
  return <>
    <Breadcrumb items={[["お問い合わせ"]]} />
    <PageIntro en="LET’S TALK" title="次の一歩を、ここから。" text="AIのことも、業務のことも、新しいアイデアも。まずは無料相談から。" />
    <Contact />
  </>;
}
export function PrivacyPage() {
  return <>
    <Breadcrumb items={[["プライバシーポリシー"]]} />
    <PageIntro en="PRIVACY POLICY" title="プライバシーポリシー" />
    <div className="wrap narrow policy">
      <p>AJOB合同会社（以下「当社」）は、このWebサイトのお問い合わせを通じてお預かりする情報を、以下のとおり取り扱います。</p>
      <h2><Marker>取得する情報と利用目的</Marker></h2>
      <p>お問い合わせフォームでは、会社名、氏名、メールアドレス、電話番号（任意）、相談種別、お問い合わせ内容、ポリシーへの同意を取得します。お問い合わせへの回答、相談日程の調整、ご依頼内容に関する連絡のために利用します。</p>
      <h2><Marker>お問い合わせの送信サービス</Marker></h2>
      <p>このサイトは、お問い合わせの受付・送信に外部サービス「Formspree」を利用します。フォームに入力した情報は、送信時にFormspreeへ送られます。外部サービスによる取り扱いは、同サービスの<a href="https://formspree.io/legal/privacy-policy/" target="_blank" rel="noreferrer">プライバシーポリシー（別タブ）</a>もご確認ください。</p>
      <h2><Marker>外部サービスへの接続</Marker></h2>
      <p>サイトの配信にはVercel、文字の表示にはGoogle Fontsを利用します。閲覧時にブラウザからこれらのサービスへの通信が発生します。</p>
      <h2><Marker>アクセス解析</Marker></h2>
      <p>サイトの改善のため、Vercel Web AnalyticsとGoogle アナリティクス（GA4）でアクセス状況を計測します。閲覧したページ、流入元、利用端末などの統計情報を扱い、個人を特定する目的では利用しません。Google アナリティクスの取り扱いは<a href="https://policies.google.com/technologies/partner-sites?hl=ja" target="_blank" rel="noreferrer">Googleの説明ページ（別タブ）</a>をご確認ください。</p>
      <h2><Marker>情報の管理</Marker></h2>
      <p>お問い合わせ情報は、対応に必要な範囲で取り扱います。フォームには、個人の医療情報、第三者の機密情報など、お問い合わせに不要な情報を入力しないでください。</p>
      <h2><Marker>情報に関するお問い合わせ</Marker></h2>
      <p>ご自身の情報の確認・訂正・削除などをご希望の場合は、<a href="/contact/">お問い合わせフォーム</a>からご連絡ください。ご本人確認が必要な場合は、その方法をご案内します。</p>
      <p>{company.name}<br />{company.address}</p>
    </div>
  </>;
}
export function NotFoundPage() {
  return <div className="wrap not-found">
    <Eyebrow en="404">PAGE NOT FOUND</Eyebrow>
    <h1><Marker>ページが見つかりません。</Marker></h1>
    <p>URLが変更されたか、ページが存在しない可能性があります。</p>
    <LinkButton href="/">ホームへ戻る</LinkButton>
  </div>;
}
