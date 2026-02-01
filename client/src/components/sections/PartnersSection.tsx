import { motion } from 'framer-motion';

const brands = [
    { name: 'Pantene', logo: 'PANTENE' },
    { name: 'Coca-Cola', logo: 'COCA-COLA' },
    { name: 'Drogaria SP', logo: 'DROGARIA SP' },
    { name: 'TikTok', logo: 'TIKTOK' },
    { name: 'Instagram', logo: 'INSTAGRAM' },
];

export default function PartnersSection() {
    return (
        <section className="bg-background py-16 md:py-24 border-t border-border/30">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                        Marcas & Parcerias
                    </span>
                    <p className="text-muted-foreground text-sm uppercase tracking-widest">
                        Colaborações de impacto e presença global
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 items-center opacity-40">
                    {brands.map((brand, index) => (
                        <motion.div
                            key={brand.name}
                            className="flex justify-center group"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ opacity: 1, scale: 1.1 }}
                        >
                            <span className="text-xl md:text-2xl font-black tracking-tighter text-foreground group-hover:text-primary transition-colors cursor-default">
                                {brand.logo}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
