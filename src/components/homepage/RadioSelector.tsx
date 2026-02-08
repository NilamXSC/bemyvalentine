import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Heart, Sparkles, PartyPopper, Sofa } from 'lucide-react';

interface RadioSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const options = [
  { value: 'romantic', label: 'Romantic Mode', icon: Heart, description: 'Soft, dreamy experience' },
  { value: 'playful', label: 'Playful Mode', icon: Sparkles, description: 'Fun and interactive' },
  { value: 'party', label: 'Party Mode', icon: PartyPopper, description: 'Celebrations galore' },
  { value: 'cozy', label: 'Cozy Mode', icon: Sofa, description: 'Warm and intimate' },
];

const RadioSelector = ({ value, onChange }: RadioSelectorProps) => {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium text-foreground">Choose your experience mode</Label>
      <RadioGroup value={value} onValueChange={onChange} className="grid grid-cols-2 gap-3">
        {options.map((option) => {
          const IconComponent = option.icon;
          return (
            <div key={option.value}>
              <RadioGroupItem
                value={option.value}
                id={option.value}
                className="peer sr-only"
              />
              <Label
                htmlFor={option.value}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-rose-200 bg-white/50 cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-rose-50 hover:bg-rose-50/50"
              >
                <IconComponent className="w-6 h-6 text-primary" strokeWidth={1.5} />
                <span className="font-medium text-sm text-foreground">{option.label}</span>
                <span className="text-xs text-muted-foreground text-center">{option.description}</span>
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default RadioSelector;
