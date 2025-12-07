import { useState, useEffect, memo, useRef, useCallback } from "react";
import { Menu, X, Sparkles, Cross } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import useActiveSection from "@/hooks/useActiveSection";
import useHapticFeedback from "@/hooks/useHapticFeedback";
import akokaGladeLogo from "@/assets/akoka-glade-logo.png";


// Menu open sound effect
const playMenuOpenSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1000, audioContext.currentTime + 0.12);
    
    gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.15);
  } catch (e) {
    // Audio not supported, fail silently
  }
};

// Menu close sound effect (descending tone)
const playMenuCloseSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(900, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(500, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.06, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.12);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.12);
  } catch (e) {
    // Audio not supported, fail silently
  }
};

// Celestial rainbow colors
const rainbowColors = [
  'hsl(0, 85%, 55%)',    // Red
  'hsl(30, 90%, 55%)',   // Orange
  'hsl(50, 95%, 55%)',   // Yellow
  'hsl(120, 70%, 45%)',  // Green
  'hsl(200, 80%, 50%)',  // Blue
  'hsl(260, 70%, 55%)',  // Indigo
  'hsl(290, 65%, 55%)',  // Violet
];

const Navigation = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const activeSection = useActiveSection(["#about", "#services", "#events", "#contact"]);
  const { trigger } = useHapticFeedback();
  
  // Mouse parallax for logo
  const logoRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [-50, 50], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-50, 50], [-8, 8]), springConfig);
  const translateX = useSpring(useTransform(mouseX, [-50, 50], [-4, 4]), springConfig);
  const translateY = useSpring(useTransform(mouseY, [-50, 50], [-4, 4]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!logoRef.current) return;
    const rect = logoRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/", isRoute: true },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Events", href: "#events" },
    { name: "Sermons", href: "/sermons", isRoute: true },
    { name: "Blog", href: "/blog", isRoute: true },
    { name: "Choir & Media", href: "/choir-media", isRoute: true },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500`}
        style={{ 
          paddingTop: 'env(safe-area-inset-top, 0px)',
        }}
        initial={false}
        animate={{
          height: isScrolled ? "72px" : "88px",
        }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Inner container with margins and rounded edges on scroll */}
        <motion.div 
          className="h-full mx-3 sm:mx-4 md:mx-6 lg:mx-8 transition-all duration-500"
          style={{
            background: isScrolled 
              ? 'rgba(255, 255, 255, 0.06)'
              : 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 100%)',
            backdropFilter: isScrolled ? 'blur(40px) saturate(200%)' : 'none',
            WebkitBackdropFilter: isScrolled ? 'blur(40px) saturate(200%)' : 'none',
            borderRadius: isScrolled ? '20px' : '0',
            border: isScrolled ? '1px solid rgba(255,255,255,0.1)' : 'none',
            boxShadow: isScrolled ? '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.08)' : 'none',
            marginTop: isScrolled ? '8px' : '0',
          }}
        >
          <div className="px-4 sm:px-5 md:px-6 h-full">
            <div className="flex items-center justify-between h-full max-w-7xl mx-auto">
            {/* Akoka Parish Glade Cathedral Logo - Professionally Aligned */}
            <Link 
              to="/" 
              className="group relative flex items-center"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <motion.div
                ref={logoRef}
                className="relative flex items-center"
                style={{
                  rotateX,
                  rotateY,
                  x: translateX,
                  y: translateY,
                  transformStyle: "preserve-3d",
                  perspective: 1000,
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: 1,
                  x: 0,
                }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Subtle glow effect */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at left center, rgba(212,175,55,0.2) 0%, transparent 60%)',
                    filter: 'blur(12px)',
                  }}
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <img
                  src={akokaGladeLogo}
                  alt="Akoka Parish Glade Cathedral - Celestial Church of Christ"
                  className={`relative z-10 transition-all duration-400 object-contain ${
                    isScrolled 
                      ? "h-10 sm:h-11 w-auto" 
                      : "h-11 sm:h-12 md:h-14 w-auto"
                  }`}
                  style={{
                    filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))",
                  }}
                />
              </motion.div>
            </Link>

            {/* Desktop Nav - Premium with micro-interactions */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link, index) => {
                const isActive = link.isRoute 
                  ? location.pathname === link.href 
                  : activeSection === link.href;
                
                const NavItem = ({ children }: { children: React.ReactNode }) => (
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    {/* Background glow on hover/active */}
                    <motion.div
                      className={`absolute inset-0 rounded-lg ${isActive ? 'opacity-100' : 'opacity-0'}`}
                      style={{
                        background: 'linear-gradient(135deg, rgba(212,175,55,0.12), rgba(212,175,55,0.04))',
                      }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.25 }}
                    />
                    {children}
                    {/* Active indicator line */}
                    <motion.div
                      className="absolute -bottom-0.5 left-4 right-4 h-[2px] rounded-full bg-gold"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ 
                        scaleX: isActive ? 1 : 0, 
                        opacity: isActive ? 1 : 0 
                      }}
                      transition={{ duration: 0.3 }}
                      style={{ originX: 0.5 }}
                    />
                  </motion.div>
                );
                
                return link.isRoute ? (
                  <NavItem key={link.name}>
                    <Link
                      to={link.href}
                      className={`group relative z-10 px-4 py-2.5 text-[11px] font-medium tracking-[0.08em] uppercase transition-all duration-300 block ${
                        isActive
                          ? "text-gold"
                          : "text-white/80 hover:text-white"
                      }`}
                      style={{ 
                        fontFamily: 'Outfit, sans-serif',
                        textShadow: '0 1px 4px rgba(0,0,0,0.3)'
                      }}
                      onClick={() => trigger('light')}
                    >
                      <motion.span
                        className="inline-block"
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        {link.name}
                      </motion.span>
                    </Link>
                  </NavItem>
                ) : (
                  <NavItem key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        trigger('light');
                        const target = document.querySelector(link.href);
                        if (target) {
                          const headerOffset = 80;
                          const elementPosition = target.getBoundingClientRect().top;
                          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                          
                          window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                          });
                        }
                      }}
                      className={`group relative z-10 px-4 py-2.5 text-[11px] font-medium tracking-[0.08em] uppercase transition-all duration-300 cursor-pointer block ${
                        isActive
                          ? "text-gold"
                          : "text-white/80 hover:text-white"
                      }`}
                      style={{ 
                        fontFamily: 'Outfit, sans-serif',
                        textShadow: '0 1px 4px rgba(0,0,0,0.3)'
                      }}
                    >
                      <motion.span
                        className="inline-block"
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        {link.name}
                      </motion.span>
                    </a>
                  </NavItem>
                );
              })}
            </div>

            {/* Mobile Menu Button - Palantir Luxury Design */}
            <motion.button
              className="lg:hidden relative flex items-center justify-center w-11 h-11 rounded-xl touch-manipulation overflow-hidden group"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
              onClick={() => {
                trigger('medium');
                if (!isMobileMenuOpen) {
                  playMenuOpenSound();
                } else {
                  playMenuCloseSound();
                }
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.08 }}
            >
              {/* Outer glow ring */}
              <motion.div
                className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100"
                style={{
                  background: 'linear-gradient(135deg, rgba(212,175,55,0.3), rgba(16,185,129,0.2), rgba(212,175,55,0.2))',
                  filter: 'blur(8px)',
                }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Rotating gold accent ring */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: isScrolled
                    ? 'conic-gradient(from 0deg, transparent 30%, rgba(212,175,55,0.3) 50%, transparent 70%)'
                    : 'conic-gradient(from 0deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Inner background */}
              <div 
                className="absolute inset-[2px] rounded-[14px]"
                style={{
                  background: isScrolled 
                    ? 'linear-gradient(145deg, rgba(255,255,255,0.98), rgba(255,255,255,0.95))'
                    : 'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                }}
              />

              {/* Shimmer sweep effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(105deg, transparent 40%, rgba(212,175,55,0.3) 50%, transparent 60%)',
                  }}
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
                />
              </motion.div>
              
              {/* Animated hamburger / close icon */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMobileMenuOpen ? "close" : "menu"}
                  initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 180, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 400, damping: 20 }}
                  className="relative z-10"
                >
                  {isMobileMenuOpen ? (
                    <div 
                      className="w-6 h-6 flex items-center justify-center"
                      style={{ color: isScrolled ? 'hsl(var(--primary))' : '#fff' }}
                    >
                      <X size={22} strokeWidth={2.5} />
                    </div>
                  ) : (
                    <div className="w-6 h-6 flex flex-col items-center justify-center gap-1.5">
                      <motion.span 
                        className="block w-5 h-[2px] rounded-full"
                        style={{ 
                          background: isScrolled 
                            ? 'linear-gradient(90deg, hsl(var(--primary)), #D4AF37)'
                            : 'linear-gradient(90deg, #fff, rgba(212,175,55,0.8))',
                        }}
                        animate={{ width: ['20px', '16px', '20px'] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.span 
                        className="block w-4 h-[2px] rounded-full"
                        style={{ 
                          background: isScrolled 
                            ? 'linear-gradient(90deg, #D4AF37, hsl(var(--primary)))'
                            : 'linear-gradient(90deg, rgba(212,175,55,0.8), #fff)',
                        }}
                        animate={{ width: ['16px', '20px', '16px'] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                      />
                      <motion.span 
                        className="block w-5 h-[2px] rounded-full"
                        style={{ 
                          background: isScrolled 
                            ? 'linear-gradient(90deg, hsl(var(--primary)), #D4AF37)'
                            : 'linear-gradient(90deg, #fff, rgba(212,175,55,0.8))',
                        }}
                        animate={{ width: ['20px', '14px', '20px'] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                      />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
              
              {/* Corner accent dots */}
              <motion.div 
                className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full"
                style={{ background: isScrolled ? '#D4AF37' : 'rgba(212,175,55,0.6)' }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>
          </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu - Luxury Minimalist Spiritual Design */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Premium Dark Background */}
            <motion.div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, #030508 0%, #0a0d12 50%, #030508 100%)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
            
            {/* Subtle Gold Ambient Glow */}
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 70%)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            />

            {/* Minimalist Cross Symbol - Centered */}
            <motion.div
              className="absolute top-20 left-1/2 -translate-x-1/2 pointer-events-none"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <motion.div
                className="relative"
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <svg width="40" height="56" viewBox="0 0 40 56" fill="none">
                  <motion.path
                    d="M20 0V56M8 16H32"
                    stroke="url(#crossGradient)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                  <defs>
                    <linearGradient id="crossGradient" x1="20" y1="0" x2="20" y2="56">
                      <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3"/>
                      <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.8"/>
                      <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.3"/>
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
            </motion.div>

            {/* Close Button - Minimal Luxury */}
            <motion.button
              className="absolute top-5 right-5 z-50 flex items-center justify-center w-11 h-11 rounded-full touch-manipulation"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(212,175,55,0.2)',
                marginTop: 'env(safe-area-inset-top, 0px)',
              }}
              onClick={() => {
                trigger('light');
                playMenuCloseSound();
                setIsMobileMenuOpen(false);
              }}
              aria-label="Close menu"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
              whileTap={{ scale: 0.92 }}
              whileHover={{ borderColor: 'rgba(212,175,55,0.5)' }}
            >
              <X size={18} className="text-gold/80" />
            </motion.button>
            
            <div className="relative flex flex-col h-full pt-40 pb-8 px-8">
              {/* Refined Header */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-10"
              >
                <motion.div 
                  className="w-16 h-[1px] mx-auto mb-4"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                />
                <span 
                  className="text-[10px] tracking-[0.35em] uppercase font-medium text-gold/60"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  Navigate
                </span>
              </motion.div>
              
              {/* Nav Links - Luxury Minimal */}
              <nav className="flex-1 flex flex-col justify-center max-h-[50vh] overflow-y-auto scrollbar-hide -mt-8">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ 
                      delay: 0.25 + index * 0.05, 
                      duration: 0.4,
                      ease: [0.23, 1, 0.32, 1]
                    }}
                  >
                    {link.isRoute ? (
                      <Link
                        to={link.href}
                        className="group flex items-center justify-center py-4 transition-all touch-manipulation"
                        onClick={() => {
                          trigger('light');
                          playMenuCloseSound();
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <motion.span
                          className="text-xl font-light text-white/70 group-hover:text-gold group-active:text-gold transition-colors duration-300"
                          style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '0.02em' }}
                          whileHover={{ scale: 1.02 }}
                        >
                          {link.name}
                        </motion.span>
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="group flex items-center justify-center py-4 transition-all touch-manipulation"
                        onClick={(e) => {
                          e.preventDefault();
                          trigger('light');
                          playMenuCloseSound();
                          setIsMobileMenuOpen(false);
                          setTimeout(() => {
                            const target = document.querySelector(link.href);
                            if (target) {
                              target.scrollIntoView({ behavior: 'smooth' });
                            }
                          }, 300);
                        }}
                      >
                        <motion.span
                          className="text-xl font-light text-white/70 group-hover:text-gold group-active:text-gold transition-colors duration-300"
                          style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '0.02em' }}
                          whileHover={{ scale: 1.02 }}
                        >
                          {link.name}
                        </motion.span>
                      </a>
                    )}
                  </motion.div>
                ))}
              </nav>
              
              {/* Bottom CTA & Branding - Minimal Luxury */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-auto pt-8"
              >
                <motion.a
                  href="mailto:cccakokaparish@gmail.com?subject=Donation Request"
                  className="relative flex items-center justify-center gap-2 py-4 rounded-xl overflow-hidden touch-manipulation"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.08))',
                    border: '1px solid rgba(212,175,55,0.3)',
                  }}
                  onClick={() => {
                    playMenuCloseSound();
                    setIsMobileMenuOpen(false);
                  }}
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ borderColor: 'rgba(212,175,55,0.5)' }}
                >
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(105deg, transparent 40%, rgba(212,175,55,0.15) 50%, transparent 60%)',
                    }}
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
                  />
                  <span 
                    className="text-sm font-medium tracking-wide text-gold relative z-10"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    Support Our Ministry
                  </span>
                </motion.a>
                
                {/* Church Branding */}
                <div className="mt-8 text-center">
                  <motion.div 
                    className="w-10 h-[1px] mx-auto mb-4"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)' }}
                  />
                  <p 
                    className="text-[9px] tracking-[0.25em] uppercase text-white/30"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    Celestial Church of Christ
                  </p>
                  <p 
                    className="text-[10px] tracking-[0.2em] uppercase text-gold/50 mt-1"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    Akoka Parish • Glade Cathedral
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;
