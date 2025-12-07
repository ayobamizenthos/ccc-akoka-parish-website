import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import PageHeader from "@/components/PageHeader";
import SEO from "@/components/SEO";
import PremiumLightbox from "@/components/PremiumLightbox";
import YouTubeLightbox from "@/components/YouTubeLightbox";
import { Play, ExternalLink, Music2, Video, Users, Mic2, Headphones, Camera, Film, Sparkles, Images, Youtube } from "lucide-react";

// Import streaming platform icons
import appleMusicIcon from '@/assets/apple-music-icon.png';
import audiomackIcon from '@/assets/audiomack-icon.png';
import boomplayIcon from '@/assets/boomplay-logo.png';
import youtubeIcon from '@/assets/youtube-music-icon.png';
import choirAlbumCover from '@/assets/choir-album-cover.webp';

// Import choir performance gallery images
import choirPerformance1 from '@/assets/choir-performance-1.png';
import choirPerformance2 from '@/assets/choir-performance-2.jpg';
import choirPerformance3 from '@/assets/choir-performance-3.png';
import choirPerformance4 from '@/assets/choir-performance-4.png';
import luliConcertPerformance from '@/assets/luli-concert-performance.png';

const galleryImages = [
  { src: choirPerformance1, alt: "The Glade Choir - Celestial Worship", title: "Celestial Worship", youtubeUrl: "https://www.youtube.com/@celestialchurchofchristako4088" },
  { src: choirPerformance2, alt: "The Glade Choir - Divine Performance", title: "Divine Performance", youtubeUrl: "https://www.youtube.com/@celestialchurchofchristako4088" },
  { src: luliConcertPerformance, alt: "The Glade Choir - Luli Concert Performance", title: "Luli Concert 4", youtubeUrl: "https://youtu.be/eRPkSgvCD9Y?si=OzL6-E6vKVajkQLw" },
  { src: choirPerformance3, alt: "The Glade Choir - Sunday Worship", title: "Sunday Worship", youtubeUrl: "https://www.youtube.com/@celestialchurchofchristako4088" },
  { src: choirPerformance4, alt: "The Glade Choir - Praise Session", title: "Praise Session", youtubeUrl: "https://www.youtube.com/@celestialchurchofchristako4088" },
];

const musicPlatforms = [
  { name: "Apple Music", url: "https://music.apple.com/us/album/lati-ona-jinjin-single/1656382813", icon: appleMusicIcon },
  { name: "Audiomack", url: "https://audiomack.com/ccc-akoka-parish-choir/song/lati-ona-jinjin-1", icon: audiomackIcon },
  { name: "Boomplay", url: "https://www.boomplay.com/songs/109557633", icon: boomplayIcon },
  { name: "YouTube Music", url: "https://www.youtube.com/watch?v=dJYeiEP2Zmo", icon: youtubeIcon }
];

const choirHighlights = [
  {
    title: "CCC Hymn 301 - Divine Worship",
    description: "Experience the power of celestial worship through this timeless hymn.",
    youtubeUrl: "https://www.youtube.com/watch?v=dJYeiEP2Zmo",
    thumbnail: "https://img.youtube.com/vi/dJYeiEP2Zmo/maxresdefault.jpg"
  },
  {
    title: "CCC Hymn 531 - Praise Celebration",
    description: "A joyous rendition that lifts spirits and glorifies the Most High.",
    youtubeUrl: "https://www.youtube.com/watch?v=pwySN4RoXBw",
    thumbnail: "https://img.youtube.com/vi/pwySN4RoXBw/maxresdefault.jpg"
  },
  {
    title: "CCC Hymn 775 - Spiritual Devotion",
    description: "Deep spiritual melodies that draw the soul closer to God.",
    youtubeUrl: "https://www.youtube.com/watch?v=9qa30Oambok",
    thumbnail: "https://img.youtube.com/vi/9qa30Oambok/maxresdefault.jpg"
  },
  {
    title: "Luli Concert 4 - Live Performance",
    description: "An unforgettable live concert showcasing our choir's excellence.",
    youtubeUrl: "https://youtu.be/eRPkSgvCD9Y?si=OzL6-E6vKVajkQLw",
    thumbnail: "https://img.youtube.com/vi/eRPkSgvCD9Y/maxresdefault.jpg"
  }
];

