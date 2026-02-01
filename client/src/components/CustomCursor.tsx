import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

interface CursorState {
  type: 'default' | 'pointer' | 'view' | 'watch' | 'drive' | 'magnetic';
  text: string;
}

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>({
    type: 'default',
    text: '',
  });
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Sharper spring physics for instant feedback
  const springConfig = { damping: 30, stiffness: 1000, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      // Only update visibility state if it's currently false to save cycles
      setIsVisible(prev => prev ? prev : true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      let newType: CursorState['type'] = 'default';
      let newText = '';

      if (target.closest('[data-cursor="drive"], [data-cursor-text="Drive"]')) {
        newType = 'drive';
        newText = 'Drive';
      } else if (target.closest('.watch-video, [data-cursor="watch"]')) {
        newType = 'watch';
        newText = 'Watch';
      } else if (target.closest('[data-cursor="view"], .gallery-image')) {
        newType = 'view';
        newText = 'View';
      } else if (target.closest('.magnetic-link')) {
        newType = 'magnetic';
      } else if (target.closest('a, button, [data-cursor="pointer"]')) {
        newType = 'pointer';
      }

      setCursorState(prev => {
        if (prev.type === newType && prev.text === newText) return prev;
        return { type: newType, text: newText };
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleElementHover);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleElementHover);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  const getVariant = () => {
    switch (cursorState.type) {
      case 'view':
      case 'watch':
      case 'drive':
        return { width: 100, height: 100, backgroundColor: 'rgba(255, 255, 255, 1)', mixBlendMode: 'normal' as const };
      case 'magnetic':
      case 'pointer':
        return { width: 60, height: 60, backgroundColor: 'rgba(255, 255, 255, 0.2)', mixBlendMode: 'difference' as const };
      default:
        return { width: 12, height: 12, backgroundColor: 'rgba(255, 255, 255, 1)', mixBlendMode: 'difference' as const };
    }
  };

  const variant = getVariant();

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center rounded-full"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          mixBlendMode: variant.mixBlendMode,
        }}
        animate={{
          width: variant.width,
          height: variant.height,
          backgroundColor: variant.backgroundColor,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 350, mass: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {cursorState.text && (
            <motion.span
              key={cursorState.text}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-black text-[10px] font-black uppercase tracking-[0.2em]"
            >
              {cursorState.text}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Outer ring for default state */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-primary/40"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorState.type === 'default' ? 40 : 0,
          height: cursorState.type === 'default' ? 40 : 0,
          opacity: isVisible && cursorState.type === 'default' ? 0.5 : 0,
        }}
      />

      <style>{`
        @media (hover: hover) and (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
    </>
  );
}
