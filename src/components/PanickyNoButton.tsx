import { useState, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ButtonFace, { EmotionType } from './ButtonFace';
import { useGlobalMousePosition } from '@/hooks/use-eye-tracking';
import { useIsMobile } from '@/hooks/use-mobile';

interface PanickyNoButtonProps {
  onEscape: () => void;
  isDefeated?: boolean;
}

const teasingMessages = [
  "Catch me! 😜",
  "Too slow!",
  "Nope! 👀",
  "Nope nope!",
  "I'm fast 😝",
  "Hehe! 😘",
  "Not happening! 💖",
  "Never!",
  "Wrong! 🏃‍♀️",
  "Try again! 💨",
];

const PanickyNoButton = ({ onEscape, isDefeated = false }: PanickyNoButtonProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [escapeCount, setEscapeCount] = useState(0);
  const [emotion, setEmotion] = useState<EmotionType>('neutral');
  const [currentMessage, setCurrentMessage] = useState('');
  const [showBubble, setShowBubble] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const lastEscapeTime = useRef(0);
  const isMobile = useIsMobile();
  
  // Only track mouse on desktop, skip on mobile for performance
  const mousePosition = useGlobalMousePosition();

  // Calculate eye position looking behind (away from mouse) - simplified for mobile
  const eyePosition = useMemo(() => {
    if (isMobile || !buttonRef.current) return { x: 0, y: 0 };
    
    const rect = buttonRef.current.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2 + position.x;
    const buttonCenterY = rect.top + rect.height / 2 + position.y;
    
    const deltaX = mousePosition.x - buttonCenterX;
    const deltaY = mousePosition.y - buttonCenterY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    if (distance === 0) return { x: 0, y: 0 };
    
    const maxOffset = 6;
    return {
      x: -(deltaX / distance) * maxOffset,
      y: -(deltaY / distance) * maxOffset,
    };
  }, [mousePosition.x, mousePosition.y, position.x, position.y, isMobile]);

  const runAway = useCallback(() => {
    if (isDefeated) return;

    // Throttle escapes on mobile to prevent lag (min 200ms between escapes)
    const now = Date.now();
    if (isMobile && now - lastEscapeTime.current < 200) return;
    lastEscapeTime.current = now;

    // Quick shake on mobile, longer on desktop
    setIsShaking(true);
    setEmotion('panic');

    const shakeDelay = isMobile ? 50 : 150;
    
    setTimeout(() => {
      setIsShaking(false);
      
      // Calculate viewport-safe position
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const buttonWidth = isMobile ? 100 : 120;
      const buttonHeight = isMobile ? 40 : 50;
      const padding = isMobile ? 10 : 20;

      // Escape to random position on screen
      const maxX = (viewportWidth - buttonWidth) / 2 - padding;
      const maxY = (viewportHeight - buttonHeight) / 2 - padding;

      let newX = (Math.random() - 0.5) * 2 * maxX;
      let newY = (Math.random() - 0.5) * 2 * maxY;

      // Ensure it actually moves away - smaller threshold on mobile
      const moveThreshold = isMobile ? 60 : 100;
      if (Math.abs(newX - position.x) < moveThreshold) {
        newX = position.x > 0 ? -maxX * 0.8 : maxX * 0.8;
      }
      if (Math.abs(newY - position.y) < moveThreshold) {
        newY = position.y > 0 ? -maxY * 0.8 : maxY * 0.8;
      }

      setPosition({ x: newX, y: newY });
      setEscapeCount((prev) => prev + 1);
      
      // Show teasing message
      const randomMessage = teasingMessages[Math.floor(Math.random() * teasingMessages.length)];
      setCurrentMessage(randomMessage);
      setShowBubble(true);
      setEmotion('teasing');

      onEscape();
    }, shakeDelay);
  }, [isDefeated, position, onEscape, isMobile]);

  // Speed increases with escape count - faster on mobile
  const springConfig = useMemo(() => ({
    stiffness: isMobile 
      ? Math.min(500 + escapeCount * 30, 800) 
      : Math.min(400 + escapeCount * 20, 600),
    damping: isMobile ? 30 : 25,
  }), [escapeCount, isMobile]);

  if (isDefeated) {
    return (
      <motion.div
        className="fixed z-50"
        style={{
          left: '50%',
          top: '50%',
        }}
        animate={{
          x: position.x,
          y: position.y,
          scale: 0.9,
          opacity: 0.7,
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <div className="px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-secondary text-secondary-foreground font-medium text-base sm:text-lg opacity-60 flex items-center gap-2 sm:gap-3">
            <ButtonFace 
              eyePosition={{ x: 0, y: 3 }} 
              emotion="defeated"
              size={isMobile ? 'sm' : 'md'}
            />
            <span>No 💔</span>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute -top-6 sm:-top-8 left-1/2 transform -translate-x-1/2 text-xl sm:text-2xl"
          >
            😅
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed z-50"
      style={{
        left: '50%',
        top: '50%',
        // Use will-change for better mobile performance
        willChange: 'transform',
      }}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: 'spring',
        ...springConfig,
      }}
    >
      <div className="relative">
        {/* Speech bubble - smaller on mobile */}
        <AnimatePresence>
          {showBubble && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute -top-10 sm:-top-14 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-10"
            >
              <div className="px-2 sm:px-4 py-1 sm:py-2 glass-card rounded-xl sm:rounded-2xl text-primary font-medium text-xs sm:text-sm shadow-lg">
                {currentMessage}
                {/* Speech bubble tail */}
                <div className="absolute -bottom-1.5 sm:-bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 sm:border-l-8 border-r-4 sm:border-r-8 border-t-4 sm:border-t-8 border-l-transparent border-r-transparent border-t-white/25" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          ref={buttonRef}
          className="relative px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-secondary text-secondary-foreground font-medium text-base sm:text-lg shadow-md hover:shadow-lg transition-shadow overflow-visible flex items-center gap-2 sm:gap-3 touch-none"
          onMouseEnter={!isMobile ? runAway : undefined}
          onTouchStart={runAway}
          animate={{
            rotate: isShaking ? [0, -3, 3, -3, 0] : 0,
          }}
          transition={{
            rotate: { duration: isMobile ? 0.08 : 0.15 },
          }}
          style={{
            // Prevent touch delay on mobile
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          {/* Face inside button */}
          <ButtonFace 
            eyePosition={eyePosition} 
            emotion={emotion}
            size={isMobile ? 'sm' : 'md'}
          />

          <span>No 💔</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PanickyNoButton;
