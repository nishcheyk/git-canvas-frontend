import { motion } from 'framer-motion';

/**
 * Reusable wrapper component for HUD slide-out panels.
 * Standardizes Framer Motion spring transitions, glassmorphic layout styles,
 * background colors, border tokens, and fonts.
 */
export default function HudPanelWrapper({ children, direction = 'right', className = '' }) {
  const initial = direction === 'right' ? { x: '110%', opacity: 0 } : { y: '110%', opacity: 0 };
  const animate = direction === 'right' ? { x: 0, opacity: 1 } : { y: 0, opacity: 1 };
  const exit = direction === 'right' ? { x: '110%', opacity: 0 } : { y: '110%', opacity: 0 };

  return (
    <motion.div
      initial={initial}
      animate={animate}
      exit={exit}
      transition={{ type: 'spring', damping: 25, stiffness: 190 }}
      className={`w-full glass-panel rounded-2xl border border-space-border flex flex-col pointer-events-auto shadow-2xl relative font-sans ${className}`}
    >
      {children}
    </motion.div>
  );
}
