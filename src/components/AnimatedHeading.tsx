import { useEffect, useRef, type CSSProperties } from 'react';

export default function AnimatedHeading({ lines }: { lines: string[] }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const heading = ref.current;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!heading || preference.matches || !('IntersectionObserver' in window)) return;
    heading.classList.add('ink-wait');
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        heading.classList.replace('ink-wait', 'ink-play');
        observer.disconnect();
      }
    }, { threshold: .5 });
    observer.observe(heading);
    const show = () => { if (preference.matches) heading.classList.remove('ink-wait'); };
    preference.addEventListener('change', show);
    return () => { observer.disconnect(); preference.removeEventListener('change', show); heading.classList.remove('ink-wait', 'ink-play'); };
  }, []);
  return <h2 ref={ref} className="animated-heading ink-marker" aria-label={lines.join('')}>{lines.map((line, row) => <span className="ink-line" aria-hidden="true" key={line} style={{ '--line-order': row } as CSSProperties}><span className="ink-marker">{line}</span></span>)}</h2>;
}
