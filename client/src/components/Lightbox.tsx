import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  images: { src: string; alt: string; title?: string }[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  const currentImage = images[currentIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowRight':
          onNext();
          break;
        case 'ArrowLeft':
          onPrev();
          break;
      }
    },
    [isOpen, onClose, onNext, onPrev]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && currentImage && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/95"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Close button */}
          <motion.button
            className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            onClick={onClose}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-6 h-6 text-white" />
          </motion.button>

          {/* Navigation - Previous */}
          {images.length > 1 && (
            <motion.button
              className="absolute left-4 md:left-8 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              onClick={onPrev}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </motion.button>
          )}

          {/* Navigation - Next */}
          {images.length > 1 && (
            <motion.button
              className="absolute right-4 md:right-8 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              onClick={onNext}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </motion.button>
          )}

          {/* Image container */}
          <motion.div
            className="relative z-10 max-w-[90vw] max-h-[85vh] flex flex-col items-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={currentImage.src}
                alt={currentImage.alt}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                draggable={false}
              />
            </AnimatePresence>

            {/* Image info */}
            {currentImage.title && (
              <motion.div
                className="mt-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-white text-lg font-medium">{currentImage.title}</p>
                <p className="text-white/60 text-sm mt-1">
                  {currentIndex + 1} / {images.length}
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <motion.div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-black/50 rounded-lg backdrop-blur-sm max-w-[90vw] overflow-x-auto hide-scrollbar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.2 }}
            >
              {images.slice(0, 10).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    // Navigate to specific image
                    const diff = idx - currentIndex;
                    if (diff > 0) {
                      for (let i = 0; i < diff; i++) onNext();
                    } else if (diff < 0) {
                      for (let i = 0; i < Math.abs(diff); i++) onPrev();
                    }
                  }}
                  className={`flex-shrink-0 w-12 h-12 rounded overflow-hidden transition-all ${
                    idx === currentIndex
                      ? 'ring-2 ring-primary opacity-100'
                      : 'opacity-50 hover:opacity-80'
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
