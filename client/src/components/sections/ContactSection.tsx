import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Instagram, Linkedin, ArrowUpRight, Music2, Youtube } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { trpc } from '@/lib/trpc';
import Magnetic from '../Magnetic';

export default function ContactSection() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  // Fetch CMS content
  const { data: content } = trpc.cms.getContent.useQuery();

  const email = content?.["contact_email"] || "contatokaiquefontiny@outlook.com";

  const socialLinks = [
    {
      name: 'Instagram',
      url: content?.["contact_instagram"] || 'https://instagram.com/kaiquefontiny',
      icon: Instagram,
      handle: '@kaiquefontiny',
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/@heyfontiny?si=6kwi0pKnl20OTijm',
      icon: Youtube,
      handle: '@heyfontiny',
    },
    {
      name: 'TikTok',
      url: content?.["contact_tiktok"] || 'https://www.tiktok.com/@kaiquefontiny',
      icon: Music2,
      handle: '@kaiquefontiny',
    },
    {
      name: 'LinkedIn',
      url: content?.["contact_linkedin"] || 'https://linkedin.com/in/kaiquefontiny',
      icon: Linkedin,
      handle: 'Kaique Fontiny',
    },
    {
      name: 'Email',
      url: `mailto:${email}`,
      icon: Mail,
      handle: email,
    },
  ].filter(link => link.name === 'Email' || link.url); // Keep email, others only if url exists

  const y = useTransform(scrollYProgress, [0, 1], ['100px', '0px']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section
      ref={containerRef}
      id="contato"
      className="relative min-h-screen py-32 bg-background overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          style={{ y }}
        />
        <motion.div
          className="absolute bottom-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          style={{ y: useTransform(scrollYProgress, [0, 1], ['-100px', '0px']) }}
        />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column - CTA */}
          <motion.div
            style={{ opacity, y }}
          >
            <span className="text-primary text-sm font-medium tracking-[0.3em] uppercase mb-4 block">
              {t('contact.label')}
            </span>
            <h2 className="text-headline text-5xl md:text-6xl lg:text-7xl text-foreground mb-8">
              {t('contact.title_main')}
              <br />
              <span className="text-primary">{t('contact.title_sub')}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-md mb-12">
              {t('contact.desc')}
            </p>

            {/* Main CTA */}
            <motion.a
              href={`mailto:${email}`}
              className="group inline-flex items-center gap-4 text-2xl md:text-3xl font-semibold text-foreground hover:text-primary transition-colors"
              whileHover={{ x: 10 }}
            >
              <span>{email}</span>
              <ArrowUpRight className="w-8 h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.a>
          </motion.div>

          {/* Right column - Social links */}
          <motion.div
            className="space-y-6"
            style={{ opacity, y }}
          >
            <h3 className="text-sm text-muted-foreground uppercase tracking-wider mb-8">
              {t('contact.social')}
            </h3>

            {socialLinks.map((link, index) => (
              <Magnetic key={link.name} strength={0.3}>
                <motion.a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-6 border border-border rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 w-full"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <link.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{link.name}</p>
                      <p className="text-sm text-muted-foreground">{link.handle}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.a>
              </Magnetic>
            ))}

            {/* Availability badge */}
            <motion.div
              className="mt-12 p-6 bg-secondary/50 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-foreground">
                  {t('contact.status_title')}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {t('contact.status_desc')}
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          className="mt-32 pt-8 border-t border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-foreground">KF</span>
              <span className="text-muted-foreground">|</span>
              <span className="text-sm text-muted-foreground">Kaique Fontiny</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {t('contact.rights')}
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                {t('contact.footer_concept')}
              </span>
            </div>
          </div>
        </motion.footer>
      </div>

      {/* Massive Background Text / Parallax Footer Hook */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none z-0"
        style={{
          opacity: useTransform(scrollYProgress, [0.4, 0.8, 1], [0, 0.05, 0.1]),
          y: useTransform(scrollYProgress, [0.4, 1], [200, 0])
        }}
      >
        <div className="flex flex-col items-center">
          <span className="block text-[35vw] font-black text-foreground whitespace-nowrap leading-[0.7] tracking-tighter opacity-10">
            KAIQUE
          </span>
          <span className="block text-[30vw] font-black text-primary whitespace-nowrap leading-[0.7] tracking-tighter italic">
            FONTINY
          </span>
        </div>
      </motion.div>
    </section>
  );
}
