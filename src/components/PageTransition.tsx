import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      staggerChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.99,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <>
      {/* Premium cinematic wipe transition */}
      <motion.div
        className="fixed inset-0 z-50 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, hsl(210 40% 8%) 0%, hsl(210 45% 12%) 50%, hsl(210 40% 8%) 100%)',
        }}
        initial={{ scaleY: 1, originY: 0 }}
        animate={{ 
          scaleY: 0, 
          originY: 0,
          transition: { 
            duration: 0.6, 
            ease: [0.76, 0, 0.24, 1],
            delay: 0.1
          }
        }}
        exit={{ 
          scaleY: 1,
          originY: 1,
          transition: { 
            duration: 0.5, 
            ease: [0.76, 0, 0.24, 1],
          }
        }}
      >
        {/* Gold accent line that sweeps across */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, hsl(42 85% 50%) 20%, hsl(48 92% 68%) 50%, hsl(42 85% 50%) 80%, transparent 100%)',
            boxShadow: '0 0 30px rgba(212,175,55,0.6), 0 0 60px rgba(212,175,55,0.3)',
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ 
            scaleX: 1, 
            opacity: 1,
            transition: { duration: 0.4, ease: "easeOut" }
          }}
          exit={{ 
            scaleX: 0, 
            opacity: 0,
            transition: { duration: 0.3 }
          }}
        />
        
        {/* Celestial particles during transition */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: '50%',
              background: 'radial-gradient(circle, hsl(42 85% 60%) 0%, transparent 70%)',
              boxShadow: '0 0 10px rgba(212,175,55,0.8)',
            }}
            initial={{ opacity: 0, y: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              y: [-30, 0, 30],
              scale: [0, 1, 0],
              transition: { 
                duration: 0.8, 
                delay: 0.05 + i * 0.04,
                ease: "easeOut"
              }
            }}
          />
        ))}
        
        {/* Divine glow orb */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.3) 0%, rgba(212,175,55,0.1) 40%, transparent 70%)',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 2, 3],
            opacity: [0, 0.8, 0],
            transition: { duration: 0.7, ease: "easeOut" }
          }}
        />
      </motion.div>
      
      {/* Content with smooth entrance */}
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageTransition;