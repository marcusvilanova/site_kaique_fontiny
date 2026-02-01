import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import OptimizedImage from '@/components/OptimizedImage';


export default function CampaignsSection() {
    const { t } = useTranslation();

    const campaigns = [
        {
            title: t('campaigns.item1_title'),
            brand: 'Social Media & Model',
            image: '/images/reel-preview.gif',
            description: t('campaigns.item1_desc'),
        },
        {
            title: 'Pantene',
            brand: 'Pantene Brasil',
            image: '/images/pantene-preview.gif',
            description: 'Publicidade Pantene Brasil: Brilho e cuidado excepcional. feat. BIA GREMION',
            partnership: 'BIA GREMION'
        },
        {
            title: 'Drogaria SP',
            brand: 'Drogaria São Paulo',
            image: '/images/drogariasp-preview.gif',
            description: 'Campanha Drogaria São Paulo: Saúde e bem-estar para todos. feat. BIA GREMION',
            partnership: 'BIA GREMION'
        }
    ];
    return (
        <section className="bg-background py-24 md:py-32 border-t border-border/10">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-20 text-center"
                >
                    <span className="text-primary text-sm font-medium tracking-[0.3em] uppercase mb-4 block">
                        {t('campaigns.label')}
                    </span>
                    <h2 className="text-display text-5xl md:text-6xl text-foreground" style={{ fontFamily: '"Playfair Display", serif' }}>
                        {t('campaigns.title')} <span className="text-primary italic">{t('campaigns.subtitle')}</span>
                    </h2>
                </motion.div>

                <div className="space-y-12 lg:space-y-20">
                    {/* Featured Campaign (First one) */}
                    {campaigns.length > 0 && (
                        <motion.div
                            key={campaigns[0].title}
                            className="group relative bg-card/30 rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-700 shadow-2xl"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <a
                                href="https://drive.google.com/drive/folders/18sz59CEU52Bmf2n8nEMtTr1Dok9VSapc?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="aspect-[21/9] md:aspect-[3/1] relative overflow-hidden bg-black block"
                                data-cursor="pointer"
                                data-cursor-text="Drive"
                            >
                                <OptimizedImage
                                    src={campaigns[0].image}
                                    alt={campaigns[0].title}
                                    className="w-full h-full opacity-60 group-hover:opacity-100 transition-opacity duration-1000 group-hover:scale-105 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-8 md:p-16">
                                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                                        <div className="max-w-2xl">
                                            <span className="text-primary text-xs md:text-sm uppercase font-bold tracking-[0.4em] block mb-4">
                                                Featured Work • {campaigns[0].brand}
                                            </span>
                                            <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 group-hover:text-primary transition-colors">
                                                {campaigns[0].title}
                                            </h3>
                                            <p className="text-white/70 text-base md:text-lg lg:text-xl leading-relaxed">
                                                {campaigns[0].description}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                                                <Play className="text-white fill-current w-8 h-8 ml-1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </motion.div>
                    )}

                    {/* Other Campaigns Grid */}
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                        {campaigns.slice(1).map((camp, index) => (
                            <motion.div
                                key={camp.title}
                                className="group relative bg-card/30 rounded-3xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-500 shadow-lg hover:shadow-primary/5"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                            >
                                <a
                                    href="https://drive.google.com/drive/folders/18sz59CEU52Bmf2n8nEMtTr1Dok9VSapc?usp=sharing"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="aspect-video relative overflow-hidden bg-black block"
                                    data-cursor="pointer"
                                    data-cursor-text="Drive"
                                >
                                    <OptimizedImage
                                        src={camp.image}
                                        alt={camp.title}
                                        className="w-full h-full opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                                            <Play className="text-white fill-current w-6 h-6 ml-1" />
                                        </div>
                                    </div>

                                    {(camp as any).partnership && (
                                        <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full shadow-xl">
                                            feat. {(camp as any).partnership}
                                        </div>
                                    )}
                                </a>

                                {/* Info */}
                                <div className="p-8">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className="text-primary text-[10px] uppercase font-bold tracking-widest block mb-1">
                                                {camp.brand}
                                            </span>
                                            <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                                                {camp.title}
                                            </h3>
                                        </div>
                                    </div>
                                    <p
                                        className="text-muted-foreground text-sm leading-relaxed"
                                        dangerouslySetInnerHTML={{
                                            __html: camp.description.replace(/(BIA GREMION|MURILLO ZYESS)/g, '<strong>$1</strong>')
                                        }}
                                    />

                                    {(camp as any).partnership && (
                                        <div className="mt-4 pt-4 border-t border-white/5">
                                            <span className="text-[10px] text-primary font-black uppercase tracking-[0.3em]">
                                                PARTNERSHIP: {(camp as any).partnership}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* More on YouTube CTA */}
                <motion.div
                    className="mt-20 flex justify-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <a
                        href="https://youtube.com/@heyfontiny?si=6kwi0pKnl20OTijm"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative px-12 py-5 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-500 flex items-center gap-4 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                        <span className="relative z-10 text-white font-bold tracking-[0.2em] uppercase text-sm group-hover:text-black transition-colors">
                            Ver mais no YouTube
                        </span>
                        <div className="relative z-10 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                            <Play className="w-4 h-4 text-white group-hover:text-black fill-current" />
                        </div>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
