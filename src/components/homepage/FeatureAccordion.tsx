import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Heart, Zap, Palette, Download, Shield } from 'lucide-react';

const faqItems = [
  {
    icon: Heart,
    question: 'How does the Valentine experience work?',
    answer:
      'You\'ll start with a beautiful card asking "Will you be my Valentine?" with two buttons - Yes and No. The No button playfully runs away, making it impossible to click! Once your special someone clicks Yes, they can plan your perfect date together.',
  },
  {
    icon: Zap,
    question: 'What happens when she clicks Yes?',
    answer:
      'Confetti explodes across the screen! Then she gets to choose the date vibe (cozy, romantic, fun, or stay-in) and pick activities like dinner, movie night, or a surprise. She can also leave you a sweet message.',
  },
  {
    icon: Palette,
    question: 'Can I customize the experience?',
    answer:
      'Absolutely! When you get started, you\'ll enter both your names and nicknames. The entire experience becomes personalized - from the questions to the final card that displays your chosen names.',
  },
  {
    icon: Download,
    question: 'Can I save the valentine card?',
    answer:
      'Yes! At the end of the experience, there\'s a beautiful summary card showing all the date choices. You can download this as an image to share or keep as a memory of your Valentine\'s Day 2026.',
  },
  {
    icon: Shield,
    question: 'Is my data safe?',
    answer:
      'All data is stored locally in your browser. Nothing is sent to any server. Your romantic experience stays completely private between you and your valentine.',
  },
];

const FeatureAccordion = () => {
  return (
    <Accordion type="single" collapsible className="w-full space-y-2">
      {faqItems.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="bg-white/60 backdrop-blur-sm rounded-xl border border-rose-200/50 px-4 overflow-hidden"
          >
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-3 text-left">
                <div className="p-2 rounded-lg bg-gradient-to-br from-rose-100 to-pink-100">
                  <IconComponent className="w-4 h-4 text-primary" strokeWidth={2} />
                </div>
                <span className="font-medium text-foreground text-sm sm:text-base">
                  {item.question}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm pb-4 pl-12">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default FeatureAccordion;
