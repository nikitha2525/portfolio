// ─────────────────────────────────────────
//  Cursor.js
//  Uses: useState, useEffect (React Hooks)
//  Concept: Track mouse position with state
//           and update cursor position live
// ─────────────────────────────────────────

import { useState, useEffect } from 'react';

function Cursor() {
  // ── STATE ──────────────────────────────
  // pos: current mouse coordinates {x, y}
  const [pos,     setPos]     = useState({ x: 0, y: 0 });

  // ring: slightly lagged position for outer ring
  const [ring,    setRing]    = useState({ x: 0, y: 0 });

  // hovering: true when mouse is over a link/button
  const [hovering, setHovering] = useState(false);

  // ── EFFECT ─────────────────────────────
  useEffect(() => {
    let ringX = 0, ringY = 0;
    let animId;

    // Track raw mouse position
    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Check if hovering a clickable element
      const el = document.elementFromPoint(e.clientX, e.clientY);
      setHovering(el?.matches('a, button, [role="button"]') || false);
    };

    // Smoothly follow mouse for ring (lerp animation)
    const animate = () => {
      setRing(prev => {
        ringX += (pos.x - ringX) * 0.12;
        ringY += (pos.y - ringY) * 0.12;
        return { x: ringX, y: ringY };
      });
      animId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    animId = requestAnimationFrame(animate);

    // CLEANUP
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(animId);
    };
  }, [pos.x, pos.y]);

  return (
    <>
      {/* Dot cursor — follows mouse exactly */}
      <div className="cursor" style={{
        left: pos.x,
        top:  pos.y,
        transform: `translate(-50%, -50%) scale(${hovering ? 0.5 : 1})`,
      }} />

      {/* Ring cursor — slightly lagged */}
      <div className="cursor-ring" style={{
        left: ring.x,
        top:  ring.y,
        width:  hovering ? 52 : 36,
        height: hovering ? 52 : 36,
        opacity: hovering ? 0.8 : 0.5,
      }} />
    </>
  );
}

export default Cursor;

