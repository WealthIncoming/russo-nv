import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

// TEMPORARY TEST — to be reverted. Fullscreen logo splash on page load:
// logo scales in on a brand-dark overlay, holds, then the overlay fades
// out to reveal the site. Client-mounted only (never in the SSR HTML), so
// crawlers and no-JS visitors are never stuck behind it.
export default function IntroSplash() {
  const [show, setShow] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    setShow(true);
    const timer = setTimeout(() => setShow(false), 1600);
    return () => clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <motion.img
            src="/images/logo.png"
            alt=""
            className="w-[min(70vw,32rem)] h-auto"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
