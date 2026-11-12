'use client';
// 대표 프로젝트 가로 캐러셀: 스크롤 스냅 + 좌우 화살표 (화살표는 한 화면 너비만큼 이동, 끝에서는 비활성화)
import { useEffect, useRef, useState, type ReactNode } from 'react';

export default function ProjectCarousel({ prev, next, children }: { prev: string; next: string; children: ReactNode }) {
  const ref = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = () => {
    const el = ref.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft <= 1, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1 });
  };
  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const go = (dir: number) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth, behavior: 'smooth' });

  return (
    <div className="carousel">
      <button type="button" className="carousel-btn prev" aria-label={prev} disabled={edge.start} onClick={() => go(-1)}>←</button>
      <ul ref={ref} className="projects" onScroll={update}>{children}</ul>
      <button type="button" className="carousel-btn next" aria-label={next} disabled={edge.end} onClick={() => go(1)}>→</button>
    </div>
  );
}
