import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, VolumeX } from 'lucide-react';

const MusicPlayer = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const playMusic = async () => {
      try {
        audio.volume = 0;
        await audio.play();
        setIsPlaying(true);
        
        // Fade in
        let volume = 0;
        const fadeIn = setInterval(() => {
          if (volume < 0.5) {
            volume += 0.05;
            audio.volume = Math.min(volume, 0.5);
          } else {
            clearInterval(fadeIn);
          }
        }, 100);
      } catch (error) {
        console.log('Autoplay blocked, waiting for user interaction');
      }
    };

    playMusic();

    // Try to play on first interaction
    const handleInteraction = () => {
      if (!isPlaying) {
        playMusic();
      }
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, [isPlaying]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/assets/music.mp3"
        loop
        preload="auto"
      />
      <motion.button
        onClick={toggleMute}
        className="fixed top-4 right-4 z-50 p-3 glass-card rounded-full hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-primary" />
        ) : (
          <Music className="w-5 h-5 text-primary animate-bounce-soft" />
        )}
      </motion.button>
    </>
  );
};

export default MusicPlayer;
