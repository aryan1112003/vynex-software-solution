import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from 'lenis'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Cursor from './components/Cursor.jsx'
import Loader from './components/Loader.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Technologies from './pages/Technologies.jsx'
import Customers from './pages/Customers.jsx'
import Contact from './pages/Contact.jsx'
import Service from './pages/Service.jsx'
import NotFound from './pages/NotFound.jsx'

let lenis

export default function App() {
  const location = useLocation()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    let id
    const raf = (t) => {
      lenis.raf(t)
      id = requestAnimationFrame(raf)
    }
    id = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(id)
      lenis.destroy()
    }
  }, [])

  // Every page opens at the top (or at its #section); the browser must not restore an old position.
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  }, [])

  const toTop = () => {
    lenis?.scrollTo(0, { immediate: true, force: true })
    window.scrollTo(0, 0)
  }

  // Runs once the old page has faded out and the new one is mounted.
  const settleScroll = () => {
    const el = location.hash && document.querySelector(location.hash)
    if (el) lenis?.scrollTo(el, { offset: -90, force: true })
    else toTop()
  }

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash)
      if (el) lenis?.scrollTo(el, { offset: -90, force: true })
    } else {
      toTop()
    }
  }, [location.pathname, location.hash])

  return (
    <>
      <AnimatePresence>{loading && <Loader onDone={() => setLoading(false)} />}</AnimatePresence>
      <Cursor />
      <ScrollProgress />
      <div className="noise" aria-hidden />
      <Navbar />
      <AnimatePresence mode="wait" onExitComplete={settleScroll}>
        <motion.main
          key={location.pathname}
          id="page-content"
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/technologies" element={<Technologies />} />
            <Route path="/portfolio" element={<Customers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services/:slug" element={<Service />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  )
}
