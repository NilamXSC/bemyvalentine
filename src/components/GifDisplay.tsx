import { motion, AnimatePresence } from 'framer-motion';

interface GifDisplayProps {
  stage: 'intro' | 'yes' | 'date' | 'final';
}

const GifDisplay = ({ stage }: GifDisplayProps) => {
  // These would be replaced with actual GIFs from /assets/
  const gifs: Record<string, string> = {
    intro: '/assets/intro.gif',
    yes: '/assets/yes.gif',
    date: '/assets/date.gif',
    final: '/assets/final.gif',
  };

  // Fallback placeholder with animated heart
  const FallbackGif = () => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-rose-light/30 to-lavender/30 rounded-xl">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-20 h-20 text-primary"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </motion.div>
    </div>
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stage}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
        className="w-full aspect-square max-w-[200px] mx-auto rounded-2xl overflow-hidden shadow-lg"
      >
        <img
          src={gifs[stage]}
          alt="Romantic animation"
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.nextElementSibling?.classList.remove('hidden');
          }}
        />
        <div className="hidden w-full h-full">
          <FallbackGif />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GifDisplay;
