import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  BufferGeometry,
  BufferAttribute,
  Points,
  ShaderMaterial,
  AdditiveBlending,
  Color,
  Group,
} from 'three'
import { gsap } from './gsap'
import { SHAPES, scatter } from './shapes'

const VERT = /* glsl */ `
  attribute vec3 aFrom;
  attribute vec3 aTo;
  attribute vec4 aRand;
  uniform float uMix;
  uniform float uTime;
  uniform float uSize;
  uniform float uPx;
  uniform float uBurst;
  varying float vAlpha;
  varying float vHue;

  float ease(float t) {
    return t < 0.5 ? 4.0 * t * t * t : 1.0 - pow(-2.0 * t + 2.0, 3.0) / 2.0;
  }

  void main() {
    float t = clamp((uMix - aRand.x * 0.4) / 0.6, 0.0, 1.0);
    float e = ease(t);
    vec3 p = mix(aFrom, aTo, e);

    vec3 dir = normalize(aRand.yzw - 0.5 + 1e-4);
    float b = sin(3.14159265 * t) * uBurst;
    p += dir * b * (0.6 + aRand.x * 1.2);

    p += 0.022 * vec3(
      sin(uTime * 0.8 + aRand.y * 20.0),
      cos(uTime * 0.7 + aRand.z * 20.0),
      sin(uTime * 0.9 + aRand.w * 20.0)
    );

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    float size = uSize * (0.55 + aRand.w * 1.1) * (1.0 + b * 0.35);
    gl_PointSize = size * uPx * (7.0 / -mv.z);

    vAlpha = (0.32 + 0.68 * aRand.w) * (0.75 + 0.25 * sin(uTime + aRand.x * 30.0));
    vHue = aRand.z;
  }
`

const FRAG = /* glsl */ `
  uniform vec3 uColA;
  uniform vec3 uColB;
  uniform float uOpacity;
  varying float vAlpha;
  varying float vHue;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = pow(smoothstep(0.5, 0.0, d), 1.7);
    vec3 col = mix(uColA, uColB, vHue);
    gl_FragColor = vec4(col, a * vAlpha * uOpacity);
  }
`

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

