import { motion } from 'framer-motion'
import SectionWrapper from './SectionWrapper'
import TagPill from './ui/TagPill'
import { skillGroups } from '../data/content'
import './Skills.css'

export default function Skills() {
  return (
    <SectionWrapper id="skills" number="04" title="Skills">
      <div className="skills__grid">
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.category}
            className="skills__col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: gi * 0.06, ease: [0.19, 1, 0.22, 1] }}
          >
            <h3 className="skills__cat mono">{group.category}</h3>
            <div className="skills__items">
              {group.items.map((item, ii) => (
                <TagPill key={item.name} delay={ii * 0.04}>
                  {item.name}
                </TagPill>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
