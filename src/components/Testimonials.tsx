import { memo, useRef, useState } from 'react';
import { Quote, Star, Heart, Users, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Deaconess Adebimpe Oladele",
    role: "Member since 2018",
    quote: "The teachings of Sup. Evang. Ademusire have transformed my understanding of faith. The atmosphere here breathes peace—every worry fades when I enter this sanctuary.",
    highlight: "Spiritual Growth",
  },
  {
    id: 2,
    name: "Bro. Emmanuel Taiwo",
    role: "Youth Leader",
    quote: "Unlike many churches, there is ZERO extortion here. The love and genuine care from the congregation is overwhelming. My problems found solutions through prayer.",
    highlight: "Genuine Love",
  },
  {
    id: 3,
    name: "Sis. Folake Adekunle",
    role: "Choir Member",
    quote: "The beauty of this cathedral sets it apart from any other Celestial Church. The hospitality, the manners, the respect—it's a true house of God.",
    highlight: "Sacred Beauty",
  },
  {
    id: 4,
    name: "Evang. Michael Adeyemi",
    role: "Member since 2015",
    quote: "My faith has grown exponentially since joining. The mode of worship here promotes a closer relationship with God. This is truly the best place of worship.",
    highlight: "Deeper Faith",
  },
  {
    id: 5,
    name: "Sis. Grace Oluwaseun",
    role: "Women's Fellowship",
    quote: "The welcoming spirit here is unmatched. From my first visit, I felt at home. The prophet's teachings have brought divine promotion to my family.",
    highlight: "Divine Blessings",
  },
  {
    id: 6,
    name: "Bro. David Okonkwo",
    role: "New Member",
    quote: "I've visited many churches, but none compares to the peace I feel here. The total absence of pressure or manipulation—just pure worship and fellowship.",
    highlight: "Pure Worship",
  },
];

const Testimonials = memo(() => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const scrollAmount = 340;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section 
      className="py-12 md:py-20 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--secondary)/0.3) 50%, hsl(var(--background)) 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <div 
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-4"
            style={{
              background: 'linear-gradient(135deg, rgba(212,175,55,0.12), rgba(212,175,55,0.05))',
              border: '1px solid rgba(212,175,55,0.2)',
            }}
          >
            <Heart className="w-3.5 h-3.5 text-gold" fill="currentColor" />
            <span 
              className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-gold"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Testimonials
            </span>
            <Users className="w-3.5 h-3.5 text-gold" />
          </div>
          
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-medium text-foreground mb-3 leading-tight" 
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            What Our{' '}
            <span 
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, #10B981 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Members Say
            </span>
          </h2>
          
          <p 
            className="text-sm md:text-base max-w-lg mx-auto text-muted-foreground"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Hear from our beloved congregation about their spiritual journey with us
          </p>
        </div>

        {/* Horizontal Scrollable Testimonials */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full hidden md:flex items-center justify-center hover:scale-105 transition-transform"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
              border: '1px solid rgba(212,175,55,0.2)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            }}
          >
            <ChevronLeft className="w-5 h-5 text-primary" />
          </button>
          
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full hidden md:flex items-center justify-center hover:scale-105 transition-transform"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
              border: '1px solid rgba(212,175,55,0.2)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            }}
          >
            <ChevronRight className="w-5 h-5 text-primary" />
          </button>

          {/* Gradient Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Scrollable Container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 md:gap-5 overflow-x-auto pb-4 scrollbar-hide px-4 md:px-12"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="group relative flex-shrink-0 w-[300px] md:w-[340px] hover:-translate-y-2 transition-transform duration-300"
              >
                {/* Premium Glass Card */}
                <div 
                  className="relative h-full p-5 md:p-6 rounded-2xl overflow-hidden"
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
                    border: '1px solid rgba(212,175,55,0.15)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.06)',
                  }}
                >
                  {/* Quote icon */}
                  <div 
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      background: 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.08))',
                      border: '1px solid rgba(212,175,55,0.15)',
                    }}
                  >
                    <Quote className="w-4 h-4 text-gold" />
                  </div>

                  {/* Highlight badge */}
                  <span 
                    className="inline-block px-3 py-1.5 rounded-full text-[9px] font-bold tracking-wider uppercase mb-3"
                    style={{
                      background: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(16,185,129,0.05))',
                      color: '#10B981',
                      fontFamily: 'Outfit, sans-serif',
                      border: '1px solid rgba(16,185,129,0.15)',
                    }}
                  >
                    {testimonial.highlight}
                  </span>

                  {/* Quote text */}
                  <p 
                    className="text-sm text-foreground/80 mb-5 leading-relaxed line-clamp-3"
                    style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '15px' }}
                  >
                    "{testimonial.quote}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{
                        background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary)/0.8))',
                        color: 'white',
                        fontFamily: 'Outfit, sans-serif',
                        boxShadow: '0 4px 12px rgba(45,106,108,0.3)',
                      }}
                    >
                      {testimonial.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </div>
                    <div>
                      <p 
                        className="text-sm font-semibold text-foreground"
                        style={{ fontFamily: 'Outfit, sans-serif' }}
                      >
                        {testimonial.name}
                      </p>
                      <p 
                        className="text-[10px] text-muted-foreground"
                        style={{ fontFamily: 'Outfit, sans-serif' }}
                      >
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="absolute top-5 right-5 flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-gold" fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

Testimonials.displayName = 'Testimonials';

export default Testimonials;
