// ─────────────────────────────────────────
//  Hero.js
//  Uses: useState, useEffect (React Hooks)
//  Concept: Animated typing effect using
//           state + interval timer
// ─────────────────────────────────────────

import { useState, useEffect } from 'react';
import { personalInfo } from '../data/data';

// Roles to cycle through in typing animation
const ROLES = [
  'AI/ML Engineer',
  'Full Stack Dev',
  'Hackathon Builder',
  '100 Days Challenger',
];

function Hero() {
  // ── STATE ──────────────────────────────
  // roleIndex: which role we are showing
  const [roleIndex, setRoleIndex] = useState(0);

  // displayed: the text shown so far (typing effect)
  const [displayed, setDisplayed] = useState('');

  // isDeleting: are we typing or erasing?
  const [isDeleting, setIsDeleting] = useState(false);

  // ── TYPING EFFECT ──────────────────────
  // useEffect runs whenever roleIndex or
  // isDeleting changes
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const speed = isDeleting ? 60 : 120;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // TYPING: add one character at a time
        setDisplayed(currentRole.slice(0, displayed.length + 1));

        // When fully typed → start deleting after pause
        if (displayed.length === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        // DELETING: remove one character at a time
        setDisplayed(currentRole.slice(0, displayed.length - 1));

        // When fully deleted → go to next role
        if (displayed.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, speed);

    // CLEANUP: clear timer to prevent memory leaks
    return () => clearTimeout(timer);
  }, [displayed, isDeleting, roleIndex]);

  return (
    <section className="hero">
      <div>
        {/* Availability tag */}
        <div className="hero-tag">
          available for opportunities
        </div>

        {/* Big Name */}
        <h1 className="hero-name">
          <span className="gradient-text">{personalInfo.name}</span>
        </h1>

        {/* Typing Role */}
        <p className="hero-role">
          <span>{displayed}</span>
          {/* Blinking cursor */}
          <span style={{ borderRight: '2px solid var(--pink)', marginLeft: 2, animation: 'blink 1s infinite' }}> </span>
        </p>

        {/* Short description */}
        <p className="hero-desc">
          {personalInfo.tagline} — shipping AI projects every day,
          one commit at a time. Based in Tamil Nadu 🇮🇳
        </p>

        {/* CTA Buttons */}
        <div className="hero-btns">
          <a href="#projects" className="btn-primary">
            View Projects ↓
          </a>
          <a href={personalInfo.resume} className="btn-outline">
            Download Resume
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll">
        <div className="scroll-line" />
        scroll
      </div>
    </section>
  );
}

export default Hero;

