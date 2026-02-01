import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';

export default function Preloader() {
    const [counter, setCounter] = useState(0);
    const musicStarted = useStore((state) => state.musicStarted);
    const isVisible = useStore((state) => state.isReady === false);
    const setReady = useStore((state) => state.setReady);
    const setMusicRequested = useStore((state) => state.setMusicRequested);

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + Math.floor(Math.random() * 8) + 1;
            });
        }, 60);

        return () => clearInterval(interval);
    }, []);

    const handleEnter = () => {
        console.log("Enter button clicked");
        setMusicRequested(true);
        setReady(true);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        scale: 1.1,
                        transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
                    }}
                    className="fixed inset-0 z-[10000] bg-black flex items-center justify-center overflow-hidden"
                >
                    <div className="relative flex items-center justify-center h-80 w-80">
                        {/* Circular Rotating Logo Background */}
                        <motion.div
                            className="absolute inset-0 pointer-events-none"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        >
                            <svg viewBox="0 0 200 200" className="w-full h-full">
                                <path
                                    id="circlePath"
                                    d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                                    fill="transparent"
                                />
                                <text className="fill-white/80 text-[14px] font-medium tracking-[0.2em] uppercase">
                                    <textPath href="#circlePath" startOffset="0%">
                                        Kaique Fontiny • Portfolio • Kaique Fontiny • Portfolio •
                                    </textPath>
                                </text>
                            </svg>
                        </motion.div>

                        {/* Central Counter / Enter Button */}
                        <motion.div
                            className="relative z-20 flex flex-col items-center justify-center"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <AnimatePresence mode="wait">
                                {counter < 100 ? (
                                    <motion.div
                                        key="loader"
                                        initial={{ opacity: 1 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="flex flex-col items-center"
                                    >
                                        <span className="text-white text-7xl md:text-8xl font-black tabular-nums tracking-tighter">
                                            {String(Math.min(counter, 100)).padStart(2, '0')}
                                        </span>
                                        <motion.span
                                            className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase mt-2"
                                            animate={{ opacity: [0.4, 1, 0.4] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        >
                                            Loading
                                        </motion.span>
                                    </motion.div>
                                ) : (
                                    <motion.button
                                        key="enter-btn"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        onClick={handleEnter}
                                        className="group relative px-10 py-4 overflow-hidden rounded-full border border-primary/50 hover:border-primary transition-colors bg-white/5 backdrop-blur-sm"
                                    >
                                        <span className="relative z-10 text-white font-bold tracking-[0.5em] uppercase text-sm group-hover:text-black transition-colors duration-500">
                                            ENTRAR
                                        </span>
                                        <motion.div
                                            className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]"
                                        />
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Outer Glow Ring */}
                        <div className="absolute inset-0 rounded-full border border-white/5 shadow-[0_0_50px_rgba(255,255,255,0.02)]" />
                    </div>

                    {/* Background noise/grain */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

                    {/* Corner branding */}
                    <div className="absolute bottom-12 left-12 flex flex-col gap-1">
                        <span className="text-white/20 text-[10px] uppercase tracking-widest">© 2025</span>
                        <span className="text-white/40 text-[10px] uppercase tracking-[0.2em]">High End Aesthetic</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
