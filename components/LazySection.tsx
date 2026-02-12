import React, { useEffect, useRef, useState } from 'react';

interface LazySectionProps {
  children: React.ReactNode;
  rootMargin?: string;
  placeholderClassName?: string;
  id?: string;
}

const LazySection: React.FC<LazySectionProps> = ({
  children,
  rootMargin = '800px',
  placeholderClassName = 'min-h-[200px]',
  id,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={containerRef} id={id}>
      {isVisible ? children : <div className={placeholderClassName} />}
    </div>
  );
};

export default LazySection;
