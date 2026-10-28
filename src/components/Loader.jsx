import { asset } from '../asset.js'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function Loader({ onDone }) {
  const [n, setN] = useState(0)
  const done = useRef(onDone)
  done.current = onDone

  useEffect(() => {
    let v = 0
    const id = setInterval(() => {
      v = Math.min(100, v + Math.ceil(Math.random() * 9))
      setN(v)
      if (v === 100) {
        clearInterval(id)
        setTimeout(() => done.current(), 350)
      }
    }, 45)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div className="loader" exit={{ y: '-100%' }} transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}>
      <motion.img
        src={asset('/logo.png')}
        alt="Vynex Software Solution"
        className="loader-logo"
        initial={{ scale: 0.85, opacity: 0, filter: 'blur(10px)' }}
        animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="loader-bar">
        <span style={{ width: n + '%' }} />
      </div>
      <div className="loader-count">{n}%</div>
    </motion.div>
  )
}
