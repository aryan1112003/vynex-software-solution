import {
  Bot,
  Cog,
  ScanText,
  Send,
  Workflow,
  Zap,
  Boxes,
  BrainCircuit,
  Briefcase,
  Building2,
  Code2,
  Cpu,
  Factory,
  FileBarChart,
  Globe,
  GraduationCap,
  HeartPulse,
  LayoutDashboard,
  Lightbulb,
  Megaphone,
  Network,
  Plane,
  Puzzle,
  Search,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Target,
  Users,
  Wrench,
} from 'lucide-react'
import techIcons from '../techIcons.js'
import techIconsExtra from '../techIconsExtra.js'

const icons = { Bot, Cog, ScanText, Send, Workflow, Zap, Boxes, BrainCircuit, Briefcase, Building2, Code2, Cpu, Factory, FileBarChart, Globe, GraduationCap, HeartPulse, LayoutDashboard, Lightbulb, Megaphone, Network, Plane, Puzzle, Search, ShieldCheck, ShoppingBag, Smartphone, Target, Users, Wrench }

export default function Icon({ name, size = 24, strokeWidth = 1.75 }) {
  const C = icons[name]
  return C ? <C size={size} strokeWidth={strokeWidth} aria-hidden /> : null
}

// Official brand mark for a technology, or its initials when no mark is available.
export function TechLogo({ name, size = 22 }) {
  const extra = techIconsExtra[name]
  if (extra) return <svg width={size} height={size} viewBox={extra.vb} aria-hidden dangerouslySetInnerHTML={{ __html: extra.svg }} />
  const ic = techIcons[name]
  if (!ic)
    return (
      <span className="tech-mono" style={{ width: size, height: size, fontSize: size * 0.42 }}>
        {name
          .split(/\s+/)
          .map((w) => w[0])
          .join('')
          .slice(0, 2)}
      </span>
    )
  const fill = ic.c === '#000000' || ic.c === '#181717' ? '#0b1230' : ic.c
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path d={ic.p} fill={fill} />
    </svg>
  )
}
