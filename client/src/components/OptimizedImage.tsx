import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OptimizedImageProps {
    src: string;
    alt: string;
    className?: string;
    priority?: boolean;
    style?: React.CSSProperties;
}

export default function OptimizedImage({ src, alt, className = "", priority = false, style = {} }: OptimizedImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentSrc, setCurrentSrc] = useState(src);

    useEffect(() => {
        // Simple WebP preference logic
        // If the path doesn't already have an extension that is webp,
        // we can't reliably assume it exists, but we can check if it's a local asset
        if (src.startsWith('/') && !src.endsWith('.webp')) {
            const webpPath = src.substring(0, src.lastIndexOf('.')) + '.webp';
            // We'll stick to the original src for now to avoid 404s, 
            // but in a real build process this would be automated.
            setCurrentSrc(src);
        }
    }, [src]);

    return (
        <div className={`relative overflow-hidden ${className}`} style={{ ...style }}>
            {/* Blurry Placeholder - Low res version or just a solid color/blur */}
            {!isLoaded && (
                <div
                    className="absolute inset-0 bg-secondary/20 backdrop-blur-xl animate-pulse"
                    aria-hidden="true"
                />
            )}

            <motion.img
                src={currentSrc}
                alt={alt}
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                animate={{
                    opacity: isLoaded ? 1 : 0.5, // Keep semi-visible while loading
                    filter: isLoaded ? 'blur(0px)' : 'blur(10px)'
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                onLoad={() => setIsLoaded(true)}
                onError={(e) => {
                    console.error(`Failed to load image: ${currentSrc}`);
                    setIsLoaded(true); // Stop pulsing
                }}
                className={`w-full h-full object-cover`}
                loading={priority ? "eager" : "lazy"}
            />
        </div>
    );
}
