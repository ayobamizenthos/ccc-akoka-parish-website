import { Link } from "react-router-dom";
import { sermons } from "@/data/sermons";
import { Play, ArrowRight, Video, Clock, Book, Sparkles } from "lucide-react";
import LazyImage from "./LazyImage";
import { useRef, useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const SermonsGrid = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();
  
  const recentSermons = sermons.slice(0, 3);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Intersection observer for visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const renderSermonCard = (sermon: typeof recentSermons[0], index: number) => (
    <div
      key={sermon.id}
      className={`h-full transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="block h-full relative group hover:-translate-y-3 transition-transform duration-300">
        {/* Border gradient */}
        <div 
          className="absolute -inset-[1px] rounded-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.4), rgba(16,185,129,0.2), rgba(212,175,55,0.3))',
          }}
        />
        
        {/* Main card */}
        <div 
          className="relative h-full rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(165deg, rgba(255,255,255,0.98), rgba(255,255,255,0.92))',
            boxShadow: '0 25px 80px rgba(0,0,0,0.08)',
          }}
        >
          {/* Thumbnail container */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <LazyImage
              src={sermon.thumbnail}
              alt={sermon.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Gradient overlay */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(0deg, rgba(10,22,40,0.85) 0%, rgba(10,22,40,0.4) 40%, transparent 100%)',
              }}
            />
            
            {/* Play button */}
            <Link 
              to={`/sermon/${sermon.id}`}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                style={{
                  background: 'linear-gradient(135deg, #A07C32, #FFF8E1, #D4AF37)',
                  boxShadow: '0 12px 40px rgba(212,175,55,0.5)',
                }}
              >
                <Play className="w-5 h-5 text-[#0a1628] ml-0.5" fill="currentColor" />
              </div>
            </Link>
            
            {/* Latest Badge */}
            {index === 0 && (
              <div className="absolute top-4 left-4">
                <span 
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-[9px] font-bold tracking-[0.15em] uppercase rounded-full"
                  style={{ 
                    fontFamily: 'Outfit, sans-serif',
                    background: 'linear-gradient(135deg, #A07C32, #FFF8E1, #D4AF37)',
                    color: '#0a1628',
                    boxShadow: '0 8px 25px rgba(212,175,55,0.4)',
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0a1628] animate-pulse" />
                  Latest
                </span>
              </div>
            )}

            {/* Duration badge */}
            <div className="absolute bottom-4 right-4">
              <div 
                className="flex items-center gap-1.5 px-3 py-1.5 backdrop-blur-md rounded-lg"
                style={{
                  background: 'rgba(10,22,40,0.8)',
                  border: '1px solid rgba(212,175,55,0.3)',
                }}
              >
                <Clock className="w-3 h-3 text-gold" />
                <span 
                  className="text-[10px] font-semibold text-white"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  45:00
                </span>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6 md:p-7 relative">
            {/* Bible reference */}
            <div className="flex items-center gap-2 mb-3">
              <div 
                className="w-6 h-6 rounded-lg flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))',
                }}
              >
                <Book className="w-3 h-3 text-gold" />
              </div>
              <span 
                className="text-[10px] font-semibold tracking-[0.15em] uppercase text-gold"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                {sermon.bibleReference}
              </span>
            </div>
            
            {/* Title */}
            <h3 
              className="text-lg md:text-xl font-medium mb-3 line-clamp-2 text-foreground group-hover:text-primary transition-colors duration-300" 
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {sermon.title}
            </h3>
            
            {/* Date */}
            <p 
              className="text-xs text-muted-foreground mb-4"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              {sermon.date}
            </p>
            
            {/* Theme preview */}
            <p 
              className="text-sm text-muted-foreground line-clamp-2 mb-5"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              {sermon.theme}
            </p>
            
            {/* Watch Now CTA */}
            <Link to={`/sermon/${sermon.id}`} className="flex items-center gap-2 group/link">
              <span 
                className="text-sm font-semibold"
                style={{ 
                  fontFamily: 'Outfit, sans-serif',
                  background: 'linear-gradient(135deg, hsl(var(--primary)), #D4AF37)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                View Details
              </span>
              <ArrowRight className="w-4 h-4 text-primary group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-background">
      {/* Simple background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-0 right-0 w-[400px] h-[400px] opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 60%)',
          }}
        />
        <div 
          className="absolute bottom-0 left-0 w-[300px] h-[300px] opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 60%)',
          }}
        />
      </div>

      <div className="container max-w-6xl mx-auto px-5 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-3 mb-5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.25), rgba(212,175,55,0.1))',
                border: '1px solid rgba(212,175,55,0.35)',
              }}
            >
              <Video className="w-4 h-4 text-gold" />
            </div>
            <span 
              className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase"
              style={{ 
                fontFamily: 'Outfit, sans-serif',
                background: 'linear-gradient(90deg, hsl(var(--primary)), #D4AF37, #FFF8E1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Watch & Listen
            </span>
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(16,185,129,0.25), rgba(16,185,129,0.1))',
                border: '1px solid rgba(16,185,129,0.35)',
              }}
            >
              <Sparkles className="w-4 h-4 text-emerald-500" />
            </div>
          </div>
          
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium mb-5 leading-[1.05]" 
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Recent{" "}
            <span 
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, #10B981 50%, hsl(var(--primary)) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Sermons
            </span>
          </h2>
          
          <p 
            className="text-base md:text-lg max-w-lg mx-auto text-muted-foreground"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Experience powerful messages of faith and spiritual growth
          </p>
        </div>

        {/* Sermons Grid */}
        <div ref={gridRef}>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[400px] rounded-3xl bg-muted/50 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {recentSermons.map((sermon, index) => renderSermonCard(sermon, index))}
            </div>
          )}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12 md:mt-16">
          <Link
            to="/sermons"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm transition-all hover:scale-105"
            style={{
              fontFamily: 'Outfit, sans-serif',
              background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary)/0.85))',
              color: 'white',
              boxShadow: '0 12px 35px rgba(45,106,108,0.35)',
            }}
          >
            <span>View All Sermons</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SermonsGrid;
