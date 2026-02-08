import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Heart, Sparkles, Gift, Star, Music, MessageCircle } from 'lucide-react';

const slides = [
  {
    icon: Heart,
    title: 'Interactive Experience',
    description: 'A playful, romantic journey with your special someone',
    gradient: 'from-rose-400 to-pink-500',
  },
  {
    icon: Sparkles,
    title: 'Beautiful Animations',
    description: 'Smooth transitions, floating hearts, and confetti celebrations',
    gradient: 'from-pink-400 to-fuchsia-500',
  },
  {
    icon: Gift,
    title: 'Personalized Card',
    description: 'Create a unique valentine card with your choices',
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    icon: Music,
    title: 'Romantic Ambiance',
    description: 'Background music to set the perfect mood',
    gradient: 'from-violet-400 to-purple-500',
  },
  {
    icon: MessageCircle,
    title: 'Leave Sweet Notes',
    description: 'Write personalized messages for your valentine',
    gradient: 'from-teal-400 to-cyan-500',
  },
];

const FeatureCarousel = () => {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      className="w-full max-w-3xl mx-auto"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {slides.map((slide, index) => {
          const IconComponent = slide.icon;
          return (
            <CarouselItem key={index} className="pl-2 md:pl-4 basis-4/5 sm:basis-1/2 md:basis-1/3">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-2xl bg-gradient-to-br ${slide.gradient} text-white h-full min-h-[180px] flex flex-col justify-between shadow-lg`}
              >
                <IconComponent className="w-8 h-8 mb-4" strokeWidth={1.5} />
                <div>
                  <h3 className="font-serif text-lg font-semibold mb-2">{slide.title}</h3>
                  <p className="text-sm text-white/90">{slide.description}</p>
                </div>
              </motion.div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex -left-4 bg-white/80 border-rose-200 hover:bg-white" />
      <CarouselNext className="hidden sm:flex -right-4 bg-white/80 border-rose-200 hover:bg-white" />
    </Carousel>
  );
};

export default FeatureCarousel;
