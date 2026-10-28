import { motion } from 'framer-motion'
import { Button } from '../components/ui.jsx'

export default function NotFound() {
  return (
    <section className="page-hero container notfound">
      <motion.div className="nf-code" animate={{ rotateY: [0, 360] }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}>
        404
      </motion.div>
      <h1 className="h2">This page drifted out of orbit.</h1>
      <Button to="/">Back to home</Button>
    </section>
  )
}
