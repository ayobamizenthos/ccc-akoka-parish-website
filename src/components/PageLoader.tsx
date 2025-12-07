import { memo, useState, useEffect } from "react";
import akokaGladeLogo from "@/assets/akoka-glade-logo.png";

const FIRST_VISIT_KEY = "ccc_glade_first_visit_complete";

// Ultra-fast CSS-only page loader - no Framer Motion
const PageLoader = memo(() => {
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== "undefined") {
      return !sessionStorage.getItem(FIRST_VISIT_KEY);
    }
    return true;
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) return;
    
    // Fast progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 20;
      });
    }, 60);
    
    // Quick load - 800ms total for snappy feel
    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem(FIRST_VISIT_KEY, "true");
    }, 800);
    
    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden animate-fade-in"
      style={{
        background: "linear-gradient(180deg, #050a14 0%, #0a1628 50%, #050a14 100%)",
      }}
    >
      {/* Simple ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px]"
        style={{
          background: "radial-gradient(circle, rgba(212,175,55,0.18) 0%, transparent 60%)",
        }}
      />
      
      {/* Logo */}
      <div className="relative z-10 animate-fade-in">
        <img
          src={akokaGladeLogo}
          alt="Akoka Parish Glade Cathedral"
          className="h-20 sm:h-24 w-auto object-contain"
          style={{
            filter: "drop-shadow(0 0 25px rgba(212,175,55,0.4))",
          }}
        />
      </div>
      
      {/* Progress section */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-40 sm:w-48">
        <p
          className="text-center mb-2.5 text-[10px] sm:text-xs tracking-[0.2em] uppercase font-medium text-gold/80"
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          Welcome
        </p>
        
        {/* Simple progress bar */}
        <div className="h-1 rounded-full overflow-hidden bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-gold to-gold-light transition-all duration-100"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
});

PageLoader.displayName = 'PageLoader';

export default PageLoader;
