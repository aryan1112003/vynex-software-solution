import { asset } from '../asset.js'
import { aboutValues, fiveSteps, services, techCategories, whyVynex } from '../data.js'
import Icon from '../components/Icon.jsx'
import { Faq, GetStarted, Prepare } from '../components/extras.jsx'
import { aboutFaq } from '../faqs.js'
import { Button, CTA, PageHero, Reveal, SplitText, TiltCard } from '../components/ui.jsx'
import { AroundSite, CheckList, LogoMarquee, NumHead, Pipeline, ServiceGrid, Split, StatStrip, Timeline } from '../components/blocks.jsx'

const allTech = techCategories.flatMap((c) => c.items)

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Vynex"
        title={'Technology begins\nwith *understanding.'}
        text="Innovative and reliable digital solutions for businesses of all sizes. We begin with your people, processes and the challenge you want technology to solve."
        chips={['Business needs — Come first', 'Practical ideas — Digital solutions', 'Connected thinking — Across your business']}
      >
        <div className="hero-media">
          <TiltCard className="photo-frame" max={8}>
            <img src={asset('/images/story-1122.webp')} alt="The Vynex team in a planning session" />
          </TiltCard>
          <div className="float-badge glass">
            <span className="badge-icon">
              <Icon name="Users" size={20} />
            </span>
            Business needs come first
          </div>
        </div>
      </PageHero>

      <StatStrip
        items={[
          [services.length, '', 'Services', 'software, data and digital'],
          [allTech.length, '+', 'Technologies', 'in our working stack'],
          [aboutValues.length, '', 'Core values', 'that guide every project'],
          [fiveSteps.length, '', 'Step approach', 'from idea to next step'],
        ]}
      />

      <section className="section container">
        <Split img={asset('/images/gen/office.webp')} alt="A modern software workspace with developers at their desks">
          <NumHead num="01" eyebrow="Who we are" title={'A technology partner\nfor your *business.'} />
          <Reveal>
            <p className="lead">
              We are a technology-driven company focused on delivering innovative and reliable digital solutions for businesses of all sizes. From custom software and mobile applications to AI, ERP,
              dashboards, reporting, and digital marketing, we help organizations simplify processes, improve efficiency, and accelerate growth.
            </p>
          </Reveal>
          <CheckList items={['Custom software, web and mobile applications', 'AI, ERP, reporting and business dashboards', 'Digital marketing and search engine optimization']} />
          <Button to="/contact" variant="ghost">
            Get to know us
          </Button>
        </Split>
      </section>

      <section className="section container">
        <NumHead num="02" eyebrow="What we value" title={'Principles behind\n*every project.'} text="Six ideas shape how we understand a challenge, choose technology and build a solution." />
        <div className="values-grid">
          {aboutValues.map(([t, d, icon], i) => (
            <Reveal key={t} delay={(i % 3) * 0.1}>
              <TiltCard className="value-card">
                <span className="value-top">
                  <span className="badge-icon">
                    <Icon name={icon} size={22} />
                  </span>
                  <span className="value-num">0{i + 1}</span>
                </span>
                <h3>{t}</h3>
                <p>{d}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section container">
        <NumHead num="03" eyebrow="Vision & mission" title={'Where we are\n*heading.'} />
        <div className="vm-grid">
          <Reveal>
            <div className="vm-card vision">
              <span className="vm-label">Our Vision</span>
              <SplitText
                as="p"
                className="vm-text"
                stagger={0.02}
                text="To become a trusted technology partner for businesses by delivering innovative, scalable, and intelligent digital solutions that simplify operations, drive growth, and create lasting value."
              />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="vm-card mission">
              <span className="vm-label">Our Mission</span>
              <SplitText
                as="p"
                className="vm-text"
                stagger={0.015}
                text="To empower businesses with innovative, reliable, and cost-effective technology solutions that simplify processes, improve efficiency, and support sustainable growth. We are committed to understanding our clients’ needs and delivering solutions that create measurable business value."
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section how">
        <div className="container how-grid">
          <div className="how-sticky">
            <NumHead num="04" eyebrow="A practical approach" title={'How we work through\n*your idea.'} text="Start with your business needs and shape the next step together." />
            <Reveal delay={0.2} className="how-photo">
              <img src={asset('/images/gen/team-collaboration.webp')} alt="The team reviewing a project timeline together" loading="lazy" />
            </Reveal>
          </div>
          <Timeline steps={fiveSteps} />
        </div>
        <Pipeline items={['Business needs', 'Processes', 'People', 'Practical ideas', 'Digital solution', 'Review', 'Next step']} />
      </section>

      <section className="section container why-grid">
        <div>
          <NumHead num="05" eyebrow="Why Vynex" title={'Thoughtful technology.\n*Practical solutions.'} />
          <CheckList items={whyVynex.map(([t, d]) => `${t} — ${d}`)} />
        </div>
        <Reveal className="split-photo">
          <img src={asset('/images/analytics-1536.webp')} alt="Business reports and dashboards across devices" loading="lazy" />
        </Reveal>
      </section>

      <section className="section container">
        <NumHead
          num="06"
          eyebrow="What we do"
          title={'Our connected\n*services.'}
          aside={
            <Button to="/contact" variant="ghost">
              Start your project
            </Button>
          }
        />
        <ServiceGrid items={services} />
      </section>

      <section className="section toolbox">
        <div className="container">
          <NumHead num="07" eyebrow="Powering ideas with technology" title={'Technologies across apps,\nAI, data and *cloud.'} center />
        </div>
        <LogoMarquee items={allTech.slice(0, 28)} />
        <LogoMarquee items={allTech.slice(28)} reverse />
      </section>

      <GetStarted num="08" />
      <Faq num="09" items={aboutFaq} />

      <section className="section container">
        <NumHead num="10" eyebrow="Around the site" title={'Explore *Vynex.'} />
        <AroundSite />
      </section>

      <CTA title={'Powering ideas with *technology.'} text="Explore the technologies we work with across applications, AI, data and cloud infrastructure." button="Explore our technologies" to="/technologies" />
    </>
  )
}
