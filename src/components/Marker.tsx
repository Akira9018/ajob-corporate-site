import { useEffect, useRef, type ReactNode } from 'react';

export default function Marker({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = ref.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!node || reduced.matches || !('IntersectionObserver' in window)) return;
    node.classList.add('marker-wait');
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { node.classList.replace('marker-wait', 'marker-play'); observer.disconnect(); }
    }, { threshold: .3 });
    observer.observe(node);
    const show = () => { if (reduced.matches) node.classList.remove('marker-wait'); };
    reduced.addEventListener('change', show);
    return () => { observer.disconnect(); reduced.removeEventListener('change', show); node.classList.remove('marker-wait', 'marker-play'); };
  }, []);
  return <span ref={ref} className="text-marker">{children}</span>;
}
