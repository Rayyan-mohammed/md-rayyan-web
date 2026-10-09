import { useEffect, useRef } from 'react'
import { markReady, onIntro } from '../lib/boot'
import { prefersReducedMotion } from '../lib/gsap'
import { stage } from '../lib/stage'
import './ParticleStage.css'

// Fixed full-viewport frame holding the WebGL particle object.
// Hero scrolls its inset/radius open; story chapters morph the shape.
export default function ParticleStage() {
  const canvasRef = useRef(null)

  useEffect(() => {
    let dead = false
    let scene = null
    let offIntro = () => {}
    const canvas = canvasRef.current

    const onMove = (e) => {
      scene?.setPointer((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1)
    }

    import('../lib/ParticleScene')
      .then(({ ParticleScene }) => {
        markReady('engine')
        if (dead) return
        try {
          scene = new ParticleScene(canvas, { reduced: prefersReducedMotion() })
        } catch {
          // no WebGL: the CSS glow behind the canvas stays as the fallback
          markReady('scene')
          return
        }
        stage.setScene(scene)
        offIntro = onIntro(() => scene.intro())
        window.addEventListener('pointermove', onMove, { passive: true })
        markReady('scene')
      })
      .catch(() => {
        markReady('engine')
        markReady('scene')
      })

    return () => {
      dead = true
      offIntro()
      window.removeEventListener('pointermove', onMove)
      stage.setScene(null)
      scene?.destroy()
    }
  }, [])

  return (
    <div className="stage" aria-hidden="true">
      <div className="stage__glow" />
      <canvas ref={canvasRef} className="stage__canvas" />
      <div className="stage__grain" />
    </div>
  )
}
