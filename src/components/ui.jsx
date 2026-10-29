import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

export function Reveal({ children, delay = 0, y = 40, className, as = 'div' }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </M>
  )
}

// Splits text into words that rise up from a mask one after another.
export function SplitText({ text, className, delay = 0, as = 'h2', stagger = 0.06 }) {
  const Tag = motion[as]
  const lines = text.split('\n')
  let i = 0
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
      aria-label={text.replace(/\n/g, ' ').replace(/\*/g, '')}
    >
      {lines.map((line, li) => (
        <span className="split-line" key={li} aria-hidden>
          {line.split(' ').map((w) => {
            const d = delay + i++ * stagger
            return (
              <span className="split-mask" key={w + d}>
                <motion.span
                  className={w.startsWith('*') ? 'split-word grad-text' : 'split-word'}
                  variants={{ hidden: { y: '110%', rotate: 6 }, show: { y: 0, rotate: 0, transition: { duration: 0.9, ease, delay: d } } }}
                >
                  {w.replace(/^\*/, '')}
                </motion.span>
              </span>
            )
          })}
        </span>
      ))}
    </Tag>
  )
}

export function Eyebrow({ children }) {
  return (
    <Reveal className="eyebrow">
      <span className="eyebrow-dot" />
      {children}
    </Reveal>
  )
}

export function SectionHead({ eyebrow, title, text, center, children }) {
  return (
    <div className={'section-head' + (center ? ' center' : '')}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <SplitText text={title} className="h2" />
      {text && (
        <Reveal delay={0.2}>
          <p className="lead">{text}</p>
        </Reveal>
      )}
      {children}
    </div>
  )
}

export function Button({ to, href, children, variant = 'primary', ...rest }) {
  const cls = 'btn btn-' + variant
  const inner = (
    <>
      <span className="btn-label">{children}</span>
      <span className="btn-arrow">→</span>
    </>
  )
  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {inner}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {inner}
      </a>
    )
  }
  return (
    <button className={cls} {...rest}>
      {inner}
    </button>
  )
}

// Card that tilts in 3D toward the pointer and shows a moving spotlight.
export function TiltCard({ children, className = '', max = 12, style, ...rest }) {
  const ref = useRef(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [max, -max]), { stiffness: 180, damping: 18 })
  const ry = useSpring(useTransform(mx, [0, 1], [-max, max]), { stiffness: 180, damping: 18 })
  const glow = useTransform([mx, my], ([a, b]) => `radial-gradient(500px circle at ${a * 100}% ${b * 100}%, rgba(255,255,255,.14), transparent 40%)`)
  return (
    <motion.div
      ref={ref}
      className={'tilt ' + className}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900, ...style }}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect()
        mx.set((e.clientX - r.left) / r.width)
        my.set((e.clientY - r.top) / r.height)
      }}
      onMouseLeave={() => {
        mx.set(0.5)
        my.set(0.5)
      }}
      {...rest}
    >
      <motion.div className="tilt-glow" style={{ background: glow }} />
      {children}
    </motion.div>
  )
}

export function Marquee({ items, reverse, speed = 40 }) {
  const row = [...items, ...items]
  return (
    <div className="marquee">
      <div className={'marquee-track' + (reverse ? ' reverse' : '')} style={{ animationDuration: speed + 's' }}>
        {row.map((t, i) => (
          <span className="marquee-item" key={i}>
            {t}
            <span className="marquee-star" />
          </span>
        ))}
      </div>
    </div>
  )
}

export function Steps({ steps, title = 'How we work through your idea.', eyebrow = 'A practical approach' }) {
  return (
    <section className="section container">
      <SectionHead eyebrow={eyebrow} title={title} text="Start with your business needs and shape the next step together." center />
      <div className="steps">
        <motion.div
          className="steps-line"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease }}
        />
        {steps.map(([t, d], i) => (
          <Reveal key={t} delay={i * 0.12} className="step">
            <div className="step-num">{String(i + 1).padStart(2, '0')}</div>
            <h3>{t}</h3>
            <p>{d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function CTA({ title = 'Ready to turn your ideas into *reality?', text = 'Let’s explore the right digital solution for your business.', button = 'Start a conversation', to = '/contact' }) {
  return (
    <section className="section container">
      <div className="cta">
        <div className="cta-orb a" />
        <div className="cta-orb b" />
        <div className="cta-grid" />
        <SplitText text={title} className="h2 cta-title" />
        <Reveal delay={0.2}>
          <p className="lead">{text}</p>
        </Reveal>
        <Reveal delay={0.35}>
          <Button {...(to.startsWith('/') ? { to } : { href: to })}>{button}</Button>
        </Reveal>
      </div>
    </section>
  )
}

export function PageHero({ eyebrow, title, text, chips, children }) {
  return (
    <section className="page-hero container">
      <div className="page-hero-copy">
        <Eyebrow>{eyebrow}</Eyebrow>
        <SplitText text={title} as="h1" className="h1" stagger={0.08} />
        <Reveal delay={0.3}>
          <p className="lead">{text}</p>
        </Reveal>
        {chips && (
          <div className="chips">
            {chips.map((c, i) => (
              <Reveal key={c} delay={0.4 + i * 0.08} className="chip">
                {c}
              </Reveal>
            ))}
          </div>
        )}
      </div>
      {children && <div className="page-hero-visual">{children}</div>}
    </section>
  )
}
