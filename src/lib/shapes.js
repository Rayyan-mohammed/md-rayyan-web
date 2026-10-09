// Point-cloud targets for the particle object. Every generator returns Float32Array(n * 3).
const TAU = Math.PI * 2
const rnd = Math.random

function mulberry(seed) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const gauss = () => (rnd() + rnd() + rnd() - 1.5) * 0.8

function fill(n, fn) {
  const out = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) {
    const p = fn(i)
    out[i * 3] = p[0]
    out[i * 3 + 1] = p[1]
    out[i * 3 + 2] = p[2]
  }
  return out
}

// random point inside a unit sphere
function inSphere() {
  const th = TAU * rnd()
  const ph = Math.acos(2 * rnd() - 1)
  const r = Math.cbrt(rnd())
  return [r * Math.sin(ph) * Math.cos(th), r * Math.sin(ph) * Math.sin(th), r * Math.cos(ph)]
}

export function scatter(n) {
  return fill(n, () => {
    const p = inSphere()
    return [p[0] * 7, p[1] * 5, p[2] * 5]
  })
}

// hero: trefoil-style torus knot
export function knot(n) {
  return fill(n, () => {
    const t = rnd() * TAU
    const r = Math.cos(3 * t) + 2
    const base = [r * Math.cos(2 * t), r * Math.sin(2 * t), -Math.sin(3 * t)]
    const o = inSphere()
    const s = 0.55
    return [base[0] * s + o[0] * 0.2, base[1] * s + o[1] * 0.2, base[2] * s * 1.3 + o[2] * 0.2]
  })
}

// 01: code brackets  < / >
export function brackets(n) {
  const segs = [
    [-0.55, 0.95, -1.5, 0],
    [-1.5, 0, -0.55, -0.95],
    [0.55, 0.95, 1.5, 0],
    [1.5, 0, 0.55, -0.95],
    [0.3, 1.15, -0.3, -1.15],
  ]
  const lens = segs.map(([a, b, c, d]) => Math.hypot(c - a, d - b))
  const total = lens.reduce((s, l) => s + l, 0)
  return fill(n, () => {
    let pick = rnd() * total
    let k = 0
    while (k < segs.length - 1 && pick > lens[k]) pick -= lens[k++]
    const [a, b, c, d] = segs[k]
    const t = rnd()
    const thick = 0.09
    return [a + (c - a) * t + gauss() * thick, b + (d - b) * t + gauss() * thick, (rnd() - 0.5) * 0.45]
  })
}

// 02: cube, edges plus faint faces
export function cube(n) {
  const s = 1.0
  const corners = []
  for (let x = -1; x <= 1; x += 2) for (let y = -1; y <= 1; y += 2) for (let z = -1; z <= 1; z += 2) corners.push([x, y, z])
  const edges = []
  corners.forEach((a, i) =>
    corners.forEach((b, j) => {
      if (j <= i) return
      const diff = (a[0] !== b[0]) + (a[1] !== b[1]) + (a[2] !== b[2])
      if (diff === 1) edges.push([a, b])
    })
  )
  return fill(n, () => {
    if (rnd() < 0.6) {
      const [a, b] = edges[(rnd() * edges.length) | 0]
      const t = rnd()
      return [
        (a[0] + (b[0] - a[0]) * t) * s + gauss() * 0.04,
        (a[1] + (b[1] - a[1]) * t) * s + gauss() * 0.04,
        (a[2] + (b[2] - a[2]) * t) * s + gauss() * 0.04,
      ]
    }
    const axis = (rnd() * 3) | 0
    const sign = rnd() < 0.5 ? -1 : 1
    const p = [(rnd() * 2 - 1) * s, (rnd() * 2 - 1) * s, (rnd() * 2 - 1) * s]
    p[axis] = sign * s
    return p
  })
}

// 03: layered node graph (a small neural net)
export function nodeGraph(n) {
  const r = mulberry(7)
  const layers = [3, 5, 5, 3]
  const xs = [-1.8, -0.62, 0.62, 1.8]
  const nodes = layers.map((count, l) =>
    Array.from({ length: count }, () => [xs[l], (r() * 2 - 1) * 1.15, (r() * 2 - 1) * 0.9])
  )
  const edges = []
  for (let l = 0; l < layers.length - 1; l++) nodes[l].forEach((a) => nodes[l + 1].forEach((b) => edges.push([a, b])))
  const flat = nodes.flat()
  return fill(n, () => {
    if (rnd() < 0.55) {
      const [a, b] = edges[(rnd() * edges.length) | 0]
      const t = rnd()
      return [
        a[0] + (b[0] - a[0]) * t + gauss() * 0.015,
        a[1] + (b[1] - a[1]) * t + gauss() * 0.015,
        a[2] + (b[2] - a[2]) * t + gauss() * 0.015,
      ]
    }
    const c = flat[(rnd() * flat.length) | 0]
    const o = inSphere()
    return [c[0] + o[0] * 0.2, c[1] + o[1] * 0.2, c[2] + o[2] * 0.2]
  })
}

// 04: gyroscope rings around a small core
export function rings(n) {
  const radii = [1.55, 1.2, 0.85]
  const rot = [
    [0, 0],
    [1.05, 0.3],
    [0.35, 1.1],
  ]
  return fill(n, () => {
    if (rnd() < 0.12) {
      const o = inSphere()
      return [o[0] * 0.38, o[1] * 0.38, o[2] * 0.38]
    }
    const k = (rnd() * 3) | 0
    const a = rnd() * TAU
    const x = Math.cos(a) * radii[k] + gauss() * 0.03
    const y = Math.sin(a) * radii[k] + gauss() * 0.03
    const z = gauss() * 0.03
    const [rx, ry] = rot[k]
    const y1 = y * Math.cos(rx) - z * Math.sin(rx)
    const z1 = y * Math.sin(rx) + z * Math.cos(rx)
    return [x * Math.cos(ry) + z1 * Math.sin(ry), y1, -x * Math.sin(ry) + z1 * Math.cos(ry)]
  })
}

// 05: heart
export function heart(n) {
  return fill(n, () => {
    const t = rnd() * TAU
    const hx = 16 * Math.pow(Math.sin(t), 3)
    const hy = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)
    const s = Math.pow(rnd(), 0.4)
    const depth = (rnd() - 0.5) * 1.15 * (1.15 - s * 0.7)
    return [(hx / 11) * s + gauss() * 0.03, (hy / 11) * s + 0.1 + gauss() * 0.03, depth]
  })
}

export const SHAPES = [knot, brackets, cube, nodeGraph, rings, heart]
export const SHAPE_NAMES = ['knot', 'brackets', 'cube', 'graph', 'rings', 'heart']
