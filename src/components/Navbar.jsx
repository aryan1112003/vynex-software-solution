import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { nav, services } from '../data.js'
import { Brand } from './Brand.jsx'
import { Button } from './ui.jsx'
import Icon from './Icon.jsx'

export default function Navbar() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [mega, setMega] = useState(false)
  const location = useLocation()

  useMotionValueEvent(scrollY, 'change', (v) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(v > 30)
    setHidden(v > prev && v > 300 && !open)
  })

  useEffect(() => {
    setOpen(false)
    setMega(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <motion.header
        className={'nav' + (scrolled ? ' scrolled' : '')}
        animate={{ y: hidden ? -110 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="nav-inner container">
          <Link to="/" aria-label="Vynex home">
            <Brand />
          </Link>
          <nav className="nav-links" onMouseLeave={() => setMega(false)}>
            {nav.map((n) => (
              <NavLink key={n.to} to={n.to} end className="nav-link">
                {({ isActive }) => (
                  <>
                    {isActive && <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
                    <span>{n.label}</span>
                  </>
                )}
              </NavLink>
            ))}
            <button className={'nav-link' + (mega ? ' active' : '')} onMouseEnter={() => setMega(true)} onClick={() => setMega((m) => !m)}>
              <span>Services ▾</span>
            </button>
            <AnimatePresence>
              {mega && (
                <motion.div
                  className="mega"
                  initial={{ opacity: 0, y: 12, rotateX: -12 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.3 }}
                >
                  {services.map((s, i) => [
                    i === 0 && <span key="g1" className="mega-group">Digital services</span>,
                    s.group && !services[i - 1].group && <span key="g2" className="mega-group">Automation</span>,
                    <motion.div key={s.slug} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                      <Link to={'/services/' + s.slug} className="mega-item">
                        <span className="mega-icon" style={{ '--c': s.color }}>
                          <Icon name={s.icon} size={18} />
                        </span>
                        <span>
                          <strong>{s.title}</strong>
                          <small>{s.short}</small>
                        </span>
                      </Link>
                    </motion.div>,
                  ])}
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
          <div className="nav-cta">
            <Button to="/contact" variant="small">
              Get a free quote
            </Button>
          </div>
          <button className={'burger' + (open ? ' open' : '')} onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
            <span />
            <span />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: 'circle(0% at 92% 4%)' }}
            animate={{ clipPath: 'circle(150% at 92% 4%)' }}
            exit={{ clipPath: 'circle(0% at 92% 4%)' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mobile-links">
              {nav.map((n, i) => (
                <motion.div key={n.to} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.07 }}>
                  <NavLink to={n.to} end className="mobile-link">
                    <span className="mobile-num">0{i + 1}</span>
                    {n.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div className="mobile-services" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                {services.map((s) => (
                  <Link key={s.slug} to={'/services/' + s.slug}>
                    {s.title}
                  </Link>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
