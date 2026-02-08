import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Sparkles, Calendar, Gift } from 'lucide-react';
import { motion } from 'framer-motion';

const tabContent = [
  {
    value: 'question',
    icon: Heart,
    label: 'The Question',
    title: 'Pop the Big Question',
    description:
      'A beautifully designed card with a playful twist. The Yes button welcomes clicks while the No button has a mind of its own!',
    features: ['Animated card with glassmorphism', 'Runaway No button', 'Confetti celebration on Yes'],
    color: 'text-rose-500',
    bg: 'bg-rose-50',
  },
  {
    value: 'chase',
    icon: Sparkles,
    label: 'The Chase',
    title: 'Catch Me If You Can',
    description:
      'Watch as the No button desperately tries to escape! It runs, shrinks, and panics as you chase it around the screen.',
    features: ['Mouse-following escape logic', 'Dramatic size reduction', 'Hilarious panic messages'],
    color: 'text-pink-500',
    bg: 'bg-pink-50',
  },
  {
    value: 'plan',
    icon: Calendar,
    label: 'The Plan',
    title: 'Design Your Date',
    description:
      'After saying Yes, your valentine gets to plan the perfect date. Choose the vibe, pick activities, and leave sweet notes.',
    features: ['4 vibe options', '6 activity choices', 'Personal message input'],
    color: 'text-amber-500',
    bg: 'bg-amber-50',
  },
  {
    value: 'card',
    icon: Gift,
    label: 'The Card',
    title: 'Your Love Card',
    description:
      'A beautiful summary card showcasing all the choices made. Save it as an image to remember this special moment.',
    features: ['Personalized summary', 'Downloadable image', 'Show on Valentine\'s Day'],
    color: 'text-violet-500',
    bg: 'bg-violet-50',
  },
];

const FeatureTabs = () => {
  return (
    <Tabs defaultValue="question" className="w-full">
      <TabsList className="grid w-full grid-cols-4 bg-white/60 backdrop-blur-sm rounded-xl p-1 h-auto">
        {tabContent.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-3 px-2 sm:px-4 data-[state=active]:bg-white rounded-lg transition-all"
            >
              <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 ${tab.color}`} strokeWidth={1.5} />
              <span className="text-xs sm:text-sm font-medium hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          );
        })}
      </TabsList>

      {tabContent.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${tab.bg} rounded-2xl p-6 sm:p-8 border border-white/50`}
          >
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-foreground mb-3">
              {tab.title}
            </h3>
            <p className="text-muted-foreground mb-4">{tab.description}</p>
            <ul className="space-y-2">
              {tab.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                  <Heart className="w-3 h-3 text-primary" fill="currentColor" />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default FeatureTabs;
