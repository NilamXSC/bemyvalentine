import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X } from 'lucide-react';

interface SnackbarProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  duration?: number;
}

const Snackbar = ({ message, isOpen, onClose, duration = 5000 }: SnackbarProps) => {
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 max-w-sm w-full mx-4"
        >
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3">
            <Heart className="w-5 h-5 flex-shrink-0" fill="currentColor" />
            <p className="text-sm font-medium flex-1">{message}</p>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Snackbar;
