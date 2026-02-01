import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Horizontal progress bar at top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Vertical progress indicator on the right */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col items-center gap-2">
        <motion.div
          className="w-[2px] h-24 bg-border rounded-full overflow-hidden"
        >
          <motion.div
            className="w-full bg-primary origin-top"
            style={{ scaleY: scrollYProgress, height: '100%' }}
          />
        </motion.div>
        <motion.span
          className="text-xs font-medium text-muted-foreground"
          style={{
            opacity: scrollYProgress,
          }}
        >
          <motion.span>
            {/* Display percentage */}
          </motion.span>
        </motion.span>
      </div>
    </>
  );
}
