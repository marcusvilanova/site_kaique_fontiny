import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { trpc } from '@/lib/trpc';
import OptimizedImage from '../OptimizedImage';

export default function AboutSection() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Fetch CMS content
  const { data: content } = trpc.cms.getContent.useQuery();

  const y = useTransform(scrollYProgress, [0, 1], ['100px', '-100px']);

  const words = [
    content?.["about_p1"] || t('about.p1'),
    content?.["about_p2"] || t('about.p2'),
    content?.["about_p3"] || t('about.p3'),
    content?.["about_p4"] || t('about.p4'),
  ];

  const highlightText = content?.["about_highlight"] || t('about.highlight');

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-32 bg-background overflow-hidden"
    >
      {/* Background text decoration */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <motion.span
          className="text-[20vw] font-bold text-foreground/[0.02] whitespace-nowrap select-none"
          style={{ y }}
        >
          FONTINY
        </motion.span>
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left column - Title */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary text-sm font-medium tracking-[0.3em] uppercase mb-4 block">
              {t('about.label')}
            </span>
            {/* Person Introduction - Narrative Text Reveal */}
            <div className="max-w-xl mb-8">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed flex flex-wrap gap-x-[0.3em] gap-y-0">
                {t('about.story').split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.03,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="inline-block"
                  >
                    {word}{" "}
                  </motion.span>
                ))}
              </p>
            </div>
            <h2
              className="text-display text-5xl md:text-6xl lg:text-8xl text-foreground leading-tight"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              {t('about.title').split(' ')[0]}
              <br />
              <span className="text-primary">{t('about.title').split(' ')[1]}</span>
            </h2>

            {/* Image with mask reveal effect & Model Specs */}
            <div className="mt-12 relative">
              <motion.div
                className="relative overflow-hidden rounded-lg"
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <OptimizedImage
                  src="/images/presentation.jpg"
                  alt="Kaique Fontiny"
                  className="w-full aspect-[4/5]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </motion.div>

              {/* Model Specs Card */}
              <motion.div
                className="absolute -bottom-12 right-0 md:-right-8 p-6 bg-card/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-20 min-w-[220px]"
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <h4 className="text-primary text-xs font-bold uppercase tracking-widest mb-4">{t('about.specs')}</h4>
                <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase block">{t('about.height')}</span>
                    <span className="text-sm font-medium">1,78m</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase block">{t('about.weight')}</span>
                    <span className="text-sm font-medium">56kg</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase block">{t('about.mannequin')}</span>
                    <span className="text-sm font-medium">38</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase block">{t('about.shoes')}</span>
                    <span className="text-sm font-medium">41</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase block">{t('about.eyes')}</span>
                    <span className="text-sm font-medium">{t('about.eyes_val')}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase block">{t('about.hair')}</span>
                    <span className="text-sm font-medium">{t('about.hair_val')}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right column - Text content */}
          <div className="space-y-8">
            {words.map((text, index) => (
              <motion.p
                key={index}
                className="text-lg md:text-xl lg:text-2xl text-foreground/80 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {text}
              </motion.p>
            ))}

            {/* Highlight text */}
            <motion.p
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: words.length * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {highlightText}
            </motion.p>

            {/* Additional info */}
            <motion.div
              className="pt-8 border-t border-border"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <span className="text-sm text-muted-foreground uppercase tracking-wider">
                    {t('about.edu_label')}
                  </span>
                  <p className="mt-2 text-foreground font-medium">
                    {content?.["about_edu_label"] || t('about.edu_val')}
                  </p>
                  <p className="text-sm text-muted-foreground">{t('about.edu_date')}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground uppercase tracking-wider">
                    {t('about.focus_label')}
                  </span>
                  <p className="mt-2 text-foreground font-medium">
                    {content?.["about_focus_label"] || t('about.focus_val')}
                  </p>
                  <p className="text-sm text-muted-foreground">{t('about.focus_sub')}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative line */}
      <motion.div
        className="absolute left-0 top-1/2 w-24 h-[1px] bg-primary"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{ originX: 0 }}
      />
    </section>
  );
}
