import { useCallback, useEffect, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import Preloader from './components/Preloader'
import ParticleStage from './components/ParticleStage'
import CustomCursor from './components/CustomCursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Story from './components/Story'
import Statement from './components/Statement'
import PageEffects from './components/PageEffects'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Marquee from './components/ui/Marquee'
import Awards from './components/Awards'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { initSmooth, destroySmooth } from './lib/smooth'
import { loaderSeen, startIntro } from './lib/boot'
import { prefersReducedMotion } from './lib/gsap'
import { skillGroups } from './data/content'

const marqueeItems = skillGroups.flatMap((g) => g.items.filter((i) => i.level >= 80).map((i) => i.name))

export default function App() {
  const [showLoader, setShowLoader] = useState(() => !loaderSeen() && !prefersReducedMotion())
  const onLoaderDone = useCallback(() => setShowLoader(false), [])

  useEffect(() => {
    initSmooth()
    if (!showLoader) startIntro()
    return destroySmooth
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      {showLoader && <Preloader onDone={onLoaderDone} />}
      <ParticleStage />
      <CustomCursor />
      <Nav />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Story />
        <Statement />
        <About />
        <Experience />
        <Projects />
        <Marquee items={marqueeItems} />
        <Skills />
        <Awards />
        <Contact />
      </main>
      <Footer />
      <PageEffects />
    </MotionConfig>
  )
}
