import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/contexts/UserContext';
import GifDisplay from './GifDisplay';
import YesButton from './YesButton';
import PanickyNoButton from './PanickyNoButton';
import ConfettiBurst from './ConfettiBurst';
import DateSelection, { DateSelections } from './DateSelection';
import FinalReveal from './FinalReveal';
import { BackgroundEmotion } from './EmotionalBackground';

type Stage = 'intro' | 'yes-reveal' | 'date-selection' | 'final';

interface ValentineCardProps {
  onEmotionChange: (emotion: BackgroundEmotion) => void;
}

const ValentineCard = ({ onEmotionChange }: ValentineCardProps) => {
  const { user } = useUser();
  const [stage, setStage] = useState<Stage>('intro');
  const [escapeCount, setEscapeCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isNoBeingChased, setIsNoBeingChased] = useState(false);
  const [showDefeatedNo, setShowDefeatedNo] = useState(false);
  
  const youCallPartner = user?.youCallPartner || 'Sweetheart';

  const handleYesClick = () => {
    setShowConfetti(true);
    setShowDefeatedNo(true);
    onEmotionChange('loving');
    
    setTimeout(() => {
      setStage('yes-reveal');
    }, 500);
  };

  const handleNoEscape = () => {
    setEscapeCount((prev) => prev + 1);
    setIsNoBeingChased(true);
    onEmotionChange('playful');
    
    setTimeout(() => {
      setIsNoBeingChased(false);
      if (stage === 'intro') {
        onEmotionChange('dreamy');
      }
    }, 2000);
  };

  const handleContinueToDate = () => {
    setStage('date-selection');
  };

  const handleDateComplete = (selections: DateSelections) => {
    localStorage.setItem('valentineSelections', JSON.stringify(selections));
    setStage('final');
  };

  return (
    <>
      {showConfetti && <ConfettiBurst />}
      
      {stage === 'intro' && (
        <PanickyNoButton 
          onEscape={handleNoEscape}
          isDefeated={showDefeatedNo}
        />
      )}

      <motion.div
        className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 w-full max-w-sm sm:max-w-md mx-3 sm:mx-4 relative z-10"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ 
          opacity: 1, 
          scale: stage === 'yes-reveal' ? 1.02 : 1, 
          y: 0,
        }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          animation: stage === 'intro' ? 'float 6s ease-in-out infinite' : undefined,
        }}
      >
        <AnimatePresence mode="wait">

          {/* INTRO STAGE */}
          {stage === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-6"
            >
              <GifDisplay stage="intro" />
              
              <motion.h1
                className="font-serif text-xl sm:text-2xl md:text-3xl text-center text-foreground animate-glow"
                animate={{
                  textShadow: [
                    '0 0 20px hsl(350 80% 60% / 0.5)',
                    '0 0 40px hsl(350 80% 60% / 0.7)',
                    '0 0 20px hsl(350 80% 60% / 0.5)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Will you be my Valentine? 💖
              </motion.h1>

              <div className="space-y-4 pt-4">
                <YesButton 
                  onClick={handleYesClick}
                  isNoBeingChased={isNoBeingChased}
                  noChaseCount={escapeCount}
                />

                <div className="h-16" />
              </div>
            </motion.div>
          )}

          {/* YES REVEAL STAGE */}
          {stage === 'yes-reveal' && (
            <motion.div
              key="yes-reveal"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6 text-center"
            >
              <GifDisplay stage="yes" />

              <motion.h2
                className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                I knew you'd say YES 💖
              </motion.h2>

              <motion.p
                className="text-base sm:text-lg text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Now tell me how you want our special day to be, {youCallPartner}...
              </motion.p>

              <motion.button
                onClick={handleContinueToDate}
                className="px-6 sm:px-8 py-3 sm:py-4 btn-romantic rounded-full font-semibold text-base sm:text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Plan Our Date! 📅
              </motion.button>
            </motion.div>
          )}

          {/* DATE SELECTION STAGE */}
          {stage === 'date-selection' && (
            <motion.div
              key="date-selection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DateSelection onComplete={handleDateComplete} />
            </motion.div>
          )}

          {/* FINAL STAGE */}
          {stage === 'final' && (
            <motion.div
              key="final"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <FinalReveal />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default ValentineCard;