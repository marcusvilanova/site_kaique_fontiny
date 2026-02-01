import { useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import ScrollProgress from '@/components/ScrollProgress';
import MusicPlayer from '@/components/MusicPlayer';
import WhatsAppButton from '@/components/WhatsAppButton';
import HeroSection from '@/components/sections/HeroSection';
import PartnersSection from '@/components/sections/PartnersSection';
import StatsSection from '@/components/sections/StatsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import AboutSection from '@/components/sections/AboutSection';
import TextRevealSection from '@/components/sections/TextRevealSection';
import ImmersiveWords from '@/components/sections/ImmersiveWords';

// Lazy loaded heavy sections
const CampaignsSection = lazy(() => import('@/components/sections/CampaignsSection'));
const GallerySection = lazy(() => import('@/components/sections/GallerySection'));
const ParallaxSection = lazy(() => import('@/components/sections/ParallaxSection'));
const ContactSection = lazy(() => import('@/components/sections/ContactSection'));

// Simple Skeleton for Suspense
const SectionSkeleton = () => (
  <div className="w-full h-[50vh] bg-background animate-pulse flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function Home() {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="relative bg-background text-foreground">
      {/* Film Grain Texture */}
      <div className="film-grain" />


      {/* Scroll progress indicator */}
      <ScrollProgress />

      {/* Music Player */}
      <MusicPlayer />

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main>
        {/* 1. Hero Section - Impact Entrance */}
        <motion.div
          id="inicio"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <HeroSection />
        </motion.div>

        {/* 4. About Section - The Person Behind the Work (Moved after Hero) */}
        <motion.div
          id="sobre"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
        >
          <AboutSection />
        </motion.div>

        {/* Brand Partners - Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <PartnersSection />
        </motion.div>

        {/* 2. Stats Section - Immediate Authority */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <StatsSection />
        </motion.div>

        {/* 3. Experience & Philosophy - Core Visual Identity (Manifesto) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <ExperienceSection />
        </motion.div>

        {/* Immersive Strobe Interstitial - The Red Pulse */}
        <ImmersiveWords />

        {/* Campaigns & Publicidade */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <Suspense fallback={<SectionSkeleton />}>
            <CampaignsSection />
          </Suspense>
        </motion.div>

        {/* Transition Hook */}
        <TextRevealSection />

        {/* 6. Gallery Section - Visual Portfolio */}
        <motion.div
          id="galeria"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
        >
          <Suspense fallback={<SectionSkeleton />}>
            <GallerySection />
          </Suspense>
        </motion.div>

        {/* Decorative Parallax */}
        <Suspense fallback={<SectionSkeleton />}>
          <ParallaxSection />
        </Suspense>

        {/* 7. Contact Section */}
        <div id="contato">
          <Suspense fallback={<SectionSkeleton />}>
            <ContactSection />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
