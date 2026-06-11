import { scrollBehavior } from '@/lib/motion';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

const SHOW_AFTER_PX = 400;

export function ScrollUpButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Scroll to top"
      className={`md:hidden fixed bottom-5 right-5 z-50 w-12 h-12 flex items-center justify-center bg-primary text-white shadow-lg active:scale-95 transition-all duration-200 ${
        visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
