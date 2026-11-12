// 프로젝트 페이지는 public/projects/<slug>/index.html 정적 HTML. 라우트가 아니라서 next/link 대신 <a> + basePath.
import { Fragment, type CSSProperties } from 'react';
import { homeHref } from './Document';
import ProjectCarousel from './ProjectCarousel';
import { LANGS, htmlLang, t, type Lang } from './i18n';

const base = process.env.PAGES_BASE_PATH || '';
const langLabel: Record<Lang, string> = { ko: '한국어', en: 'English', ja: '日本語', zh: '中文' };

const skillGroups = [
  { id: 'lang', items: ['C++ (STL)', 'C#', 'Java', 'TypeScript', 'JavaScript', 'Python'] },
  { id: 'frontend', items: ['React', 'Next.js', 'React Native', 'Unreal Engine'] },
  { id: 'backend', items: ['NestJS', 'Spring Boot', 'Boost.Asio', 'TypeORM', 'Protobuf', 'spdlog'] },
  { id: 'db', items: ['PostgreSQL', 'MSSQL', 'Supabase'] },
  { id: 'infra', items: ['Git', 'SVN', 'Docker', 'AWS', 'Vercel', 'Jenkins', 'GitHub Actions'] },
  { id: 'hw', items: ['OptiTrack', 'Varjo VR', 'Vive Tracker', 'BLE'] },
];

const projects = [
  {
    slug: 'business-ax',
    points: 4,
    stack: ['Next.js', 'NestJS', 'Spring Boot', 'Claude API', 'Python', 'PostgreSQL', 'AWS CDK'],
    thumb: 'images/web-home.png',
    accent: '#2563eb',
  },
  {
    slug: 'personal-sanitation',
    points: 4,
    stack: ['React', 'React Native', 'Next.js', 'Nest.js', 'PostgreSQL', 'Docker', 'Expo'],
    thumb: 'images/dash-overview.png',
    accent: '#16a34a',
  },
  {
    slug: 'reserve-system',
    points: 3,
    stack: ['React', 'Next.js', 'Spring Boot', 'Vercel', 'Supabase', 'Docker'],
    thumb: 'images/w-home.png',
    accent: '#e11d48',
  },
  {
    slug: 'jenkins-local-test',
    points: 0,
    impact: true,
    stack: ['Ubuntu Server', 'OpenSSH', 'Jenkins', 'NginX', 'Grafana', 'Prometheus'],
    thumb: 'images/grafana-dashboard.png',
    accent: '#ea580c',
  },
];

export default function Home({ lang }: { lang: Lang }) {
  const tr = (key: string) => t(key, lang);
  const projectHref = (slug: string) => `${base}/projects/${slug}/${lang === 'ko' ? '' : `${lang}/`}index.html`;
  return (
    <>
      <div className="bg" aria-hidden="true" />
      <nav className="nav">
        <a href="#top" className="brand">iam<span>.</span></a>
        <div>
          <a href="#projects">{tr('nav.projects')}</a>
          <a href="#skills">{tr('nav.skills')}</a>
          <details className="lang-switch">
            <summary><span className="sr-only">{tr('nav.lang')}: </span>{langLabel[lang]}</summary>
            <div>
              {LANGS.map((l) => (
                <a key={l} href={homeHref(l)} hrefLang={htmlLang(l)} lang={htmlLang(l)} aria-current={l === lang ? 'page' : undefined}>
                  {langLabel[l]}
                </a>
              ))}
            </div>
          </details>
        </div>
      </nav>

      <main id="top">
        <header className="hero">
          <div className="hero-text">
            <p className="eyebrow">Full-stack Team</p>
            <h1>
              {tr('hero.title').split('\n').map((line, i) => {
                const [pre, post] = line.split('{name}');
                return (
                  <Fragment key={i}>
                    {i > 0 && <br />}
                    {pre}
                    {post !== undefined && <><span className="grad">{tr('hero.name')}</span>{post}</>}
                  </Fragment>
                );
              })}
            </h1>
            <ul className="why-list">
              {['troubleshooting', 'delivery', 'cross-domain'].map((item) => (
                <li key={item} className="glass reveal">
                  <h3>{tr(`why.${item}.title`)}</h3>
                  {item === 'delivery' && <p className="why-flow">{tr('why.delivery.flow')}</p>}
                  <p>{tr(`why.${item}.description`)}</p>
                </li>
              ))}
            </ul>
          </div>
        </header>

        <section id="projects">
          <p className="eyebrow">Projects</p>
          <h2>{tr('nav.projects')}</h2>
          <ProjectCarousel prev={tr('projects.prev')} next={tr('projects.next')}>
            {projects.map((p) => (
              <li key={p.slug} style={{ '--accent': p.accent } as CSSProperties}>
                <a href={projectHref(p.slug)} className="card">
                  <div className="thumb">
                    <img src={`${base}/projects/${p.slug}/${p.thumb}`} alt="" loading="lazy" />
                  </div>
                  <div className="card-body">
                    <h3>
                      {tr(`projects.${p.slug}.title`)} <span className="arrow">→</span>
                    </h3>
                    <p>{tr(`projects.${p.slug}.summary`)}</p>
                    {p.points > 0 && (
                      <ul className="project-points">
                        {Array.from({ length: p.points }, (_, i) => (
                          <li key={i}>{tr(`projects.${p.slug}.points.${i + 1}`)}</li>
                        ))}
                      </ul>
                    )}
                    {p.impact && (
                      <strong className="project-impact">{tr(`projects.${p.slug}.impact`)}</strong>
                    )}
                    <ul className="chips small">
                      {p.stack.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                </a>
              </li>
            ))}
          </ProjectCarousel>
          <p className="projects-note">{tr('projects.note')}</p>
        </section>

        <section id="skills">
          <p className="eyebrow">Skills</p>
          <h2>{tr('nav.skills')}</h2>
          <ul className="skill-groups">
            {skillGroups.map((g) => (
              <li key={g.id} className="glass reveal">
                <h3>{tr(`skills.group.${g.id}`)}</h3>
                <ul className="chips small">
                  {g.items.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

      </main>

      <footer className="footer">{tr('footer')}</footer>
    </>
  );
}
