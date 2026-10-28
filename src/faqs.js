import { budgets, contact, services, techCategories } from './data.js'

const allTech = techCategories.flatMap((c) => c.items)
const list = (arr) => arr.slice(0, -1).join(', ') + ' and ' + arr[arr.length - 1]

export const homeFaq = [
  ['What does Vynex do?', `We build practical digital solutions for businesses of all sizes: ${list(services.map((s) => s.title))}.`],
  ['Can you automate our existing processes?', `Yes. We map how a task runs today, then automate the repetitive steps with tools like n8n, Make, Zapier, UiPath or custom code — keeping people in the loop where judgement matters. Our automation services: ${list(services.filter((s) => s.group === 'automation').map((s) => s.title))}.`],
  ['Do I need a complete specification to start?', 'No. You can start with a question. We talk through your goals, existing processes and the people who will use the solution, then shape the requirements together.'],
  ['Which industries do you work with?', 'We work with businesses across different industries, including healthcare, education, retail & e-commerce, manufacturing, real estate and travel & hospitality.'],
  ['Which technologies do you use?', `We work with ${allTech.length} technologies across ${techCategories.length} categories — from React, Node.js and Python to AWS, Azure, OpenAI and Power BI. The right choice depends on your requirements and existing systems.`],
  ['Where are you located?', `Our office is at ${contact.office}.`],
  ['How do I get in touch?', `Email ${contact.email}, call ${contact.people.map((p) => p.name + ' on ' + p.phone).join(' or ')}, or send a message through the contact page.`],
]

export const aboutFaq = [
  ['What kind of company is Vynex?', 'A technology-driven company focused on delivering innovative and reliable digital solutions for businesses of all sizes.'],
  ['What is your vision?', 'To become a trusted technology partner for businesses by delivering innovative, scalable and intelligent digital solutions that simplify operations, drive growth and create lasting value.'],
  ['What is your mission?', 'To empower businesses with innovative, reliable and cost-effective technology solutions that simplify processes, improve efficiency and support sustainable growth.'],
  ['How do you approach a new project?', 'In five steps: Understand your requirements and goals, Plan the scope and approach, Build the solution around your business, Review it against real tasks, and Move forward with what your business needs next.'],
  ['What values guide your work?', 'Innovation, business focus, reliable solutions, practical thinking, collaboration and being technology driven.'],
]

export const techFaq = [
  ['How do you choose the technology for a project?', 'We start with your requirements and the people who will use the solution, then consider your existing systems. The choice depends on what your business needs, not on a fixed stack.'],
  ['Can you work with our existing systems?', 'Yes. Connecting with your existing systems and data is part of how we shape a solution — for example ERP integration, reporting on existing databases or AI connected to your processes.'],
  ['Which AI tools do you work with?', `${list(techCategories.find((c) => c.id === 'ai-ml').items)}.`],
  ['Which cloud platforms do you use?', 'AWS, Azure and Google Cloud, with Docker, Kubernetes, Terraform and GitHub Actions for delivery, and Prometheus and Grafana for monitoring.'],
  ['Which databases do you support?', `${list(techCategories.find((c) => c.id === 'database').items)}.`],
  ['Do you build mobile apps natively or cross-platform?', 'Both are possible: React Native, Flutter and FlutterFlow for cross-platform apps, and Jetpack Compose for native Android. The right choice depends on your audience and requirements.'],
]

export const customersFaq = [
  ['Who are some of your customers?', 'Reliance Industries Limited, Twismi Technologies, Shiva International Tours & Travels and Narayan Marine Tech. Pvt. Ltd.'],
  ['Do you work with small businesses?', 'Yes. We deliver digital solutions for businesses of all sizes, shaped around their individual requirements.'],
  ['Can you help in my industry?', 'Every industry has different workflows. Discuss your requirements with us and we will explore a digital solution that fits — from healthcare and education to manufacturing and travel.'],
  ['What can you build for us?', 'Custom business applications, mobile customer experiences, connected ERP solutions, and business reports & dashboards — plus web, AI, digital marketing and SEO.'],
]

export const contactFaq = [
  ['Do I need a full specification before contacting you?', 'No. You can start with a question. A complete specification is not required.'],
  ['What should I include in my message?', 'Your goals, current challenges and any timelines you have in mind. Mentioning the service you are interested in helps too.'],
  ['What budget ranges do you work with?', `The enquiry form includes ${list(budgets)}. Sharing a range is optional.`],
  ['How can I reach you directly?', `Email ${contact.email}, or call ${contact.people.map((p) => p.name + ' on ' + p.phone).join(' or ')}.`],
  ['Where is your office?', contact.office + '.'],
]

export function serviceFaq(s) {
  const others = services.filter((x) => x.slug !== s.slug).slice(0, 3)
  const items = [
    [`What does ${s.title} include?`, s.offers.map(([t, d]) => `${t}: ${d}`).join(' ')],
    [`Who is ${s.title} for?`, s.body],
  ]
  if (s.tech) items.push([`Which technologies do you use for ${s.title}?`, `${list(s.tech)}. The choice depends on your requirements and existing systems.`])
  items.push([`How does a ${s.title} project start?`, s.steps.map(([t, d], i) => `${i + 1}. ${t} — ${d}`).join(' ')])
  items.push(['Do I need a complete specification?', 'No. You can start with a question. A focused conversation helps define what needs to work, who it is for and how to approach the solution.'])
  items.push([`Can ${s.title} be combined with other services?`, `Yes. It connects naturally with ${list(others.map((o) => o.title))}.`])
  return items
}
