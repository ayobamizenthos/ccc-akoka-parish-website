import { MapPin, Mail, ArrowUp, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { memo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Footer = memo(() => {
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const glowScale = useTransform(scrollYProgress, [0, 1], [0.7, 1.3]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.7, 0.4]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const socials = [
    { href: "https://facebook.com/cccakokaparish", icon: FaFacebookF, label: "Facebook" },
    { href: "https://instagram.com/cccakokaparish", icon: FaInstagram, label: "Instagram" },
    { href: "https://youtube.com/@cccakokaparish", icon: FaYoutube, label: "YouTube" },
    { href: "https://x.com/cccakokaparish", icon: FaXTwitter, label: "X (Twitter)" },
    { href: "https://tiktok.com/@cccakokaparish", icon: FaTiktok, label: "TikTok" },
    { href: "https://wa.me/2348033119288", icon: FaWhatsapp, label: "WhatsApp" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.25 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <footer 
      ref={footerRef}
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(165deg, hsl(18 45% 24%) 0%, hsl(15 48% 20%) 35%, hsl(12 45% 15%) 70%, hsl(10 42% 12%) 100%)',
      }}
    >
      {/* Parallax Divine Light Effects */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ scale: glowScale }}
      >
        {/* Top gold chandelier glow */}
        <motion.div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] md:w-[800px] h-[250px] md:h-[400px]"
          style={{ 
            opacity: glowOpacity,
            background: 'radial-gradient(ellipse at center top, rgba(195, 145, 32, 0.15) 0%, rgba(195, 145, 32, 0.05) 40%, transparent 70%)',
          }}
        />
        {/* Side celestial accents */}
        <div 
          className="absolute bottom-0 left-0 w-[300px] h-[300px]"
          style={{
            background: 'radial-gradient(ellipse at bottom left, rgba(70, 120, 135, 0.1) 0%, transparent 60%)',
          }}
        />
        <div 
          className="absolute bottom-0 right-0 w-[250px] h-[250px]"
          style={{
            background: 'radial-gradient(ellipse at bottom right, rgba(95, 48, 52, 0.1) 0%, transparent 60%)',
          }}
        />
      </motion.div>
      
      {/* Top Gold Divider Line */}
      <motion.div 
        className="h-[2px] w-full"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, hsl(38 78% 35%) 15%, hsl(42 85% 50%) 50%, hsl(38 78% 35%) 85%, transparent 100%)',
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
      />
      
      <div className="relative z-10 px-5 md:px-8 py-14 md:py-24">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <motion.div 
            className="text-center mb-12 md:mb-20"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <motion.h3 
              className="text-2xl md:text-4xl lg:text-5xl font-medium text-white mb-3 md:mb-4" 
              style={{ fontFamily: 'Playfair Display, serif' }}
              animate={{ 
                textShadow: [
                  "0 0 0px rgba(195,145,32,0)",
                  "0 0 30px rgba(195,145,32,0.4)",
                  "0 0 0px rgba(195,145,32,0)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Glade Cathedral
            </motion.h3>
            <motion.p 
              className="text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.25em] uppercase font-semibold mb-3 md:mb-4"
              style={{ 
                fontFamily: 'Outfit, sans-serif',
                background: 'linear-gradient(135deg, hsl(42 85% 55%) 0%, hsl(48 92% 68%) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              The Last Ark of Salvation
            </motion.p>
            <p 
              className="text-white/45 text-sm md:text-base max-w-lg mx-auto px-4"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Celestial Church of Christ, Akoka Parish — A sanctuary of divine presence and spiritual refuge.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-14 mb-12 md:mb-18"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Quick Links - Premium Compact Grid Design */}
            <motion.div variants={itemVariants}>
              <h4 
                className="text-[10px] md:text-xs font-semibold tracking-[0.18em] md:tracking-[0.22em] uppercase mb-4 md:mb-5"
                style={{ 
                  fontFamily: 'Outfit, sans-serif',
                  color: 'hsl(45 90% 62%)',
                }}
              >
                Quick Links
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: "About", icon: "✦", href: "#about" },
                  { name: "Services", icon: "◈", href: "#services" },
                  { name: "Events", icon: "◇", href: "#events" },
                  { name: "Sermons", icon: "▸", href: "/sermons" },
                  { name: "Blog", icon: "◎", href: "/blog" },
                  { name: "Choir & Media", icon: "◐", href: "/choir-media" },
                ].map((link, index) => (
                  <motion.a 
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative px-3 py-2.5 rounded-xl overflow-hidden touch-manipulation"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(195, 145, 32, 0.1)',
                    }}
                    whileHover={{ 
                      scale: 1.03,
                      borderColor: 'rgba(195, 145, 32, 0.35)',
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Shimmer on hover */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: 'linear-gradient(105deg, transparent 40%, rgba(195,145,32,0.08) 50%, transparent 60%)',
                      }}
                    />
                    <div className="relative flex items-center gap-2">
                      <span 
                        className="text-[10px] opacity-50 group-hover:opacity-100 transition-opacity"
                        style={{ color: 'hsl(45 90% 62%)' }}
                      >
                        {link.icon}
                      </span>
                      <span 
                        className="text-white/60 text-sm group-hover:text-gold-light transition-colors duration-300"
                        style={{ fontFamily: 'Outfit, sans-serif' }}
                      >
                        {link.name}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div variants={itemVariants}>
              <h4 
                className="text-[10px] md:text-xs font-semibold tracking-[0.18em] md:tracking-[0.22em] uppercase mb-5 md:mb-6"
                style={{ 
                  fontFamily: 'Outfit, sans-serif',
                  color: 'hsl(45 90% 62%)',
                }}
              >
                Contact Us
              </h4>
              <div className="space-y-4 md:space-y-5">
                <motion.div 
                  className="flex items-start gap-3.5"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(195, 145, 32, 0.15)', border: '1px solid rgba(195, 145, 32, 0.2)' }}>
                    <MapPin className="h-4 w-4 text-gold-light" strokeWidth={1.5} />
                  </div>
                  <span 
                    className="text-white/55 text-sm md:text-base leading-relaxed"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    3, Afolabi-Brown Street,<br />Akoka, Lagos, Nigeria
                  </span>
                </motion.div>
                <motion.div 
                  className="flex items-start gap-3.5"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(195, 145, 32, 0.15)', border: '1px solid rgba(195, 145, 32, 0.2)' }}>
                    <Mail className="h-4 w-4 text-gold-light" strokeWidth={1.5} />
                  </div>
                  <a 
                    href="mailto:cccakokaparish@gmail.com" 
                    className="text-white/55 text-sm md:text-base hover:text-gold-light transition-colors duration-300"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    cccakokaparish@gmail.com
                  </a>
                </motion.div>
                <motion.div 
                  className="flex items-start gap-3.5"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(195, 145, 32, 0.15)', border: '1px solid rgba(195, 145, 32, 0.2)' }}>
                    <Phone className="h-4 w-4 text-gold-light" strokeWidth={1.5} />
                  </div>
                  <a 
                    href="tel:+2348033119288" 
                    className="text-white/55 text-sm md:text-base hover:text-gold-light transition-colors duration-300"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    +234 803 311 9288
                  </a>
                </motion.div>
              </div>
            </motion.div>

            {/* Service Times - Luxury Glass Card */}
            <motion.div variants={itemVariants}>
              <h4 
                className="text-[10px] md:text-xs font-semibold tracking-[0.18em] md:tracking-[0.22em] uppercase mb-5 md:mb-6"
                style={{ 
                  fontFamily: 'Outfit, sans-serif',
                  color: 'hsl(45 90% 62%)',
                }}
              >
                Service Times
              </h4>
              <motion.div 
                className="rounded-2xl p-5 md:p-6"
                style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(195, 145, 32, 0.15)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                }}
                whileHover={{ 
                  borderColor: "rgba(195, 145, 32, 0.35)",
                  boxShadow: "0 12px 48px rgba(195, 145, 32, 0.12)"
                }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-4 md:mb-5">
                  <p 
                    className="text-gold-light/85 text-[9px] md:text-[10px] tracking-[0.12em] md:tracking-[0.15em] uppercase font-semibold mb-1.5"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    Wednesday
                  </p>
                  <p className="text-white/70 text-sm md:text-base" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    9:00 AM – 10:00 AM
                  </p>
                </div>
                <div className="h-[1px] mb-4 md:mb-5" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(195, 145, 32, 0.25) 50%, transparent 100%)' }} />
                <div>
                  <p 
                    className="text-gold-light/85 text-[9px] md:text-[10px] tracking-[0.12em] md:tracking-[0.15em] uppercase font-semibold mb-1.5"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    Sunday
                  </p>
                  <p className="text-white/70 text-sm md:text-base" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    10:00 AM – 2:00 PM
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Social & Connect */}
            <motion.div variants={itemVariants}>
              <h4 
                className="text-[10px] md:text-xs font-semibold tracking-[0.18em] md:tracking-[0.22em] uppercase mb-5 md:mb-6"
                style={{ 
                  fontFamily: 'Outfit, sans-serif',
                  color: 'hsl(45 90% 62%)',
                }}
              >
                Follow Us
              </h4>
              <div className="flex flex-wrap gap-2.5 md:gap-3 mb-6 md:mb-8">
                {socials.map((social, index) => (
                  <motion.a 
                    key={social.label} 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-white/55 transition-all duration-400 touch-manipulation" 
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                    whileHover={{ 
                      y: -4, 
                      scale: 1.08,
                      background: 'linear-gradient(145deg, hsl(42 85% 50%) 0%, hsl(38 78% 40%) 100%)',
                      borderColor: 'transparent',
                      color: 'hsl(15 48% 14%)',
                    }}
                    whileTap={{ scale: 0.94 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    aria-label={social.label}
                  >
                    <social.icon className="h-4.5 w-4.5" />
                  </motion.a>
                ))}
              </div>
              <motion.a 
                href="mailto:cccakokaparish@gmail.com?subject=Donation Request"
                className="inline-flex items-center justify-center w-full px-5 md:px-7 py-3.5 font-semibold text-sm md:text-base rounded-xl transition-all duration-400 touch-manipulation"
                style={{ 
                  fontFamily: 'Outfit, sans-serif',
                  background: 'linear-gradient(145deg, hsl(45 90% 55%) 0%, hsl(42 85% 48%) 50%, hsl(38 78% 38%) 100%)',
                  color: 'hsl(15 48% 14%)',
                  boxShadow: '0 6px 24px rgba(195, 145, 32, 0.25)',
                }}
                whileHover={{ 
                  scale: 1.03, 
                  boxShadow: "0 12px 40px rgba(195, 145, 32, 0.35)" 
                }}
                whileTap={{ scale: 0.97 }}
              >
                Support Our Ministry
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Bottom Bar */}
          <motion.div 
            className="pt-8 md:pt-10 flex flex-col md:flex-row items-center justify-between gap-5"
            style={{
              borderTop: '1px solid rgba(195, 145, 32, 0.12)',
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <p 
              className="text-white/35 text-sm md:text-base text-center md:text-left"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              © {new Date().getFullYear()} Glade Cathedral — Celestial Church of Christ. All rights reserved.
            </p>
            <motion.button 
              onClick={scrollToTop} 
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-white/45 transition-all duration-300 text-[10px] md:text-xs tracking-[0.1em] uppercase font-medium touch-manipulation" 
              style={{ 
                fontFamily: 'Outfit, sans-serif',
                border: '1px solid rgba(195, 145, 32, 0.15)',
              }}
              whileHover={{ 
                y: -3, 
                borderColor: "rgba(195, 145, 32, 0.4)",
                color: 'hsl(45 90% 65%)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={1.5} />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
export default Footer;
