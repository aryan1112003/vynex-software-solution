import { Link } from 'react-router-dom'
import { contact, services } from '../data.js'
import { Reveal } from './ui.jsx'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="container">
        <div className="footer-top">
          <Reveal className="footer-col">
            <h4>Explore Vynex</h4>
            <Link to="/about">About us</Link>
            <Link to="/technologies">Technologies</Link>
            <Link to="/portfolio">Our customers</Link>
            <Link to="/contact">Contact us</Link>
          </Reveal>
          <Reveal delay={0.2} className="footer-col">
            <h4>Our services</h4>
            {services.map((s) => (
              <Link key={s.slug} to={'/services/' + s.slug}>
                {s.title}
              </Link>
            ))}
          </Reveal>
          <Reveal delay={0.3} className="footer-col">
            <h4>Let’s connect</h4>
            {contact.people.map((p) => (
              <div key={p.tel} className="footer-person">
                <span className="muted small">{p.name}</span>
                <a href={'tel:' + p.tel}>{p.phone}</a>
              </div>
            ))}
            <a href={'mailto:' + contact.email}>{contact.email}</a>
            <span className="muted small">{contact.office}</span>
          </Reveal>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Vynex Software Solution</span>
          <span>Your Digital Transformation Partner</span>
        </div>
      </div>
    </footer>
  )
}
