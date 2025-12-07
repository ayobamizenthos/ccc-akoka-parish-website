import { useRef, memo } from "react";
import AnimatedCounter from "./AnimatedCounter";
import akokaInterior from "@/assets/akoka-interior-2.jpg";

// Optimized inline SVG icons - no external imports for faster loading
const TargetIcon = memo(() => (
  <svg className="w-5 h-5 md:w-6 md:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
));

const EyeIcon = memo(() => (
  <svg className="w-5 h-5 md:w-6 md:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
));

const HeartIcon = memo(() => (
  <svg className="w-5 h-5 md:w-6 md:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
));

const SparklesIcon = memo(() => (
  <svg className="w-4 h-4 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
  </svg>
));

const ChurchIcon = memo(() => (
  <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m18 7 4 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9l4-2"/><path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4"/><path d="M18 22V5l-6-3-6 3v17"/><path d="M12 7v5"/><path d="M10 9h4"/>
  </svg>
));

const UsersIcon = memo(() => (
  <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
));

const CalendarIcon = memo(() => (
  <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>
  </svg>
));

const ArrowRightIcon = memo(() => (
  <svg className="w-3 h-3 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
));

TargetIcon.displayName = 'TargetIcon';
EyeIcon.displayName = 'EyeIcon';
HeartIcon.displayName = 'HeartIcon';
SparklesIcon.displayName = 'SparklesIcon';
ChurchIcon.displayName = 'ChurchIcon';
UsersIcon.displayName = 'UsersIcon';
CalendarIcon.displayName = 'CalendarIcon';
ArrowRightIcon.displayName = 'ArrowRightIcon';

const Welcome = memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    { label: "Years of Faith", value: 50, suffix: "+", Icon: ChurchIcon, color: "hsl(var(--gold))" },
    { label: "Members", value: 2000, suffix: "+", Icon: UsersIcon, color: "hsl(var(--primary))" },
    { label: "Weekly Services", value: 7, suffix: "", Icon: CalendarIcon, color: "hsl(var(--tertiary))" },
  ];

  const missions = [
    { 
      title: "Our Mission", 
      text: "Leading souls to salvation through worship and fellowship.", 
      Icon: TargetIcon, 
      gradient: "from-primary to-celestial-light"
    },
    { 
      title: "Our Vision", 
      text: "A beacon of hope and divine light touching lives globally.", 
      Icon: EyeIcon, 
      gradient: "from-gold to-gold-bright"
    },
    { 
      title: "Our Values", 
      text: "Faith, holiness, love, unity, and dedicated service.", 
      Icon: HeartIcon, 
      gradient: "from-tertiary to-burgundy-light"
    },
  ];

  return (
    <section 
      ref={sectionRef} 
      id="about" 
      className="py-16 md:py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--background-cream)) 50%, hsl(var(--background)) 100%)',
      }}
    >
      {/* Subtle decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-secondary/5 to-transparent" />
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-gold/5 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />

      <div className="max-w-6xl mx-auto px-5 md:px-8 relative z-10">
        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-14 md:mb-20">
          
          {/* Left: Image */}
          <div className="relative order-2 lg:order-1">
            {/* Glow */}
            <div 
              className="absolute -inset-4 rounded-3xl opacity-30"
              style={{
                background: 'radial-gradient(circle, hsl(var(--gold) / 0.2), transparent 70%)',
                filter: 'blur(30px)',
              }}
            />
            
            {/* Image container */}
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
              <img 
                src={akokaInterior} 
                alt="Glade Cathedral Interior" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent" />
              
              {/* Gold border accent */}
              <div className="absolute inset-0 rounded-2xl md:rounded-3xl border border-gold/20" />
              
              {/* Stats overlay */}
              <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
                <div 
                  className="grid grid-cols-3 gap-2 md:gap-4 p-4 md:p-5 rounded-xl md:rounded-2xl"
                  style={{
                    background: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
                  }}
                >
                  {stats.map((stat, i) => (
                    <div key={i} className="text-center">
                      <div 
                        className="text-xl md:text-3xl font-medium"
                        style={{ 
                          fontFamily: 'Playfair Display, serif',
                          color: stat.color,
                        }}
                      >
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={1500} />
                      </div>
                      <p className="text-[8px] md:text-[10px] uppercase tracking-wider text-muted-foreground font-semibold" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center border border-gold/20">
                <SparklesIcon />
              </div>
              <span 
                className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-gold"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                Welcome
              </span>
            </div>
            
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl font-medium mb-5 text-foreground leading-[1.1]" 
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              A Sanctuary of{' '}
              <span 
                className="relative inline-block"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--gold)) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Divine Presence
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-gold to-transparent" />
              </span>
            </h2>
            
            <p 
              className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8" 
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              At Glade Cathedral, we are committed to spreading the gospel of Jesus Christ. 
              As part of the Celestial Church of Christ, we carry the sacred mission of being the last ark of salvation.
            </p>

            {/* Mission Cards - CSS transitions only */}
            <div className="space-y-3">
              {missions.map((item, index) => (
                <div 
                  key={index}
                  className="group flex items-start gap-4 p-4 rounded-xl bg-card/50 border border-border/50 hover:border-gold/30 hover:bg-card hover:translate-x-1 transition-all duration-200"
                >
                  <div 
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${item.gradient} shadow-lg`}
                  >
                    <item.Icon />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 
                      className="text-sm md:text-base font-medium text-foreground mb-1 flex items-center gap-2" 
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      {item.title}
                      <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">
                        <ArrowRightIcon />
                      </span>
                    </h3>
                    <p 
                      className="text-xs md:text-sm text-muted-foreground leading-relaxed"
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Welcome.displayName = 'Welcome';

export default Welcome;
