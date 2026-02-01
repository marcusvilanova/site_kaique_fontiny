import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParallaxSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Multiple parallax layers with different speeds
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '-45%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

  return (
    <section
      ref={containerRef}
      className="relative h-[150vh] overflow-hidden bg-foreground"
    >
      {/* Background layer - slowest */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: y1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-foreground via-foreground/95 to-foreground" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          style={{ scale }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
          style={{ scale, rotate }}
        />
      </motion.div>

      {/* Middle layer - medium speed */}
      <motion.div
        className="absolute inset-0 z-10 flex items-center justify-center"
        style={{ y: y2, opacity }}
      >
        <div className="text-center px-4">
          <motion.span
            className="block text-primary text-sm font-medium tracking-[0.3em] uppercase mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Filosofia
          </motion.span>
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-background leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Cada projeto é uma
            <br />
            <span className="text-primary">história</span> para contar
          </motion.h2>
          <motion.p
            className="mt-8 text-background/60 text-lg md:text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Acredito que a comunicação visual tem o poder de transformar ideias em experiências memoráveis.
          </motion.p>
        </div>
      </motion.div>

      {/* Foreground layer - fastest */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ y: y3 }}
      >
        {/* Decorative elements */}
        <motion.div
          className="absolute top-20 left-10 w-2 h-32 bg-primary/30"
          style={{ scaleY: scrollYProgress }}
        />
        <motion.div
          className="absolute top-40 right-20 w-2 h-48 bg-primary/20"
          style={{ scaleY: scrollYProgress }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-24 h-[1px] bg-primary/40"
          style={{ scaleX: scrollYProgress }}
        />
        <motion.div
          className="absolute bottom-48 right-1/3 w-32 h-[1px] bg-primary/30"
          style={{ scaleX: scrollYProgress }}
        />
      </motion.div>

      {/* Stats section */}
      <motion.div
        className="absolute bottom-20 left-0 right-0 z-30"
        style={{ opacity }}
      >
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '50+', label: 'Projetos' },
              { number: '30+', label: 'Clientes' },
              { number: '5+', label: 'Anos de Experiência' },
              { number: '100%', label: 'Dedicação' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="block text-4xl md:text-5xl font-bold text-primary">
                  {stat.number}
                </span>
                <span className="block mt-2 text-sm text-background/60 uppercase tracking-wider">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
