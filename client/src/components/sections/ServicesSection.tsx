import { motion } from 'framer-motion';
import { Palette, Camera, Sparkles, Megaphone } from 'lucide-react';
import { useTranslation } from 'react-i18next';


export default function ServicesSection() {
    const { t } = useTranslation();

    const services = [
        {
            title: t('services.item1_title'),
            description: t('services.item1_desc'),
            icon: Palette,
        },
        {
            title: t('services.item2_title'),
            description: t('services.item2_desc'),
            icon: Camera,
        },
        {
            title: t('services.item3_title'),
            description: t('services.item3_desc'),
            icon: Sparkles,
        },
        {
            title: t('services.item4_title'),
            description: t('services.item4_desc'),
            icon: Megaphone,
        },
    ];
    return (
        <section className="bg-background py-24 md:py-32 border-t border-border/50">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-20 text-center"
                >
                    <span className="text-primary text-sm font-medium tracking-[0.3em] uppercase mb-4 block">
                        {t('services.label')}
                    </span>
                    <h2
                        className="text-display text-5xl md:text-6xl text-foreground"
                        style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                        {t('services.title_main')} <span className="text-primary italic">{t('services.title_sub')}</span>
                    </h2>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="group p-8 rounded-2xl bg-card/50 border border-border/50 transition-all duration-500 hover:bg-primary/5 hover:border-primary/20"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-500">
                                <service.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed text-sm">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
