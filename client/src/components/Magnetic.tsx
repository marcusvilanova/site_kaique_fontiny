import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticProps {
    children: React.ReactNode;
    strength?: number;
}

export default function Magnetic({ children, strength = 0.5 }: MagneticProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const boundingRect = ref.current?.getBoundingClientRect();
        if (boundingRect) {
            const centerX = boundingRect.left + boundingRect.width / 2;
            const centerY = boundingRect.top + boundingRect.height / 2;
            const x = (clientX - centerX) * strength;
            const y = (clientY - centerY) * strength;
            setPosition({ x, y });
        }
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className="inline-block magnetic-link"
        >
            {children}
        </motion.div>
    );
}
