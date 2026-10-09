import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { splitReveal } from '../lib/split'
import ProjectCard from './ui/ProjectCard'
import { projects } from '../data/content'
import './Projects.css'

// Desktop: pinned, scrolls sideways with a scrubbed progress bar. Mobile: plain vertical stack.
export default function Projects() {
  const rootRef = useRef(null)
  const pinRef = useRef(null)
  const trackRef = useRef(null)
  const barRef = useRef(null)
  const titleRef = useRef(null)

  useLayoutEffect(() => {
    const track = trackRef.current
    const off = splitReveal(titleRef.current)
    const mm = gsap.matchMedia()

    mm.add('(min-width: 981px)', () => {
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth)

      const slide = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          pin: pinRef.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          scrub: 0.7,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            barRef.current.style.transform = `scaleX(${self.progress})`
          },
        },
      })

      // big ghost numerals drift against the scroll
      track.querySelectorAll('.pcard').forEach((card) => {
        gsap.fromTo(
          card.querySelector('.pcard__bignum'),
          { xPercent: -14 },
          {
            xPercent: 10,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              containerAnimation: slide,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          }
        )
      })
    })

    return () => {
      off()
      mm.revert()
    }
  }, [])

  return (
    <section id="projects" className="projects theme-light" ref={rootRef} data-bg="light">
      <div className="projects__pin" ref={pinRef}>
        <div className="container projects__head">
          <span className="eyebrow mono" data-reveal>
            03 Selected work
          </span>
          <h2 className="section-title" data-split ref={titleRef}>
            Things I shipped, not just sketched.
          </h2>
        </div>

        <div className="projects__track" ref={trackRef}>
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        <div className="projects__progress" aria-hidden="true">
          <i ref={barRef} />
        </div>
      </div>
    </section>
  )
}
