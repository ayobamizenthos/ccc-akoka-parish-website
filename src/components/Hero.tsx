import { useEffect, useState, memo } from "react";
import { Play, Calendar, Sparkles } from "lucide-react";
import gladeExterior from "@/assets/glade-exterior-new.png";

// Service schedule for live detection
const SERVICE_SCHEDULE = [
  { day: 0, start: 10, end: 13, name: "Sunday Service" },
  { day: 3, start: 17, end: 19, name: "Wednesday Bible Study" },
  { day: 5, start: 18, end: 21, name: "Friday Vigil" },
];

const Hero = memo(() => {
  const [isHarvestLive] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [isLive, setIsLive] = useState(false);

  // Check if currently live
  useEffect(() => {
    const checkIfLive = () => {
      const now = new Date();
      const currentDay = now.getDay();
      const currentHour = now.getHours();
      const liveService = SERVICE_SCHEDULE.find(
        (service) => service.day === currentDay && currentHour >= service.start && currentHour < service.end
      );
      setIsLive(!!liveService);
    };
    checkIfLive();
    const interval = setInterval(checkIfLive, 60000);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToContent = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToLive = () => {
    document.getElementById('live')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full min-h-[100svh] overflow-hidden flex items-center justify-center">
      {/* Background Image - Static, eager loading for instant display */}
      <div className="absolute inset-0">
        <img 
          src={gladeExterior} 
          alt="Glade Cathedral" 
          className="absolute inset-0 w-full h-full object-cover object-center" 
          loading="eager"
          fetchPriority="high"
        />
        
        {/* Light overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
        
        {/* Golden accent at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1/4" style={{
          background: 'linear-gradient(to top, rgba(139,90,43,0.25) 0%, transparent 100%)'
        }} />
      </div>

      {/* Content - CSS transitions only */}
      <div 
        className={`relative z-10 w-full px-4 sm:px-6 pt-20 sm:pt-16 md:pt-12 pb-6 md:pb-4 transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="mb-6 sm:mb-8">
            <span 
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase bg-black/40 backdrop-blur-xl border border-white/30 text-white shadow-lg" 
              style={{ fontFamily: 'Outfit, sans-serif', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              Celestial Church of Christ
              <span className="hidden sm:inline">• Akoka Parish</span>
            </span>
          </div>

          {/* Title */}
          <div className="relative mb-2">
            <h1>
              <span
                className="block text-[clamp(4rem,20vw,14rem)] leading-[0.85] font-black tracking-[-0.03em]"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  background: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.9) 40%, rgba(212,175,55,0.95) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                GLADE
              </span>
            </h1>
          </div>

          <div className="mt-0">
            <span 
              className="block text-[clamp(1rem,5vw,4.5rem)] leading-[1.1] font-medium tracking-[0.3em] sm:tracking-[0.5em] text-white/85" 
              style={{ fontFamily: 'Cinzel, serif', textShadow: '0 4px 40px rgba(0,0,0,0.5)' }}
            >
              CATHEDRAL
            </span>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 my-5 sm:my-6">
            <div className="h-px w-12 sm:w-24 bg-gradient-to-r from-transparent via-gold/60 to-gold" />
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rotate-45 bg-gold/80 shadow-lg shadow-gold/50" />
            <div className="h-px w-12 sm:w-24 bg-gradient-to-l from-transparent via-gold/60 to-gold" />
          </div>

          {/* Tagline */}
          <p 
            className="text-white/75 text-[clamp(0.95rem,3.5vw,1.8rem)] max-w-lg sm:max-w-xl mx-auto mb-6 sm:mb-8 font-light tracking-wide" 
            style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}
          >
            "The Last Ark of Salvation"
          </p>

          {/* Harvest Live Badge */}
          {isHarvestLive && (
            <div className="mb-6 sm:mb-8">
              <div 
                className="inline-flex items-center gap-3 px-5 sm:px-7 py-3 sm:py-4 rounded-2xl bg-black/50 backdrop-blur-xl border border-gold/50"
                style={{ boxShadow: '0 0 30px rgba(212,175,55,0.3)' }}
              >
                {/* Live Dot */}
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                </div>
                
                <div className="flex flex-col items-start">
                  <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-gold" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    50th Adult Harvest
                  </span>
                  <span className="text-sm sm:text-base font-bold tracking-wide text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Happening Now
                  </span>
                </div>
                
                <Sparkles className="w-5 h-5 text-gold" strokeWidth={1.5} />
              </div>
              
              {/* Simple Separator */}
              <div className="flex items-center justify-center gap-3 mt-5 sm:mt-6">
                <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent to-gold/60" />
                <div className="w-2 h-2 rounded-full bg-gold/60" />
                <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-l from-transparent to-gold/60" />
              </div>
            </div>
          )}

          {/* CTA Buttons - Pure CSS hover effects */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button 
              onClick={scrollToLive}
              className="group relative w-full sm:w-auto flex items-center justify-center gap-2.5 py-3.5 px-8 sm:px-12 rounded-full overflow-hidden bg-gradient-to-r from-gold via-gold-light to-gold transition-transform active:scale-[0.98] hover:scale-[1.02]"
            >
              {isLive && (
                <div className="relative mr-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" style={{ boxShadow: '0 0 8px rgba(239,68,68,0.8)' }} />
                </div>
              )}
              
              <Play className="relative w-4 h-4 fill-secondary text-secondary" />
              <span className="relative font-bold text-sm tracking-wide text-secondary uppercase" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {isLive ? "Watch Live" : "Watch Service"}
              </span>
            </button>

            <button 
              onClick={scrollToContent}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 py-3.5 px-8 sm:px-10 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white transition-all hover:bg-white/20 active:scale-[0.98]"
            >
              <Calendar className="w-4 h-4" />
              <span className="font-semibold text-sm tracking-wide" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Service Times
              </span>
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2">
            <button 
              onClick={scrollToContent} 
              className="flex flex-col items-center gap-2 text-white/60 hover:text-white/80 transition-colors" 
              aria-label="Scroll down"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] font-medium" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Scroll
              </span>
              <div className="w-5 h-8 rounded-full border border-white/40 flex items-start justify-center p-1">
                <div className="w-1 h-2 rounded-full bg-white/60 animate-pulse" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
