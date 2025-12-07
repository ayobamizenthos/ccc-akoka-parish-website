import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music } from "lucide-react";
import AudioPlayer from "./AudioPlayer";

interface FloatingChoirButtonProps {
  isVisible?: boolean;
  hideForMenu?: boolean;
}

const FloatingChoirButton = memo(({ isVisible = true, hideForMenu = false }: FloatingChoirButtonProps) => {
  const [audioPlayerOpen, setAudioPlayerOpen] = useState(false);

  const goldGradient = "linear-gradient(145deg, #A07C32 0%, #D4AF37 25%, #FFF8E1 50%, #D4AF37 75%, #A07C32 100%)";

  return (
    <>
      <AnimatePresence>
        {isVisible && !hideForMenu && (
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.button
              onClick={() => setAudioPlayerOpen(!audioPlayerOpen)}
              className="relative w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center touch-manipulation"
              style={{
                background: goldGradient,
                boxShadow: "0 6px 24px rgba(160, 124, 50, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div 
                className="w-7 h-7 md:w-10 md:h-10 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(180deg, #1a1a2e 0%, #0d0d1a 100%)",
                }}
              >
                <Music className="w-4 h-4 md:w-5 md:h-5 text-gold" />
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AudioPlayer isOpen={audioPlayerOpen} onClose={() => setAudioPlayerOpen(false)} />
    </>
  );
});

FloatingChoirButton.displayName = "FloatingChoirButton";

export default FloatingChoirButton;
