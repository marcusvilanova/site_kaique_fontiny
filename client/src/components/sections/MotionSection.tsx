import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { useRef, useState } from 'react';

export default function MotionSection() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <section className="bg-background py-24 md:py-32 overflow-hidden">
            <div className="container">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Video Player */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative group aspect-[9/16] md:aspect-video lg:aspect-[9/16] max-h-[80vh] mx-auto overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
                    >
                        <video
                            ref={videoRef}
                            src="/video/kaique-reel.mp4"
                            className="w-full h-full object-cover"
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                        {/* Overlay Controls */}
                        <div
                            className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                            onClick={togglePlay}
                        >
                            <div className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center text-white backdrop-blur-md">
                                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <span className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-6 block">
                            Motion Reel
                        </span>
                        <h2 className="text-display text-5xl md:text-6xl text-foreground mb-8" style={{ fontFamily: '"Playfair Display", serif' }}>
                            PRESENÇA <br /> <span className="text-primary italic">DIGITAL</span>
                        </h2>
                        <div className="space-y-6 text-foreground/70 text-lg leading-relaxed max-w-md">
                            <p>
                                Como social media e criador de conteúdo, minha missão é transformar ideias em movimentos que capturam a atenção e engajam comunidades.
                            </p>
                            <p>
                                Este reel é uma amostra da minha versatilidade em frente às câmeras e na direção de arte, unindo estética e performance.
                            </p>
                        </div>

                        <div className="mt-12 grid grid-cols-2 gap-8 border-t border-border/50 pt-8">
                            <div>
                                <span className="block text-2xl font-black text-foreground">100%</span>
                                <span className="text-xs text-muted-foreground uppercase tracking-wider">Criatividade</span>
                            </div>
                            <div>
                                <span className="block text-2xl font-black text-foreground">Multi</span>
                                <span className="text-xs text-muted-foreground uppercase tracking-wider">Linguagem</span>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
