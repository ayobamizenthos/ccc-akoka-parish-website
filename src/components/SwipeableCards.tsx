import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSwipeNavigation } from '@/hooks/useSwipeNavigation';
import { useHapticFeedback } from '@/hooks/useHapticFeedback';

interface SwipeableCardsProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
}

function SwipeableCards<T>({
  items,
  renderItem,
  showDots = true,
  showArrows = false,
  className = '',
}: SwipeableCardsProps<T>) {
  const { trigger } = useHapticFeedback();
  const {
    currentIndex,
    swipeOffset,
    isSwiping,
    handlers,
    goTo,
    goNext,
    goPrev,
    canGoNext,
    canGoPrev,
  } = useSwipeNavigation({
    itemCount: items.length,
  });

  return (
    <div className={`relative ${className}`}>
      {/* Cards container */}
      <div
        className="overflow-hidden touch-pan-y"
        {...handlers}
      >
        <motion.div
          className="flex"
          animate={{
            x: `calc(-${currentIndex * 100}% + ${isSwiping ? swipeOffset : 0}px)`,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
            mass: 0.8,
          }}
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="w-full flex-shrink-0 px-2"
              animate={{
                scale: index === currentIndex ? 1 : 0.95,
                opacity: index === currentIndex ? 1 : 0.7,
              }}
              transition={{ duration: 0.3 }}
            >
              {renderItem(item, index)}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Navigation arrows (desktop) */}
      {showArrows && (
        <>
          <AnimatePresence>
            {canGoPrev && (
              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onClick={() => {
                  goPrev();
                  trigger('light');
                }}
                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 items-center justify-center rounded-full bg-background border border-border shadow-lg hover:border-primary/30 transition-colors z-10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </motion.button>
            )}
          </AnimatePresence>
          
          <AnimatePresence>
            {canGoNext && (
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onClick={() => {
                  goNext();
                  trigger('light');
                }}
                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 items-center justify-center rounded-full bg-background border border-border shadow-lg hover:border-primary/30 transition-colors z-10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </motion.button>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Dots indicator */}
      {showDots && items.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          {items.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                goTo(index);
                trigger('light');
              }}
              className={`relative h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-6 bg-primary' 
                  : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to slide ${index + 1}`}
            >
              {index === currentIndex && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary"
                  layoutId="activeDot"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      )}

      {/* Swipe hint for mobile */}
      <motion.div
        className="md:hidden flex items-center justify-center gap-1 mt-3 text-[10px] text-muted-foreground/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{ fontFamily: 'Outfit, sans-serif' }}
      >
        <ChevronLeft className="w-3 h-3" />
        <span>Swipe to navigate</span>
        <ChevronRight className="w-3 h-3" />
      </motion.div>
    </div>
  );
}

export default SwipeableCards;
