import { memo } from 'react';

// Ultra-lightweight celestial effects - Maximum performance
const CelestialEffects = memo(() => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]">
      {/* Simple static divine glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px]"
        style={{
          background: "radial-gradient(ellipse at center top, rgba(212,175,55,0.15) 0%, transparent 60%)",
        }}
      />
      
      {/* Minimal light rays - Static */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute top-0 left-1/2 origin-top opacity-[0.08]"
          style={{
            transform: `translateX(-50%) rotate(${-15 + i * 15}deg)`,
            width: '60px',
            height: '80vh',
            background: 'linear-gradient(180deg, rgba(212,175,55,0.3) 0%, transparent 80%)',
          }}
        />
      ))}
    </div>
  );
});

CelestialEffects.displayName = 'CelestialEffects';

export default CelestialEffects;
