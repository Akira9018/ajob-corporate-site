import { useEffect, useState } from 'react';

export default function MotionBackdrop() {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle('motion-user-paused', paused);
    return () => document.documentElement.classList.remove('motion-user-paused');
  }, [paused]);
  useEffect(() => {
    const sync = () => document.documentElement.classList.toggle('motion-paused', document.hidden);
    sync();
    document.addEventListener('visibilitychange', sync);
    const hero = document.querySelector('.hero');
    const observer = new IntersectionObserver(([entry]) => {
      document.documentElement.classList.toggle('hero-offscreen', !entry.isIntersecting);
    });
    if (hero) observer.observe(hero);
    return () => {
      document.removeEventListener('visibilitychange', sync);
      observer.disconnect();
      document.documentElement.classList.remove('motion-paused', 'hero-offscreen');
    };
  }, []);
  return <><button type="button" className="motion-control" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? '動きを再開' : '動きを停止'}</button><div className="motion-backdrop" aria-hidden="true"><div className="backdrop-shape backdrop-ring" /><div className="backdrop-shape backdrop-pill" /><div className="backdrop-shape backdrop-orbit" /><div className="backdrop-shape backdrop-square" /><div className="backdrop-shape backdrop-line" /></div></>;
}
