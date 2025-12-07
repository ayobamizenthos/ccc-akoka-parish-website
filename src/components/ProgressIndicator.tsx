import { memo, useEffect, useState } from "react";

// Ultra-lightweight progress indicator - CSS only, no Framer Motion
const ProgressIndicator = memo(() => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-[3px] z-[60] transition-all duration-100"
      style={{ 
        width: `${progress}%`,
        background: `linear-gradient(90deg, 
          hsl(var(--primary)) 0%, 
          hsl(var(--accent)) 50%, 
          hsl(var(--gold)) 100%
        )`,
        boxShadow: '0 0 8px hsl(var(--gold) / 0.5)',
      }}
    />
  );
});

ProgressIndicator.displayName = 'ProgressIndicator';

export default ProgressIndicator;
