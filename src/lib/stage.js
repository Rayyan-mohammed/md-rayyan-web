// Bridge between page sections (which only know chapter numbers) and the async WebGL scene.
export const stage = {
  scene: null,
  desired: 0,
  spin: 0,
  active: true,
  setScene(s) {
    this.scene = s
    if (s) {
      s.setSpin(this.spin)
      s.setActive(this.active)
      if (this.desired !== 0) s.setShape(this.desired)
    }
  },
  setShape(i) {
    this.desired = i
    this.scene?.setShape(i)
  },
  setSpin(v) {
    this.spin = v
    this.scene?.setSpin(v)
  },
  setActive(on) {
    this.active = on
    this.scene?.setActive(on)
  },
}
