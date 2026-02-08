import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/contexts/UserContext';
import GifDisplay from './GifDisplay';
import { Heart, Sparkles, PartyPopper, Sofa, UtensilsCrossed, Film, Car, ShoppingBag, Gamepad2, Gift } from 'lucide-react';

interface DateSelectionProps {
  onComplete: (selections: DateSelections) => void;
}

export interface DateSelections {
  vibe: string;
  activity: string;
  message: string;
}

const vibeOptions = [
  { id: 'cozy', label: 'Cozy & Cute', Icon: Heart, color: 'bg-rose-100 hover:bg-rose-200 border-rose-300' },
  { id: 'romantic', label: 'Romantic & Fancy', Icon: Sparkles, color: 'bg-pink-100 hover:bg-pink-200 border-pink-300' },
  { id: 'fun', label: 'Fun & Crazy', Icon: PartyPopper, color: 'bg-amber-100 hover:bg-amber-200 border-amber-300' },
  { id: 'stayin', label: 'Stay-in & Snuggle', Icon: Sofa, color: 'bg-orange-100 hover:bg-orange-200 border-orange-300' },
];

const activityOptions = [
  { id: 'dinner', label: 'Dinner', Icon: UtensilsCrossed, color: 'bg-rose-100 hover:bg-rose-200 border-rose-300' },
  { id: 'movie', label: 'Movie Night', Icon: Film, color: 'bg-pink-100 hover:bg-pink-200 border-pink-300' },
  { id: 'ghumi', label: 'Ghumi Ghumi', Icon: Car, color: 'bg-amber-100 hover:bg-amber-200 border-amber-300' },
  { id: 'shopping', label: 'Shopping', Icon: ShoppingBag, color: 'bg-orange-100 hover:bg-orange-200 border-orange-300' },
  { id: 'gaming', label: 'Gaming Together', Icon: Gamepad2, color: 'bg-fuchsia-100 hover:bg-fuchsia-200 border-fuchsia-300' },
  { id: 'surprise', label: 'Surprise Me!', Icon: Gift, color: 'bg-violet-100 hover:bg-violet-200 border-violet-300' },
];

const DateSelection = ({ onComplete }: DateSelectionProps) => {
  const { user } = useUser();
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState<DateSelections>({
    vibe: '',
    activity: '',
    message: '',
  });
  
  const herNickname = user?.herNickname || 'Sweetheart';

  const handleVibeSelect = (vibe: string) => {
    setSelections((prev) => ({ ...prev, vibe }));
    setStep(2);
  };

  const handleActivitySelect = (activity: string) => {
    setSelections((prev) => ({ ...prev, activity }));
    setStep(3);
  };

  const handleMessageSubmit = () => {
    onComplete(selections);
  };

  return (
    <div className="w-full space-y-6">
      <GifDisplay stage="date" />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-4"
          >
            <h3 className="font-serif text-xl text-center text-foreground flex items-center justify-center gap-2">
              What's the vibe, {herNickname}? <Heart className="w-5 h-5 text-primary" />
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {vibeOptions.map((option) => {
                const IconComponent = option.Icon;
                return (
                  <motion.button
                    key={option.id}
                    onClick={() => handleVibeSelect(option.id)}
                    className={`p-4 rounded-xl text-center border-2 transition-all shadow-sm ${option.color}`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent className="w-8 h-8 mx-auto mb-2 text-foreground/70" strokeWidth={1.5} />
                    <span className="text-sm font-medium text-foreground/80">
                      {option.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-4"
          >
            <h3 className="font-serif text-xl text-center text-foreground flex items-center justify-center gap-2">
              What should we do? <Sparkles className="w-5 h-5 text-primary" />
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {activityOptions.map((option) => {
                const IconComponent = option.Icon;
                return (
                  <motion.button
                    key={option.id}
                    onClick={() => handleActivitySelect(option.id)}
                    className={`p-4 rounded-xl text-center border-2 transition-all shadow-sm ${option.color}`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent className="w-7 h-7 mx-auto mb-2 text-foreground/70" strokeWidth={1.5} />
                    <span className="text-sm font-medium text-foreground/80">
                      {option.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-4"
          >
            <h3 className="font-serif text-xl text-center text-foreground flex items-center justify-center gap-2">
              Anything you want me to know? <Heart className="w-5 h-5 text-primary" />
            </h3>
            <textarea
              value={selections.message}
              onChange={(e) =>
                setSelections((prev) => ({ ...prev, message: e.target.value }))
              }
              placeholder="Write something sweet for me..."
              className="w-full p-4 bg-rose-50/80 border-2 border-rose-200 rounded-xl resize-none h-24 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <motion.button
              onClick={handleMessageSubmit}
              className="w-full py-4 btn-romantic rounded-full font-semibold text-lg flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              I'm Ready! <Heart className="w-5 h-5" fill="currentColor" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 pt-2">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`w-2 h-2 rounded-full transition-colors ${
              s === step ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default DateSelection;
