import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { useReducedMotion } from '../lib/useReducedMotion'
import ProjectCard from './ui/ProjectCard'
import { projects, labels, sectionNumbers } from '../data/content'
import './Projects.css'

// Desktop: pinned, scrolls sideways with a scrubbed progress bar. Mobile or
// reduced motion: a plain vertical stack.
export default function Projects() {
  const rootRef = useRef(null)
  const pinRef = useRef(null)
  const trackRef = useRef(null)
  const barRef = useRef(null)
  const titleRef = useRef(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    const track = trackRef.current
    if (reduced) {
      gsap.set(titleRef.current, { visibility: 'visible' })
      return
    }

    const mm = gsap.matchMedia()

    mm.add('(min-width: 981px)', () => {
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth)
      const cards = [...track.querySelectorAll('.pcard')]

      // Cards translated outside the viewport must not stay in the tab order.
      const updateInert = () => {
        const vw = window.innerWidth
        cards.forEach((card) => {
          const rect = card.getBoundingClientRect()
          const offscreen = rect.right <= 0 || rect.left >= vw
          card.inert = offscreen && !card.contains(document.activeElement)
        })
      }

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
            updateInert()
          },
          onRefresh: updateInert,
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

      updateInert()
      track.addEventListener('focusin', updateInert)
      track.addEventListener('focusout', updateInert)

      return () => {
        track.removeEventListener('focusin', updateInert)
        track.removeEventListener('focusout', updateInert)
        cards.forEach((card) => {
          card.inert = false
        })
      }
    })

    return () => {
      mm.revert()
    }
  }, [reduced])

  return (
    <section id="projects" className="projects theme-light" ref={rootRef} data-bg="light">
      <div className="projects__pin" ref={pinRef}>
        <div className="container projects__head">
          <span className="eyebrow mono" data-reveal>
            {sectionNumbers.projects} {labels.projects}
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
