import { motion } from 'framer-motion'
import { profile, heroRoles } from '../data/content'
import HeroCards from './ui/HeroCards'
import SignatureLine from './ui/SignatureLine'
import ParticleField from './ui/ParticleField'
import RoleTypewriter from './ui/RoleTypewriter'
import Magnetic from './ui/Magnetic'
import './Hero.css'

const nameLetters = profile.name.toUpperCase().split('')

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero__bg" aria-hidden="true" />
      <ParticleField />
      <SignatureLine />
      <div className="container hero__inner">
        <div className="hero__text">
          <motion.p
            className="hero__hello mono"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Hello, I&apos;m
          </motion.p>

          <motion.h1
            className="hero__name"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.045, delayChildren: 0.35 } },
            }}
          >
            {nameLetters.map((letter, i) => (
              <motion.span
                key={i}
                className="hero__letter"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {letter === ' ' ? ' ' : letter}
              </motion.span>
            ))}
            <motion.span
              className="hero__cursor"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            />
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          >
            <RoleTypewriter roles={heroRoles} />
          </motion.div>

          <motion.p
            className="hero__tagline"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Building end-to-end ML systems —{' '}
            <em className="hero__tagline-accent">
              from computer vision diagnostics to production-grade LLM agents.
            </em>
          </motion.p>

          <motion.div
            className="hero__cta"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Magnetic as="a" href="#projects" className="btn btn--primary">
              View My Work
            </Magnetic>
            <Magnetic
              as="a"
              href="/resume.pdf"
              download="MD_Rayyan_Resume.pdf"
              className="btn btn--ghost"
            >
              Download CV
            </Magnetic>
          </motion.div>

          <motion.a
            href="#about"
            className="hero__scroll mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            <motion.span
              className="hero__scroll-line"
              animate={{ scaleY: [0.3, 1, 0.3] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
            Scroll to explore
          </motion.a>
        </div>

        <motion.div
          className="hero__cards-wrap"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroCards />
        </motion.div>
      </div>
    </section>
  )
}
