import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = [
    "MENSWEAR", "STREETWEAR", "TAILORING", "SARTORIAL", "BOLD",
    "SHARP", "URBAN", "ICONIC", "EDITORIAL", "MODERN",
    "MINIMAL", "CONCEPT", "RAW", "AVANT-GARDE", "ESSENTIAL"
];

const rhythm = [483, 241, 120, 120, 483, 241, 483]; // 124 BPM syncopated rhythm

export default function ImmersiveWords() {
    const [index, setIndex] = useState(0);
    const [colorState, setColorState] = useState(0); // 0: Black, 1: White, 2: Red
    const [glitch, setGlitch] = useState({ x: 0, y: 0 });

    useEffect(() => {
        let rhythmIndex = 0;
        let timeoutId: NodeJS.Timeout;

        const pulse = () => {
            setIndex((prev) => (prev + 1) % words.length);
            setColorState((prev) => (prev + 1) % 3);

            setGlitch({
                x: Math.random() * 14 - 7,
                y: Math.random() * 6 - 3
            });

            rhythmIndex = (rhythmIndex + 1) % rhythm.length;
            timeoutId = setTimeout(pulse, rhythm[rhythmIndex]);
        };

        timeoutId = setTimeout(pulse, rhythm[0]);
        return () => clearTimeout(timeoutId);
    }, []);

    // Color mapping
    const theme = [
        { bg: 'bg-black', text: 'text-[#E30613]', ghost: 'text-[#E30613]' },
        { bg: 'bg-white', text: 'text-black', ghost: 'text-black' },
        { bg: 'bg-[#E30613]', text: 'text-white', ghost: 'text-white' }
    ][colorState];

    return (
        <section className={`relative h-screen w-full flex items-center justify-center transition-colors duration-200 overflow-hidden ${theme.bg}`}>
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            </div>

            <AnimatePresence mode="popLayout">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95, x: glitch.x }}
                    animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)', transition: { duration: 0.1 } }}
                    transition={{ type: "spring", stiffness: 600, damping: 40 }}
                    className="relative z-10"
                >
                    <h2
                        className={`text-[15vw] md:text-[18vw] font-black tracking-tighter leading-none text-center select-none ${theme.text}`}
                        style={{ fontFamily: '"Inter", sans-serif' }}
                    >
                        {words[index]}
                    </h2>

                    {/* Ghosting effect layer */}
                    <motion.div
                        className={`absolute inset-0 blur-sm opacity-30 ${theme.ghost}`}
                        animate={{ x: [-1, 1, -1] }}
                        transition={{ duration: 0.1, repeat: Infinity }}
                    >
                        <span className="text-[15vw] md:text-[18vw] font-black tracking-tighter leading-none text-center opacity-20">
                            {words[index]}
                        </span>
                    </motion.div>
                </motion.div>
            </AnimatePresence>

            {/* Decorative film stripes */}
            <div className={`absolute left-0 top-0 bottom-0 w-[8vw] border-r ${colorState === 1 ? 'border-black/5 bg-black/5' : 'border-white/5 bg-white/5'}`} />
            <div className={`absolute right-0 top-0 bottom-0 w-[8vw] border-l ${colorState === 1 ? 'border-black/5 bg-black/5' : 'border-white/5 bg-white/5'}`} />

            {/* Top/Bottom scanlines */}
            <div className="absolute top-0 left-0 right-0 h-[10vh] bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-[10vh] bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </section>
    );
}
