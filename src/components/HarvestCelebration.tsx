import { useState, useEffect, memo } from 'react';
import { X } from 'lucide-react';
import harvestGraphic from '@/assets/50th-harvest-graphic.png';

// Ultra-lightweight CSS-only falling elements for zero lag
const GoldenStar = memo(({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <defs>
      <linearGradient id="starGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFE4B5" />
        <stop offset="50%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#B8860B" />
      </linearGradient>
    </defs>
    <path d="M10 0 L12.5 7 L20 7.5 L14 12.5 L16 20 L10 15.5 L4 20 L6 12.5 L0 7.5 L7.5 7 Z" fill="url(#starGold)" />
  </svg>
));

const CelestialCross = memo(({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="crossGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFE4B5" />
        <stop offset="50%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#B8860B" />
      </linearGradient>
    </defs>
    <rect x="10" y="2" width="4" height="20" rx="1" fill="url(#crossGold)" />
    <rect x="4" y="6" width="16" height="4" rx="1" fill="url(#crossGold)" />
  </svg>
));

const GoldenWheat = memo(({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size * 1.4} viewBox="0 0 28 40" fill="none">
    <defs>
      <linearGradient id="wheatGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFE4B5" />
        <stop offset="40%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#B8860B" />
      </linearGradient>
    </defs>
    <path d="M14 40 L14 18" stroke="url(#wheatGold)" strokeWidth="1.5" />
    <ellipse cx="14" cy="8" rx="3" ry="5" fill="url(#wheatGold)" />
    <ellipse cx="9" cy="13" rx="2.5" ry="4" fill="url(#wheatGold)" transform="rotate(-20 9 13)" />
    <ellipse cx="19" cy="13" rx="2.5" ry="4" fill="url(#wheatGold)" transform="rotate(20 19 13)" />
    <ellipse cx="7" cy="20" rx="2" ry="3" fill="url(#wheatGold)" transform="rotate(-30 7 20)" />
    <ellipse cx="21" cy="20" rx="2" ry="3" fill="url(#wheatGold)" transform="rotate(30 21 20)" />
  </svg>
));

const GoldenDove = memo(({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size * 0.8} viewBox="0 0 26 20" fill="none">
    <defs>
      <linearGradient id="doveGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="30%" stopColor="#FFE4B5" />
        <stop offset="70%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#B8860B" />
      </linearGradient>
    </defs>
    <ellipse cx="13" cy="13" rx="5" ry="4" fill="url(#doveGold)" />
    <circle cx="18" cy="9" r="3" fill="url(#doveGold)" />
    <path d="M21 9 L24 8.5 L21 10" fill="#D4AF37" />
    <path d="M7 11 Q2 6 5 2 Q9 5 12 9 Q9 13 7 11" fill="url(#doveGold)" />
    <circle cx="19" cy="8.5" r="0.6" fill="#8B6914" />
  </svg>
));

GoldenStar.displayName = 'GoldenStar';
CelestialCross.displayName = 'CelestialCross';
GoldenWheat.displayName = 'GoldenWheat';
GoldenDove.displayName = 'GoldenDove';

// CSS-only falling element - no Framer Motion for zero lag
const FallingElement = memo(({ 
  children, 
  delay, 
  duration, 
  startX 
}: { 
  children: React.ReactNode; 
  delay: number; 
  duration: number; 
  startX: number;
}) => (
  <div
    className="absolute animate-fall opacity-0"
    style={{
      left: `${startX}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
    }}
  >
    {children}
  </div>
));

FallingElement.displayName = 'FallingElement';

const HarvestCelebration = memo(() => {
  const [showPopup, setShowPopup] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [badgeDismissed, setBadgeDismissed] = useState(false);

  useEffect(() => {
    // Show badge immediately
    setShowBadge(true);
    
    // Show popup after brief delay
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);

  const handleDismissBadge = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowBadge(false);
    setBadgeDismissed(true);
  };

  const handleRestoreBadge = () => {
    setShowBadge(true);
    setBadgeDismissed(false);
  };

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleJoinCelebration = () => {
    setShowPopup(false);
    sessionStorage.setItem('harvestCelebrationSeen', 'true');
    const liveSection = document.getElementById('live');
    if (liveSection) {
      liveSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreSite = () => {
    setShowPopup(false);
    sessionStorage.setItem('harvestCelebrationSeen', 'true');
  };

  // Pre-computed falling elements - only 6 for performance
  const fallingElements = [
    { id: 1, Component: GoldenStar, x: 10, delay: 0, duration: 18, size: 16 },
    { id: 2, Component: GoldenWheat, x: 25, delay: 3, duration: 22, size: 20 },
    { id: 3, Component: CelestialCross, x: 45, delay: 6, duration: 20, size: 18 },
    { id: 4, Component: GoldenDove, x: 65, delay: 2, duration: 24, size: 22 },
    { id: 5, Component: GoldenStar, x: 80, delay: 8, duration: 19, size: 14 },
    { id: 6, Component: GoldenWheat, x: 92, delay: 5, duration: 21, size: 18 },
  ];

  return (
    <>
      {/* CSS-only Falling Elements - Zero JS animation overhead */}
      <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
        {fallingElements.map((el) => (
          <FallingElement
            key={el.id}
            delay={el.delay}
            duration={el.duration}
            startX={el.x}
          >
            <el.Component size={el.size} />
          </FallingElement>
        ))}
      </div>

      {/* Floating Mini Badge - CSS animations only */}
      {showBadge && (
        <div
          className="fixed top-24 right-3 md:right-4 z-[90] animate-fade-in cursor-pointer"
          onClick={handleOpenPopup}
        >
          <div 
            className="relative px-2.5 py-1.5 md:px-4 md:py-2.5 rounded-full backdrop-blur-xl border border-gold/50 overflow-hidden"
            style={{ 
              background: 'linear-gradient(135deg, rgba(212,175,55,0.25), rgba(139,69,19,0.2))',
              boxShadow: '0 6px 24px rgba(212,175,55,0.25)'
            }}
          >
            <div className="flex items-center gap-1.5 md:gap-2 relative z-10">
              <GoldenStar size={12} />
              <span 
                className="text-[9px] md:text-xs font-bold tracking-wider uppercase"
                style={{ 
                  fontFamily: 'Outfit, sans-serif',
                  background: 'linear-gradient(135deg, #D4AF37, #FFE4B5, #D4AF37)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Live
              </span>
              <div
                className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500 animate-pulse"
                style={{ boxShadow: '0 0 6px rgba(34,197,94,0.8)' }}
              />
              
              <button
                onClick={handleDismissBadge}
                className="ml-0.5 p-0.5 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Dismiss harvest badge"
              >
                <X className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-gold/80" />
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Restore Badge Button */}
      {badgeDismissed && !showBadge && (
        <button
          onClick={handleRestoreBadge}
          className="fixed top-24 right-3 md:right-4 z-[90] w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center backdrop-blur-xl border border-gold/40 cursor-pointer animate-fade-in hover:scale-110 transition-transform"
          style={{ 
            background: 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(139,69,19,0.15))',
            boxShadow: '0 4px 16px rgba(212,175,55,0.2)'
          }}
          aria-label="Show harvest badge"
        >
          <GoldenStar size={14} />
        </button>
      )}

      {/* Popup Modal - CSS animations, no Framer Motion */}
      {showPopup && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-3 md:p-4 animate-fade-in"
          onClick={handleExploreSite}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(10,22,40,0.92) 0%, rgba(15,28,50,0.95) 50%, rgba(5,15,30,0.93) 100%)',
              backdropFilter: 'blur(20px)',
            }}
          />
          
          {/* Radial glow */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.15) 0%, transparent 60%)'
            }}
          />
          
          {/* Modal Content */}
          <div
            className="relative max-w-sm md:max-w-lg w-full rounded-2xl md:rounded-3xl overflow-hidden mx-2 animate-scale-in"
            style={{
              background: 'linear-gradient(165deg, rgba(20,35,70,0.95), rgba(10,20,45,0.98))',
              boxShadow: '0 25px 80px rgba(0,0,0,0.4), 0 0 80px rgba(212,175,55,0.12)',
              border: '1px solid rgba(212,175,55,0.3)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleExploreSite}
              className="absolute top-3 right-3 md:top-4 md:right-4 z-20 p-2 md:p-2.5 rounded-full backdrop-blur-sm transition-all hover:scale-110"
              style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.3), rgba(184,134,11,0.2))',
                border: '1px solid rgba(212,175,55,0.4)',
              }}
            >
              <X className="w-4 h-4 md:w-5 md:h-5 text-gold" />
            </button>

            {/* Content */}
            <div className="relative z-10 p-5 sm:p-6 md:p-8 text-center">
              {/* Harvest Graphic */}
              <div className="flex justify-center mb-5">
                <img 
                  src={harvestGraphic}
                  alt="50th Adult Harvest Thanksgiving Service"
                  className="w-full max-w-xs sm:max-w-sm h-auto"
                  style={{
                    filter: 'drop-shadow(0 0 30px rgba(212,175,55,0.4))'
                  }}
                />
              </div>

              {/* Golden divider */}
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="h-[2px] w-14 bg-gradient-to-r from-transparent via-gold/60 to-gold/80" />
                <GoldenStar size={20} />
                <div className="h-[2px] w-14 bg-gradient-to-l from-transparent via-gold/60 to-gold/80" />
              </div>

              {/* Parish name */}
              <p
                className="text-sm sm:text-base uppercase tracking-[0.2em] mb-2"
                style={{ 
                  fontFamily: 'Outfit, sans-serif',
                  color: 'rgba(212,175,55,0.9)'
                }}
              >
                Celestial Church of Christ
              </p>
              
              <p
                className="text-xs sm:text-sm tracking-widest mb-5"
                style={{ 
                  fontFamily: 'Outfit, sans-serif',
                  color: 'rgba(255,255,255,0.6)'
                }}
              >
                AKOKA PARISH GLADE CATHEDRAL
              </p>

              {/* Message */}
              <p
                className="text-white/80 leading-relaxed mb-7 text-sm sm:text-base max-w-md mx-auto"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                Today we celebrate God's faithfulness and abundant blessings. 
                May this harvest season bring you overflowing joy, divine peace, and supernatural favor.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-row gap-3 justify-center items-center">
                {/* Watch Live Button */}
                <button
                  onClick={handleJoinCelebration}
                  className="relative px-5 py-2.5 rounded-full font-semibold text-xs uppercase tracking-wider overflow-hidden flex items-center gap-2 hover:scale-105 transition-transform"
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    background: 'linear-gradient(135deg, #DC2626 0%, #EF4444 50%, #B91C1C 100%)',
                    boxShadow: '0 6px 24px rgba(220,38,38,0.5)'
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full bg-white animate-pulse"
                    style={{ boxShadow: '0 0 8px rgba(255,255,255,0.8)' }}
                  />
                  <span className="relative z-10 text-white font-bold">
                    Watch Live
                  </span>
                </button>

                {/* Explore Button */}
                <button
                  onClick={handleExploreSite}
                  className="relative px-5 py-2.5 rounded-full font-semibold text-xs uppercase tracking-wider overflow-hidden hover:scale-105 transition-transform"
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    background: 'rgba(212,175,55,0.1)',
                    border: '1.5px solid rgba(212,175,55,0.6)',
                    boxShadow: '0 4px 16px rgba(212,175,55,0.15)'
                  }}
                >
                  <span 
                    className="relative z-10 font-bold"
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37, #FFE4B5)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    Explore
                  </span>
                </button>
              </div>

              {/* Bottom decorative elements */}
              <div className="mt-7 flex justify-center items-center gap-4">
                <GoldenWheat size={22} />
                <CelestialCross size={18} />
                <GoldenDove size={24} />
                <CelestialCross size={18} />
                <GoldenWheat size={22} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

HarvestCelebration.displayName = 'HarvestCelebration';

export default HarvestCelebration;
