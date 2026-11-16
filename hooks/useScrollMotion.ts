'use client';

import { useState, useEffect, useRef } from 'react';

export function useScrollMotion(speed = 0.2, direction: 'up' | 'down' = 'down') {
  const ref = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            // Calculate how far the element is relative to the center of the viewport
            const elementCenter = rect.top + rect.height / 2;
            const viewportCenter = windowHeight / 2;
            const distanceFromCenter = elementCenter - viewportCenter;
            
            const dirMultiplier = direction === 'down' ? 1 : -1;
            const calculatedOffset = distanceFromCenter * speed * dirMultiplier;
            setOffsetY(calculatedOffset);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, direction]);

  return { ref, offsetY };
}
