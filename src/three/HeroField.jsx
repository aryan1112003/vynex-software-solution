import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'

// A wavy dot field that bulges toward the cursor.
function Field({ cols = 140, rows = 60 }) {
  const ref = useRef()
  const mouse = useRef(new THREE.Vector2(0, 0))
  const { positions, colors, base } = useMemo(() => {
    const n = cols * rows
    const positions = new Float32Array(n * 3)
    const colors = new Float32Array(n * 3)
    const base = new Float32Array(n * 2)
    const a = new THREE.Color('#06b6d4')
    const b = new THREE.Color('#2563eb')
    const c = new THREE.Color('#7c3aed')
    const d = new THREE.Color('#db2777')
    const tmp = new THREE.Color()
    for (let i = 0; i < cols; i++)
      for (let j = 0; j < rows; j++) {
        const k = i * rows + j
        const x = (i / (cols - 1) - 0.5) * 28
        const y = (j / (rows - 1) - 0.5) * 12
        base[k * 2] = x
        base[k * 2 + 1] = y
        positions.set([x, y, 0], k * 3)
        const t = i / (cols - 1)
        if (t < 0.33) tmp.copy(a).lerp(b, t / 0.33)
        else if (t < 0.66) tmp.copy(b).lerp(c, (t - 0.33) / 0.33)
        else tmp.copy(c).lerp(d, (t - 0.66) / 0.34)
        colors.set([tmp.r, tmp.g, tmp.b], k * 3)
      }
    return { positions, colors, base }
  }, [cols, rows])

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime
    mouse.current.x = THREE.MathUtils.damp(mouse.current.x, state.pointer.x * 14, 4, dt)
    mouse.current.y = THREE.MathUtils.damp(mouse.current.y, state.pointer.y * 6, 4, dt)
    const pos = ref.current.geometry.attributes.position.array
    for (let k = 0; k < base.length / 2; k++) {
      const x = base[k * 2]
      const y = base[k * 2 + 1]
      const dx = x - mouse.current.x
      const dy = y - mouse.current.y
      const bump = Math.exp(-(dx * dx + dy * dy) / 6) * 1.6
      pos[k * 3 + 2] = Math.sin(x * 0.45 + t * 0.8) * 0.35 + Math.cos(y * 0.6 + t * 0.6) * 0.3 + bump
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref} rotation={[-1.05, 0, 0]} position={[0, -2.2, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.055} vertexColors transparent opacity={0.85} sizeAttenuation depthWrite={false} />
    </points>
  )
}

export default function HeroField() {
  const small = typeof window !== 'undefined' && window.innerWidth < 700
  return (
    <Canvas camera={{ position: [0, 0.5, 9], fov: 50 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }} eventSource={typeof document !== 'undefined' ? document.body : undefined}>
      <Field cols={small ? 70 : 140} rows={small ? 40 : 60} />
    </Canvas>
  )
}
