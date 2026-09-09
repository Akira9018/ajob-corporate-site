import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import MotionBackdrop from './components/MotionBackdrop';
import { articles, services } from './content';
import { Header, Footer, ContactBanner } from './components/Site';
import { Hero, AboutSection, ServicesSection, ProjectsSection, JournalSection, MessageSection, CompanySection } from './components/HomeSections';
import { AboutPage, ArticlePage, CompanyPage, ContactPage, JournalPage, NotFoundPage, PrivacyPage, ProjectsPage, ServicePage, ServicesPage } from './components/DetailPages';
export default function App({ path = '/' }: {
  path?: string;
}) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window))
      return;
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.08 });
    elements.forEach(el => {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add('will-reveal');
        observer.observe(el);
      }
    });
    return () => { observer.disconnect(); elements.forEach(el => el.classList.remove('will-reveal')); };
  }, []);
  let page;
  const service = services.find(s => path === `/services/${s.slug}/`);
  const article = articles.find(a => path === `/journal/${a.slug}/`);
  if (path === '/')
    page = <>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <JournalSection />
      <MessageSection />
      <CompanySection />
    </>;
  else if (service)
    page = <ServicePage slug={service.slug} />;
  else if (article)
    page = <ArticlePage slug={article.slug} />;
  else
    switch (path) {
      case '/about/':
        page = <AboutPage />;
        break;
      case '/services/':
        page = <ServicesPage />;
        break;
      case '/projects/':
        page = <ProjectsPage />;
        break;
      case '/journal/':
        page = <JournalPage />;
        break;
      case '/company/':
        page = <CompanyPage />;
        break;
      case '/contact/':
        page = <ContactPage />;
        break;
      case '/privacy/':
        page = <PrivacyPage />;
        break;
      default: page = <NotFoundPage />;
    }
  return <>
    <a className="skip-link" href="#main">本文へスキップ</a>
    <div id="top" />
    <MotionBackdrop />
    <Header path={path} />
    <main id="main">{page}{!['/contact/', '/privacy/'].includes(path) && <ContactBanner />}</main>
    <Footer />
    <Analytics />
  </>;
}
