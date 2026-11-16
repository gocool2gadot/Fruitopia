'use client';

import React, { useRef, useState, useEffect } from 'react';

interface MotionImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  parallaxSpeed?: number;
  enableTilt?: boolean;
  priority?: boolean;
}

export default function MotionImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  parallaxSpeed = 0.18,
  enableTilt = true,
}: MotionImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top < windowHeight && rect.bottom > 0) {
              const centerDiff = (rect.top + rect.height / 2) - windowHeight / 2;
              setOffsetY(centerDiff * parallaxSpeed);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, [parallaxSpeed]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden group ${containerClassName}`}
      style={{ perspective: '800px' }}
    >
      <div
        className="w-full h-full will-change-transform transition-transform duration-300 ease-out"
        style={{
          transform: `translateY(${offsetY}px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(1.15)`,
        }}
      >
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-105 ${className}`}
          loading="lazy"
        />
      </div>
    </div>
  );
}
