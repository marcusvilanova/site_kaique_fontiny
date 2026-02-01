import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';


export default function Navigation() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: t('nav.home'), href: '#inicio' },
    { name: t('nav.about'), href: '#sobre' },
    { name: t('nav.services'), href: '#servicos' },
    { name: t('nav.gallery'), href: '#galeria' },
    { name: t('nav.contact'), href: '#contato' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Navigation Container - Dynamic Pill Style */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className={`flex items-center gap-2 md:gap-4 px-6 md:px-8 h-14 md:h-16 rounded-full pointer-events-auto transition-all duration-700 ${isScrolled
            ? 'bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
            : 'bg-transparent'
            }`}
          animate={{
            width: isScrolled ? 'auto' : '100%',
            maxWidth: isScrolled ? '600px' : '1200px',
          }}
        >
          {/* Logo */}
          <motion.a
            href="#inicio"
            className="text-xl font-bold text-white hover:text-primary transition-colors mr-4"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#inicio');
            }}
            whileHover={{ scale: 1.1 }}
          >
            KF
          </motion.a>

          {/* Divider */}
          <div className="w-[1px] h-4 bg-white/10 mx-2 hidden md:block" />

          {/* Desktop Links - Magnetic Style */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="relative text-[10px] text-white/60 hover:text-white transition-colors uppercase tracking-[0.2em] font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                whileHover={{
                  y: -2,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          {/* Mobile Spacer */}
          <div className="flex-1 md:hidden" />

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-12">
              <div className="flex flex-col items-center gap-8">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="text-3xl font-semibold text-foreground hover:text-primary transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <LanguageSwitcher />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
