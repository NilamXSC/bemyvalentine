import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import FallingHearts from '@/components/FallingHearts';
import MusicPlayer from '@/components/MusicPlayer';
import ValentineCard from '@/components/ValentineCard';
import EmotionalBackground, { BackgroundEmotion } from '@/components/EmotionalBackground';

const Experience = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useUser();
  const [backgroundEmotion, setBackgroundEmotion] = useState<BackgroundEmotion>('dreamy');

  useEffect(() => {
    if (!isLoading && !user?.isLoggedIn) {
      navigate('/');
    }
  }, [user, isLoading, navigate]);

  if (isLoading || !user?.isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Emotional background system */}
      <EmotionalBackground emotion={backgroundEmotion} />

      {/* Falling hearts animation */}
      <FallingHearts />

      {/* Music player */}
      <MusicPlayer />

      {/* Main content */}
      <main className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <ValentineCard onEmotionChange={setBackgroundEmotion} />
      </main>

      {/* Footer */}
      <footer className="fixed bottom-4 left-0 right-0 text-center z-10">
        <p className="text-xs text-muted-foreground font-medium">
          Made with 💖
        </p>
      </footer>
    </div>
  );
};

export default Experience;
