import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, User, UserRound, Sparkles, ArrowRight, Check } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface OnboardingModalProps {
  open: boolean;
  onComplete: () => void;
}

const OnboardingModal = ({ open, onComplete }: OnboardingModalProps) => {
  const { login } = useUser();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    hisName: '',
    herName: '',
    hisNickname: '',
    herNickname: '',
  });

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      login(formData);
      onComplete();
    }
  };

  const isStep1Valid = formData.hisName.trim() && formData.herName.trim();
  const isStep2Valid = formData.hisNickname.trim() && formData.herNickname.trim();

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md glass-card border-rose-200/50">
        <DialogHeader>
          <DialogTitle className="text-center font-serif text-xl sm:text-2xl text-foreground flex items-center justify-center gap-2">
            <Heart className="w-5 h-5 text-primary" fill="currentColor" />
            Personalize Your Experience
            <Heart className="w-5 h-5 text-primary" fill="currentColor" />
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Tell us about you and your special someone
          </DialogDescription>
        </DialogHeader>

        <div className="pt-4">
          {/* Progress indicator */}
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  s === step
                    ? 'bg-primary scale-110'
                    : s < step
                    ? 'bg-primary/60'
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="hisName" className="flex items-center gap-2 text-foreground">
                    <User className="w-4 h-4 text-blue-400" />
                    Your Name (Him)
                  </Label>
                  <Input
                    id="hisName"
                    placeholder="Enter your name..."
                    value={formData.hisName}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, hisName: e.target.value }))
                    }
                    className="bg-white/50 border-rose-200 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="herName" className="flex items-center gap-2 text-foreground">
                    <UserRound className="w-4 h-4 text-pink-400" />
                    Her Name
                  </Label>
                  <Input
                    id="herName"
                    placeholder="Enter her name..."
                    value={formData.herName}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, herName: e.target.value }))
                    }
                    className="bg-white/50 border-rose-200 focus:border-primary"
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="hisNickname" className="flex items-center gap-2 text-foreground">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Your Nickname (What she calls you)
                  </Label>
                  <Input
                    id="hisNickname"
                    placeholder="e.g., Baby, Boo, Love..."
                    value={formData.hisNickname}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, hisNickname: e.target.value }))
                    }
                    className="bg-white/50 border-rose-200 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="herNickname" className="flex items-center gap-2 text-foreground">
                    <Heart className="w-4 h-4 text-rose-400" />
                    Her Nickname (What you call her)
                  </Label>
                  <Input
                    id="herNickname"
                    placeholder="e.g., Sweetheart, Babe, Cutie..."
                    value={formData.herNickname}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, herNickname: e.target.value }))
                    }
                    className="bg-white/50 border-rose-200 focus:border-primary"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              onClick={handleNext}
              disabled={step === 1 ? !isStep1Valid : !isStep2Valid}
              className="w-full btn-romantic rounded-full py-6 text-base font-semibold flex items-center justify-center gap-2"
            >
              {step === 2 ? (
                <>
                  <Check className="w-5 h-5" />
                  Let's Begin!
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
