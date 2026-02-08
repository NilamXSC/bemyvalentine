import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, ArrowRight, Sparkles, Star, LogOut } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import FallingHearts from '@/components/FallingHearts';
import EmotionalBackground from '@/components/EmotionalBackground';
import OnboardingModal from '@/components/OnboardingModal';
import ShareLinkModal from '@/components/ShareLinkModal';
import SkeletonLoader from '@/components/homepage/SkeletonLoader';
import BentoGrid from '@/components/homepage/BentoGrid';
import FeatureCarousel from '@/components/homepage/FeatureCarousel';
import FeatureAccordion from '@/components/homepage/FeatureAccordion';
import FeatureTabs from '@/components/homepage/FeatureTabs';
import Breadcrumbs from '@/components/homepage/Breadcrumbs';
import RadioSelector from '@/components/homepage/RadioSelector';
import Snackbar from '@/components/homepage/Snackbar';

const Home = () => {
  const navigate = useNavigate();
  const { user, isLoading, logout } = useUser();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [experienceMode, setExperienceMode] = useState('romantic');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [contentLoading, setContentLoading] = useState(true);

  useEffect(() => {
    // Simulate content loading for skeleton demo
    const timer = setTimeout(() => setContentLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    if (user?.isLoggedIn) {
      // User already logged in - show share modal or go to experience
      setShowShareModal(true);
    } else {
      setShowOnboarding(true);
    }
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    setShowSnackbar(true);
    toast({
      title: 'Welcome! 💖',
      description: 'Your experience has been personalized.',
    });
    // Show share modal after onboarding
    setTimeout(() => setShowShareModal(true), 500);
  };

  const handleShareModalClose = () => {
    setShowShareModal(false);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: 'Logged out',
      description: 'Come back soon! 💕',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <EmotionalBackground emotion="dreamy" />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <SkeletonLoader />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <EmotionalBackground emotion="dreamy" />
      <FallingHearts />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-20 p-4 sm:p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Breadcrumbs currentPage="Welcome" />
          
          {user?.isLoggedIn && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 min-h-screen pt-20 pb-24 px-4">
        <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16">
          <AnimatePresence mode="wait">
            {contentLoading ? (
              <SkeletonLoader key="skeleton" />
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-12 sm:space-y-16"
              >
                {/* Hero Section */}
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center space-y-6 pt-8 sm:pt-12"
                >
                  <div className="flex justify-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -8, 0] }}
                        transition={{ delay: i * 0.1, duration: 2, repeat: Infinity }}
                      >
                        <Star className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" fill="currentColor" />
                      </motion.div>
                    ))}
                  </div>
                  
                  <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
                    Create Your Perfect
                    <span className="block text-primary">Valentine Experience</span>
                  </h1>
                  
                  <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                    A playful, romantic journey to pop the question and plan your dream date together. 
                    Personalized just for you and your special someone.
                  </p>

                  {user?.isLoggedIn && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-primary font-medium"
                    >
                      Welcome back, {user.hisName}! 💖
                    </motion.p>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Button
                      onClick={handleGetStarted}
                      className="btn-romantic rounded-full px-8 sm:px-10 py-6 sm:py-7 text-base sm:text-lg font-semibold"
                    >
                      {user?.isLoggedIn ? 'Continue Experience' : 'Get Started'}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </motion.div>
                </motion.section>

                {/* Bento Grid */}
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="font-serif text-xl sm:text-2xl text-center text-foreground">
                    What's Inside <Heart className="inline w-5 h-5 text-primary" />
                  </h2>
                  <BentoGrid />
                </motion.section>

                {/* Carousel */}
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-6"
                >
                  <h2 className="font-serif text-xl sm:text-2xl text-center text-foreground">
                    Experience Highlights <Sparkles className="inline w-5 h-5 text-primary" />
                  </h2>
                  <FeatureCarousel />
                </motion.section>

                {/* Tabs */}
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-6"
                >
                  <h2 className="font-serif text-xl sm:text-2xl text-center text-foreground">
                    How It Works
                  </h2>
                  <FeatureTabs />
                </motion.section>

                {/* Radio Selector */}
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="glass-card rounded-2xl p-6 sm:p-8"
                >
                  <RadioSelector value={experienceMode} onChange={setExperienceMode} />
                </motion.section>

                {/* Accordion FAQ */}
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="space-y-6"
                >
                  <h2 className="font-serif text-xl sm:text-2xl text-center text-foreground">
                    Questions & Answers
                  </h2>
                  <FeatureAccordion />
                </motion.section>

                {/* Final CTA */}
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-center py-8"
                >
                  <div className="glass-card rounded-2xl p-8 sm:p-12 space-y-6">
                    <h2 className="font-serif text-2xl sm:text-3xl text-foreground">
                      Ready to Create Magic?
                    </h2>
                    <p className="text-muted-foreground">
                      Make this Valentine's Day unforgettable with a personalized experience.
                    </p>
                    <Button
                      onClick={handleGetStarted}
                      className="btn-romantic rounded-full px-8 py-6 text-lg font-semibold"
                    >
                      <Heart className="w-5 h-5 mr-2" fill="currentColor" />
                      Start Now
                    </Button>
                  </div>
                </motion.section>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-4 left-0 right-0 text-center z-10">
        <p className="text-xs text-muted-foreground font-medium">
          Made with 💖
        </p>
      </footer>

      {/* Onboarding Modal */}
      <OnboardingModal
        open={showOnboarding}
        onComplete={handleOnboardingComplete}
      />

      {/* Share Link Modal */}
      <ShareLinkModal
        open={showShareModal}
        onClose={handleShareModalClose}
      />

      {/* Snackbar */}
      <Snackbar
        message="Your experience is ready! Share the link with your loved one..."
        isOpen={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        duration={2000}
      />
    </div>
  );
};

export default Home;
