// ─────────────────────────────────────────
//  Sections.js
//  All remaining page sections in one file.
//  Uses: useState (for contact form state)
//  Concept: Controlled form inputs — React
//           owns the input values via state
// ─────────────────────────────────────────

import { useState } from 'react';
import {
  personalInfo, stats, skills,
  projects, journey, hackathons
} from '../data/data';

// ── ABOUT ──────────────────────────────────
export function About() {
  return (
    <section id="about" className="section">
      <p className="section-label">// 01. about</p>
      <h2 className="section-title">
        Who I <span className="gradient-text">Am</span>
      </h2>
      <div className="divider" />

      <div className="about-grid">
        {/* Left: bio text */}
        <div className="about-text">
          {[personalInfo.bio1, personalInfo.bio2].map((para, i) => (
            <p key={i} dangerouslySetInnerHTML={{
              // Wrap <text> in pink color for highlighted words
              __html: para.replace(/<(.+?)>/g, '<span>$1</span>')
            }} />
          ))}
        </div>

        {/* Right: stat cards */}
        <div className="about-stats">
          {stats.map((s, i) => (
            <div key={i} className="stat-card">
              <div className="stat-number">{s.number}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── SKILLS ─────────────────────────────────
export function Skills() {
  return (
    <section id="skills" className="section">
      <p className="section-label">// 02. skills</p>
      <h2 className="section-title">
        Tech <span className="gradient-text">Stack</span>
      </h2>
      <div className="divider" />

      <div className="skills-grid">
        {skills.map((cat, i) => (
          <div key={i} className="skill-category">
            <div className="skill-cat-title">
              {cat.icon} {cat.category}
            </div>
            <div className="skill-tags">
              {cat.tags.map((tag, j) => (
                <span key={j} className="skill-tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── PROJECTS ───────────────────────────────
export function Projects() {
  // ── STATE ────────────────────────────────
  // filter: which category to show
  // 'all' shows every project
  const [filter, setFilter] = useState('all');

  const filters = ['all', 'ML', 'Web', 'AI'];

  // Filter logic based on project tags
  const filtered = projects.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'ML')  return p.tags.some(t => ['ML','K-Means','DBSCAN','Random Forest','XGBoost','NLP','TF-IDF'].includes(t));
    if (filter === 'Web') return p.tags.some(t => ['MERN','React','Flask','Node.js'].includes(t));
    if (filter === 'AI')  return p.tags.some(t => ['Gemini AI','Gemini','XAI','Fairness ML'].includes(t));
    return true;
  });

  return (
    <section id="projects" className="section">
      <p className="section-label">// 03. projects</p>
      <h2 className="section-title">
        Things I've <span className="gradient-text">Built</span>
      </h2>
      <div className="divider" />

      {/* Filter buttons — clicking updates `filter` state */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              padding: '6px 16px',
              borderRadius: 20,
              border: '1px solid',
              borderColor: filter === f ? 'var(--pink)' : 'var(--border)',
              background: filter === f ? 'rgba(244,114,182,0.1)' : 'transparent',
              color: filter === f ? 'var(--pink)' : 'var(--muted)',
              cursor: 'none',
              transition: 'all 0.2s',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Project cards */}
      <div className="projects-grid">
        {filtered.map((p, i) => (
          <div key={i} className="project-card">
            <div className="project-number">Project {p.id}</div>
            <h3 className="project-title">{p.title}</h3>
            <p className="project-desc">{p.desc}</p>
            <div className="project-tags">
              {p.tags.map((tag, j) => (
                <span key={j} className="project-tag">{tag}</span>
              ))}
            </div>
            <div className="project-links">
              <a href={p.github} className="project-link">GitHub →</a>
              <a href={p.live}   className="project-link">Live Demo →</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── JOURNEY ────────────────────────────────
export function Journey() {
  return (
    <section id="journey" className="section">
      <p className="section-label">// 04. journey</p>
      <h2 className="section-title">
        My <span className="gradient-text">Journey</span>
      </h2>
      <div className="divider" />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>
        {/* Timeline */}
        <div>
          <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--purple)', letterSpacing: 2, marginBottom: 32 }}>
            EXPERIENCE & EDUCATION
          </h3>
          <div className="timeline">
            {journey.map((item, i) => (
              <div key={i} className="timeline-item" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="timeline-dot" />
                <div className="timeline-date">{item.date}</div>
                <div className="timeline-role">{item.role}</div>
                <div className="timeline-org">{item.org}</div>
                <div className="timeline-desc">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hackathons */}
        <div>
          <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--purple)', letterSpacing: 2, marginBottom: 32 }}>
            HACKATHONS
          </h3>
          <div className="hackathons-grid" style={{ gridTemplateColumns: '1fr' }}>
            {hackathons.map((h, i) => (
              <div key={i} className="hack-card">
                <div className="hack-emoji">{h.emoji}</div>
                <div className="hack-name">{h.name}</div>
                <div className="hack-event">{h.event}</div>
                <div className="hack-desc">{h.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── CONTACT ────────────────────────────────
export function Contact() {
  // ── STATE (Controlled Form) ───────────────
  // Each input is a piece of state
  // React CONTROLS the input values
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  // ── SENT STATE ──────────────────────
  const [sent, setSent] = useState(false);

  // Handler: updates the correct field
  // e.target.name matches the state key
  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,                   // keep other fields
      [e.target.name]: e.target.value  // update this one
    }));
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send to an API here
    console.log('Form submitted:', form);
    setSent(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="section">
      <p className="section-label">// 05. contact</p>
      <h2 className="section-title">
        Let's <span className="gradient-text">Connect</span>
      </h2>
      <div className="divider" />

      <div className="contact-wrap">
        {/* Left: info */}
        <div className="contact-info">
          <p>
            I'm always open to exciting AI/ML projects, hackathon collabs,
            internship opportunities, and freelance work. Drop me a message!
          </p>

          <div className="contact-links">
            <a href={`mailto:${personalInfo.email}`} className="contact-link">
              ✉ {personalInfo.email}
            </a>
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="contact-link">
              ⌥ GitHub
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="contact-link">
              ◈ LinkedIn
            </a>
          </div>
        </div>

        {/* Right: form — each input is controlled by state */}
        <form className="contact-form" onSubmit={handleSubmit}>
          {sent ? (
            <div style={{
              background: 'rgba(52,211,153,0.1)',
              border: '1px solid var(--green)',
              borderRadius: 12,
              padding: 24,
              fontFamily: 'var(--font-mono)',
              fontSize: 14,
              color: 'var(--green)',
              textAlign: 'center',
            }}>
              ✓ Message sent! I'll get back to you soon.
            </div>
          ) : (
            <>
              <div className="form-group">
                <label className="form-label">Name</label>
                {/* value={form.name} makes this CONTROLLED */}
                <input
                  className="form-input"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  className="form-input"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  className="form-textarea"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <button type="submit" className="btn-primary" style={{ cursor: 'none' }}>
                Send Message →
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

// ── FOOTER ─────────────────────────────────
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="footer">
        <p className="footer-copy">
          © {year} <span>Nikitha M</span> — Built with React ⚛️
        </p>
        <a href="#" className="footer-back">Back to top ↑</a>
      </div>
    </footer>
  );
}

