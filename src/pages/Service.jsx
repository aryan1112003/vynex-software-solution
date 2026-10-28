import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { industries, services } from '../data.js'
import { CTA, Marquee, PageHero, Reveal, TiltCard } from '../components/ui.jsx'
import { CheckList, IndustryGrid, NumHead, Replay, ServiceGrid, Split, StatStrip, Timeline } from '../components/blocks.jsx'
import NotFound from './NotFound.jsx'
import Icon, { TechLogo } from '../components/Icon.jsx'
import { Faq, GetStarted, Prepare } from '../components/extras.jsx'
import { serviceFaq } from '../faqs.js'

export default function Service() {
  const { slug } = useParams()
  const idx = services.findIndex((s) => s.slug === slug)
  if (idx < 0) return <NotFound />
  const s = services[idx]
  const next = services[(idx + 1) % services.length]
  const related = [1, 2, 3].map((k) => services[(idx + k) % services.length])
  const relatedIndustries = industries.filter(([, , to]) => to === '/services/' + slug)
  let n = 0
  const num = () => String(++n).padStart(2, '0')

  return (
    <div style={{ '--c': s.color }}>
      <PageHero eyebrow={s.eyebrow} title={(s.pageTitle || s.title).replace(/^(\S+)/, '*$1')} text={s.lead}>
        <div className="hero-media">
          <TiltCard className="photo-frame" max={8}>
            <img src={s.image} alt={s.title} />
          </TiltCard>
          <div className="float-badge glass">
            <span className="badge-icon">
              <Icon name={s.icon} size={20} />
            </span>
            {s.title}
          </div>
        </div>
      </PageHero>

      <StatStrip
        items={[
          [s.highlights.length, '', 'Capabilities', 'covered by this service'],
          [s.offers.length, '', 'Focus areas', 'built around your needs'],
          [s.steps.length, '', 'Step start', 'from requirements to next step'],
          s.tech ? [s.tech.length, '', 'Technologies', 'in the toolset'] : [services.length, '', 'Connected services', 'to combine with'],
        ]}
      />

      <section className="section container">
        <NumHead num={num()} eyebrow="What it covers" title={s.tagline.replace(/\. /, '.\n*')} />
        <div className="highlight-grid">
          {s.highlights.map(([t, d], i) => (
            <Reveal key={t} delay={(i % 3) * 0.08}>
              <div className="highlight">
                <span className="hl-dot" />
                <strong>{t}</strong>
                <span>{d}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Marquee items={[s.title, s.tagline]} speed={30} />

      <section className="section container">
        <Split img={s.image} alt={s.title} reverse>
          <NumHead num={num()} eyebrow="Built around your requirements" title={'Your business,\n*your solution.'} />
          <Reveal>
            <p className="lead">{s.body}</p>
          </Reveal>
          <div className="mini-cards">
            {s.offers.map(([t, d]) => (
              <Reveal key={t} className="mini-card">
                <strong>{t}</strong>
                <span>{d}</span>
              </Reveal>
            ))}
          </div>
        </Split>
      </section>

      <section className="section container">
        <NumHead num={num()} eyebrow="In action" title={'Watch it\n*take shape.'} text="An illustrative run of how this service moves from your requirements to a clear next step." />
        <Reveal>
          <Replay services={[s]} />
        </Reveal>
      </section>

      {s.modules && (
        <section className="section container">
          <NumHead num={num()} eyebrow="One integrated platform" title={'Connected information.\n*Coordinated workflows.'} text="A modular ERP that brings departmental data and workflows together and grows with your organisation." />
          <div className="modules">
            {s.modules.map((m, i) => (
              <motion.div
                key={m}
                className="module"
                initial={{ opacity: 0, rotateY: -90 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
              >
                <span>0{i + 1}</span>
                {m}
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {s.compare && (
        <section className="section container">
          <NumHead num={num()} eyebrow="Choose your perspective" title={'Reports or\n*dashboards?'} text="Choose the view that fits how you use your business information." />
          <div className="compare">
            <Reveal>
              <Link to="/services/report-development" className={'compare-card' + (slug === 'report-development' ? ' on' : '')}>
                <h3>Reports</h3>
                <p>Organize business data into clear reports to analyze trends, track metrics and make informed decisions.</p>
              </Link>
            </Reveal>
            <Reveal delay={0.15}>
              <Link to="/services/dashboard-development" className={'compare-card' + (slug === 'dashboard-development' ? ' on' : '')}>
                <h3>Dashboards</h3>
                <p>Bring key performance indicators and operational data into an interactive view with real-time visibility.</p>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {s.tech && (
        <section className="section container">
          <NumHead num={num()} eyebrow="Tools & technologies" title={'The technology behind\n*your solution.'} text="Explore the tools available for your project. The choice depends on your requirements and existing systems." />
          <div className="tech-tags big">
            {s.tech.map((t, i) => (
              <motion.span
                key={t}
                className="tech-tag"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, type: 'spring', stiffness: 200 }}
                whileHover={{ y: -5 }}
              >
                <TechLogo name={t} size={24} />
                {t}
              </motion.span>
            ))}
          </div>
        </section>
      )}

      <section className="section how">
        <div className="container how-grid">
          <div className="how-sticky">
            <NumHead num={num()} eyebrow="A practical starting point" title={'From your requirements\nto a *clear next step.'} text="A focused conversation helps define what needs to work, who it is for and how to approach the solution." />
            <CheckList items={['You can start with a question', 'A complete specification is not required', 'Feedback shapes every next improvement']} />
          </div>
          <Timeline steps={s.steps} />
        </div>
      </section>

      {relatedIndustries.length > 0 && (
        <section className="section container">
          <NumHead num={num()} eyebrow="Industry possibilities" title={'Where this\n*fits best.'} />
          <IndustryGrid items={relatedIndustries} />
        </section>
      )}

      <Prepare num={num()} service={s.title} />
      <Faq num={num()} title={s.title + '\n*questions.'} items={serviceFaq(s)} />

      <section className="section container">
        <NumHead num={num()} eyebrow="Related services" title={'Combine with\n*other services.'} />
        <ServiceGrid items={related} />
      </section>

      <section className="container">
        <Link to={'/services/' + next.slug} className="next-service" style={{ '--n': next.color }}>
          <span className="muted small">Next service</span>
          <span className="next-title">
            {next.title} <b>→</b>
          </span>
        </Link>
      </section>

      <CTA />
    </div>
  )
}
