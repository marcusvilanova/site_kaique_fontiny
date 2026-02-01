import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import OptimizedImage from '../OptimizedImage';

export default function ExperienceSection() {
    const { t } = useTranslation();
    return (
        <section className="bg-background py-24 md:py-32 relative overflow-hidden">
            <div className="container">
                <div className="grid lg:grid-cols-2 gap-24 items-start">

                    {/* Visual Style Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-primary text-sm font-medium tracking-[0.3em] uppercase mb-8 block">
                            {t('experience.label')}
                        </span>
                        <h2 className="text-display text-5xl md:text-6xl text-foreground mb-12" style={{ fontFamily: '"Playfair Display", serif' }}>
                            {t('experience.style_title').split(' ')[0]} <br /> <span className="text-primary">{t('experience.style_title').split(' ')[1]}</span>
                        </h2>

                        <div className="relative p-8 md:p-12 bg-card/30 backdrop-blur-sm border border-border/50 rounded-3xl">
                            <Quote className="text-primary/20 w-16 h-16 absolute -top-6 -left-6" />
                            <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed italic">
                                "{t('experience.quote_main')}"
                            </p>
                            <footer className="mt-8 text-muted-foreground uppercase tracking-widest text-sm">
                                — Kaique Fontiny
                            </footer>
                        </div>
                    </motion.div>

                    {/* Moda como Linguagem Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:mt-32"
                    >
                        <h2 className="text-display text-5xl md:text-6xl text-foreground mb-8 text-right" style={{ fontFamily: '"Playfair Display", serif' }}>
                            {t('experience.fashion_title').split(' ').slice(0, 2).join(' ')} <br /> <span className="text-primary">{t('experience.fashion_title').split(' ').slice(2).join(' ')}</span>
                        </h2>

                        <div className="space-y-6 text-foreground/80 text-lg leading-relaxed text-right md:pl-24">
                            <p>
                                {t('experience.fashion_desc1')}
                            </p>
                            <p>
                                {t('experience.fashion_desc2')}
                            </p>
                        </div>

                        {/* Subtle decorative image/mask */}
                        <motion.div
                            className="mt-12 w-full aspect-video rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                        >
                            <OptimizedImage
                                src="/images/presentation.jpg"
                                alt="Moda e Estilo"
                                className="w-full h-full"
                            />
                        </motion.div>
                    </motion.div>

                </div>
            </div>

            {/* Background Decorative Text */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -z-10 opacity-[0.02] select-none pointer-events-none">
                <span className="text-[30vw] font-black leading-none">AESTHETIC</span>
            </div>
        </section>
    );
}
