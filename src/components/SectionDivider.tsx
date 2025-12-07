import { motion } from "framer-motion";
import { Cross } from "lucide-react";
import { memo } from "react";

interface SectionDividerProps {
  variant?: "gold" | "teal" | "celestial";
  showCross?: boolean;
}

const SectionDivider = memo(({ variant = "celestial", showCross = true }: SectionDividerProps) => {
  const gradients = {
    gold: "linear-gradient(90deg, transparent, rgba(212,175,55,0.6), rgba(255,248,225,0.8), rgba(212,175,55,0.6), transparent)",
    teal: "linear-gradient(90deg, transparent, rgba(70,120,135,0.6), rgba(16,185,129,0.5), rgba(70,120,135,0.6), transparent)",
    celestial: "linear-gradient(90deg, transparent, rgba(70,120,135,0.5), rgba(212,175,55,0.6), rgba(70,120,135,0.5), transparent)",
  };

  const glowColors = {
    gold: "rgba(212,175,55,0.3)",
    teal: "rgba(16,185,129,0.3)",
    celestial: "rgba(212,175,55,0.25)",
  };

  return (
    <div className="relative py-8 md:py-12 overflow-hidden">
      {/* Main divider line */}
      <div className="relative flex items-center justify-center">
        {/* Left decorative dots */}
        <motion.div 
          className="flex items-center gap-2 mr-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="rounded-full"
              style={{
                width: 4 + i * 2,
                height: 4 + i * 2,
                background: variant === "gold" ? "#D4AF37" : variant === "teal" ? "#10B981" : "#467887",
                opacity: 0.4 + i * 0.2,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4 + i * 0.2, 0.7 + i * 0.1, 0.4 + i * 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>

        {/* Left line */}
        <motion.div 
          className="flex-1 h-[1px] max-w-[200px] md:max-w-[300px]"
          style={{ background: gradients[variant] }}
          initial={{ scaleX: 0, originX: 1 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        {/* Center element */}
        {showCross ? (
          <motion.div 
            className="relative mx-4 md:mx-6"
            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
          >
            {/* Glow ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle, ${glowColors[variant]}, transparent 70%)`,
                filter: "blur(10px)",
                transform: "scale(2.5)",
              }}
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scale: [2.5, 3, 2.5],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            {/* Diamond container */}
            <div 
              className="relative w-10 h-10 md:w-12 md:h-12 rotate-45 flex items-center justify-center"
              style={{
                background: variant === "gold" 
                  ? "linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.05))"
                  : variant === "teal"
                  ? "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.05))"
                  : "linear-gradient(135deg, rgba(70,120,135,0.2), rgba(212,175,55,0.1))",
                border: variant === "gold" 
                  ? "1px solid rgba(212,175,55,0.4)"
                  : variant === "teal"
                  ? "1px solid rgba(16,185,129,0.4)"
                  : "1px solid rgba(70,120,135,0.4)",
                borderRadius: "4px",
              }}
            >
              <Cross 
                className="-rotate-45" 
                style={{ 
                  color: variant === "gold" ? "#D4AF37" : variant === "teal" ? "#10B981" : "#467887",
                  width: 16,
                  height: 16,
                }}
                strokeWidth={1.5}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div 
            className="mx-4 md:mx-6"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <motion.div
              className="w-3 h-3 rounded-full"
              style={{
                background: variant === "gold" 
                  ? "linear-gradient(135deg, #D4AF37, #FFF8E1)"
                  : variant === "teal"
                  ? "linear-gradient(135deg, #10B981, #6EE7B7)"
                  : "linear-gradient(135deg, #467887, #D4AF37)",
                boxShadow: `0 0 20px ${glowColors[variant]}`,
              }}
              animate={{
                boxShadow: [
                  `0 0 20px ${glowColors[variant]}`,
                  `0 0 35px ${glowColors[variant]}`,
                  `0 0 20px ${glowColors[variant]}`,
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        )}

        {/* Right line */}
        <motion.div 
          className="flex-1 h-[1px] max-w-[200px] md:max-w-[300px]"
          style={{ background: gradients[variant] }}
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        {/* Right decorative dots */}
        <motion.div 
          className="flex items-center gap-2 ml-4"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="rounded-full"
              style={{
                width: 8 - i * 2,
                height: 8 - i * 2,
                background: variant === "gold" ? "#D4AF37" : variant === "teal" ? "#10B981" : "#467887",
                opacity: 0.8 - i * 0.2,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8 - i * 0.2, 0.9 - i * 0.1, 0.8 - i * 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Subtle ambient glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[60px] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse, ${glowColors[variant]}, transparent 70%)`,
          filter: "blur(30px)",
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </div>
  );
});

SectionDivider.displayName = "SectionDivider";

export default SectionDivider;
