import { motion } from 'framer-motion';
import { Heart, Sparkles, MessageCircle, Calendar, Gift, Music, Camera, Star } from 'lucide-react';

const features = [
  {
    icon: Heart,
    title: 'Ask the Question',
    description: 'A playful way to pop the big question',
    color: 'bg-rose-100 hover:bg-rose-200',
    iconColor: 'text-rose-500',
    span: 'col-span-2 md:col-span-1',
  },
  {
    icon: Sparkles,
    title: 'Chase the No',
    description: 'Fun runaway button mechanics',
    color: 'bg-pink-100 hover:bg-pink-200',
    iconColor: 'text-pink-500',
    span: 'col-span-1',
  },
  {
    icon: Calendar,
    title: 'Plan Your Date',
    description: 'Choose vibe & activities together',
    color: 'bg-amber-100 hover:bg-amber-200',
    iconColor: 'text-amber-600',
    span: 'col-span-1',
  },
  {
    icon: MessageCircle,
    title: 'Sweet Messages',
    description: 'Leave notes for each other',
    color: 'bg-violet-100 hover:bg-violet-200',
    iconColor: 'text-violet-500',
    span: 'col-span-2 md:col-span-1',
  },
  {
    icon: Gift,
    title: 'Personalized',
    description: 'Names & nicknames customized',
    color: 'bg-fuchsia-100 hover:bg-fuchsia-200',
    iconColor: 'text-fuchsia-500',
    span: 'col-span-1',
  },
  {
    icon: Camera,
    title: 'Save & Share',
    description: 'Download your valentine card',
    color: 'bg-orange-100 hover:bg-orange-200',
    iconColor: 'text-orange-500',
    span: 'col-span-1',
  },
  {
    icon: Music,
    title: 'Romantic Tunes',
    description: 'Background music player',
    color: 'bg-teal-100 hover:bg-teal-200',
    iconColor: 'text-teal-500',
    span: 'col-span-1 md:col-span-2',
  },
];

const BentoGrid = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
      {features.map((feature, index) => {
        const IconComponent = feature.icon;
        return (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className={`${feature.span} ${feature.color} p-4 sm:p-6 rounded-xl sm:rounded-2xl transition-all cursor-pointer shadow-sm hover:shadow-md border border-white/50`}
          >
            <IconComponent className={`w-6 h-6 sm:w-8 sm:h-8 ${feature.iconColor} mb-2 sm:mb-3`} strokeWidth={1.5} />
            <h3 className="font-serif text-sm sm:text-base font-semibold text-foreground mb-1">
              {feature.title}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
              {feature.description}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default BentoGrid;
