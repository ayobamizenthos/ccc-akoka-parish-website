import { Quote, Sparkles, Crown, Star } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Import actual prophet image
import prophetImage from "@/assets/prophet-ademusire.png";

const Shepherd = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

  return (
    <section 
      ref={sectionRef}
      id="shepherd" 
      className="py-12 md:py-20 relative overflow-hidden bg-background"
    >
      {/* Subtle ambient glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        {/* Main Card - Mobile-First Layout */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Outer glow */}
          <div 
            className="absolute -inset-2 md:-inset-3 rounded-2xl md:rounded-3xl opacity-40"
            style={{
              background: 'linear-gradient(135deg, rgba(212,175,55,0.2), transparent 50%, rgba(var(--primary-rgb),0.15))',
              filter: 'blur(30px)',
            }}
          />
          
          {/* Border gradient */}
          <div 
            className="absolute -inset-[1px] rounded-2xl md:rounded-3xl"
            style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.4), rgba(16,185,129,0.2), rgba(212,175,55,0.3))' }}
          />
          
          {/* Main Card */}
          <div 
            className="relative rounded-2xl md:rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.98), rgba(255,255,255,0.92))',
              boxShadow: '0 30px 80px rgba(0,0,0,0.08)',
            }}
          >
            {/* Mobile: Stack vertically, Desktop: Side by side */}
            <div className="flex flex-col lg:grid lg:grid-cols-5 min-h-[auto] lg:min-h-[400px]">
              {/* Prophet Image - Full width on mobile */}
              <motion.div 
                className="relative h-[280px] sm:h-[320px] lg:h-auto lg:col-span-2 overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, #0a1628 0%, #0d1f3c 100%)',
                }}
              >
                {/* Prophet Image with parallax */}
                <motion.div 
                  className="absolute inset-0"
                  style={{ scale: imageScale }}
                >
                  <img 
                    src={prophetImage} 
                    alt="Sup. Evang. Segun Ademusire - Parish Shepherd" 
                    className="w-full h-full object-cover object-top"
                  />
                </motion.div>
                
                {/* Elegant gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/30 to-transparent" />
                
                {/* Animated gold particles */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-gold/60"
                    style={{
                      left: `${15 + i * 15}%`,
                      top: `${40 + (i % 3) * 15}%`,
                    }}
                    animate={{
                      y: [0, -12, 0],
                      opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                      duration: 3 + i * 0.4,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
                
                {/* Prophet Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <motion.div
                    className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full mb-2"
                    style={{
                      background: 'linear-gradient(135deg, rgba(212,175,55,0.3), rgba(212,175,55,0.15))',
                      border: '1px solid rgba(212,175,55,0.4)',
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <Crown className="w-3 h-3 text-gold" />
                    <span 
                      className="text-[8px] md:text-[10px] font-bold tracking-[0.12em] uppercase text-gold"
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                      Parish Shepherd
                    </span>
                  </motion.div>
                  
                  <motion.h3 
                    className="text-xl sm:text-2xl md:text-3xl font-medium text-white mb-0.5"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    Sup. Evang. Segun Ademusire
                  </motion.h3>
                  
                  <motion.p 
                    className="text-white/60 text-xs sm:text-sm"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    CCC Akoka Parish (Glade Cathedral)
                  </motion.p>
                </div>
              </motion.div>
              
              {/* Content Section */}
              <motion.div 
                className="lg:col-span-3 p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-center"
                style={{ y: contentY }}
              >
                <motion.div 
                  className="inline-flex items-center gap-2 mb-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  <span 
                    className="text-[9px] md:text-xs font-bold tracking-[0.15em] uppercase text-gold"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    Spiritual Leadership
                  </span>
                </motion.div>
                
                <motion.h2 
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mb-4 text-foreground leading-[1.15]" 
                  style={{ fontFamily: 'Playfair Display, serif' }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  Guided by{' '}
                  <span 
                    style={{
                      background: 'linear-gradient(135deg, hsl(var(--primary)), #10B981)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Divine Wisdom
                  </span>
                </motion.h2>
                
                <motion.div 
                  className="w-12 md:w-16 h-[2px] md:h-[3px] bg-gradient-to-r from-gold via-primary to-transparent mb-4 md:mb-5"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                />
                
                {/* Quote block - Compact on mobile */}
                <motion.div 
                  className="relative mb-4 md:mb-5 p-4 md:p-5 rounded-xl"
                  style={{
                    background: 'linear-gradient(145deg, hsl(var(--muted)/0.5), hsl(var(--muted)/0.25))',
                    border: '1px solid hsl(var(--border)/0.5)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <Quote className="absolute top-2 left-2 md:top-3 md:left-3 h-5 w-5 md:h-6 md:w-6 text-gold/20" strokeWidth={1} />
                  <p 
                    className="pl-5 md:pl-6 text-sm sm:text-base md:text-lg italic leading-relaxed text-foreground/80" 
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  >
                    "Welcome to Glade Cathedral, where God's presence dwells and His love transforms lives."
                  </p>
                </motion.div>
                
                <motion.p 
                  className="text-muted-foreground leading-relaxed text-xs sm:text-sm md:text-base mb-4 md:mb-5"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  Join us every Wednesday and Sunday as we seek the face of God together.
                </motion.p>

                {/* Service highlights - Compact pills */}
                <motion.div 
                  className="flex flex-wrap gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                >
                  {['Prayer', 'Worship', 'Fellowship'].map((item, i) => (
                    <div 
                      key={i}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, hsl(var(--primary)/0.1), hsl(var(--primary)/0.05))',
                        border: '1px solid hsl(var(--primary)/0.2)',
                      }}
                    >
                      <Star className="w-2.5 h-2.5 md:w-3 md:h-3 text-primary" fill="currentColor" />
                      <span className="text-[10px] md:text-xs font-medium text-primary" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Shepherd;
