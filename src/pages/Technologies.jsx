import { asset } from '../asset.js'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { services, techCategories } from '../data.js'
import { CTA, PageHero, Reveal } from '../components/ui.jsx'
import Icon, { TechLogo } from '../components/Icon.jsx'
import TechOrbit from '../components/TechOrbit.jsx'
import { Faq, GetStarted, Prepare } from '../components/extras.jsx'
import { techFaq } from '../faqs.js'
import { AroundSite, CheckList, LogoMarquee, NumHead, Split, StatStrip, Timeline } from '../components/blocks.jsx'

const allTech = techCategories.flatMap((c) => c.items)

export default function Technologies() {
  const [cat, setCat] = useState('all')
  const [q, setQ] = useState('')

  const filtered = useMemo(
    () =>
      techCategories
        .filter((c) => cat === 'all' || c.id === cat)
        .map((c) => ({ ...c, items: c.items.filter((i) => i.toLowerCase().includes(q.toLowerCase())) }))
        .filter((c) => c.items.length),
    [cat, q]
  )

  return (
    <>
      <PageHero
        eyebrow="Our technologies"
        title={'Modern technologies.\n*Practical solutions.'}
        text="Explore our technology stack across software, AI, data and infrastructure. The right starting point depends on what your business needs."
        chips={['AI & data', 'Applications', 'Cloud & DevOps']}
      >
        <div className="orbit-wrap">
          <TechOrbit active={cat === 'all' ? null : cat} />
        </div>
      </PageHero>

      <StatStrip
        items={[
          [allTech.length, '', 'Technologies', 'in the full catalog'],
          [techCategories.length, '', 'Categories', 'from AI to databases'],
          [techCategories[0].items.length, '', 'AI / ML tools', 'for intelligent solutions'],
          [services.filter((s) => s.tech).length, '', 'Services', 'with a dedicated stack'],
        ]}
      />

      <section className="section container">
        <NumHead num="01" eyebrow="Our technology stack" title={'Technologies\n*we work with.'} text="Find the tools that fit your idea. Search by name or browse a category to explore the full catalog." />
        <Reveal className="tech-controls">
          <input className="input search" placeholder="Search technologies…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search technologies" />
          <div className="filter-pills">
            {[{ id: 'all', name: 'All technologies' }, ...techCategories].map((c) => (
              <button key={c.id} className={'pill' + (cat === c.id ? ' on' : '')} onClick={() => setCat(c.id)}>
                {cat === c.id && <motion.span layoutId="pill-bg" className="pill-bg" />}
                <span>{c.name}</span>
              </button>
            ))}
          </div>
          <p className="muted small">
            {allTech.length} technologies in {techCategories.length} categories
          </p>
        </Reveal>

        <motion.div layout className="tech-cats">
          <AnimatePresence mode="popLayout">
            {filtered.map((c) => (
              <motion.div
                layout
                key={c.id}
                id={c.id}
                className="tech-cat"
                style={{ '--c': c.color }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <div className="tech-cat-head">
                  <h3>{c.name}</h3>
                  <span>{techCategories.find((t) => t.id === c.id).items.length} technologies</span>
                </div>
                <div className="tech-tags">
                  {c.items.map((t, i) => (
                    <motion.span key={t} className="tech-tag" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} whileHover={{ y: -4, scale: 1.06 }}>
                      <TechLogo name={t} size={20} />
                      {t}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {!filtered.length && <p className="muted">No technologies match “{q}”.</p>}
      </section>

      <section className="section container">
        <NumHead num="02" eyebrow="Technology by service" title={'The tools behind\n*each service.'} text="Each service draws on its own set of tools. The final choice depends on your requirements and existing systems." />
        <div className="tech-service-grid">
          {services
            .filter((s) => s.tech)
            .map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.08}>
                <Link to={'/services/' + s.slug} className="tech-service" style={{ '--c': s.color }}>
                  <div className="tech-service-head">
                    <span className="badge-icon">
                      <Icon name={s.icon} size={20} />
                    </span>
                    <strong>{s.title}</strong>
                    <span className="around-arrow">↗</span>
                  </div>
                  <div className="logo-row">
                    {s.tech.map((t) => (
                      <span key={t} className="logo-dot" title={t}>
                        <TechLogo name={t} size={22} />
                      </span>
                    ))}
                  </div>
                </Link>
              </Reveal>
            ))}
        </div>
      </section>

      <section className="section container">
        <Split img={asset('/images/gen/planning.webp')} alt="Choosing the right approach on a whiteboard" reverse>
          <NumHead num="03" eyebrow="How we choose" title={'The right technology\nfor *your idea.'} />
          <Reveal>
            <p className="lead">Technology is a means, not the goal. We start with what your business needs and pick tools that fit the work and the systems you already have.</p>
          </Reveal>
          <CheckList
            items={[
              'Start with your requirements and the people who will use the solution',
              'Consider your existing systems, data and integrations',
              'Keep usability, security and scalability in view',
              'Choose practical tools you can grow with',
            ]}
          />
        </Split>
      </section>

      <section className="section how">
        <div className="container how-grid">
          <div className="how-sticky">
            <NumHead num="04" eyebrow="Across the stack" title={'From interface\nto *infrastructure.'} text="How the categories come together in a connected solution." />
          </div>
          <Timeline
            steps={[
              ['Frontend & Mobile', 'React, Next.js, Vue, Angular, Flutter and React Native for interfaces people use every day.'],
              ['Backend', 'Node.js, Python, Java, .NET, FastAPI, NestJS and Laravel for business logic and APIs.'],
              ['Database', 'MySQL, PostgreSQL, SQL Server, Oracle, MongoDB and Redis to keep information organised.'],
              ['AI & Data', 'OpenAI, Anthropic Claude, LangChain, PyTorch, Databricks, Power BI and Tableau for intelligence and insight.'],
              ['Cloud & DevOps', 'AWS, Azure, Google Cloud, Docker, Kubernetes and Terraform to run it reliably.'],
            ]}
          />
        </div>
      </section>

      <section className="section toolbox">
        <div className="container">
          <NumHead eyebrow="The full toolbox" title={'All *' + allTech.length + ' technologies.'} center />
        </div>
        <LogoMarquee items={allTech.slice(0, 28)} />
        <LogoMarquee items={allTech.slice(28)} reverse />
      </section>

      <Faq num="05" items={techFaq} />
      <Prepare num="06" />

      <section className="section container">
        <NumHead num="07" eyebrow="Around the site" title={'Explore *Vynex.'} />
        <AroundSite />
      </section>

      <CTA title={'Let’s build with the\n*right technology.'} text="Tell us about your project and the requirements it needs to support." button="Let’s talk about your idea" />
    </>
  )
}
