import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { decodeShareData } from '@/lib/share-utils';
import { useUser, UserData } from '@/contexts/UserContext';
import FallingHearts from '@/components/FallingHearts';
import MusicPlayer from '@/components/MusicPlayer';
import ValentineCard from '@/components/ValentineCard';
import EmotionalBackground, { BackgroundEmotion } from '@/components/EmotionalBackground';

const SharedExperience = () => {
  const { shareCode } = useParams<{ shareCode: string }>();
  const navigate = useNavigate();
  const { setSharedUser } = useUser();
  const [backgroundEmotion, setBackgroundEmotion] = useState<BackgroundEmotion>('dreamy');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (!shareCode) {
      navigate('/');
      return;
    }

    const data = decodeShareData(shareCode);
    if (data) {
      // Set the shared user data for this session
      setSharedUser({
        ...data,
        isLoggedIn: true,
      });
      setIsValid(true);
    } else {
      setIsValid(false);
      // Redirect to home after showing error briefly
      setTimeout(() => navigate('/'), 2000);
    }
  }, [shareCode, navigate, setSharedUser]);

  if (isValid === null) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <EmotionalBackground emotion="dreamy" />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-muted-foreground">Loading your surprise...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isValid === false) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <EmotionalBackground emotion="dreamy" />
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="glass-card rounded-2xl p-8 text-center space-y-4 max-w-sm">
            <p className="text-xl text-foreground">Oops! 💔</p>
            <p className="text-muted-foreground">This link seems to be invalid.</p>
            <p className="text-sm text-muted-foreground">Redirecting to home...</p>
          </div>
        </div>
      </div>
    );
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

export default SharedExperience;
