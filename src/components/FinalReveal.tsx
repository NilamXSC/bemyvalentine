import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/contexts/UserContext';
import GifDisplay from './GifDisplay';
import { Download, Heart, Sparkles, Sofa, PartyPopper, UtensilsCrossed, Film, Car, ShoppingBag, Gamepad2, Gift } from 'lucide-react';
import html2canvas from 'html2canvas';

interface DateSelections {
  vibe: string;
  activity: string;
  message: string;
}

const vibeLabels: Record<string, { label: string; Icon: typeof Heart }> = {
  cozy: { label: 'Cozy & Cute', Icon: Heart },
  romantic: { label: 'Romantic & Fancy', Icon: Sparkles },
  fun: { label: 'Fun & Crazy', Icon: PartyPopper },
  stayin: { label: 'Stay-in & Snuggle', Icon: Sofa },
};

const activityLabels: Record<string, { label: string; Icon: typeof Heart }> = {
  dinner: { label: 'Dinner', Icon: UtensilsCrossed },
  movie: { label: 'Movie Night', Icon: Film },
  ghumi: { label: 'Ghumi Ghumi', Icon: Car },
  shopping: { label: 'Shopping', Icon: ShoppingBag },
  gaming: { label: 'Gaming Together', Icon: Gamepad2 },
  surprise: { label: 'Surprise Me!', Icon: Gift },
};

const FinalReveal = () => {
  const { user } = useUser();
  const cardRef = useRef<HTMLDivElement>(null);
  const [selections, setSelections] = useState<DateSelections | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const partnerName = user?.partnerName || 'My Love';
  const partnerCallsYou = user?.partnerCallsYou || 'Yours';

  useEffect(() => {
    const saved = localStorage.getItem('valentineSelections');
    if (saved) {
      setSelections(JSON.parse(saved));
    }
  }, []);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#fdf2f8',
        scale: 2,
        useCORS: true,
      });
      
      const link = document.createElement('a');
      link.download = `valentines-card-for-${partnerName.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const vibeData = selections?.vibe ? vibeLabels[selections.vibe] : null;
  const activityData = selections?.activity ? activityLabels[selections.activity] : null;

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      {/* Downloadable Card */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center space-y-4 sm:space-y-6 p-4 sm:p-6 bg-gradient-to-b from-rose-50 to-pink-100 rounded-2xl relative overflow-hidden"
      >
        <GifDisplay stage="final" />

        {/* Main Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-2 sm:space-y-3"
        >
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground">
            This Valentine's,
          </h2>
          <p className="font-serif text-lg sm:text-xl md:text-2xl text-primary flex items-center justify-center gap-2">
            you're mine <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-primary" fill="currentColor" />
          </p>
          <p className="font-serif text-lg sm:text-xl md:text-2xl text-foreground">
            And I'm yours.
          </p>
        </motion.div>

        {/* Date Plan Summary */}
        {selections && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-3 sm:space-y-4 pt-2 sm:pt-4"
          >
            <p className="text-xs sm:text-sm text-muted-foreground font-medium uppercase tracking-wider">
              Our Date Plan
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {vibeData && (
                <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-rose-200/60 rounded-full">
                  <vibeData.Icon className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600" strokeWidth={1.5} />
                  <span className="text-xs sm:text-sm font-medium text-rose-700">{vibeData.label}</span>
                </div>
              )}
              
              {activityData && (
                <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-pink-200/60 rounded-full">
                  <activityData.Icon className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600" strokeWidth={1.5} />
                  <span className="text-xs sm:text-sm font-medium text-pink-700">{activityData.label}</span>
                </div>
              )}
            </div>

            {selections.message && (
              <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-white/50 rounded-xl">
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">{partnerName}'s Note:</p>
                <p className="text-sm sm:text-base text-foreground italic">"{selections.message}"</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="pt-3 sm:pt-4"
        >
          <p className="font-serif italic text-base sm:text-lg text-muted-foreground">
            — {partnerCallsYou} 💖
          </p>
        </motion.div>

        {/* Date */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-xs sm:text-sm text-muted-foreground">
            14th February, 2026
          </p>
        </motion.div>

        {/* Floating hearts */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-lg sm:text-xl pointer-events-none"
            style={{
              left: `${15 + i * 20}%`,
              top: `${15 + (i % 2) * 15}%`,
            }}
            animate={{
              y: [0, -8, 0],
              rotate: [0, 8, -8, 0],
            }}
            transition={{
              duration: 3,
              delay: i * 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            💕
          </motion.div>
        ))}
      </motion.div>

      {/* Download Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="text-center space-y-3 sm:space-y-4 pt-2"
      >
        <p className="text-sm sm:text-base text-foreground font-medium px-4">
          Show me this card on 14th babe. 💝
        </p>
        
        <motion.button
          onClick={handleDownload}
          disabled={isDownloading}
          className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all disabled:opacity-70"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download className="w-4 h-4 sm:w-5 sm:h-5" />
          {isDownloading ? 'Downloading...' : 'Press here to download'}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default FinalReveal;