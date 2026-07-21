import React, { useEffect, useRef, useState } from 'react';

export const ScrollReveal = ({
  children,
  className = '',
  animation = 'fade-up', // 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'fade'
  delay = 0,
  duration = 700,
  threshold = 0.1,
  once = true
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [threshold, once]);

  // Transform styles based on animation state
  const getInitialTransform = () => {
    switch (animation) {
      case 'fade-up':
        return 'translateY(36px)';
      case 'fade-down':
        return 'translateY(-36px)';
      case 'fade-left':
        return 'translateX(40px)';
      case 'fade-right':
        return 'translateX(-40px)';
      case 'zoom-in':
        return 'scale(0.92) translateY(20px)';
      case 'fade':
      default:
        return 'translateY(0)';
    }
  };

  const style = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0) translateX(0) scale(1)' : getInitialTransform(),
    transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
    transitionDelay: `${delay}ms`,
    willChange: 'opacity, transform'
  };

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
};
