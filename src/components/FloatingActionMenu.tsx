import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Heart, Phone, Video, Mail, MapPin } from "lucide-react";

interface ActionItem {
  icon: React.ReactNode;
  label: string;
  gradient: string;
  action: () => void;
}

interface FloatingActionMenuProps {
  isVisible?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

const FloatingActionMenu = memo(({ isVisible = true, onOpenChange }: FloatingActionMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const goldGradient = "linear-gradient(145deg, #A07C32 0%, #D4AF37 25%, #FFF8E1 50%, #D4AF37 75%, #A07C32 100%)";

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onOpenChange?.(newState);
  };

  const handleAction = (action: () => void) => {
    action();
    setIsOpen(false);
    onOpenChange?.(false);
  };

  const actions: ActionItem[] = [
    {
      icon: <Video className="w-5 h-5" strokeWidth={2} />,
      label: "Live Stream",
      gradient: "linear-gradient(135deg, #DC2626, #EF4444)",
      action: () => window.open("https://youtube.com/@celestialchurchofchristako4088", "_blank"),
    },
    {
      icon: <Heart className="w-5 h-5" strokeWidth={2} />,
      label: "Donate",
      gradient: "linear-gradient(135deg, #A07C32, #D4AF37)",
      action: () => window.location.href = "mailto:cccakokaparish@gmail.com?subject=Donation Request",
    },
    {
      icon: <Phone className="w-5 h-5" strokeWidth={2} />,
      label: "Call Us",
      gradient: "linear-gradient(135deg, #059669, #10B981)",
      action: () => window.location.href = "tel:+2348033119288",
    },
    {
      icon: <Mail className="w-5 h-5" strokeWidth={2} />,
      label: "Email",
      gradient: "linear-gradient(135deg, #7C3AED, #8B5CF6)",
      action: () => window.location.href = "mailto:cccakokaparish@gmail.com",
    },
    {
      icon: <MapPin className="w-5 h-5" strokeWidth={2} />,
      label: "Directions",
      gradient: "linear-gradient(135deg, #2563EB, #3B82F6)",
      action: () => window.open("https://maps.google.com/?q=3+Afolabi-Brown+Street+Akoka+Lagos+Nigeria", "_blank"),
    },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="relative"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Action Items */}
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 -z-10 bg-black/60 backdrop-blur-sm"
                  onClick={() => setIsOpen(false)}
                />
                
                {/* Action Buttons */}
                <div className="absolute bottom-16 right-0 flex flex-col gap-3 items-end">
                  {actions.map((item, index) => (
                    <motion.button
                      key={item.label}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleAction(item.action)}
                      className="group flex items-center gap-3 touch-manipulation hover:scale-105 transition-transform"
                    >
                      <span 
                        className="px-4 py-2 rounded-full text-sm font-semibold text-white whitespace-nowrap"
                        style={{
                          fontFamily: "Outfit, sans-serif",
                          background: 'rgba(255,255,255,0.1)',
                          border: '1px solid rgba(255,255,255,0.15)',
                        }}
                      >
                        {item.label}
                      </span>
                      
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                        style={{
                          background: item.gradient,
                          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                        }}
                      >
                        {item.icon}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </>
            )}
          </AnimatePresence>

          {/* Main FAB Button */}
          <motion.button
            onClick={handleToggle}
            className="relative w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center touch-manipulation"
            style={{
              background: isOpen ? "#1a1a2e" : goldGradient,
              boxShadow: isOpen
                ? "0 4px 16px rgba(0, 0, 0, 0.3)"
                : "0 6px 24px rgba(160, 124, 50, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white" strokeWidth={2.5} />
            ) : (
              <Plus className="w-5 h-5 md:w-7 md:h-7 text-[#0a1628]" strokeWidth={2.5} />
            )}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

FloatingActionMenu.displayName = "FloatingActionMenu";

export default FloatingActionMenu;
