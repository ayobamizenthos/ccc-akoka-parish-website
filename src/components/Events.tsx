import { Calendar, MapPin, Clock, ArrowRight, Wheat, PartyPopper, HandHeart, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import SEO from "@/components/SEO";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const Events = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  const upcomingEvents = [
    {
      title: "Harvest Thanksgiving",
      date: "December 15, 2024",
      time: "10:00 AM",
      location: "Glade Cathedral",
      featured: true,
      icon: Wheat,
      description: "Annual celebration of God's faithfulness and blessings.",
      gradient: "from-amber-500 to-yellow-500",
      glowColor: "rgba(212,175,55,0.4)",
    },
    {
      title: "New Year Crossover",
      date: "December 31, 2024",
      time: "10:00 PM",
      location: "Glade Cathedral",
      featured: true,
      icon: PartyPopper,
      description: "Usher in the new year with prayers and worship.",
      gradient: "from-violet-500 to-purple-600",
      glowColor: "rgba(139,92,246,0.4)",
    },
    {
      title: "Monthly Prayer Vigil",
      date: "First Thursday",
      time: "10:00 PM – 4:00 AM",
      location: "Glade Cathedral",
      icon: HandHeart,
      description: "A night of intensive prayer and breakthrough.",
      gradient: "from-emerald-500 to-teal-600",
      glowColor: "rgba(16,185,129,0.4)",
    },
  ];

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <SEO
        title="Upcoming Events - CCC Akoka Parish"
        description="Join us for special services and events"
        url="/#events"
      />
      <section 
        ref={sectionRef} 
        id="events" 
        className="py-14 md:py-20 relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, hsl(var(--muted)/0.2) 0%, hsl(var(--background)) 50%, hsl(var(--muted)/0.2) 100%)',
        }}
      >
        {/* Background effects */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ y: backgroundY }}>
          <div 
            className="absolute top-0 right-0 w-[350px] h-[350px]"
            style={{
              background: 'radial-gradient(circle, hsl(var(--accent)/0.08) 0%, transparent 60%)',
              filter: 'blur(60px)',
            }}
          />
        </motion.div>

        <div className="container max-w-6xl mx-auto px-5 md:px-8 relative z-10">
          {/* Compact Header */}
          <div className="flex items-end justify-between mb-8 md:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <motion.div className="inline-flex items-center gap-2 mb-3">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                <span 
                  className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-primary"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  Mark Your Calendar
                </span>
              </motion.div>
              
              <h2 
                className="text-2xl sm:text-3xl md:text-4xl font-medium text-foreground leading-[1.1]" 
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Upcoming{' '}
                <span className="text-primary">Events</span>
              </h2>
            </motion.div>

            {/* Scroll Arrows - Desktop */}
            <div className="hidden md:flex items-center gap-2">
              <motion.button
                onClick={() => scroll('left')}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  canScrollLeft 
                    ? 'bg-primary text-white hover:bg-primary/90' 
                    : 'bg-muted text-muted-foreground'
                }`}
                whileHover={{ scale: canScrollLeft ? 1.05 : 1 }}
                whileTap={{ scale: 0.95 }}
                disabled={!canScrollLeft}
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={() => scroll('right')}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  canScrollRight 
                    ? 'bg-primary text-white hover:bg-primary/90' 
                    : 'bg-muted text-muted-foreground'
                }`}
                whileHover={{ scale: canScrollRight ? 1.05 : 1 }}
                whileTap={{ scale: 0.95 }}
                disabled={!canScrollRight}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Horizontal Scrollable Cards */}
          <div className="relative -mx-5 md:-mx-8">
            <div 
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide px-5 md:px-8 pb-4 snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-[280px] md:w-[320px] snap-start"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div 
                    className="group relative h-full"
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Card glow */}
                    <motion.div 
                      className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at center, ${event.glowColor}, transparent 70%)`,
                        filter: 'blur(20px)',
                      }}
                    />
                    
                    {/* Border */}
                    <div 
                      className="absolute -inset-[1px] rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity"
                      style={{ background: `linear-gradient(135deg, ${event.glowColor}, transparent 60%)` }}
                    />
                    
                    {/* Card */}
                    <div 
                      className="relative h-full rounded-2xl p-5 md:p-6 overflow-hidden"
                      style={{
                        background: 'linear-gradient(145deg, rgba(255,255,255,0.98), rgba(255,255,255,0.9))',
                        boxShadow: '0 15px 40px rgba(0,0,0,0.05)',
                      }}
                    >
                      {/* Top accent */}
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${event.gradient}`} />
                      
                      {/* Featured badge */}
                      {event.featured && (
                        <motion.span 
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase mb-4"
                          style={{ background: `linear-gradient(135deg, ${event.glowColor})`, color: '#0a1628' }}
                        >
                          <Sparkles className="w-2.5 h-2.5" />
                          Featured
                        </motion.span>
                      )}
                      
                      {/* Icon */}
                      <motion.div 
                        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${event.gradient}`}
                        style={{ boxShadow: `0 8px 25px ${event.glowColor}` }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <event.icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                      </motion.div>
                      
                      {/* Title */}
                      <h3 
                        className="text-lg font-medium text-foreground mb-2" 
                        style={{ fontFamily: 'Playfair Display, serif' }}
                      >
                        {event.title}
                      </h3>
                      
                      {/* Description */}
                      <p 
                        className="text-xs text-muted-foreground mb-4 leading-relaxed"
                        style={{ fontFamily: 'Outfit, sans-serif' }}
                      >
                        {event.description}
                      </p>
                      
                      {/* Info */}
                      <div className="space-y-2 mb-4">
                        {[
                          { icon: Calendar, text: event.date },
                          { icon: Clock, text: event.time },
                          { icon: MapPin, text: event.location },
                        ].map((info, i) => (
                          <div key={i} className="flex items-center gap-2.5 text-xs text-muted-foreground">
                            <div 
                              className="w-6 h-6 rounded-lg flex items-center justify-center"
                              style={{ background: 'hsl(var(--muted)/0.5)' }}
                            >
                              <info.icon className="h-3 w-3" style={{ color: event.glowColor.replace('0.4', '1') }} />
                            </div>
                            <span style={{ fontFamily: 'Outfit, sans-serif' }}>{info.text}</span>
                          </div>
                        ))}
                      </div>
                      
                      {/* CTA */}
                      <motion.button 
                        className="flex items-center gap-2 text-[10px] font-bold tracking-wider uppercase"
                        style={{ fontFamily: 'Outfit, sans-serif', color: event.glowColor.replace('0.4', '1') }}
                        whileHover={{ x: 4 }}
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Events;
