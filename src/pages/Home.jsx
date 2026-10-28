import { asset } from '../asset.js'
import { lazy, Suspense, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { services, heroPoints, whyVynex, industries, showcase, customers, fiveSteps, techCategories, homeTech } from '../data.js'
import { Button, CTA, Marquee, Reveal, TiltCard } from '../components/ui.jsx'
import { AroundSite, CheckList, Counter, LogoMarquee, NumHead, Pipeline, Replay, Timeline, TypeRotator, WorkMarquee } from '../components/blocks.jsx'
import Icon from '../components/Icon.jsx'
import { AutomationFlow, Faq, GetStarted, Prepare } from '../components/extras.jsx'
import { IndustryGrid, ServiceGrid } from '../components/blocks.jsx'
import { homeFaq } from '../faqs.js'
import TechOrbit from '../components/TechOrbit.jsx'

const HeroField = lazy(() => import('../three/HeroField.jsx'))

const appStart = Date.now()
const allTech = techCategories.flatMap((c) => c.items)

function Hero() {
  const [d] = useState(() => (Date.now() - appStart < 2500 ? 1.5 : 0.1))
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 160])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const rise = (delay) => ({ initial: { opacity: 0, y: 60 }, animate: { opacity: 1, y: 0 }, transition: { delay: d + delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] } })
  return (
    <section className="hero" ref={ref}>
      <div className="hero-canvas">
        <Suspense fallback={null}>
          <HeroField />
        </Suspense>
      </div>
      <div className="hero-fade" />
      <motion.div className="hero-copy container" style={{ y, opacity }}>
        <motion.div className="status-row" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: d, duration: 0.7 }}>
          <span className="status-pill">
            <span className="live-dot" /> Innovation · Technology · Growth
          </span>
          <span className="status-text">Ahmedabad, Gujarat — for businesses of all sizes</span>
        </motion.div>
        <h1 className="hero-title" aria-label="We Build Powerful Software Solutions for Your Business">
          <motion.span className="ht-line" {...rise(0.1)}>
            We Build <span className="outline">Powerful</span>
          </motion.span>
          <motion.span className="ht-line" {...rise(0.22)}>
            Software <span className="grad-text">Solutions</span>
          </motion.span>
          <motion.span className="ht-line" {...rise(0.34)}>
            for Your Business.
          </motion.span>
        </h1>
        <motion.p className="hero-lead" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: d + 0.5, duration: 0.8 }}>
          Practical digital solutions that help your business work better and move forward. We build your{' '}
          <TypeRotator words={['custom software', 'web applications', 'mobile apps', 'ERP systems', 'AI solutions', 'reports & dashboards']} />
        </motion.p>
        <motion.div className="hero-ctas" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: d + 0.65, duration: 0.7 }}>
          <Button to="/contact">Start your project</Button>
          <Button to="/#services" variant="ghost">
            Explore our services
          </Button>
        </motion.div>
        <motion.p className="hero-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: d + 1 }}>
          ◦ Move your cursor — the field follows
        </motion.p>
      </motion.div>
    </section>
  )
}

function Stats() {
  const stats = [
    [services.length, '', 'Connected services', 'from software to SEO'],
    [allTech.length, '+', 'Technologies', 'across AI, cloud, apps and data'],
    [industries.length, '', 'Industries', 'with tailored possibilities'],
    [fiveSteps.length, '', 'Step process', 'from idea to next step'],
  ]
  return (
    <section className="container stats">
      {stats.map(([n, s, t, d], i) => (
        <Reveal key={t} delay={i * 0.08} className="stat">
          <span className="stat-num">
            <Counter to={n} suffix={s} />
          </span>
          <strong>{t}</strong>
          <span>{d}</span>
        </Reveal>
      ))}
    </section>
  )
}

