import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Confetti {
  id: number;
  x: number;
  color: string;
  size: number;
  rotation: number;
}

const ConfettiBurst = () => {
  const [confetti, setConfetti] = useState<Confetti[]>([]);

  useEffect(() => {
    const colors = [
      'hsl(350, 80%, 60%)',
      'hsl(15, 90%, 65%)',
      'hsl(280, 60%, 80%)',
      'hsl(350, 100%, 86%)',
      'hsl(40, 100%, 70%)',
    ];

    const newConfetti: Confetti[] = [];
    for (let i = 0; i < 50; i++) {
      newConfetti.push({
        id: i,
        x: 50 + (Math.random() - 0.5) * 60,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 10 + 5,
        rotation: Math.random() * 360,
      });
    }
    setConfetti(newConfetti);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute rounded-sm"
          style={{
            left: `${piece.x}%`,
            bottom: '50%',
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
          }}
          initial={{
            y: 0,
            rotate: piece.rotation,
            opacity: 1,
          }}
          animate={{
            y: -window.innerHeight,
            x: (Math.random() - 0.5) * 200,
            rotate: piece.rotation + 720,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random(),
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
};

export default ConfettiBurst;
