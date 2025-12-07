import { motion } from "framer-motion";
import akokaGladeLogo from "@/assets/akoka-glade-logo.png";

const LoadingAnimation = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        background: "linear-gradient(180deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)",
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Radial gold glow */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          background: "radial-gradient(ellipse at center, rgba(212,175,55,0.12) 0%, transparent 60%)",
        }}
      />

      {/* Central Content */}
      <div className="relative z-10 text-center">
        {/* Logo with Glow */}
        <motion.div
          className="relative mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Glow Ring */}
          <motion.div
            className="absolute inset-0 -m-4"
            style={{ 
              background: 'radial-gradient(circle, rgba(212,175,55,0.25) 0%, transparent 70%)',
              filter: 'blur(15px)',
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Logo */}
          <motion.img
            src={akokaGladeLogo}
            alt="Akoka Parish Glade Cathedral"
            className="h-16 sm:h-20 w-auto object-contain relative z-10 mx-auto"
            style={{
              filter: 'drop-shadow(0 0 15px rgba(212,175,55,0.4))',
            }}
            animate={{
              scale: [1, 1.03, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-[10px] sm:text-xs tracking-[0.2em] uppercase font-semibold mb-5"
          style={{ 
            fontFamily: 'Outfit, sans-serif',
            background: 'linear-gradient(90deg, #A07C32, #FFF8E1, #D4AF37)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          The Last Ark of Salvation
        </motion.p>

        {/* Loading Indicator */}
        <motion.div
          className="flex justify-center items-center gap-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #A07C32, #FFF8E1)',
              }}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.7,
                repeat: Infinity,
                delay: index * 0.12,
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingAnimation;