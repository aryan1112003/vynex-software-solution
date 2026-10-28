import { asset } from '../asset.js'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { budgets, contact, fiveSteps, services } from '../data.js'
import { CheckCircle2, Mail, MapPin } from 'lucide-react'
import { Button, CTA, PageHero, Reveal, TiltCard } from '../components/ui.jsx'
import { AroundSite, NumHead, Pipeline, Timeline } from '../components/blocks.jsx'
import Icon from '../components/Icon.jsx'
import { Faq, GetStarted, Prepare } from '../components/extras.jsx'
import { contactFaq } from '../faqs.js'

const empty = { name: '', email: '', phone: '', service: '', message: '', budget: '' }

export default function Contact() {
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  // No backend in this frontend build: validate, then hand the enquiry to the user's mail client.
  const submit = (e) => {
    e.preventDefault()
    const err = {}
    if (!form.name.trim()) err.name = 'Please enter your full name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = 'Please enter a valid email address.'
    if (!form.message.trim()) err.message = 'Please tell us a little about your project.'
    setErrors(err)
    if (Object.keys(err).length) return
    const details = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone && `Phone: ${form.phone}`,
      form.service && `Service of interest: ${form.service}`,
      form.budget && `Budget range: ${form.budget}`,
    ].filter(Boolean)
    const body = details.join('\n') + '\n\n' + form.message
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent('Project enquiry — ' + (form.service || 'General'))}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const field = (k, label, props = {}, Tag = 'input') => (
    <label className={'field' + (errors[k] ? ' has-error' : '') + (form[k] ? ' filled' : '')}>
      <Tag className="input" value={form[k]} onChange={set(k)} placeholder=" " {...props} />
      <span className="field-label">{label}</span>
      <AnimatePresence>
        {errors[k] && (
          <motion.small className="field-error" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {errors[k]}
          </motion.small>
        )}
      </AnimatePresence>
    </label>
  )

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title={'Let’s build something\n*great together.'}
        text="Tell us what you have in mind, what needs to work better, or where you would like your business to go."
        chips={['Tell us your idea', 'Discuss your needs', 'Explore your next step']}
      >
        <div className="hero-media">
          <TiltCard className="photo-frame" max={8}>
            <img src={asset('/images/gen/consultation.webp')} alt="A consultant on a video call discussing a project" />
          </TiltCard>
          <a className="float-badge glass" href={'mailto:' + contact.email}>
            <span className="badge-icon">
              <Mail size={20} strokeWidth={1.75} />
            </span>
            {contact.email}
          </a>
        </div>
      </PageHero>

      <section className="section container contact-grid">
        <Reveal className="form-card">
          <h2 className="h3">Send us a message</h2>
          <p className="muted">Tell us about your project and what you want to achieve. Fields marked * are required.</p>
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div key="ok" className="form-success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <motion.div className="success-check" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 200 }}>
                  <CheckCircle2 size={40} strokeWidth={1.75} />
                </motion.div>
                <h3>Your email app should now be open.</h3>
                <p className="muted">
                  Send the prepared message to reach us, or write to <a href={'mailto:' + contact.email}>{contact.email}</a> directly.
                </p>
                <button className="btn btn-ghost" onClick={() => (setForm(empty), setSent(false))}>
                  <span className="btn-label">Write another message</span>
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0, y: -10 }}>
                <div className="form-row">
                  {field('name', 'Full Name *', { autoComplete: 'name' })}
                  {field('email', 'Email Address *', { type: 'email', autoComplete: 'email' })}
                </div>
                <div className="form-row">
                  {field('phone', 'Phone Number (optional)', { type: 'tel', autoComplete: 'tel' })}
                  <label className="field filled">
                    <select className="input" value={form.service} onChange={set('service')}>
                      <option value="">I'd like to discuss</option>
                      {services.map((s) => (
                        <option key={s.slug}>{s.title}</option>
                      ))}
                    </select>
                    <span className="field-label">Service of interest (optional)</span>
                  </label>
                </div>
                {field('message', 'Your Message *', { rows: 5, placeholder: 'Your goals, current challenges and any timelines you have in mind.' }, 'textarea')}
                <div className="budget">
                  <span className="field-label static">Budget range (optional)</span>
                  <div className="filter-pills">
                    {budgets.map((b) => (
                      <button type="button" key={b} className={'pill' + (form.budget === b ? ' on' : '')} onClick={() => setForm({ ...form, budget: b })}>
                        {form.budget === b && <motion.span layoutId="budget-bg" className="pill-bg" />}
                        <span>{b}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <p className="muted small">We'll use these details to respond to your enquiry.</p>
                <Button type="submit">Send Message</Button>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>

        <div className="contact-side">
          <Reveal>
            <span className="eyebrow-sm">Get in touch</span>
            <h3 className="h3">Start a conversation</h3>
            <p className="muted">Reach out by email or phone to discuss your requirements.</p>
          </Reveal>
          {contact.people.map((p, i) => (
            <Reveal key={p.tel} delay={0.1 + i * 0.1}>
              <TiltCard className="person-card" max={8}>
                <div className="avatar">{p.name.split(' ').map((w) => w[0]).join('')}</div>
                <div>
                  <strong>{p.name}</strong>
                  <a href={'mailto:' + contact.email}>{contact.email}</a>
                  <a href={'tel:' + p.tel}>{p.phone}</a>
                </div>
              </TiltCard>
            </Reveal>
          ))}
          <Reveal delay={0.3}>
            <div className="office-card">
              <span className="eyebrow-sm">Our Office</span>
              <p>{contact.office}</p>
              <a className="more" href={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(contact.office)} target="_blank" rel="noreferrer">
                Open in Maps <b>→</b>
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="why-talk">
              <h4>Why talk to Vynex?</h4>
              <ul>
                <li>Solutions shaped around your business requirements</li>
                <li>Custom software, web and mobile applications</li>
                <li>AI, ERP, reporting and business dashboards</li>
                <li>A practical conversation about your next step</li>
              </ul>
              <p className="muted small">You can start with a question. A complete specification is not required.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section container">
        <NumHead num="01" eyebrow="Visit us" title={'Our office in\n*Ahmedabad.'} />
        <Reveal className="office-band">
          <div className="office-band-copy">
            <span className="eyebrow-sm">Our Office</span>
            <address>{contact.office}</address>
            <a className="more" href={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(contact.office)} target="_blank" rel="noreferrer">
              Open in Google Maps <b>→</b>
            </a>
          </div>
          <div className="office-band-map photo" aria-hidden>
            <img src={asset('/images/gen/office.webp')} alt="" loading="lazy" />
            <span className="map-pin">
              <MapPin size={24} strokeWidth={2} />
            </span>
          </div>
        </Reveal>
      </section>

      <section className="section container">
        <NumHead num="02" eyebrow="What you can ask about" title={'Any of our\n*services.'} text="You can start with a question. A complete specification is not required." />
        <div className="service-chips">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.04}>
              <a
                href="#page-content"
                className="service-chip"
                style={{ '--c': s.color }}
                onClick={(e) => {
                  e.preventDefault()
                  setForm((f) => ({ ...f, service: s.title }))
                  document.querySelector('.form-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }}
              >
                <span className="badge-icon">
                  <Icon name={s.icon} size={18} />
                </span>
                {s.title}
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section how">
        <div className="container how-grid">
          <div className="how-sticky">
            <NumHead num="03" eyebrow="Your ideas. Our conversation." title={'What happens\n*after you write.'} text="Let's explore the next step for your business." />
            <Reveal delay={0.2} className="how-photo">
              <img src={asset('/images/gen/planning.webp')} alt="Planning a solution on a whiteboard" loading="lazy" />
            </Reveal>
          </div>
          <Timeline steps={fiveSteps} />
        </div>
        <Pipeline items={['Tell us your idea', 'Discuss your needs', 'Explore your next step', 'Plan', 'Build', 'Review']} />
      </section>

      <Prepare num="04" />
      <Faq num="05" items={contactFaq} />

      <section className="section container">
        <NumHead num="06" eyebrow="Around the site" title={'Explore *Vynex.'} />
        <AroundSite />
      </section>

      <CTA title={'Prefer to talk?\n*Call us.'} text={contact.people.map((p) => p.name + ' · ' + p.phone).join('   |   ')} button="Email us" to={'mailto:' + contact.email} />
    </>
  )
}
