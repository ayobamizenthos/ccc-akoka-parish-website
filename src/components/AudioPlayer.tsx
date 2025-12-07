import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, X } from "lucide-react";
import choirAlbumCover from "@/assets/choir-album-cover.webp";

interface AudioPlayerProps {
  isOpen: boolean;
  onClose: () => void;
}

// Premium waveform visualization
const Waveform = ({ isPlaying }: { isPlaying: boolean }) => (
  <div className="flex items-center gap-[2px] h-4">
    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
      <motion.div
        key={i}
        className="w-[3px] rounded-full"
        style={{ background: 'linear-gradient(180deg, #D4AF37, #A07C32)' }}
        animate={isPlaying ? {
          height: ['30%', '100%', '50%', '80%', '30%'],
        } : { height: '30%' }}
        transition={{
          duration: 0.6,
          repeat: isPlaying ? Infinity : 0,
          delay: i * 0.05,
          ease: "easeInOut"
        }}
      />
    ))}
  </div>
);

const AudioPlayer = ({ isOpen, onClose }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Audio source - Using a reliable public domain audio sample
  // Note: For actual choir music, you need to provide a direct audio file URL or host the audio file
  const audioSrc = "https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg";

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioSrc);
      audioRef.current.preload = "metadata";
    }

    const audio = audioRef.current;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };
    const handleEnded = () => setIsPlaying(false);
    const handleWaiting = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  const togglePlay = useCallback(async () => {
    if (!audioRef.current) return;
    
    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Audio playback error:', error);
      setIsLoading(false);
    }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !progressRef.current) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newTime = clickPosition * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  }, [duration]);

  const skip = useCallback((seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.min(
      Math.max(audioRef.current.currentTime + seconds, 0),
      duration
    );
  }, [duration]);

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  // Pause on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 20, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed bottom-20 right-4 z-[55] w-[300px] md:w-[340px]"
        >
          {/* Glass morphism container */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, rgba(10,22,40,0.97), rgba(15,30,55,0.95))',
              border: '1px solid rgba(212,175,55,0.25)',
              boxShadow: '0 25px 80px rgba(0,0,0,0.5), 0 0 60px rgba(212,175,55,0.1)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(120deg, transparent 30%, rgba(212,175,55,0.08) 50%, transparent 70%)',
              }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
            />

            {/* Close button */}
            <motion.button
              onClick={onClose}
              className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
              whileHover={{ scale: 1.1, background: 'rgba(239,68,68,0.2)' }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-4 h-4 text-white/70" />
            </motion.button>

            {/* Album art and info */}
            <div className="flex items-center gap-4 p-4">
              {/* Album cover with glow */}
              <motion.div 
                className="relative flex-shrink-0"
                animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 8, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
              >
                <div
                  className="absolute -inset-1 rounded-xl opacity-60"
                  style={{
                    background: 'radial-gradient(circle, rgba(212,175,55,0.4), transparent 70%)',
                    filter: 'blur(8px)',
                  }}
                />
                <img
                  src={choirAlbumCover}
                  alt="Lati Ona Jinjin"
                  className="w-16 h-16 rounded-xl object-cover relative z-10"
                  style={{ boxShadow: '0 8px 25px rgba(0,0,0,0.4)' }}
                />
                {/* Vinyl effect ring */}
                <div 
                  className="absolute inset-0 rounded-xl"
                  style={{
                    border: '2px solid rgba(212,175,55,0.3)',
                  }}
                />
              </motion.div>

              {/* Track info */}
              <div className="flex-1 min-w-0 pr-6">
                <motion.h4
                  className="text-white font-medium text-sm truncate mb-1"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Lati Ona Jinjin
                </motion.h4>
                <p
                  className="text-white/50 text-xs truncate"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  CCC Akoka Parish Choir
                </p>
                {/* Waveform visualization */}
                <div className="mt-2">
                  <Waveform isPlaying={isPlaying} />
                </div>
              </div>
            </div>

            {/* Progress bar - clickable */}
            <div className="px-4 pb-2">
              <div
                ref={progressRef}
                className="relative h-2 rounded-full cursor-pointer group"
                style={{ background: 'rgba(255,255,255,0.1)' }}
                onClick={handleProgressClick}
              >
                {/* Progress fill */}
                <motion.div
                  className="absolute top-0 left-0 h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #A07C32, #D4AF37, #FFF8E1)',
                  }}
                />
                {/* Scrubber handle */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    left: `${progress}%`,
                    transform: 'translate(-50%, -50%)',
                    background: 'linear-gradient(135deg, #FFF8E1, #D4AF37)',
                    boxShadow: '0 2px 10px rgba(212,175,55,0.5)',
                  }}
                />
              </div>
              
              {/* Time display */}
              <div className="flex justify-between mt-1.5">
                <span className="text-[10px] text-white/40" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {formatTime(currentTime)}
                </span>
                <span className="text-[10px] text-white/40" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {formatTime(duration)}
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 px-4 pb-4">
              {/* Skip back */}
              <motion.button
                onClick={() => skip(-10)}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
                whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.12)' }}
                whileTap={{ scale: 0.95 }}
              >
                <SkipBack className="w-4 h-4 text-white/70" />
              </motion.button>

              {/* Play/Pause - main button */}
              <motion.button
                onClick={togglePlay}
                className="relative w-14 h-14 rounded-full flex items-center justify-center overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, #A07C32, #D4AF37, #FFF8E1)',
                  boxShadow: '0 8px 30px rgba(212,175,55,0.4)',
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                disabled={isLoading}
              >
                {/* Shimmer */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)',
                  }}
                  animate={{ x: ['-150%', '150%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                />
                
                {isLoading ? (
                  <motion.div
                    className="w-5 h-5 border-2 border-[#0a1628] border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : isPlaying ? (
                  <Pause className="w-6 h-6 text-[#0a1628] relative z-10" fill="currentColor" />
                ) : (
                  <Play className="w-6 h-6 text-[#0a1628] ml-0.5 relative z-10" fill="currentColor" />
                )}
              </motion.button>

              {/* Skip forward */}
              <motion.button
                onClick={() => skip(10)}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
                whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.12)' }}
                whileTap={{ scale: 0.95 }}
              >
                <SkipForward className="w-4 h-4 text-white/70" />
              </motion.button>

              {/* Mute toggle */}
              <motion.button
                onClick={toggleMute}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
                whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.12)' }}
                whileTap={{ scale: 0.95 }}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-white/70" />
                ) : (
                  <Volume2 className="w-4 h-4 text-white/70" />
                )}
              </motion.button>
            </div>

            {/* Glow ring at bottom */}
            <div 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px]"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AudioPlayer;
