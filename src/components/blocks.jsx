import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, animate, motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion'
import { Check } from 'lucide-react'
import { TechLogo } from './Icon.jsx'
import Icon from './Icon.jsx'
import { Reveal, SplitText, TiltCard } from './ui.jsx'
import { techCategories } from '../data.js'

// Number that counts up once it scrolls into view.
export function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: (x) => setV(Math.round(x)) })
    return () => c.stop()
  }, [inView, to])
  return (
    <span ref={ref}>
      {v}
      {suffix}
    </span>
  )
}

// Cycles through words with a typewriter effect.
export function TypeRotator({ words }) {
  const [i, setI] = useState(0)
  const [text, setText] = useState('')
  const [del, setDel] = useState(false)
  useEffect(() => {
    const w = words[i]
    const t = setTimeout(
      () => {
        if (!del && text === w) return setDel(true)
        if (del && text === '') {
          setDel(false)
          return setI((i + 1) % words.length)
        }
        setText(del ? w.slice(0, text.length - 1) : w.slice(0, text.length + 1))
      },
      !del && text === w ? 1600 : del ? 30 : 60
    )
    return () => clearTimeout(t)
  }, [text, del, i, words])
  return (
    <span className="typer">
      {text}
      <span className="caret" />
    </span>
  )
}

// Numbered section heading in the "01 — Title" style.
export function NumHead({ num, eyebrow, title, text, center, aside }) {
  return (
    <div className={'num-head' + (center ? ' center' : '')}>
      <div>
        <Reveal className="num-eyebrow">
          {num && <span className="num">{num}</span>}
          {eyebrow}
        </Reveal>
        <SplitText text={title} className="h2" />
        {text && (
          <Reveal delay={0.15}>
            <p className="lead">{text}</p>
          </Reveal>
        )}
      </div>
      {aside && <Reveal delay={0.2}>{aside}</Reveal>}
    </div>
  )
}

