import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Counter = ({ value, duration = 2, delay = 0 }: { value: number, duration?: number, delay?: number }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = value;
            const totalSteps = 60;
            const increment = end / totalSteps;
            const stepTime = (duration * 1000) / totalSteps;

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setDisplayValue(end);
                    clearInterval(timer);
                } else {
                    setDisplayValue(start);
                }
            }, stepTime);

            return () => clearInterval(timer);
        }
    }, [isInView, value, duration]);

    return (
        <span ref={ref}>
            {displayValue.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
        </span>
    );
};

export default function StatsSection() {
    const { t } = useTranslation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="bg-background py-24 md:py-32 overflow-hidden">
            <div className="container">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left: Text stats */}
                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-primary text-sm font-medium tracking-[0.3em] uppercase mb-12">
                                {t('stats.label')}
                            </h2>

                            <div className="space-y-8">
                                <div>
                                    <motion.span
                                        className="block text-display text-7xl md:text-8xl lg:text-9xl text-foreground font-black leading-none"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.8, delay: 0.2 }}
                                    >
                                        <Counter value={228.7} delay={0.2} />
                                        <span className="text-primary">{t('stats.k')}</span>
                                    </motion.span>
                                    <span className="text-muted-foreground text-sm uppercase tracking-[0.2em] mt-2 block">
                                        {t('stats.followers')} TikTok & Instagram
                                    </span>
                                </div>

                                <div>
                                    <motion.span
                                        className="block text-display text-7xl md:text-8xl lg:text-9xl text-foreground font-black leading-none"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.8, delay: 0.4 }}
                                    >
                                        <Counter value={2.7} delay={0.4} />
                                        <span className="text-primary">{t('stats.m')}</span>
                                    </motion.span>
                                    <span className="text-muted-foreground text-sm uppercase tracking-[0.2em] mt-2 block">
                                        {t('stats.likes')}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Visual representation / Mockups */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Mockup Card 1 */}
                        <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-2xl backdrop-blur-sm max-w-sm ml-auto relative z-20">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full overflow-hidden border border-primary/20">
                                    <img src="/images/hero-cover.jpg" alt="Profile" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-foreground">Kaique Fontiny</h4>
                                    <p className="text-xs text-muted-foreground">@kaiquefontiny</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center pt-4 border-t border-border">
                                <div className="text-center">
                                    <span className="block font-bold">228K</span>
                                    <span className="text-[10px] text-muted-foreground uppercase">{t('stats.followers_short')}</span>
                                </div>
                                <div className="h-8 w-px bg-border" />
                                <div className="text-center">
                                    <span className="block font-bold">2.7M</span>
                                    <span className="text-[10px] text-muted-foreground uppercase">{t('stats.likes_short')}</span>
                                </div>
                                <div className="h-8 w-px bg-border" />
                                <div className="text-center">
                                    <span className="block font-bold">48%</span>
                                    <span className="text-[10px] text-muted-foreground uppercase">{t('stats.reach_short')}</span>
                                </div>
                            </div>
                        </div>

                        {/* Decorative element */}
                        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-12 w-full aspect-square rounded-full bg-primary/5 blur-3xl -z-10" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
