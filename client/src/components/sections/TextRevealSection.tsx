import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const words = [
  'Transformo',
  'ideias',
  'em',
  'experiências',
  'visuais',
  'memoráveis',
  'através',
  'da',
  'comunicação',
  'criativa.',
];

export default function TextRevealSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-48 bg-background overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />

      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section label */}
          <motion.span
            className="block text-primary text-sm font-medium tracking-[0.3em] uppercase mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Manifesto
          </motion.span>

          {/* Animated text */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {words.map((word, index) => {
              const start = index / words.length;
              const end = start + 1 / words.length;
              
              return (
                <Word
                  key={index}
                  word={word}
                  progress={scrollYProgress}
                  range={[start * 0.5, end * 0.5 + 0.3]}
                  isHighlight={['experiências', 'memoráveis', 'criativa.'].includes(word)}
                />
              );
            })}
          </div>

          {/* Decorative quote marks */}
          <motion.div
            className="absolute top-20 left-8 text-8xl text-primary/10 font-serif"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            "
          </motion.div>
          <motion.div
            className="absolute bottom-20 right-8 text-8xl text-primary/10 font-serif"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            "
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface WordProps {
  word: string;
  progress: any;
  range: [number, number];
  isHighlight: boolean;
}

function Word({ word, progress, range, isHighlight }: WordProps) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const y = useTransform(progress, range, [20, 0]);

  return (
    <motion.span
      className={`text-3xl md:text-5xl lg:text-6xl font-bold ${
        isHighlight ? 'text-primary' : 'text-foreground'
      }`}
      style={{ opacity, y }}
    >
      {word}
    </motion.span>
  );
}
