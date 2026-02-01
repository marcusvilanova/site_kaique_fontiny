import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import OptimizedImage from '../OptimizedImage';

const maskImages = [
  {
    src: '/gallery/conceptual-1.png',
    title: 'Avant-Garde',
  },
  {
    src: '/gallery/conceptual-2.png',
    title: 'Editorial',
  },
  {
    src: '/gallery/conceptual-3.png',
    title: 'High-Fashion',
  },
];

export default function ImageMaskSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section
      ref={containerRef}
      className="relative py-32 bg-foreground overflow-hidden"
    >
      <div className="container">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-primary text-sm font-medium tracking-[0.3em] uppercase mb-4 block">
            Especialidades
          </span>
          <h2 className="text-headline text-5xl md:text-6xl lg:text-7xl text-background">
            ÁREAS DE
            <br />
            <span className="text-primary">ATUAÇÃO</span>
          </h2>
        </motion.div>

        {/* Masked images grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {maskImages.map((image, index) => (
            <MaskedImage
              key={index}
              src={image.src}
              title={image.title}
              index={index}
              scrollProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface MaskedImageProps {
  src: string;
  title: string;
  index: number;
  scrollProgress: any;
}

function MaskedImage({ src, title, index, scrollProgress }: MaskedImageProps) {
  const clipPath = useTransform(
    scrollProgress,
    [0.1 + index * 0.1, 0.3 + index * 0.1],
    ['inset(50% 50% 50% 50%)', 'inset(0% 0% 0% 0%)']
  );

  const scale = useTransform(
    scrollProgress,
    [0.1 + index * 0.1, 0.3 + index * 0.1],
    [1.2, 1]
  );

  return (
    <motion.div
      className="relative aspect-[3/4] overflow-hidden rounded-lg group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
    >
      {/* Image with mask */}
      <motion.div
        className="absolute inset-0"
        style={{ clipPath }}
      >
        <OptimizedImage
          src={src}
          alt={title}
          className="w-full h-full"
          style={{ scale } as any}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </motion.div>

      {/* Title overlay */}
      <motion.div
        className="absolute inset-0 flex items-end p-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 + index * 0.2 }}
      >
        <div>
          <span className="text-primary text-xs uppercase tracking-wider">
            0{index + 1}
          </span>
          <h3 className="text-2xl md:text-3xl font-bold text-white mt-2">
            {title}
          </h3>
        </div>
      </motion.div>

      {/* Hover effect */}
      <motion.div
        className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
    </motion.div>
  );
}
