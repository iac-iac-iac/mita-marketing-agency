'use client';

import { useRef, useEffect, useState } from 'react';

interface VideoWithPosterProps {
  src: string;
  poster: string;
  alt?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
}

/**
 * Видео с ленивой загрузкой и poster
 * Загружается только когда появляется в viewport
 */
export default function VideoWithPoster({
  src,
  poster,
  alt = 'Video',
  className = '',
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
}: VideoWithPosterProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1, // Загружаем когда 10% видео видно
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      poster={poster}
      autoPlay={autoPlay && isVisible}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      onLoadedData={() => setIsLoaded(true)}
    >
      {isVisible && <source src={src} type="video/mp4" />}
      {alt}
    </video>
  );
}
