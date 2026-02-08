import { motion } from 'framer-motion';

export type EmotionType = 
  | 'neutral' 
  | 'happy' 
  | 'excited' 
  | 'laughing' 
  | 'panic' 
  | 'teasing' 
  | 'defeated' 
  | 'overjoyed';

interface ButtonFaceProps {
  eyePosition: { x: number; y: number };
  emotion: EmotionType;
  size?: 'sm' | 'md' | 'lg';
}

const emotionStyles = {
  neutral: {
    eyeScale: 1,
    mouthPath: 'M 8 16 Q 16 18, 24 16',
    eyebrowY: 0,
  },
  happy: {
    eyeScale: 1,
    mouthPath: 'M 8 14 Q 16 22, 24 14',
    eyebrowY: -1,
  },
  excited: {
    eyeScale: 1.2,
    mouthPath: 'M 8 12 Q 16 24, 24 12',
    eyebrowY: -2,
  },
  laughing: {
    eyeScale: 0.6,
    mouthPath: 'M 6 12 Q 16 26, 26 12',
    eyebrowY: -2,
  },
  panic: {
    eyeScale: 1.4,
    mouthPath: 'M 10 18 Q 16 14, 22 18',
    eyebrowY: 2,
  },
  teasing: {
    eyeScale: 0.8,
    mouthPath: 'M 10 14 Q 16 20, 22 16',
    eyebrowY: -1,
  },
  defeated: {
    eyeScale: 0.9,
    mouthPath: 'M 10 18 Q 16 16, 22 18',
    eyebrowY: 3,
  },
  overjoyed: {
    eyeScale: 1.3,
    mouthPath: 'M 4 10 Q 16 28, 28 10',
    eyebrowY: -3,
  },
};

const sizeConfig = {
  sm: { eyeSize: 6, gap: 4 },
  md: { eyeSize: 10, gap: 6 },
  lg: { eyeSize: 14, gap: 8 },
};

const ButtonFace = ({ eyePosition, emotion, size = 'md' }: ButtonFaceProps) => {
  const style = emotionStyles[emotion];
  const config = sizeConfig[size];
  
  const isLaughing = emotion === 'laughing';
  const isPanic = emotion === 'panic';
  
  return (
    <div className="flex items-center pointer-events-none" style={{ gap: config.gap }}>
      {/* Left eye */}
      <motion.div
        className="relative rounded-full bg-white overflow-hidden"
        style={{
          width: config.eyeSize,
          height: config.eyeSize,
        }}
        animate={{
          scaleY: isLaughing ? 0.3 : style.eyeScale,
          scaleX: style.eyeScale,
        }}
        transition={{ duration: 0.2 }}
      >
        {!isLaughing && (
          <motion.div
            className="absolute bg-foreground/90 rounded-full"
            style={{
              width: config.eyeSize * 0.5,
              height: config.eyeSize * 0.5,
              top: '50%',
              left: '50%',
            }}
            animate={{
              x: eyePosition.x * 0.15 - (config.eyeSize * 0.25),
              y: eyePosition.y * 0.15 - (config.eyeSize * 0.25),
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
        )}
      </motion.div>

      {/* Right eye */}
      <motion.div
        className="relative rounded-full bg-white overflow-hidden"
        style={{
          width: config.eyeSize,
          height: config.eyeSize,
        }}
        animate={{
          scaleY: isLaughing ? 0.3 : style.eyeScale,
          scaleX: style.eyeScale,
        }}
        transition={{ duration: 0.2 }}
      >
        {!isLaughing && (
          <motion.div
            className="absolute bg-foreground/90 rounded-full"
            style={{
              width: config.eyeSize * 0.5,
              height: config.eyeSize * 0.5,
              top: '50%',
              left: '50%',
            }}
            animate={{
              x: eyePosition.x * 0.15 - (config.eyeSize * 0.25),
              y: eyePosition.y * 0.15 - (config.eyeSize * 0.25),
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
        )}
      </motion.div>

      {/* Panic indicator */}
      {isPanic && (
        <motion.span
          className="text-xs ml-1"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          💧
        </motion.span>
      )}
    </div>
  );
};

export default ButtonFace;
