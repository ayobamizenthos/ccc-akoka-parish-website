import { Sparkles, ChevronRight, Cross, MapPin, ArrowRight, Mail, ExternalLink, Navigation, Phone, Star } from "lucide-react";
import { memo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import gladeExterior from "@/assets/glade-exterior-new.png";

const ServiceTimes = memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.6, 0.2]);

  const services = [
    {
      day: "Wednesday",
      time: "9:00 – 10:00 AM",
      type: "Midweek Gathering",
      description: "Begin your day anchored in prayer and spiritual renewal. Our midweek service offers intimate fellowship and biblical teachings to sustain you through the week.",
      accent: "hsl(160, 60%, 45%)",
      bgGradient: "from-emerald-500/20 to-teal-600/10",
      iconGradient: "from-emerald-500 to-teal-600",
      glowColor: "rgba(16,185,129,0.3)",
    },
    {
      day: "Sunday",
      time: "10:00 AM – 2:00 PM",
      type: "Divine Worship",
      description: "Experience the fullness of celestial worship with hymns, prophetic declarations, and powerful sermons. Our flagship service welcomes all seeking spiritual transformation.",
      accent: "hsl(43, 74%, 49%)",
      bgGradient: "from-gold/25 to-amber-500/15",
      iconGradient: "from-amber-500 to-yellow-500",
      glowColor: "rgba(212,175,55,0.4)",
      featured: true,
    },
    {
      day: "First Thursday",
      time: "10:00 PM – 4:00 AM",
      type: "Monthly Vigil",
      description: "A night of deep intercession and spiritual encounter. Join us as we seek divine breakthroughs through fervent prayer and prophetic worship until dawn.",
      accent: "hsl(263, 70%, 58%)",
      bgGradient: "from-violet-500/20 to-purple-600/10",
      iconGradient: "from-violet-500 to-purple-600",
      glowColor: "rgba(139,92,246,0.3)",
    },
  ];

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFindUs = () => {
    window.open(
      "https://www.google.com/maps/search/?api=1&query=3+Afolabi-Brown+Street+Akoka+Lagos+Nigeria",
      "_blank"
    );
  };

  return (
    <>
    <section 
      ref={sectionRef} 
      id="services" 
      className="py-20 md:py-28 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--secondary)/0.15) 50%, hsl(var(--background)) 100%)",
      }}
    >
      {/* Ambient background elements */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: backgroundY }}>
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
          style={{
            opacity: glowOpacity,
            background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 60%)',
            filter: 'blur(100px)',
          }}
        />
        
        {/* Subtle floating crosses */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-[0.04]"
            style={{
              left: `${15 + i * 18}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            <Cross className="w-8 h-8 text-gold" strokeWidth={1} />
          </motion.div>
        ))}
      </motion.div>

      <div className="container max-w-6xl mx-auto px-5 md:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-14 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Label badge */}
          <motion.div 
            className="inline-flex items-center gap-2.5 mb-5"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))',
                border: '1px solid rgba(212,175,55,0.25)',
              }}
              animate={{
                boxShadow: [
                  '0 0 15px rgba(212,175,55,0.15)',
                  '0 0 30px rgba(212,175,55,0.3)',
                  '0 0 15px rgba(212,175,55,0.15)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4 text-gold" />
            </motion.div>
            <span 
              className="text-[11px] md:text-xs font-semibold tracking-[0.2em] uppercase text-gold"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Sacred Schedule
            </span>
          </motion.div>
          
          {/* Main heading */}
          <h2 
            className="text-4xl sm:text-5xl md:text-6xl font-medium text-foreground mb-4 leading-[1.1]" 
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Worship{' '}
            <span 
              className="relative inline-block"
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 50%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Times
              <motion.span 
                className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
          </h2>
          
          <p 
            className="text-muted-foreground text-lg md:text-xl max-w-lg mx-auto leading-relaxed"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Join us in moments of divine encounter and spiritual renewal
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={`group relative ${service.featured ? 'lg:-mt-4 lg:mb-4' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.6 }}
            >
              {/* Hover glow */}
              <motion.div 
                className="absolute -inset-3 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                style={{
                  background: `radial-gradient(circle at center, ${service.glowColor}, transparent 70%)`,
                  filter: 'blur(25px)',
                }}
              />
              
              {/* Featured border glow */}
              {service.featured && (
                <motion.div 
                  className="absolute -inset-[2px] rounded-3xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(212,175,55,0.5), rgba(212,175,55,0.1), rgba(212,175,55,0.5))',
                  }}
                  animate={{
                    background: [
                      'linear-gradient(135deg, rgba(212,175,55,0.5), rgba(212,175,55,0.1), rgba(212,175,55,0.5))',
                      'linear-gradient(225deg, rgba(212,175,55,0.5), rgba(212,175,55,0.1), rgba(212,175,55,0.5))',
                      'linear-gradient(315deg, rgba(212,175,55,0.5), rgba(212,175,55,0.1), rgba(212,175,55,0.5))',
                      'linear-gradient(135deg, rgba(212,175,55,0.5), rgba(212,175,55,0.1), rgba(212,175,55,0.5))',
                    ],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              )}
              
              {/* Card */}
              <motion.div 
                className={`relative rounded-3xl p-6 md:p-8 h-full overflow-hidden transition-all duration-400`}
                style={{
                  background: service.featured 
                    ? 'linear-gradient(160deg, #0a1628 0%, #0f2847 50%, #0a1628 100%)'
                    : 'linear-gradient(160deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
                  boxShadow: service.featured 
                    ? '0 25px 60px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)'
                    : '0 20px 50px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,1)',
                  border: service.featured ? 'none' : '1px solid rgba(0,0,0,0.04)',
                }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                {/* Primary Service Ribbon for Featured */}
                {service.featured && (
                  <>
                    {/* Ribbon */}
                    <div className="absolute -right-10 top-6 z-20 overflow-visible">
                      <motion.div
                        className="relative"
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                      >
                        <div 
                          className="px-12 py-2 text-center rotate-45 transform origin-center"
                          style={{
                            background: 'linear-gradient(135deg, #A07C32, #FFF8E1, #D4AF37)',
                            boxShadow: '0 4px 20px rgba(212,175,55,0.5)',
                          }}
                        >
                          <span 
                            className="text-[9px] font-bold tracking-[0.15em] uppercase text-[#0a1628] whitespace-nowrap"
                            style={{ fontFamily: 'Outfit, sans-serif' }}
                          >
                            Primary Service
                          </span>
                        </div>
                        {/* Shimmer effect on ribbon */}
                        <motion.div
                          className="absolute inset-0 rotate-45 overflow-hidden"
                        >
                          <motion.div
                            className="absolute inset-0"
                            style={{
                              background: 'linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)',
                            }}
                            animate={{ x: ['-150%', '150%'] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                          />
                        </motion.div>
                      </motion.div>
                    </div>
                    
                    {/* Corner accent dots */}
                    <div className="absolute top-0 left-0 w-24 h-24 overflow-hidden">
                      <motion.div 
                        className="absolute top-3 left-3 w-3 h-3 rounded-full bg-gold"
                        style={{ boxShadow: '0 0 20px rgba(212,175,55,0.6)' }}
                        animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.div 
                        className="absolute top-2 left-8 w-1.5 h-1.5 rounded-full bg-gold/50"
                        animate={{ opacity: [0.3, 0.7, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                  </>
                )}

                {/* Refined time display - no icon, elegant typography */}
                <motion.div 
                  className="flex items-baseline gap-2 mb-4"
                  whileHover={{ x: 2 }}
                >
                  <span 
                    className={`text-3xl md:text-4xl font-light tabular-nums tracking-tight ${service.featured ? 'text-gold' : 'text-foreground'}`}
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {service.time.split('–')[0].trim()}
                  </span>
                  {service.time.includes('–') && (
                    <>
                      <span className={`text-lg ${service.featured ? 'text-white/40' : 'text-muted-foreground/50'}`}>—</span>
                      <span 
                        className={`text-xl md:text-2xl font-light tabular-nums ${service.featured ? 'text-white/70' : 'text-muted-foreground'}`}
                        style={{ fontFamily: 'Playfair Display, serif' }}
                      >
                        {service.time.split('–')[1].trim()}
                      </span>
                    </>
                  )}
                </motion.div>
                
                {/* Day title */}
                <h3 
                  className={`text-2xl md:text-3xl font-medium mb-1.5 ${service.featured ? 'text-white' : 'text-foreground'}`} 
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {service.day}
                </h3>
                
                {/* Service type with subtle accent bar */}
                <div className="flex items-center gap-3 mb-5">
                  <div 
                    className={`w-8 h-0.5 rounded-full bg-gradient-to-r ${service.iconGradient}`}
                  />
                  <p 
                    className={`text-sm font-medium tracking-wide ${service.featured ? 'text-gold' : 'text-primary'}`}
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    {service.type}
                  </p>
                </div>
                
                {/* Description */}
                <p 
                  className={`text-sm md:text-[15px] leading-relaxed ${service.featured ? 'text-white/70' : 'text-muted-foreground'}`}
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  {service.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div 
          className="text-center mt-14 md:mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={() => setIsDialogOpen(true)}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm tracking-wide transition-all duration-300"
            style={{
              fontFamily: 'Outfit, sans-serif',
              background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-dark)))',
              color: 'white',
              boxShadow: '0 10px 40px rgba(70, 120, 135, 0.25)',
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 15px 50px rgba(70, 120, 135, 0.35)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Plan Your Visit</span>
            <motion.div
              className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronRight className="w-4 h-4" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>

    {/* Premium Dialog - same as "Find Us" */}
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent 
        className="sm:max-w-lg p-0 overflow-hidden rounded-3xl border-0 mx-4"
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.98), rgba(255,255,255,0.95))',
          boxShadow: '0 30px 100px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.05)',
        }}
      >
        {/* Image header */}
        <motion.div 
          className="aspect-video relative overflow-hidden"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src={gladeExterior} 
            alt="Glade Cathedral" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          
          {/* Badge on image */}
          <motion.div
            className="absolute bottom-4 left-4 flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(212,175,55,0.9), rgba(160,124,50,0.9))',
              backdropFilter: 'blur(10px)',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Star className="w-3.5 h-3.5 text-white" fill="currentColor" />
            <span className="text-white text-xs font-semibold" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Glade Cathedral
            </span>
          </motion.div>
        </motion.div>
        
        {/* Content */}
        <motion.div 
          className="p-6 md:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <DialogHeader className="mb-6">
            <DialogTitle 
              className="text-2xl md:text-3xl text-foreground" 
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Visit{' '}
              <span 
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)), #10B981)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Glade Cathedral
              </span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 mb-6">
            {/* Address card */}
            <motion.div 
              className="group relative p-5 rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, rgba(16,185,129,0.08), rgba(16,185,129,0.03))',
                border: '1px solid rgba(16,185,129,0.15)',
              }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-start gap-4">
                <motion.div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #10B981, #059669)',
                    boxShadow: '0 8px 20px rgba(16,185,129,0.25)',
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <MapPin className="h-5 w-5 text-white" strokeWidth={1.5} />
                </motion.div>
                <div>
                  <p 
                    className="font-semibold text-foreground text-sm mb-1"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    Address
                  </p>
                  <p 
                    className="text-muted-foreground text-sm leading-relaxed"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    3, Afolabi-Brown Street, Akoka Lagos, Nigeria
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Email card */}
            <motion.div 
              className="group relative p-5 rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, rgba(212,175,55,0.08), rgba(212,175,55,0.03))',
                border: '1px solid rgba(212,175,55,0.15)',
              }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-start gap-4">
                <motion.div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37, #A07C32)',
                    boxShadow: '0 8px 20px rgba(212,175,55,0.25)',
                  }}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                >
                  <Mail className="h-5 w-5 text-white" strokeWidth={1.5} />
                </motion.div>
                <div>
                  <p 
                    className="font-semibold text-foreground text-sm mb-1"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    Email
                  </p>
                  <a 
                    href="mailto:cccakokaparish@yahoo.com" 
                    className="text-primary hover:text-primary/80 transition-colors text-sm"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    cccakokaparish@yahoo.com
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Premium CTA Button */}
          <motion.button 
            onClick={handleFindUs} 
            className="relative w-full py-4 rounded-xl overflow-hidden flex items-center justify-center gap-3 font-semibold text-white"
            style={{
              fontFamily: 'Outfit, sans-serif',
              background: 'linear-gradient(135deg, hsl(var(--primary)), #0d3d3e)',
              boxShadow: '0 10px 30px rgba(45,106,108,0.3)',
            }}
            whileHover={{ 
              scale: 1.01, 
              boxShadow: "0 15px 40px rgba(45,106,108,0.4)" 
            }}
            whileTap={{ scale: 0.99 }}
          >
            {/* Shimmer */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
            
            <Navigation className="w-5 h-5 relative z-10" strokeWidth={1.5} />
            <span className="relative z-10">Open in Google Maps</span>
            <ExternalLink className="w-4 h-4 relative z-10" strokeWidth={1.5} />
          </motion.button>
        </motion.div>
      </DialogContent>
    </Dialog>
    </>
  );
});

ServiceTimes.displayName = 'ServiceTimes';

export default ServiceTimes;
