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
    yourName: '',
    partnerName: '',
    partnerCallsYou: '',
    youCallPartner: '',
  });

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      login(formData);
      onComplete();
    }
  };

  const isStep1Valid = formData.yourName.trim() && formData.partnerName.trim();
  const isStep2Valid = formData.partnerCallsYou.trim() && formData.youCallPartner.trim();

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
                  <Label htmlFor="yourName" className="flex items-center gap-2 text-foreground">
                    <User className="w-4 h-4 text-blue-400" />
                    Your Name
                  </Label>
                  <Input
                    id="yourName"
                    placeholder="Enter your name..."
                    value={formData.yourName}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, yourName: e.target.value }))
                    }
                    className="bg-white/50 border-rose-200 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="partnerName" className="flex items-center gap-2 text-foreground">
                    <UserRound className="w-4 h-4 text-pink-400" />
                    Your Partner's Name
                  </Label>
                  <Input
                    id="partnerName"
                    placeholder="Enter your partner's name..."
                    value={formData.partnerName}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, partnerName: e.target.value }))
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
                  <Label htmlFor="partnerCallsYou" className="flex items-center gap-2 text-foreground">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    What Does Your Partner Call You?
                  </Label>
                  <Input
                    id="partnerCallsYou"
                    placeholder="e.g., Baby, Boo, Love..."
                    value={formData.partnerCallsYou}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, partnerCallsYou: e.target.value }))
                    }
                    className="bg-white/50 border-rose-200 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="youCallPartner" className="flex items-center gap-2 text-foreground">
                    <Heart className="w-4 h-4 text-rose-400" />
                    What Do You Call Your Partner?
                  </Label>
                  <Input
                    id="youCallPartner"
                    placeholder="e.g., Sweetheart, Babe, Cutie..."
                    value={formData.youCallPartner}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, youCallPartner: e.target.value }))
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