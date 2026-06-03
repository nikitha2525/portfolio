// ─────────────────────────────────────────
//  Navbar.js
//  Uses: useState, useEffect (React Hooks)
//  Concept: Tracks scroll position to add
//           glass effect when user scrolls
// ─────────────────────────────────────────

import { useState, useEffect } from 'react';

// Nav links array — easy to add/remove items
const NAV_LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Journey',    href: '#journey' },
  { label: 'Contact',    href: '#contact' },
];

function Navbar() {
  // ── STATE ──────────────────────────────
  // scrolled: true when user has scrolled > 50px
  // This adds the glass background to navbar
  const [scrolled, setScrolled] = useState(false);

  // active: which section is currently in view
  const [active, setActive]   = useState('');

  // ── EFFECT ─────────────────────────────
  // useEffect runs AFTER the component mounts
  // The [] means it only runs ONCE on mount
  useEffect(() => {
    const handleScroll = () => {
      // If scrolled more than 50px → add glass
      setScrolled(window.scrollY > 50);

      // Find which section is in view
      const sections = NAV_LINKS.map(l => l.href.slice(1));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    // CLEANUP: remove listener when component unmounts
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      {/* Logo */}
      <div className="nav-logo">NM.</div>

      {/* Nav Links */}
      <ul className="nav-links">
        {NAV_LINKS.map(link => (
          <li key={link.href}>
            <a
              href={link.href}
              className={active === link.href.slice(1) ? 'active' : ''}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <a href="#contact" className="nav-cta">
        Hire Me →
      </a>
    </nav>
  );
}

export default Navbar;

