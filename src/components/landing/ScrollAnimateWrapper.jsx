import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

/**
 * Universal animation wrapper for CodeCanvas.
 * Handles scroll reveals, parallax, staggered entrances, page transitions, and more.
 */
export default function ScrollAnimateWrapper({ children, className = "", animationType = "scroll-reveal", delay = 0, text = "" }) {
  
  if (animationType === "scroll-reveal") {
    return (
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  if (animationType === "parallax") {
    const ref = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < 768);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

    return (
      <motion.div 
        ref={ref}
        style={{ y: isMobile ? 0 : y, scale: isMobile ? 1 : scale }}
        className={`${className} will-change-transform`}
      >
        {children}
      </motion.div>
    );
  }

  if (animationType === "navbar-shrink") {
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, 'change', (latest) => {
      setScrolled(latest > 50);
    });

    return (
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`${className} transition-all duration-300 ease-in-out ${
          scrolled 
            ? 'h-14 bg-space-bg/90 backdrop-blur-md border-b border-white/5' 
            : 'h-20 bg-transparent border-b border-transparent'
        }`}
      >
        {children}
      </motion.nav>
    );
  }

  if (animationType === "hero-title") {
    return (
      <h1 className={`${className} flex justify-center`}>
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, type: 'spring', stiffness: 200 }}
          >
            {char}
          </motion.span>
        ))}
      </h1>
    );
  }

  if (animationType === "fade-up") {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  if (animationType === "page-transition") {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  if (animationType === "scroll-progress") {
    const { scrollYProgress } = useScroll();
    return (
      <motion.div
        style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
        className={className}
      />
    );
  }

  if (animationType === "stagger") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  if (animationType === "svg-line") {
    return (
      <motion.path
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        {...children.props}
      />
    );
  }

  if (animationType === "spotlight") {
    return (
      <div 
        className={className}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
          e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
        }}
        style={{
          background: 'radial-gradient(600px circle at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(99,102,241,0.08), transparent)'
        }}
      >
        {children}
      </div>
    );
  }

  if (animationType === "slide-left") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  if (animationType === "slide-right") {
    return (
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  // Fallback
  return <div className={className}>{children}</div>;
}
