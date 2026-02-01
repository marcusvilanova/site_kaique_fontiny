import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const musicRequested = useStore((state) => state.musicRequested);
    const setMusicStarted = useStore((state) => state.setMusicStarted);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.4;
        }
    }, []);

    useEffect(() => {
        if (musicRequested && audioRef.current) {
            audioRef.current.play().then(() => {
                setIsPlaying(true);
                setMusicStarted(true);
            }).catch(err => {
                console.info("Autoplay failed even after interaction:", err);
            });
        }
    }, [musicRequested, setMusicStarted]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(err => {
                    console.error("Autoplay prevented or audio error:", err);
                });
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <div className="fixed bottom-8 left-8 z-50 flex items-center gap-3">
            <audio
                ref={audioRef}
                src="/audio/background-music.mp3"
                loop
                preload="auto"
            />

            <motion.button
                onClick={togglePlay}
                className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-background/20 backdrop-blur-md border border-white/10 shadow-2xl transition-all duration-300 hover:bg-white/10 hover:border-white/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
            >
                <AnimatePresence mode="wait">
                    {isPlaying ? (
                        <motion.div
                            key="pause"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                        >
                            <Pause className="h-5 w-5 text-foreground" fill="currentColor" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="play"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                        >
                            <Play className="h-5 w-5 ml-0.5 text-foreground" fill="currentColor" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Dynamic Sound Waves Visualizer */}
                <div className="absolute -right-12 flex items-end gap-[3px] h-4">
                    {[1, 2, 3, 4].map((i) => (
                        <motion.div
                            key={i}
                            className="w-[3px] bg-primary rounded-full"
                            animate={isPlaying ? {
                                height: [4, 16, 8, 14, 6][i % 5],
                            } : { height: 4 }}
                            transition={isPlaying ? {
                                duration: 0.6 + i * 0.1,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut"
                            } : { duration: 0.3 }}
                        />
                    ))}
                </div>
            </motion.button>

            {isPlaying && (
                <motion.button
                    onClick={toggleMute}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </motion.button>
            )}
        </div>
    );
}
