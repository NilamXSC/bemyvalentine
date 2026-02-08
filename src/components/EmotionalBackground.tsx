import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type BackgroundEmotion = 'dreamy' | 'playful' | 'loving';

interface EmotionalBackgroundProps {
  emotion: BackgroundEmotion;
}

const emotionConfig = {
  dreamy: {
    gradient: 'linear-gradient(135deg, hsl(350, 80%, 85%) 0%, hsl(320, 70%, 80%) 35%, hsl(280, 60%, 82%) 70%, hsl(350, 75%, 88%) 100%)',
    glowOpacity: 0.3,
    glowColor: 'hsl(350, 100%, 95%)',
    vignetteOpacity: 0.15,
  },
  playful: {
    gradient: 'linear-gradient(135deg, hsl(350, 85%, 82%) 0%, hsl(15, 80%, 78%) 35%, hsl(340, 70%, 80%) 70%, hsl(320, 75%, 85%) 100%)',
    glowOpacity: 0.5,
    glowColor: 'hsl(15, 100%, 90%)',
    vignetteOpacity: 0.1,
  },
  loving: {
    gradient: 'linear-gradient(135deg, hsl(350, 90%, 80%) 0%, hsl(340, 85%, 75%) 35%, hsl(350, 80%, 78%) 70%, hsl(0, 75%, 85%) 100%)',
    glowOpacity: 0.6,
    glowColor: 'hsl(350, 100%, 92%)',
    vignetteOpacity: 0.08,
  },
};

// Floating emoji decorations
interface FloatingEmoji {
  id: number;
  emoji: string;
  x: number;
  y: number;
  scale: number;
  duration: number;
  delay: number;
}

const EmotionalBackground = ({ emotion }: EmotionalBackgroundProps) => {
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);
  const config = emotionConfig[emotion];

  useEffect(() => {
    const emojis = emotion === 'playful' 
      ? ['😜', '🏃', '💨', '😝', '🤭']
      : emotion === 'loving'
      ? ['💖', '💕', '💗', '✨', '💝']
      : ['💫', '✨', '🌸', '💮', '🌷'];

    const newEmojis: FloatingEmoji[] = [];
    const count = emotion === 'playful' ? 8 : 5;

    for (let i = 0; i < count; i++) {
      newEmojis.push({
        id: i,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        scale: 0.5 + Math.random() * 0.5,
        duration: 15 + Math.random() * 10,
        delay: Math.random() * 5,
      });
    }
    setFloatingEmojis(newEmojis);
  }, [emotion]);

  return (
    <>
      {/* Main gradient background */}
      <motion.div
        className="fixed inset-0 z-0"
        animate={{
          background: config.gradient,
        }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />

      {/* Vignette overlay */}
      <motion.div
        className="fixed inset-0 z-0 pointer-events-none"
        animate={{
          background: `radial-gradient(ellipse at center, transparent 0%, hsl(350, 80%, 20%, ${config.vignetteOpacity}) 100%)`,
        }}
        transition={{ duration: 1 }}
      />

      {/* Center glow */}
      <motion.div
        className="fixed inset-0 z-0 pointer-events-none"
        animate={{
          background: `radial-gradient(circle at 50% 50%, ${config.glowColor} / ${config.glowOpacity}) 0%, transparent 50%)`,
        }}
        transition={{ duration: 1 }}
      />

      {/* Floating emojis for emotion */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <AnimatePresence mode="wait">
          {floatingEmojis.map((item) => (
            <motion.div
              key={`${emotion}-${item.id}`}
              className="absolute opacity-30"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                fontSize: `${item.scale * 2}rem`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0.2, 0.4, 0.2],
                scale: [item.scale, item.scale * 1.2, item.scale],
                x: [0, 20, 0, -20, 0],
                y: [0, -10, 0, 10, 0],
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: item.duration,
                delay: item.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {item.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Playful emotion - extra bouncing elements */}
      {emotion === 'playful' && (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`bounce-${i}`}
              className="absolute text-4xl opacity-20"
              style={{
                left: `${20 + i * 30}%`,
                bottom: '10%',
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 1 + i * 0.3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.2,
              }}
            >
              😂
            </motion.div>
          ))}
        </div>
      )}

      {/* Loving emotion - pulsing hearts */}
      {emotion === 'loving' && (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="text-[20rem] text-rose opacity-20">💖</div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default EmotionalBackground;
