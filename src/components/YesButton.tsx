import { useRef } from 'react';
import { motion } from 'framer-motion';
import ButtonFace, { EmotionType } from './ButtonFace';
import { useEyeTracking } from '@/hooks/use-eye-tracking';

interface YesButtonProps {
  onClick: () => void;
  isNoBeingChased: boolean;
  noChaseCount: number;
}

const YesButton = ({ onClick, isNoBeingChased, noChaseCount }: YesButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const eyePosition = useEyeTracking(buttonRef);

  const getEmotion = (): EmotionType => {
    if (noChaseCount > 5) return 'laughing';
    if (isNoBeingChased) return 'laughing';
    return 'happy';
  };

  const emotion = getEmotion();

  return (
    <div className="relative">
      <motion.button
        ref={buttonRef}
        onClick={onClick}
        className="relative w-full py-5 px-10 btn-romantic rounded-full font-semibold text-lg overflow-visible flex items-center justify-center gap-4"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          y: emotion === 'laughing' ? [0, -3, 0] : 0,
        }}
        transition={{
          y: {
            duration: 0.3,
            repeat: emotion === 'laughing' ? Infinity : 0,
            repeatType: 'reverse',
          },
        }}
      >
        {/* Face inside button - left side */}
        <div className="flex-shrink-0">
          <ButtonFace 
            eyePosition={eyePosition} 
            emotion={emotion}
            size="md"
          />
        </div>

        {/* Button text - right side */}
        <span className="relative z-10">Yes! 💖</span>
      </motion.button>

    </div>
  );
};

export default YesButton;