const mediaServices = [
  {
    icon: Video,
    title: "Live Streaming",
    description: "Professional broadcasting of all services to reach members worldwide, ensuring no one misses the Word of God."
  },
  {
    icon: Camera,
    title: "Event Coverage",
    description: "High-quality documentation of church events, ceremonies, and special occasions for lasting memories."
  },
  {
    icon: Film,
    title: "Video Production",
    description: "Creative video content including testimonials, documentaries, and promotional materials for the parish."
  },
  {
    icon: Headphones,
    title: "Sound Engineering",
    description: "Expert audio management ensuring crystal-clear sound for worship services and recordings."
  }
];

const ChoirMediaTeam = () => {
  const [activeTab, setActiveTab] = useState<'choir' | 'media'>('choir');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [videoLightboxOpen, setVideoLightboxOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState({ url: '', title: '' });
  const carouselRef = useRef<HTMLDivElement>(null);

  // Auto-scroll for mobile carousel
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let scrollInterval: NodeJS.Timeout;
    let isHovered = false;

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (!isHovered && carousel) {
          const maxScroll = carousel.scrollWidth - carousel.clientWidth;
          if (carousel.scrollLeft >= maxScroll - 10) {
            carousel.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            carousel.scrollBy({ left: 200, behavior: 'smooth' });
          }
        }
      }, 3000);
    };

    const handleMouseEnter = () => { isHovered = true; };
    const handleMouseLeave = () => { isHovered = false; };

    carousel.addEventListener('mouseenter', handleMouseEnter);
    carousel.addEventListener('mouseleave', handleMouseLeave);
    carousel.addEventListener('touchstart', handleMouseEnter);
    carousel.addEventListener('touchend', handleMouseLeave);

    startAutoScroll();

    return () => {
      clearInterval(scrollInterval);
      carousel.removeEventListener('mouseenter', handleMouseEnter);
      carousel.removeEventListener('mouseleave', handleMouseLeave);
      carousel.removeEventListener('touchstart', handleMouseEnter);
      carousel.removeEventListener('touchend', handleMouseLeave);
    };
  }, [activeTab]);

  const openGallery = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const openVideoLightbox = (url: string, title: string) => {
    setSelectedVideo({ url, title });
    setVideoLightboxOpen(true);
  };
  const choirMediaJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Choir & Media Team - CCC Akoka Parish",
    "description": "Celebrate the heart of our worship — where voices and visuals come alive. Meet our talented choir and creative media team.",
    "url": "https://cccakokaparish.org/choir-media"
  };

  return (
    <>
      <SEO
        title="Choir & Media Team - CCC Akoka Parish Glade Cathedral"
        description="Experience divine worship through our award-winning choir and professional media team. Listen to our viral music and explore our creative productions."
        url="/choir-media"
        image="/church-interior.jpg"
        jsonLd={choirMediaJsonLd}
      />
      <div className="min-h-screen bg-background">
        <Navigation />
        <BackButton />
      
        <PageHeader 
          badge="Our Teams"
          title="Choir &"
          titleHighlight="Media"
          description="Where divine voices and creative visuals unite to glorify God and inspire souls."
          icon={<Music2 className="w-3.5 h-3.5 text-gold" />}
        />

        {/* Navigation Tabs - Luxury Palantir Style */}
        <section className="py-8 bg-gradient-to-b from-[#0a0c10] to-[#0f1318]">
          <div className="container max-w-5xl mx-auto px-5 md:px-8">
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div 
                className="inline-flex rounded-2xl p-1.5"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                {[
                  { key: 'choir', label: 'The Choir', icon: Mic2 },
                  { key: 'media', label: 'Media Team', icon: Video }
                ].map(({ key, label, icon: Icon }) => (
                  <motion.button
                    key={key}
                    onClick={() => setActiveTab(key as typeof activeTab)}
                    className={`relative flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-medium tracking-wide transition-all overflow-hidden ${
                      activeTab === key 
                        ? 'text-[#0a1628]' 
                        : 'text-white/60 hover:text-white/90'
                    }`}
                    whileHover={{ scale: activeTab === key ? 1 : 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {activeTab === key && (
                      <motion.div
                        layoutId="activeTeamTab"
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background: 'linear-gradient(135deg, #D4AF37 0%, #F4D03F 50%, #D4AF37 100%)',
                          boxShadow: '0 8px 30px rgba(212,175,55,0.35), inset 0 1px 0 rgba(255,255,255,0.3)',
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <Icon className={`w-4 h-4 relative z-10 ${activeTab === key ? 'text-[#0a1628]' : ''}`} />
                    <span className="relative z-10">{label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <AnimatePresence mode="wait">
          {activeTab === 'choir' ? (
            <motion.div
              key="choir"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Featured Album - High Budget Music Advert */}
              <section className="py-10 md:py-16 bg-gradient-to-b from-background to-muted/20">
                <div className="container max-w-5xl mx-auto px-5 md:px-8">
                  <motion.div 
                    className="relative rounded-2xl md:rounded-3xl overflow-hidden group"
                    style={{
                      background: 'linear-gradient(145deg, rgba(10,22,40,0.98), rgba(15,30,55,0.95))',
                      boxShadow: '0 30px 80px rgba(0,0,0,0.2)',
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{
                      boxShadow: '0 40px 100px rgba(212,175,55,0.15)',
                    }}
                  >
                    {/* Background effects */}
                    <div 
                      className="absolute top-0 right-0 w-[400px] h-[400px] opacity-30"
                      style={{
                        background: 'radial-gradient(circle, rgba(212,175,55,0.4), transparent 60%)',
                        filter: 'blur(80px)',
                      }}
                    />
                    <div 
                      className="absolute bottom-0 left-0 w-[300px] h-[300px] opacity-20"
                      style={{
                        background: 'radial-gradient(circle, rgba(16,185,129,0.4), transparent 60%)',
                        filter: 'blur(60px)',
                      }}
                    />

                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{
                        background: 'linear-gradient(105deg, transparent 40%, rgba(212,175,55,0.1) 50%, transparent 60%)',
                      }}
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                    />
                    
                    <div className="relative z-10 flex flex-col md:flex-row">
                      {/* Album Cover with glow */}
                      <div className="relative w-full md:w-72 lg:w-80 aspect-square flex-shrink-0">
                        <img 
                          src={choirAlbumCover} 
                          alt="Lati Ona Jinjin - CCC Akoka Parish Choir" 
                          className="w-full h-full object-cover" 
                          loading="lazy" 
                        />
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background: 'radial-gradient(circle at center, rgba(212,175,55,0.25) 0%, transparent 70%)',
                          }}
                          animate={{ opacity: [0.3, 0.6, 0.3] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                        {/* Play overlay */}
                        <motion.a
                          href="https://www.youtube.com/watch?v=dJYeiEP2Zmo"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          whileHover={{ scale: 1.02 }}
                        >
                          <motion.div
                            className="w-20 h-20 rounded-full flex items-center justify-center"
                            style={{
                              background: 'linear-gradient(135deg, #D4AF37, #A07C32)',
                              boxShadow: '0 10px 40px rgba(212,175,55,0.5)',
                            }}
                            whileHover={{ scale: 1.1 }}
                          >
                            <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                          </motion.div>
                        </motion.a>
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1 p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-4">
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                          >
                            <Sparkles className="w-4 h-4 text-gold" />
                          </motion.div>
                          <span className="text-gold text-xs font-bold uppercase tracking-widest">
                            Viral Hit - Stream Now
                          </span>
                        </div>
                        
                        <h2 
                          className="text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-3"
                          style={{ fontFamily: 'Playfair Display, serif' }}
                        >
                          Lati Ona Jinjin
                        </h2>
                        <p 
                          className="text-white/60 text-sm md:text-base mb-6 max-w-md"
                          style={{ fontFamily: 'Outfit, sans-serif' }}
                        >
                          Our signature worship anthem that has touched hearts across the globe. Experience the divine presence through celestial harmonies.
                        </p>
                        
                        {/* Premium Streaming Links */}
                        <div className="flex flex-wrap gap-3">
                          {musicPlatforms.map((platform, index) => (
                            <motion.a
                              key={platform.name}
                              href={platform.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all overflow-hidden group/btn"
                              style={{
                                background: 'rgba(255,255,255,0.08)',
                                border: '1px solid rgba(255,255,255,0.1)',
                              }}
                              whileHover={{ 
                                scale: 1.03, 
                                y: -2,
                                background: 'rgba(212,175,55,0.15)',
                                borderColor: 'rgba(212,175,55,0.3)',
                              }}
                              whileTap={{ scale: 0.98 }}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <img 
                                src={platform.icon} 
                                alt={platform.name} 
                                className="w-5 h-5 object-contain" 
                              />
                              <span className="text-white/80 text-xs font-medium group-hover/btn:text-white transition-colors">
                                {platform.name}
                              </span>
                            </motion.a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* Choir Description */}
              <section className="py-10 md:py-14">
                <div className="container max-w-4xl mx-auto px-5 md:px-8 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <h3 
                      className="text-2xl md:text-3xl font-medium text-foreground mb-4"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      The Voice of Glade Cathedral
                    </h3>
                    <p 
                      className="text-muted-foreground leading-relaxed max-w-2xl mx-auto"
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                      Our choir is the heartbeat of worship at CCC Akoka Parish. With voices trained in the celestial tradition, 
                      we lift praises that transcend the ordinary and usher congregants into the presence of the Most High. 
                      From traditional hymns to contemporary spiritual songs, our music ministry creates an atmosphere where 
                      heaven meets earth.
                    </p>
                  </motion.div>
                </div>
              </section>

              {/* Performance Highlights */}
              <section className="py-10 md:py-14 bg-muted/20">
                <div className="container max-w-5xl mx-auto px-5 md:px-8">
                  <motion.div 
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <h3 
                      className="text-xl md:text-2xl font-medium text-foreground"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      Featured Performances
                    </h3>
                  </motion.div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    {choirHighlights.map((highlight, index) => (
                      <motion.button
                        key={highlight.title}
                        onClick={() => openVideoLightbox(highlight.youtubeUrl, highlight.title)}
                        className="group relative rounded-xl overflow-hidden text-left"
                        style={{
                          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5, boxShadow: '0 20px 50px rgba(212,175,55,0.15)' }}
                      >
                        <div className="aspect-video overflow-hidden">
                          <img 
                            src={highlight.thumbnail} 
                            alt={highlight.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        
                        {/* Overlay */}
                        <div 
                          className="absolute inset-0 flex flex-col justify-end p-3 md:p-4"
                          style={{
                            background: 'linear-gradient(180deg, transparent 30%, rgba(10,22,40,0.95) 100%)',
                          }}
                        >
                          {/* Play button */}
                          <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            initial={{ scale: 0.8, opacity: 0.7 }}
                            whileHover={{ scale: 1 }}
                          >
                            <motion.div
                              className="absolute inset-0 rounded-full"
                              style={{ background: 'rgba(212,175,55,0.3)' }}
                              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            <div 
                              className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center relative z-10"
                              style={{
                                background: 'linear-gradient(135deg, #D4AF37, #A07C32)',
                                boxShadow: '0 6px 20px rgba(212,175,55,0.4)',
                              }}
                            >
                              <Play className="w-4 h-4 md:w-5 md:h-5 text-white ml-0.5" fill="currentColor" />
                            </div>
                          </motion.div>

                          <h4 className="text-white text-xs md:text-sm font-medium mb-0.5 md:mb-1 line-clamp-1">{highlight.title}</h4>
                          <p className="text-white/60 text-[10px] md:text-xs line-clamp-1">{highlight.description}</p>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </section>

              {/* Performance Gallery - Auto-scrolling Carousel on Mobile */}
              <section className="py-10 md:py-14">
                <div className="container max-w-5xl mx-auto px-5 md:px-8">
                  <motion.div 
                    className="text-center mb-6 md:mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Images className="w-4 h-4 text-gold" />
                      <span className="text-gold text-xs font-bold uppercase tracking-widest">
                        Explore Gallery
                      </span>
                    </div>
                    <h3 
                      className="text-xl md:text-2xl font-medium text-foreground"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      Sacred Moments
                    </h3>
                  </motion.div>

                  {/* Mobile: Horizontal Auto-scrolling Carousel */}
                  <div className="md:hidden">
                    <div 
                      ref={carouselRef}
                      className="flex gap-3 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
                      style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                      }}
                    >
                      {galleryImages.map((image, index) => (
                        <motion.button
                          key={image.alt}
                          onClick={() => openVideoLightbox(image.youtubeUrl, image.title)}
                          className="group relative rounded-xl overflow-hidden flex-shrink-0 w-[75vw] aspect-[4/3] snap-center"
                          style={{
                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                          }}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.08 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <img 
                            src={image.src} 
                            alt={image.alt}
                            className="w-full h-full object-cover"
                          />
                          
                          {/* Premium Overlay with Play */}
                          <div 
                            className="absolute inset-0 flex items-center justify-center"
                            style={{
                              background: 'linear-gradient(180deg, rgba(10,22,40,0.1) 0%, rgba(10,22,40,0.6) 100%)',
                            }}
                          >
                            <motion.div
                              className="w-14 h-14 rounded-full flex items-center justify-center"
                              style={{
                                background: 'linear-gradient(135deg, #FF0000, #CC0000)',
                                boxShadow: '0 10px 30px rgba(255,0,0,0.4)',
                              }}
                            >
                              <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                            </motion.div>
                          </div>

                          {/* Title Badge */}
                          <div className="absolute bottom-3 left-3 right-3">
                            <div 
                              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                              style={{
                                background: 'rgba(0,0,0,0.7)',
                                backdropFilter: 'blur(10px)',
                              }}
                            >
                              <Youtube className="w-3 h-3 text-red-500" />
                              <span className="text-white text-xs font-medium">{image.title}</span>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                    
                    {/* Scroll indicator dots */}
                    <div className="flex justify-center gap-1.5 mt-3">
                      {galleryImages.map((_, index) => (
                        <div 
                          key={index}
                          className="w-1.5 h-1.5 rounded-full bg-white/20"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Desktop: Grid Layout */}
                  <div className="hidden md:grid md:grid-cols-3 gap-4">
                    {galleryImages.map((image, index) => (
                      <motion.button
                        key={image.alt}
                        onClick={() => openVideoLightbox(image.youtubeUrl, image.title)}
                        className="group relative rounded-xl overflow-hidden aspect-[4/3] cursor-pointer"
                        style={{
                          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.08 }}
                        whileHover={{ y: -4, boxShadow: '0 20px 50px rgba(212,175,55,0.18)' }}
                      >
                        <img 
                          src={image.src} 
                          alt={image.alt}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        
                        {/* Premium Overlay with Play */}
                        <div 
                          className="absolute inset-0 flex items-center justify-center"
                          style={{
                            background: 'linear-gradient(180deg, rgba(10,22,40,0.1) 0%, rgba(10,22,40,0.5) 100%)',
                          }}
                        >
                          <motion.div
                            className="w-16 h-16 rounded-full flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity"
                            style={{
                              background: 'linear-gradient(135deg, #FF0000, #CC0000)',
                              boxShadow: '0 10px 30px rgba(255,0,0,0.4)',
                            }}
                            whileHover={{ scale: 1.1 }}
                          >
                            <Play className="w-7 h-7 text-white ml-1" fill="currentColor" />
                          </motion.div>
                        </div>

                        {/* Title Badge */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <div 
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                            style={{
                              background: 'rgba(0,0,0,0.6)',
                              backdropFilter: 'blur(10px)',
                            }}
                          >
                            <Youtube className="w-3.5 h-3.5 text-red-500" />
                            <span className="text-white text-sm font-medium">{image.title}</span>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </section>

              {/* YouTube Channel - Grand CTA */}
              <section className="py-10 md:py-16">
                <div className="container max-w-4xl mx-auto px-5 md:px-8">
                  <motion.a
                    href="https://www.youtube.com/@thegladechoir/videos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block rounded-3xl overflow-hidden group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    {/* Background */}
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(135deg, #0a0c10 0%, #1a1f2e 50%, #0a0c10 100%)',
                      }}
                    />
                    
                    {/* Animated gradient overlay */}
                    <motion.div
                      className="absolute inset-0 opacity-60"
                      style={{
                        background: 'radial-gradient(ellipse at 30% 50%, rgba(212,175,55,0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(255,0,0,0.1) 0%, transparent 40%)',
                      }}
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.5, 0.7, 0.5],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />

                    {/* Border glow */}
                    <div 
                      className="absolute inset-0 rounded-3xl pointer-events-none"
                      style={{
                        border: '1px solid rgba(212,175,55,0.2)',
                        boxShadow: '0 0 80px rgba(212,175,55,0.15), inset 0 0 60px rgba(212,175,55,0.05)',
                      }}
                    />

                    <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                      {/* YouTube Icon */}
                      <motion.div 
                        className="relative flex-shrink-0"
                        animate={{ 
                          scale: [1, 1.05, 1],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <div 
                          className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center"
                          style={{
                            background: 'linear-gradient(135deg, #FF0000 0%, #CC0000 100%)',
                            boxShadow: '0 15px 50px rgba(255,0,0,0.4)',
                          }}
                        >
                          <Youtube className="w-10 h-10 md:w-12 md:h-12 text-white" />
                        </div>
                        {/* Pulse rings */}
                        <motion.div
                          className="absolute inset-0 rounded-2xl"
                          style={{ border: '2px solid rgba(255,0,0,0.4)' }}
                          animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.div>

                      <div className="flex-1 text-center md:text-left">
                        <span className="text-gold text-xs font-bold uppercase tracking-widest mb-2 block">
                          The Glade Choir
                        </span>
                        <h3 
                          className="text-2xl md:text-3xl lg:text-4xl font-medium text-white mb-3"
                          style={{ fontFamily: 'Playfair Display, serif' }}
                        >
                          Watch Our Performances
                        </h3>
                        <p className="text-white/60 text-sm md:text-base max-w-md">
                          Subscribe to our YouTube channel for exclusive worship sessions, hymns, and celestial performances.
                        </p>
                      </div>

                      {/* CTA Button */}
                      <motion.div
                        className="flex items-center gap-3 px-6 py-3 rounded-full"
                        style={{
                          background: 'linear-gradient(135deg, #D4AF37, #A07C32)',
                          boxShadow: '0 10px 30px rgba(212,175,55,0.4)',
                        }}
                        whileHover={{ scale: 1.05, boxShadow: '0 15px 40px rgba(212,175,55,0.5)' }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="text-[#0a1628] font-semibold text-sm">Subscribe Now</span>
                        <ExternalLink className="w-4 h-4 text-[#0a1628]" />
                      </motion.div>
                    </div>
                  </motion.a>
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="media"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Media Team Hero Section - International High Budget */}
              <section className="relative py-16 md:py-24 overflow-hidden">
                {/* Premium Dark Background with Gradient */}
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(180deg, #0a0c10 0%, #0d1118 50%, #0a0c10 100%)',
                  }}
                />
                
                {/* Animated Tech Grid Pattern */}
                <motion.div 
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px',
                  }}
                  animate={{
                    backgroundPosition: ['0px 0px', '60px 60px'],
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />
                
                {/* Glowing Orbs */}
                <motion.div
                  className="absolute top-20 left-1/4 w-[400px] h-[400px] pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 60%)',
                    filter: 'blur(80px)',
                  }}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-20 right-1/4 w-[300px] h-[300px] pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 60%)',
                    filter: 'blur(60px)',
                  }}
                  animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 10, repeat: Infinity, delay: 2 }}
                />

                <div className="container max-w-5xl mx-auto px-5 md:px-8 relative z-10">
                  {/* Header */}
                  <motion.div
                    className="text-center mb-14"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <motion.div 
                      className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-6"
                      style={{
                        background: 'rgba(212,175,55,0.1)',
                        border: '1px solid rgba(212,175,55,0.2)',
                      }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                      >
                        <Video className="w-4 h-4 text-gold" />
                      </motion.div>
                      <span className="text-gold text-xs font-bold uppercase tracking-widest">
                        World-Class Media Production
                      </span>
                    </motion.div>
                    <h3 
                      className="text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-4"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      Broadcast <span className="text-gold">Excellence</span>
                    </h3>
                    <p 
                      className="text-white/50 leading-relaxed max-w-2xl mx-auto text-base md:text-lg"
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                      Our internationally-equipped media team delivers cinematic quality production, 
                      broadcasting the divine presence to millions across the globe.
                    </p>
                  </motion.div>

                  {/* Equipment Stats Row */}
                  <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    {[
                      { label: '4K+', sublabel: 'Resolution', icon: '◈' },
                      { label: 'PRO', sublabel: 'Audio Setup', icon: '◎' },
                      { label: 'LIVE', sublabel: 'Broadcasting', icon: '▸' },
                      { label: '24/7', sublabel: 'Content', icon: '✦' },
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        className="relative rounded-2xl p-5 text-center group"
                        style={{
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid rgba(255,255,255,0.06)',
                        }}
                        whileHover={{ 
                          borderColor: 'rgba(212,175,55,0.3)',
                          background: 'rgba(212,175,55,0.05)',
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <motion.span 
                          className="text-gold/30 text-xs mb-2 block"
                          animate={{ opacity: [0.3, 0.6, 0.3] }}
                          transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                        >
                          {stat.icon}
                        </motion.span>
                        <div 
                          className="text-2xl md:text-3xl font-bold text-white mb-1"
                          style={{ fontFamily: 'Outfit, sans-serif' }}
                        >
                          {stat.label}
                        </div>
                        <div className="text-white/40 text-xs uppercase tracking-wider">
                          {stat.sublabel}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Services Grid - Premium Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                    {mediaServices.map((service, index) => (
                      <motion.div
                        key={service.title}
                        className="relative rounded-2xl overflow-hidden group"
                        style={{
                          background: 'linear-gradient(165deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                          border: '1px solid rgba(255,255,255,0.06)',
                        }}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ 
                          y: -5, 
                          borderColor: 'rgba(212,175,55,0.3)',
                          boxShadow: '0 30px 60px rgba(0,0,0,0.3), 0 0 40px rgba(212,175,55,0.1)',
                        }}
                      >
                        {/* Shimmer Effect */}
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                          style={{
                            background: 'linear-gradient(105deg, transparent 40%, rgba(212,175,55,0.08) 50%, transparent 60%)',
                          }}
                          animate={{ x: ['-100%', '200%'] }}
                          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                        />
                        
                        {/* Top accent line */}
                        <motion.div 
                          className="absolute top-0 left-0 right-0 h-[2px]"
                          style={{
                            background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)',
                          }}
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                        />

                        <div className="relative z-10 p-6 md:p-8">
                          {/* Icon with glow */}
                          <motion.div 
                            className="relative w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                            style={{
                              background: 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.08))',
                              border: '1px solid rgba(212,175,55,0.25)',
                            }}
                            whileHover={{ scale: 1.05 }}
                          >
                            <motion.div
                              className="absolute inset-0 rounded-xl"
                              style={{
                                background: 'radial-gradient(circle, rgba(212,175,55,0.3), transparent 70%)',
                                filter: 'blur(10px)',
                              }}
                              animate={{ opacity: [0.3, 0.6, 0.3] }}
                              transition={{ duration: 3, repeat: Infinity }}
                            />
                            <service.icon className="w-6 h-6 text-gold relative z-10" />
                          </motion.div>
                          
                          <h4 
                            className="text-lg md:text-xl font-medium text-white mb-3"
                            style={{ fontFamily: 'Playfair Display, serif' }}
                          >
                            {service.title}
                          </h4>
                          <p 
                            className="text-white/50 text-sm leading-relaxed"
                            style={{ fontFamily: 'Outfit, sans-serif' }}
                          >
                            {service.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* YouTube Channel Grand CTA */}
              <section className="py-12 md:py-20 bg-background">
                <div className="container max-w-4xl mx-auto px-5 md:px-8">
                  <motion.a
                    href="https://youtube.com/@celestialchurchofchristako4088"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block rounded-3xl overflow-hidden group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    {/* Background */}
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(135deg, #0a0c10 0%, #1a1f2e 50%, #0a0c10 100%)',
                      }}
                    />
                    
                    {/* Animated gradient overlay */}
                    <motion.div
                      className="absolute inset-0 opacity-60"
                      style={{
                        background: 'radial-gradient(ellipse at 30% 50%, rgba(255,0,0,0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(212,175,55,0.1) 0%, transparent 40%)',
                      }}
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.5, 0.7, 0.5],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />

                    {/* Border glow */}
                    <div 
                      className="absolute inset-0 rounded-3xl pointer-events-none"
                      style={{
                        border: '1px solid rgba(255,0,0,0.2)',
                        boxShadow: '0 0 80px rgba(255,0,0,0.1), inset 0 0 60px rgba(212,175,55,0.05)',
                      }}
                    />

                    <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                      {/* YouTube Icon */}
                      <motion.div 
                        className="relative flex-shrink-0"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <div 
                          className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center"
                          style={{
                            background: 'linear-gradient(135deg, #FF0000 0%, #CC0000 100%)',
                            boxShadow: '0 15px 50px rgba(255,0,0,0.4)',
                          }}
                        >
                          <Youtube className="w-10 h-10 md:w-12 md:h-12 text-white" />
                        </div>
                        <motion.div
                          className="absolute inset-0 rounded-2xl"
                          style={{ border: '2px solid rgba(255,0,0,0.4)' }}
                          animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.div>

                      <div className="flex-1 text-center md:text-left">
                        <span className="text-gold text-xs font-bold uppercase tracking-widest mb-2 block">
                          Official Church Channel
                        </span>
                        <h3 
                          className="text-2xl md:text-3xl lg:text-4xl font-medium text-white mb-3"
                          style={{ fontFamily: 'Playfair Display, serif' }}
                        >
                          Watch Live Services
                        </h3>
                        <p className="text-white/60 text-sm md:text-base max-w-md">
                          Subscribe for live broadcasts, sermons, and exclusive spiritual content from Glade Cathedral.
                        </p>
                      </div>

                      {/* CTA Button */}
                      <motion.div
                        className="flex items-center gap-3 px-6 py-3 rounded-full"
                        style={{
                          background: 'linear-gradient(135deg, #FF0000, #CC0000)',
                          boxShadow: '0 10px 30px rgba(255,0,0,0.4)',
                        }}
                        whileHover={{ scale: 1.05, boxShadow: '0 15px 40px rgba(255,0,0,0.5)' }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="text-white font-semibold text-sm">Subscribe Now</span>
                        <ExternalLink className="w-4 h-4 text-white" />
                      </motion.div>
                    </div>
                  </motion.a>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Premium Lightbox */}
        <PremiumLightbox
          images={galleryImages}
          currentIndex={lightboxIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setLightboxIndex}
        />

        {/* YouTube Video Lightbox */}
        <YouTubeLightbox
          isOpen={videoLightboxOpen}
          onClose={() => setVideoLightboxOpen(false)}
          videoUrl={selectedVideo.url}
          title={selectedVideo.title}
        />

        <Footer />
      </div>
    </>
  );
};

export default ChoirMediaTeam;
