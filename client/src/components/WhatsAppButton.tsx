import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function WhatsAppButton() {
    const { t } = useTranslation();
    const phoneNumber = "5511944660088";
    const message = encodeURIComponent(t('contact.whatsapp_msg'));
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-[100] group"
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            data-cursor="pointer"
        >
            <div className="relative flex items-center justify-center">
                {/* Pulsing background */}
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping scale-150" />

                {/* Main Button */}
                <div className="relative w-14 h-14 bg-brand-black border border-white/10 rounded-full flex items-center justify-center shadow-2xl transition-colors group-hover:bg-primary">
                    <MessageCircle className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                </div>

                {/* Tooltip */}
                <div className="absolute right-full mr-4 px-4 py-2 bg-brand-black border border-white/10 rounded-lg opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap hidden md:block">
                    <span className="text-white text-[10px] font-bold uppercase tracking-widest">{t('contact.whatsapp_tooltip')}</span>
                </div>
            </div>
        </motion.a>
    );
}
