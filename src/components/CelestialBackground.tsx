import { memo } from 'react';

// Ultra-lightweight Celestial Background - Maximum Performance
const CelestialBackground = memo(() => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* Static Divine Light Rays - No animations */}
      <div className="absolute inset-0">
        {[0, 1, 2].map((i) => (
          <div
            key={`ray-${i}`}
            className="absolute top-0 left-1/2 origin-top opacity-40"
            style={{
              width: '2px',
              height: '100vh',
              background: `linear-gradient(180deg, 
                rgba(212,175,55,${0.1 - i * 0.02}) 0%, 
                transparent 50%)`,
              transform: `translateX(-50%) rotate(${-20 + i * 20}deg)`,
            }}
          />
        ))}
      </div>

      {/* Static Stars - CSS only, no JS */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute rounded-full"
          style={{
            width: 2,
            height: 2,
            left: `${(i * 13) % 100}%`,
            top: `${(i * 11) % 80}%`,
            background: 'rgba(212,175,55,0.4)',
          }}
        />
      ))}

      {/* Static Sacred Geometry Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(212,175,55,0.3) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Static Vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10,22,40,0.08) 100%)',
        }}
      />
    </div>
  );
});

CelestialBackground.displayName = 'CelestialBackground';

export default CelestialBackground;
