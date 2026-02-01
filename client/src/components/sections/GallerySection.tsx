import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lightbox from '../Lightbox';
import { trpc } from '@/lib/trpc';
import OptimizedImage from '../OptimizedImage';

// Fallback images if CMS is empty
const fallbackImages = [
  {
    id: '1',
    src: '/gallery/kp-1.jpg',
    alt: 'Fashion Style',
    title: 'Kaique Styling',
    category: 'fashion',
  },
  {
    id: '2',
    src: '/gallery/kp-2.jpg',
    alt: 'Fur Coat Portrait',
    title: 'Editorial Fur',
    category: 'editorial',
  },
  {
    id: '3',
    src: '/gallery/kp-3.jpg',
    alt: 'Casual White Tank',
    title: 'Casual Portrait',
    category: 'portrait',
  },
  {
    id: '4',
    src: '/gallery/kp-4.jpg',
    alt: 'Artistic Pose',
    title: 'Studio Art',
    category: 'art',
  },
  {
    id: '5',
    src: '/gallery/kp-5.jpg',
    alt: 'Portrait Sitting',
    title: 'Studio Sitting',
    category: 'portrait',
  },
  {
    id: '6',
    src: '/gallery/kp-6.jpg',
    alt: 'Event Photo',
    title: 'Event Coverage',
    category: 'events',
  },
  {
    id: '7',
    src: '/gallery/kp-7.jpg',
    alt: 'Close up smile',
    title: 'Close Up',
    category: 'portrait',
  },
  {
    id: '8',
    src: '/gallery/kp-8.jpg',
    alt: 'Side Profile',
    title: 'Profile Shot',
    category: 'portrait',
  },
  {
    id: '9',
    src: '/gallery/kp-9.jpg',
    alt: 'Smile Portrait',
    title: 'Joyful Moment',
    category: 'portrait',
  },
  {
    id: '10',
    src: '/gallery/kp-10.jpg',
    alt: 'Field Landscape',
    title: 'Nature Aesthetics',
    category: 'editorial',
  },
  {
    id: '11',
    src: '/gallery/kp-11.jpg',
    alt: 'Artistic Sitting',
    title: 'Studio Pose',
    category: 'art',
  },
  {
    id: '12',
    src: '/gallery/kp-12.jpg',
    alt: 'Cowboy Hat',
    title: 'Western Vibe',
    category: 'editorial',
  },
  {
    id: '13',
    src: '/gallery/kp-13.jpg',
    alt: 'Red Wall Portrait',
    title: 'Red Contrast',
    category: 'art',
  },
  {
    id: '14',
    src: '/gallery/kp-14.jpg',
    alt: 'Beach Trailer',
    title: 'Coastal Trip',
    category: 'lifestyle',
  },
];

export default function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: allPhotos } = trpc.cms.getPhotos.useQuery();

  const galleryImages = allPhotos && allPhotos.length > 0
    ? allPhotos.filter(p => p.section === 'gallery').map(p => ({
      id: String(p.id),
      src: p.src,
      alt: p.alt || "",
      title: p.title || "Untitled",
      category: p.category || "General",
    }))
    : fallbackImages;

  const displayImages = galleryImages.length > 0 ? galleryImages : fallbackImages;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  return (
    <section
      ref={containerRef}
      className="relative py-32 bg-secondary/30 overflow-hidden"
    >
      {/* Section header */}
      <div className="container mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="text-primary text-sm font-medium tracking-[0.3em] uppercase mb-4 block">
            Galeria
          </span>
          <h2
            className="text-display text-5xl md:text-6xl lg:text-7xl text-foreground"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            PROJETOS
            <br />
            <span className="text-primary">REALIZADOS</span>
          </h2>
          <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
            Uma seleção dos meus trabalhos em fotografia, direção criativa e comunicação visual.
          </p>
        </motion.div>
      </div>

      {/* Masonry-style gallery columns */}
      <div className="container px-4 md:px-6">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {displayImages.map((image, index) => {
            const parallaxY = index % 2 === 0 ? y1 : y2;

            return (
              <motion.div
                key={image.id}
                className="relative group cursor-pointer overflow-hidden rounded-2xl break-inside-avoid shadow-sm hover:shadow-2xl transition-shadow duration-500"
                style={{ y: parallaxY }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => openLightbox(index)}
                data-cursor="pointer"
                data-cursor-text="Drive"
              >
                {/* Image */}
                <div className="relative overflow-hidden w-full group">
                  <motion.div
                    className="w-full h-full relative"
                    whileHover={{ scale: 1.02 }}
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = (e.clientX - rect.left) / rect.width - 0.5;
                      const y = (e.clientY - rect.top) / rect.height - 0.5;
                      e.currentTarget.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg)`;
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <OptimizedImage
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-auto gallery-image transition-transform duration-700"
                    />
                  </motion.div>

                  {/* Glass Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[2px]"
                  />

                  {/* Content overlay */}
                  <motion.div
                    className="absolute inset-0 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0"
                  >
                    <motion.span
                      className="text-primary text-[10px] uppercase font-bold tracking-[0.3em] mb-3 block"
                    >
                      {image.category}
                    </motion.span>
                    <motion.h3
                      className="text-white text-2xl md:text-3xl font-bold leading-tight"
                    >
                      {image.title}
                    </motion.h3>
                    <div className="mt-4 w-12 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </motion.div>

                  {/* Visual Edge Accents */}
                  <div className="absolute top-6 left-6 w-4 h-[1px] bg-white/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <div className="absolute top-6 left-6 w-[1px] h-4 bg-white/30 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        images={displayImages}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </section>
  );
}
