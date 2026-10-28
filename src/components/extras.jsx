import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, Check, Plus } from 'lucide-react'
import { budgets, contact } from '../data.js'
import { Button, Reveal } from './ui.jsx'
import { CheckList, NumHead } from './blocks.jsx'

// Accordion of questions beside a sticky heading.
export function Faq({ num, title = 'Questions, *answered.', items }) {
  const [open, setOpen] = useState(0)
  return (
    <section className="section container faq">
      <div className="faq-side">
        <NumHead num={num} eyebrow="FAQ" title={title} text="Can't find what you're looking for? Ask us directly." />
        <Reveal delay={0.2} className="faq-contact">
          <a href={'mailto:' + contact.email}>{contact.email}</a>
          {contact.people.map((p) => (
            <a key={p.tel} href={'tel:' + p.tel}>
              {p.name} · {p.phone}
            </a>
          ))}
        </Reveal>
      </div>
      <div className="faq-list">
        {items.map(([q, a], i) => (
          <Reveal key={q} delay={i * 0.04} className={'faq-item' + (open === i ? ' open' : '')}>
            <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
              <span className="faq-n">{String(i + 1).padStart(2, '0')}</span>
              <span>{q}</span>
              <motion.span className="faq-plus" animate={{ rotate: open === i ? 45 : 0 }}>
                <Plus size={18} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  className="faq-a"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p>{a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

const startSteps = [
  ['Tell us your idea', 'Share what you have in mind, what needs to work better, or where you would like your business to go.'],
  ['Discuss your needs', 'Talk through your goals, existing processes and the people who will use the solution.'],
  ['Explore your next step', 'Agree on the scope, the approach and what your business needs next.'],
]

export function GetStarted({ num }) {
  return (
    <section className="section container">
      <NumHead
        num={num}
        eyebrow="Getting started"
        title={'Three simple steps\nto *begin.'}
        aside={
          <Button to="/contact" variant="ghost">
            Start a conversation
          </Button>
        }
      />
      <div className="start-grid">
        {startSteps.map(([t, d], i) => (
          <Reveal key={t} delay={i * 0.12} className="start-card">
            <span className="start-num">{i + 1}</span>
            <h3>{t}</h3>
            <p>{d}</p>
            {i < startSteps.length - 1 && <span className="start-arrow">→</span>}
          </Reveal>
        ))}
      </div>
    </section>
  )
}

// What to bring to a first conversation, plus the budget ranges from the enquiry form.
export function Prepare({ num, service }) {
  return (
    <section className="section container">
      <div className="prepare">
        <div>
          <NumHead num={num} eyebrow="Before we talk" title={'What to share\n*with us.'} text="A complete specification is not required. These details simply help us understand your starting point." />
          <CheckList
            items={[
              'Your goals and what needs to work better',
              'Current challenges and existing processes',
              'The people who will use the solution',
              'Existing systems the solution should connect with',
              'Any timelines you have in mind',
            ]}
          />
        </div>
        <Reveal delay={0.15} className="prepare-card">
          <span className="eyebrow-sm">Budget range (optional)</span>
          <p className="muted">Share a range if you have one — or tell us it's not decided yet.</p>
          <div className="budget-list">
            {budgets.map((b) => (
              <span key={b} className="budget-chip">
                {b}
              </span>
            ))}
          </div>
          <Link to="/contact" className="btn btn-primary">
            <span className="btn-label">{service ? 'Discuss ' + service : 'Send us a message'}</span>
            <span className="btn-arrow">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

// Illustrative trigger → AI → actions flow with data pulses moving along the lines.
const flow = {
  triggers: ['New enquiry form', 'Incoming email', 'WhatsApp message'],
  brain: 'Understand, classify & decide',
  actions: ['Update CRM record', 'Reply on WhatsApp', 'Notify your team', 'Add to daily report'],
}

export function AutomationFlow() {
  return (
    <div className="flow" aria-label="Illustrative automation workflow">
      <div className="flow-col">
        <span className="flow-label">Trigger</span>
        {flow.triggers.map((t, i) => (
          <Reveal key={t} delay={i * 0.1} className="flow-node trigger">
            <span className="flow-dot" />
            {t}
          </Reveal>
        ))}
      </div>
      <div className="flow-wire" aria-hidden>
        <span className="pulse" />
        <span className="pulse p2" />
      </div>
      <Reveal delay={0.3} className="flow-brain">
        <span className="flow-label">AI step</span>
        <div className="brain-core">
          <span className="brain-ring" />
          <Bot size={30} strokeWidth={1.75} />
        </div>
        <strong>{flow.brain}</strong>
        <small>People stay in the loop where it matters</small>
      </Reveal>
      <div className="flow-wire" aria-hidden>
        <span className="pulse" />
        <span className="pulse p2" />
      </div>
      <div className="flow-col">
        <span className="flow-label">Actions</span>
        {flow.actions.map((t, i) => (
          <Reveal key={t} delay={0.4 + i * 0.1} className="flow-node action">
            <span className="flow-check">
              <Check size={12} strokeWidth={3} />
            </span>
            {t}
          </Reveal>
        ))}
      </div>
      <span className="flow-tag">Illustrative workflow</span>
    </div>
  )
}