export function LogoMarquee({ items, reverse, speed = 45 }) {
  const row = [...items, ...items]
  return (
    <div className="tool-marquee">
      <div className={'tool-track' + (reverse ? ' reverse' : '')} style={{ animationDuration: speed + 's' }}>
        {row.map((t, i) => (
          <span className="tool-chip" key={i}>
            <TechLogo name={t} size={22} />
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

export function Pipeline({ items }) {
  const row = [...items, ...items, ...items, ...items]
  return (
    <div className="pipeline">
      <div className="pipeline-track">
        {row.map((t, i) => (
          <span key={i} className="pipe-item">
            <span className="pipe-node">{t}</span>
            <span className="pipe-arrow">→</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// Pick a service and watch an illustrative project "run" through its steps.
export function Replay({ services }) {
  const [active, setActive] = useState(0)
  const [run, setRun] = useState(0)
  const s = services[active]
  const lines = [
    ...s.steps.map(([t, d]) => ({ kind: 'step', t, d })),
    ...s.offers.map(([t]) => ({ kind: 'ok', t })),
  ]
  const [shown, setShown] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '-100px' })

  useEffect(() => {
    setShown(0)
  }, [active, run])
  useEffect(() => {
    if (!inView || shown >= lines.length) return
    const t = setTimeout(() => setShown((n) => n + 1), 650)
    return () => clearTimeout(t)
  }, [shown, inView, lines.length])

  return (
    <div className={'replay' + (services.length === 1 ? ' solo' : '')} ref={ref}>
      <div className="replay-tabs" role="tablist" hidden={services.length === 1}>
        {services.map((sv, i) => (
          <button key={sv.slug} role="tab" aria-selected={i === active} className={'replay-tab' + (i === active ? ' on' : '')} onClick={() => setActive(i)} style={{ '--c': sv.color }}>
            {i === active && <motion.span layoutId="replay-bg" className="replay-tab-bg" />}
            <span className="replay-tab-icon">
              <Icon name={sv.icon} size={18} />
            </span>
            <span>{sv.title}</span>
          </button>
        ))}
      </div>
      <div className="replay-panel" style={{ '--c': s.color }}>
        <div className="replay-bar">
          <span className="dots">
            <i />
            <i />
            <i />
          </span>
          <span className="replay-title">{s.title}</span>
          <span className="replay-tag">Illustrative run</span>
        </div>
        <div className="replay-body">
          <div className="replay-prompt">
            <span>›</span> {s.lead}
          </div>
          <AnimatePresence initial={false}>
            {lines.slice(0, shown).map((l, i) => (
              <motion.div key={active + '-' + run + '-' + i} className={'replay-line ' + l.kind} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35 }}>
                {l.kind === 'step' ? (
                  <>
                    <span className="rl-num">{String(i + 1).padStart(2, '0')}</span>
                    <span>
                      <strong>{l.t}</strong>
                      <small>{l.d}</small>
                    </span>
                  </>
                ) : (
                  <>
                    <span className="rl-check">
                      <Check size={14} strokeWidth={3} />
                    </span>
                    <span>{l.t}</span>
                  </>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {shown < lines.length && <span className="replay-cursor" />}
        </div>
        <div className="replay-foot">
          <button className="replay-btn" onClick={() => setRun((r) => r + 1)}>
            ↻ Replay
          </button>
          <Link to={'/services/' + s.slug} className="more">
            Explore {s.title} <b>→</b>
          </Link>
        </div>
      </div>
    </div>
  )
}

// Vertical timeline whose line fills as you scroll.
export function Timeline({ steps }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] })
  const h = useSpring(useTransform(scrollYProgress, [0, 1], ['0%', '100%']), { stiffness: 90, damping: 20 })
  return (
    <div className="timeline" ref={ref}>
      <div className="tl-track">
        <motion.span style={{ height: h }} />
      </div>
      {steps.map(([t, d], i) => (
        <Reveal key={t} className="tl-item">
          <span className="tl-dot" />
          <span className="tl-num">{String(i + 1).padStart(2, '0')}</span>
          <h3>{t}</h3>
          <p>{d}</p>
        </Reveal>
      ))}
    </div>
  )
}

export function WorkMarquee({ items }) {
  const row = [...items, ...items]
  return (
    <div className="work-marquee">
      <div className="work-track">
        {row.map((w, i) => (
          <Link to={w.to} key={i} className="work-card">
            <div className="work-img">
              <img src={w.img} alt={w.title} loading="lazy" />
            </div>
            <span className="work-tag">{w.tag}</span>
            <h3>{w.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function CheckList({ items }) {
  return (
    <ul className="checklist">
      {items.map((t, i) => (
        <Reveal as="li" key={t} delay={i * 0.06}>
          <span className="rl-check">
            <Check size={14} strokeWidth={3} />
          </span>
          {t}
        </Reveal>
      ))}
    </ul>
  )
}

export function AroundSite() {
  const links = [
    ['01', 'About', 'Who we are, our vision and mission', '/about'],
    ['02', 'Technologies', `${techCategories.reduce((n, c) => n + c.items.length, 0)} technologies across ${techCategories.length} categories`, '/technologies'],
    ['03', 'Customers', 'Businesses we work with', '/portfolio'],
    ['04', 'Contact', 'Email, phone and our Ahmedabad office', '/contact'],
  ]
  return (
    <div className="around">
      {links.map(([n, t, d, to], i) => (
        <Reveal key={to} delay={i * 0.08}>
          <Link to={to} className="around-card">
            <span className="around-num">{n}</span>
            <h3>{t}</h3>
            <p>{d}</p>
            <span className="around-arrow">↗</span>
          </Link>
        </Reveal>
      ))}
    </div>
  )
}

export function StatStrip({ items }) {
  return (
    <section className="container stats">
      {items.map(([n, s, t, d], i) => (
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

export function ServiceGrid({ items }) {
  return (
    <div className="services-grid">
      {items.map((s, i) => (
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
  )
}

export function IndustryGrid({ items }) {
  return (
    <div className="industry-grid">
      {items.map(([n, d, to, icon, img], i) => (
        <Reveal key={n} delay={(i % 3) * 0.08}>
          <Link to={to} className={'industry-card' + (img ? ' has-img' : '')}>
            {img && (
              <span className="industry-img">
                <img src={img} alt={n} loading="lazy" />
              </span>
            )}
            <span className="industry-body">
              <span className="industry-icon">
                <Icon name={icon} size={24} />
              </span>
              <span>
                <h3>{n}</h3>
                <p>{d}</p>
              </span>
              <span className="around-arrow">↗</span>
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  )
}

// Photo beside a block of copy; flips sides with `reverse`.
export function Split({ img, alt, reverse, children }) {
  return (
    <div className={'split' + (reverse ? ' reverse' : '')}>
      <Reveal className="split-photo">
        <img src={img} alt={alt} loading="lazy" />
      </Reveal>
      <div className="split-copy">{children}</div>
    </div>
  )
}
