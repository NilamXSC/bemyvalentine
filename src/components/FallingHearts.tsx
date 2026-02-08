import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Heart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  type: 'heart' | 'sparkle' | 'petal';
}

const FallingHearts = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const generateHearts = () => {
      const newHearts: Heart[] = [];
      for (let i = 0; i < 25; i++) {
        newHearts.push({
          id: i,
          x: Math.random() * 100,
          size: Math.random() * 20 + 10,
          duration: Math.random() * 10 + 8,
          delay: Math.random() * 10,
          type: ['heart', 'sparkle', 'petal'][Math.floor(Math.random() * 3)] as Heart['type'],
        });
      }
      setHearts(newHearts);
    };

    generateHearts();
  }, []);

  const renderSymbol = (type: Heart['type'], size: number) => {
    switch (type) {
      case 'heart':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size }}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        );
      case 'sparkle':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size }}>
            <path d="M12 2L13.09 8.26L19 7L14.74 11.17L19 17L13.09 15.74L12 22L10.91 15.74L5 17L9.26 11.17L5 7L10.91 8.26L12 2Z" />
          </svg>
        );
      case 'petal':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size }}>
            <ellipse cx="12" cy="12" rx="4" ry="8" />
          </svg>
        );
    }
  };

  const getColor = (type: Heart['type']) => {
    switch (type) {
      case 'heart':
        return 'text-rose-light';
      case 'sparkle':
        return 'text-coral';
      case 'petal':
        return 'text-lavender';
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className={`absolute ${getColor(heart.type)} opacity-60`}
          style={{ left: `${heart.x}%` }}
          initial={{ y: '-10vh', rotate: 0, opacity: 0.8 }}
          animate={{
            y: '110vh',
            rotate: 720,
            opacity: [0.8, 0.6, 0.4, 0.2],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {renderSymbol(heart.type, heart.size)}
        </motion.div>
      ))}
    </div>
  );
};

export default FallingHearts;
