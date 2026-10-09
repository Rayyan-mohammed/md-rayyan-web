export default function SectionWrapper({ id, number, title, subtitle, children, className = '', bg = 'dark' }) {
  return (
    <section id={id} className={`section ${bg === 'light' ? 'theme-light' : ''} ${className}`} data-bg={bg}>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow mono" data-reveal>
            {number} {title}
          </span>
          <h2 className="section-title" data-split>
            {title}
          </h2>
          {subtitle && (
            <p className="section-sub" data-reveal>
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  )
}
