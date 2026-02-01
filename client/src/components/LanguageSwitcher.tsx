import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const languages = [
        { code: 'pt', label: 'PT' },
        { code: 'en', label: 'EN' },
        { code: 'es', label: 'ES' },
    ];

    return (
        <div className="flex items-center gap-4">
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => i18n.changeLanguage(lang.code)}
                    className={`text-[10px] font-bold tracking-[0.2em] transition-all hover:text-primary ${i18n.language === lang.code ? 'text-primary' : 'text-muted-foreground'
                        }`}
                    data-cursor="pointer"
                >
                    {lang.label}
                    {i18n.language === lang.code && (
                        <motion.div
                            layoutId="lang-underline"
                            className="h-[1px] bg-primary mt-1"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                    )}
                </button>
            ))}
        </div>
    );
}
