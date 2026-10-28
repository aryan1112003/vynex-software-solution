import { asset } from '../asset.js'
import { techCategories } from '../data.js'
import { TechLogo } from './Icon.jsx'

const all = techCategories.flatMap((c) => c.items.map((name) => ({ name, cat: c.id, color: c.color })))

// Three rings around the logo; inner ring shows names, outer rings show marks only.
const rings = [
  { radius: 27, duration: 40, items: all.filter((_, i) => i % 7 === 0), labelled: true },
  { radius: 38, duration: 60, items: all.filter((_, i) => i % 7 !== 0 && i % 2 === 0), reverse: true },
  { radius: 48, duration: 85, items: all.filter((_, i) => i % 7 !== 0 && i % 2 === 1) },
]

export default function TechOrbit({ active }) {
  return (
    <div className="orbit" aria-label="Technologies we work with, orbiting the Vynex logo">
      {rings.map((ring, ri) => (
        <div key={ri} className="orbit-path" style={{ '--r': ring.radius * 2 + '%' }} />
      ))}
      {rings.map((ring, ri) => (
        <div
          key={ri}
          className={'orbit-ring' + (ring.reverse ? ' reverse' : '')}
          style={{ '--dur': ring.duration + 's' }}
        >
          {ring.items.map((it, i) => {
            const a = (i / ring.items.length) * Math.PI * 2
            const dim = active && active !== it.cat
            return (
              <div
                key={it.name}
                className="orbit-slot"
                style={{ left: 50 + Math.cos(a) * ring.radius + '%', top: 50 + Math.sin(a) * ring.radius + '%' }}
              >
                <div className={'orbit-item' + (ring.labelled ? ' labelled' : '') + (dim ? ' dim' : '')} style={{ '--c': it.color }} title={it.name}>
                  <TechLogo name={it.name} size={ring.labelled ? 20 : 22} />
                  {ring.labelled && <span>{it.name}</span>}
                </div>
              </div>
            )
          })}
        </div>
      ))}
      <div className="orbit-core">
        <span className="core-pulse" />
        <span className="core-pulse delay" />
        <div className="core-disc">
          <img src={asset('/logo.png')} alt="Vynex Software Solution" />
        </div>
      </div>
    </div>
  )
}
