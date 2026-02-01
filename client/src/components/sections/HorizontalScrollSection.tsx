import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { trpc } from '@/lib/trpc';

const fallbackShowcaseImages = [
  {
    id: '1',
    src: '/gallery/kp-10.jpg',
    title: 'Editorial Nature',
    description: 'Direção de arte e styling em locação externa',
  },
  {
    id: '2',
    src: '/gallery/kp-12.jpg',
    title: 'Western Concept',
    description: 'Conceito visual e produção de moda',
  },
  {
    id: '3',
    src: '/gallery/kp-13.jpg',
    title: 'Color Contrast',
    description: 'Estudo de cores e iluminação natural',
  },
  {
    id: '4',
    src: '/gallery/kp-14.jpg',
    title: 'Coastal Lifestyle',
    description: 'Composição cenográfica e fotografia',
  },
  {
    id: '5',
    src: '/gallery/kp-2.jpg',
    title: 'High Fashion',
    description: 'Editorial de moda para revista digital',
  },
  {
    id: '6',
    src: '/gallery/kp-4.jpg',
    title: 'Studio Arts',
    description: 'Direção criativa experimental',
  },
];

export default function HorizontalScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const { data: allPhotos } = trpc.cms.getPhotos.useQuery();

  const showcaseImages = allPhotos && allPhotos.length > 0
    ? allPhotos.filter(p => p.section === 'horizontal').map(p => ({
      id: String(p.id),
      src: p.src,
      title: p.title || "Untitled",
      description: p.description || "",
    }))
    : fallbackShowcaseImages;

  const displayImages = showcaseImages.length > 0 ? showcaseImages : fallbackShowcaseImages;

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-66.666%']);

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh] bg-foreground"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Header */}
        <div className="absolute top-8 left-0 right-0 z-20 container">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary text-sm font-medium tracking-[0.3em] uppercase">
                Marcas & Projetos
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <span className="text-background/60 text-sm tracking-wider">
                Role para explorar →
              </span>
            </motion.div>
          </div>
        </div>

        {/* Horizontal scroll content */}
        <motion.div
          className="flex gap-8 pl-8 md:pl-16"
          style={{ x }}
        >
          {displayImages.map((item, index) => (
            <motion.div
              key={item.id}
              className="relative flex-shrink-0 w-[80vw] md:w-[60vw] lg:w-[50vw] h-[70vh] rounded-2xl overflow-hidden group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: index * 0.1 }}
              data-cursor="view"
            >
              {/* Image */}
              <motion.img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover"
                loading="lazy"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <motion.span
                  className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs uppercase tracking-wider rounded-full mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Projeto {String(index + 1).padStart(2, '0')}
                </motion.span>
                <motion.h3
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  {item.title}
                </motion.h3>
                <motion.p
                  className="text-white/70 text-lg max-w-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  {item.description}
                </motion.p>
              </div>

              {/* Index number */}
              <div className="absolute top-8 right-8">
                <span className="text-8xl font-bold text-white/10">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
            </motion.div>
          ))}

          {/* End card */}
          <motion.div
            className="flex-shrink-0 w-[60vw] md:w-[40vw] h-[70vh] flex items-center justify-center"
          >
            <div className="text-center">
              <motion.h3
                className="text-4xl md:text-5xl font-bold text-background mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Vamos criar
                <br />
                <span className="text-primary">juntos?</span>
              </motion.h3>
              <motion.a
                href="#contato"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Entre em contato
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Progress indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 h-1 bg-background/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
          />
        </div>
      </div>
    </section>
  );
}
