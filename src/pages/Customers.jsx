import { asset } from '../asset.js'
import { customers, homeProcess, industries, services, showcase } from '../data.js'
import { Button, CTA, PageHero, Reveal, TiltCard } from '../components/ui.jsx'
import { Faq, GetStarted, Prepare } from '../components/extras.jsx'
import { customersFaq } from '../faqs.js'
import { AroundSite, CheckList, IndustryGrid, NumHead, Split, StatStrip, Timeline, WorkMarquee } from '../components/blocks.jsx'

const tags = ['Applications · Business', 'Mobile · Customers', 'ERP · Operations', 'Reports · Dashboards']

export default function Customers() {
  return (
    <>
      <PageHero
        eyebrow="Our customers"
        title={'Business relationships.\n*Shared possibilities.'}
        text="We work with businesses across different industries, with technology solutions shaped around their individual requirements."
        chips={['Business focus', 'Practical ideas', 'Connected solutions']}
      >
        <div className="logo-collage">
          {customers.map((c, i) => (
            <TiltCard key={c.name} className="collage-tile" max={10} style={{ '--d': i * 0.8 + 's' }}>
              <img src={c.logo} alt={c.name} />
              <span>{c.name}</span>
            </TiltCard>
          ))}
        </div>
      </PageHero>

      <StatStrip
        items={[
          [customers.length, '', 'Valued customers', 'across different industries'],
          [industries.length, '', 'Industries', 'with tailored possibilities'],
          [services.length, '', 'Services', 'shaped around each business'],
          [showcase.length, '', 'Solution concepts', 'from apps to dashboards'],
        ]}
      />

      <section className="section container">
        <NumHead num="01" eyebrow="Customer relationships" title={'Businesses\n*we work with.'} text="Every business brings a different set of needs and priorities. Meet some of the customers we work with." />
        <div className="customer-grid">
          {customers.map((c, i) => (
            <Reveal key={c.name} delay={(i % 2) * 0.15}>
              <TiltCard className="customer-card" max={8}>
                <div className="customer-logo">
                  <img src={c.logo} alt={c.name} />
                </div>
                <span className="eyebrow-sm">Our customer</span>
                <h3>{c.name}</h3>
                <p>Technology solutions shaped around individual business requirements.</p>
                <Button to="/contact" variant="ghost">
                  Discuss your project
                </Button>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section container">
        <Split img={asset('/images/gen/team-collaboration.webp')} alt="The team discussing a customer project timeline">
          <NumHead num="02" eyebrow="How we partner" title={'Every business is\n*different.'} />
          <Reveal>
            <p className="lead">We start with your people, processes and priorities, then shape technology around them — not the other way round.</p>
          </Reveal>
          <CheckList
            items={['Solutions shaped around your business requirements', 'A connected view of applications, information and workflows', 'Practical technology choices for what you want to achieve', 'A focus on business value']}
          />
        </Split>
      </section>

      <section className="section">
        <div className="container">
          <NumHead
            num="03"
            eyebrow="Explore the possibilities"
            title={'What we can build\n*for you.'}
            text="Illustrative solution concepts across applications, mobile experiences and business systems."
            aside={
              <Button to="/contact" variant="ghost">
                Discuss your project
              </Button>
            }
          />
        </div>
        <WorkMarquee items={showcase.map(([title, to, img], i) => ({ title, to, img, tag: tags[i] }))} />
      </section>

      <section className="section container">
        <NumHead num="04" eyebrow="Industry possibilities" title={'Tailored for\n*your industry.'} text="Every industry has different workflows. Discuss your requirements and explore a digital solution that fits." />
        <IndustryGrid items={industries} />
      </section>

      <section className="section how">
        <div className="container how-grid">
          <div className="how-sticky">
            <NumHead num="05" eyebrow="Working together" title={'How we work\n*with you.'} text="Start with an idea, shape the requirements and explore the next step together." />
            <Reveal delay={0.2} className="how-photo">
              <img src={asset('/images/gen/consultation.webp')} alt="A project conversation over video call" loading="lazy" />
            </Reveal>
          </div>
          <Timeline steps={homeProcess.map(([t, sub, d]) => [t, sub + ' — ' + d])} />
        </div>
      </section>

      <GetStarted num="06" />
      <Faq num="07" items={customersFaq} />

      <section className="section container">
        <NumHead num="08" eyebrow="Around the site" title={'Explore *Vynex.'} />
        <AroundSite />
      </section>

      <CTA title={'Your requirements.\nYour *next step.'} text="Let's explore where technology can make a difference for your business." button="Let's talk about your idea" />
    </>
  )
}