export function pickCount() {
  const mobile = window.matchMedia('(max-width: 760px)').matches
  const lowEnd = (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4
  if (mobile) return 7000
  if (lowEnd) return 9500
  return 14000
}

export class ParticleScene {
  constructor(canvas, { count = pickCount(), reduced = false } = {}) {
    this.canvas = canvas
    this.count = count
    this.reduced = reduced
    this.running = false
    this.spinTarget = 0
    this.spin = 0
    this.pointer = { x: 0, y: 0, cx: 0, cy: 0 }
    this.current = -1
    this.morphTween = null

    this.renderer = new WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' })
    this.renderer.setClearColor(0x000000, 0)
    this.scene = new Scene()
    this.camera = new PerspectiveCamera(45, 1, 0.1, 50)
    this.camera.position.z = 7
    this.group = new Group()
    this.scene.add(this.group)

    const n = count
    this.from = scatter(n)
    this.to = SHAPES[0](n)
    this.rand = new Float32Array(n * 4)
    this.dirs = new Float32Array(n * 3)
    const r = this.rand
    for (let i = 0; i < n; i++) {
      r[i * 4] = Math.random()
      r[i * 4 + 1] = Math.random()
      r[i * 4 + 2] = Math.random()
      r[i * 4 + 3] = Math.random()
      const dx = r[i * 4 + 1] - 0.5 + 1e-4
      const dy = r[i * 4 + 2] - 0.5 + 1e-4
      const dz = r[i * 4 + 3] - 0.5 + 1e-4
      const l = Math.hypot(dx, dy, dz)
      this.dirs[i * 3] = dx / l
      this.dirs[i * 3 + 1] = dy / l
      this.dirs[i * 3 + 2] = dz / l
    }

    const geo = new BufferGeometry()
    this.aFrom = new BufferAttribute(this.from, 3)
    this.aTo = new BufferAttribute(this.to, 3)
    geo.setAttribute('position', new BufferAttribute(new Float32Array(n * 3), 3))
    geo.setAttribute('aFrom', this.aFrom)
    geo.setAttribute('aTo', this.aTo)
    geo.setAttribute('aRand', new BufferAttribute(this.rand, 4))

    this.uniforms = {
      uMix: { value: 0 },
      uTime: { value: 0 },
      uSize: { value: 2.3 },
      uPx: { value: 1 },
      uBurst: { value: 0.4 },
      uOpacity: { value: 0 },
      uColA: { value: new Color('#b8921f') },
      uColB: { value: new Color('#fff1c4') },
    }
    const mat = new ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    })
    this.points = new Points(geo, mat)
    this.points.frustumCulled = false
    this.group.add(this.points)

    this.target = { x: 0, y: 0, s: 1 }
    this.render = this.render.bind(this)
    this.onResize = () => this.resize()
    this.resize()
    window.addEventListener('resize', this.onResize)
    this.renderOnce()
  }

  resize() {
    const w = this.canvas.clientWidth || window.innerWidth
    const h = this.canvas.clientHeight || window.innerHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75)
    this.renderer.setPixelRatio(dpr)
    this.renderer.setSize(w, h, false)
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
    this.uniforms.uPx.value = dpr
    const halfH = Math.tan((45 * Math.PI) / 360) * 7
    const halfW = halfH * this.camera.aspect
    if (this.camera.aspect > 1.1) this.target = { x: halfW * 0.42, y: 0, s: 1.12 }
    else this.target = { x: 0, y: halfH * 0.32, s: 0.82 }
    if (this.reduced || !this.running) {
      this.group.position.set(this.target.x, this.target.y, 0)
      this.group.scale.setScalar(this.target.s)
    }
  }

  setPointer(x, y) {
    this.pointer.x = x
    this.pointer.y = y
  }

  setSpin(v) {
    this.spinTarget = v
  }

  setActive(on) {
    if (on === this.running) return
    this.running = on
    if (on) gsap.ticker.add(this.render)
    else gsap.ticker.remove(this.render)
  }

  // Where each particle is right now, so an interrupted morph continues from there.
  snapshotFrom() {
    const mix = this.uniforms.uMix.value
    const burst = this.uniforms.uBurst.value
    const { from, to, rand, dirs, count } = this
    for (let i = 0; i < count; i++) {
      const t = Math.min(1, Math.max(0, (mix - rand[i * 4] * 0.4) / 0.6))
      const e = ease(t)
      const b = Math.sin(Math.PI * t) * burst * (0.6 + rand[i * 4] * 1.2)
      for (let k = 0; k < 3; k++) {
        const j = i * 3 + k
        from[j] = from[j] + (to[j] - from[j]) * e + dirs[j] * b
      }
    }
  }

  // Burst and re-form into shape `index`.
  setShape(index, { burst = 1.15, duration = 2.1 } = {}) {
    if (index === this.current) return
    this.current = index
    this.morphTween?.kill()
    this.snapshotFrom()
    this.to.set(SHAPES[index](this.count))
    this.aFrom.needsUpdate = true
    this.aTo.needsUpdate = true
    this.uniforms.uBurst.value = burst
    this.uniforms.uMix.value = 0
    if (this.reduced) {
      this.uniforms.uBurst.value = 0
      this.uniforms.uMix.value = 1
      this.renderOnce()
      return
    }
    this.morphTween = gsap.to(this.uniforms.uMix, { value: 1, duration, ease: 'none' })
  }

  // first assemble from the scattered cloud
  intro() {
    if (this.current < 0) this.current = 0
    this.morphTween?.kill()
    this.uniforms.uBurst.value = 0.35
    this.uniforms.uMix.value = 0
    if (this.reduced) {
      this.uniforms.uMix.value = 1
      this.uniforms.uOpacity.value = 1
      this.uniforms.uBurst.value = 0
      this.renderOnce()
      return
    }
    gsap.to(this.uniforms.uOpacity, { value: 1, duration: 1.6, ease: 'power2.out' })
    this.morphTween = gsap.to(this.uniforms.uMix, { value: 1, duration: 3.2, ease: 'none', delay: 0.15 })
  }

  renderOnce() {
    this.renderer.render(this.scene, this.camera)
  }

  render(time) {
    this.uniforms.uTime.value = time
    const p = this.pointer
    p.cx += (p.x - p.cx) * 0.05
    p.cy += (p.y - p.cy) * 0.05
    this.spin += (this.spinTarget - this.spin) * 0.06
    this.points.rotation.y = this.spin + time * 0.06 + p.cx * 0.35
    this.points.rotation.x = Math.sin(time * 0.2) * 0.08 + p.cy * 0.22
    const g = this.group
    g.position.x += (this.target.x - g.position.x) * 0.06
    g.position.y += (this.target.y - g.position.y) * 0.06
    g.scale.setScalar(g.scale.x + (this.target.s - g.scale.x) * 0.06)
    this.renderer.render(this.scene, this.camera)
  }

  destroy() {
    this.setActive(false)
    this.morphTween?.kill()
    window.removeEventListener('resize', this.onResize)
    this.points.geometry.dispose()
    this.points.material.dispose()
    this.renderer.dispose()
  }
}
