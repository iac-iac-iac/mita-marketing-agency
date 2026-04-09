import { useEffect, useRef, useCallback } from 'react';

/**
 * Хук для scroll-reveal анимации массива элементов
 * Используется вместо вызова useScrollReveal() внутри .map()
 * (что запрещено правилами React Hooks)
 */
export function useScrollRevealMulti<T extends HTMLElement>(count: number) {
  const refs = useRef<(T | null)[]>([]);

  const setRef = useCallback(
    (index: number) => {
      return (el: T | null) => {
        refs.current[index] = el;
      };
    },
    [count]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    refs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return { refs: refs.current, setRef };
}
