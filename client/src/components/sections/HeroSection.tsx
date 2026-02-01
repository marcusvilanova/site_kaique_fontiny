import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { trpc } from '@/lib/trpc';
import Magnetic from '../Magnetic';
import OptimizedImage from '../OptimizedImage';

export default function HeroSection() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Fetch CMS content
  const { data: content } = trpc.cms.getContent.useQuery();

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 0.5], ['0%', '100%']);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-background"
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y, scale }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background z-10" />
        <OptimizedImage
          src="/images/hero-cover.jpg"
          alt="Kaique Fontiny"
          className="w-full h-full"
          priority={true}
          style={{
            filter: 'grayscale(10%) contrast(1.05)',
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-20 h-full flex flex-col justify-center items-center px-4"
        style={{ opacity }}
      >
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4"
        >
          <span className="text-primary text-sm md:text-base font-medium tracking-[0.3em] uppercase">
            @kaiquefontiny
          </span>
        </motion.div>

        {/* Main Title - Massive Editorial Typography */}
        <div className="relative mb-12 flex flex-col items-center">
          <div className="overflow-hidden mb-[-2vw]">
            <motion.h1
              className="text-[14vw] md:text-[16vw] font-black text-white leading-[0.8] tracking-tighter select-none uppercase"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              {content?.["hero_title_1"] || t('hero.title1')}
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              className="text-[14vw] md:text-[16vw] font-black text-primary leading-[0.8] tracking-tighter select-none uppercase"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            >
              {content?.["hero_title_2"] || t('hero.title2')}
            </motion.h1>
          </div>
        </div>

        {/* Subtitle */}
        <motion.p
          className="mt-8 text-muted-foreground text-sm md:text-base lg:text-lg tracking-[0.2em] uppercase text-center max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {content?.["hero_subtitle"] || t('experience.quote')}
        </motion.p>

        {/* Scroll indicator */}
        <Magnetic strength={0.2}>
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
              {t('hero.scroll')}
            </span>
            <motion.div
              className="w-6 h-10 border-2 border-muted-foreground/50 rounded-full flex justify-center pt-2"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <motion.div
                className="w-1.5 h-1.5 bg-primary rounded-full"
                animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </Magnetic>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-8 left-8 z-30">
        <Magnetic strength={0.3}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
          >
            <span className="text-xs tracking-[0.15em] text-muted-foreground">2025</span>
          </motion.div>
        </Magnetic>
      </div>

      <div className="absolute top-8 right-8 z-30">
        <Magnetic strength={0.3}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
          >
            <span className="text-xs tracking-[0.15em] text-muted-foreground">PORTFÓLIO</span>
          </motion.div>
        </Magnetic>
      </div>
    </section>
  );
}