function ShowcaseImage() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1])
  const rotateX = useTransform(scrollYProgress, [0, 1], [16, 0])
  return (
    <section className="container showcase-hero" ref={ref}>
      <motion.div className="showcase-frame" style={{ scale, rotateX }}>
        <img src={asset('/images/hero-1536.webp')} alt="Business applications running on laptop, tablet and phone" />
      </motion.div>
      <div className="sf-chips">
        {heroPoints.map((p, i) => (
          <motion.div key={p.title} className="sf-chip" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.1 }}>
            <span className="badge-icon">
              <Icon name={p.icon} size={18} />
            </span>
            <span>
              <strong>{p.title}</strong>
              <small>{p.text}</small>
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Toolbox() {
  const half = Math.ceil(allTech.length / 2)
  return (
    <section className="section toolbox">
      <div className="container">
        <NumHead eyebrow="Our toolbox" title={'Modern technologies,\n*proven stack.'} center />
      </div>
      <LogoMarquee items={allTech.slice(0, half)} />
      <LogoMarquee items={allTech.slice(half)} reverse />
    </section>
  )
}

function InAction() {
  return (
    <section className="section container" id="in-action">
      <NumHead
        num="01"
        eyebrow="Services in action"
        title={'Watch an idea\n*take shape.'}
        text={`${services.length} connected services, one team. Pick one to see how a project moves from your requirements to a clear next step.`}
      />
      <Reveal>
        <Replay services={services} />
      </Reveal>
    </section>
  )
}

function Services() {
  return (
    <section className="section container" id="services">
      <NumHead
        num="02"
        eyebrow="What we do"
        title={'End-to-end digital solutions\nfor your *business.'}
        text="Explore our connected services and find the right starting point for what you want to build, improve or grow."
        aside={
          <div className="head-photo">
            <img src={asset('/images/home-1586.webp')} alt="Software development across devices" loading="lazy" />
          </div>
        }
      />
      <div className="services-grid">
        {services.filter((s) => !s.group).map((s, i) => (
          <Reveal key={s.slug} delay={(i % 3) * 0.08}>
            <TiltCard className="service-card" style={{ '--c': s.color }} max={6}>
              <Link to={'/services/' + s.slug} className="service-link">
                <div className="service-top">
                  <span className="service-icon">
                    <Icon name={s.icon} size={24} />
                  </span>
                  <span className="service-num">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.short}</p>
                <span className="more">
                  Learn more <b>→</b>
                </span>
              </Link>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Automation() {
  const auto = services.filter((s) => s.group === 'automation')
  return (
    <section className="section container" id="automation">
      <NumHead
        num="03"
        eyebrow="Automation services"
        title={'Automation that works\n*while you sleep.'}
        text="Connect your tools, let AI handle the routine and keep people in the loop where it matters. Fewer manual steps, faster responses and data that stays in sync."
        aside={
          <Button to="/contact" variant="ghost">
            Automate a process
          </Button>
        }
      />
      <Reveal>
        <AutomationFlow />
      </Reveal>
      <div className="auto-grid">
        <ServiceGrid items={auto} />
      </div>
    </section>
  )
}

function HowWeWork() {
  return (
    <section className="section how">
      <div className="container how-grid">
        <div className="how-sticky">
          <NumHead num="04" eyebrow="How we work" title={'A practical approach,\nbuilt around *you.'} text="Start with an idea, shape the requirements and explore the next step together." />
          <Reveal delay={0.2} className="how-photo">
            <img src={asset('/images/gen/planning.webp')} alt="The team planning a solution on a whiteboard" loading="lazy" />
          </Reveal>
        </div>
        <Timeline steps={fiveSteps} />
      </div>
      <Pipeline items={['Your idea', 'Requirements', 'Scope & approach', 'Design', 'Build', 'Review together', 'Refine', 'Next step']} />
    </section>
  )
}

function Work() {
  const tags = ['Applications · Business', 'Mobile · Customers', 'ERP · Operations', 'Reports · Dashboards']
  const items = [
    ...showcase.map(([title, to, img], i) => ({ title, to, img, tag: tags[i] })),
    { title: 'Custom AI Applications', to: '/services/ai-development', img: asset('/images/gen/ai-development.webp'), tag: 'AI · Automation' },
    { title: 'Business Process Automation', to: '/services/business-process-automation', img: asset('/images/gen/business-process-automation.webp'), tag: 'Automation · Workflows' },
    { title: 'AI Chatbots & Agents', to: '/services/ai-agents-chatbots', img: asset('/images/gen/ai-agents-chatbots.webp'), tag: 'AI · Customer support' },
    { title: 'Websites & Business Portals', to: '/services/web-development', img: asset('/images/hero-1536.webp'), tag: 'Web · E-commerce' },
  ]
  return (
    <section className="section">
      <div className="container">
        <NumHead
          num="05"
          eyebrow="Explore the possibilities"
          title={'A glimpse of what\nwe can *build.'}
          text="Illustrative solution concepts across applications, mobile experiences and business systems."
          aside={
            <Button to="/contact" variant="ghost">
              Discuss your project
            </Button>
          }
        />
      </div>
      <WorkMarquee items={items} />
    </section>
  )
}

function Industries() {
  return (
    <section className="section container">
      <NumHead
        num="06"
        eyebrow="Industry possibilities"
        title={'Tailored solutions for\ndifferent *industries.'}
        text="Every industry has different workflows. Discuss your requirements and explore a digital solution that fits."
        aside={
          <Button to="/contact" variant="ghost">
            Explore your possibilities
          </Button>
        }
      />
      <IndustryGrid items={industries} />
    </section>
  )
}

function Why() {
  return (
    <section className="section container why-grid">
      <div>
        <NumHead
          num="07"
          eyebrow="Why choose Vynex"
          title={'Technology begins\nwith *understanding.'}
          text="Technology starts with people, ideas and real business needs. We bring modern technology and a practical understanding of your requirements together to create useful digital solutions."
        />
        <CheckList items={whyVynex.map(([t, d]) => `${t} — ${d}`)} />
        <Reveal delay={0.3} className="why-cta">
          <Button to="/about" variant="ghost">
            Learn more about us
          </Button>
        </Reveal>
      </div>
      <div className="why-tiles">
        {heroPoints.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.1}>
            <TiltCard className="why-tile" max={8}>
              <span className="badge-icon">
                <Icon name={p.icon} size={22} />
              </span>
              <strong>{p.title}</strong>
              <span>{p.text}</span>
            </TiltCard>
          </Reveal>
        ))}
        <Reveal delay={0.4} className="why-quote">
          <p>Thoughtful technology.</p>
          <p className="grad-text">Practical business solutions.</p>
        </Reveal>
      </div>
    </section>
  )
}

function TechHome() {
  return (
    <section className="section container tech-home">
      <div>
        <NumHead num="08" eyebrow="Our technologies" title={'Modern technologies for\n*scalable solutions.'} text="From AI and cloud platforms to applications and databases, explore a technology stack that supports the work ahead." />
        <div className="tech-mini">
          {homeTech.map(([n, list, id], i) => (
            <Reveal key={n} delay={i * 0.06}>
              <Link to={'/technologies#' + id} className="tech-mini-card">
                <strong>{n}</strong>
                <span>{list}</span>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.3}>
          <Button to="/technologies" variant="ghost">
            Explore all technologies
          </Button>
        </Reveal>
      </div>
      <Reveal className="orbit-wrap">
        <TechOrbit />
      </Reveal>
    </section>
  )
}

export function CustomersStrip() {
  const logos = [...customers, ...customers, ...customers]
  return (
    <section className="section customers-strip">
      <div className="container">
        <NumHead eyebrow="Our valued customers" title="Trusted by *growing businesses." center />
      </div>
      <div className="logo-marquee">
        <div className="logo-track">
          {logos.map((c, i) => (
            <div className="logo-chip" key={i}>
              <img src={c.logo} alt={c.name} loading="lazy" />
              <span>{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Around() {
  return (
    <section className="section container">
      <NumHead num="11" eyebrow="Around the site" title={'Explore *Vynex.'} />
      <AroundSite />
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <ShowcaseImage />
      <Toolbox />
      <Marquee items={services.map((s) => s.title)} />
      <InAction />
      <Services />
      <Automation />
      <HowWeWork />
      <Work />
      <Industries />
      <Why />
      <TechHome />
      <CustomersStrip />
      <GetStarted num="09" />
      <Faq num="10" items={homeFaq} />
      <Around />
      <CTA title={'Ready to turn your ideas\ninto *reality?'} />
    </>
  )
}
