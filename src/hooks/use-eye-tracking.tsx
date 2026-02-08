import { useState, useEffect, useCallback, RefObject, useMemo, useRef } from 'react';

interface EyePosition {
  x: number;
  y: number;
}

interface UseEyeTrackingOptions {
  maxDistance?: number;
  smoothing?: number;
}

// Check if device is mobile - cached for performance
const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 767px)').matches;
};

export function useEyeTracking(
  elementRef: RefObject<HTMLElement>,
  options: UseEyeTrackingOptions = {}
) {
  const { maxDistance = 8, smoothing = 0.15 } = options;
  const [eyePosition, setEyePosition] = useState<EyePosition>({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState<EyePosition>({ x: 0, y: 0 });
  const isMobile = useMemo(() => isMobileDevice(), []);
  const rafId = useRef<number>(0);

  const calculateEyePosition = useCallback(
    (clientX: number, clientY: number) => {
      if (!elementRef.current) return { x: 0, y: 0 };

      const rect = elementRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance === 0) return { x: 0, y: 0 };

      const normalizedDistance = Math.min(distance / 200, 1);
      const scaledDistance = normalizedDistance * maxDistance;

      return {
        x: (deltaX / distance) * scaledDistance,
        y: (deltaY / distance) * scaledDistance,
      };
    },
    [elementRef, maxDistance]
  );

  useEffect(() => {
    // Skip continuous tracking on mobile for performance
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = calculateEyePosition(e.clientX, e.clientY);
      setTargetPosition(newPosition);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const newPosition = calculateEyePosition(touch.clientX, touch.clientY);
        setTargetPosition(newPosition);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [calculateEyePosition, isMobile]);

  // Smooth interpolation - skip on mobile
  useEffect(() => {
    if (isMobile) return;

    const animate = () => {
      setEyePosition((prev) => ({
        x: prev.x + (targetPosition.x - prev.x) * smoothing,
        y: prev.y + (targetPosition.y - prev.y) * smoothing,
      }));
      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, [targetPosition, smoothing, isMobile]);

  return eyePosition;
}

export function useGlobalMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isMobile = useMemo(() => isMobileDevice(), []);

  useEffect(() => {
    // Skip on mobile for performance - touch events handle position differently
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  return position;
}
