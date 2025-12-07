import { useState, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, CreditCard, Star, Cross, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import MobileGlassCard from "./MobileGlassCard";

const stripePromise = loadStripe("pk_test_your_stripe_publishable_key_here");

const DonationForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState("one-time");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const presetAmounts = [25, 50, 100, 250];

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "Donation Successful",
        description: `Thank you for your ${frequency} donation of $${amount}!`,
      });
      setAmount("");
      setName("");
      setEmail("");
      setFrequency("one-time");
    } catch {
      toast({
        title: "Payment Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 md:space-y-7">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-foreground-soft text-xs md:text-sm font-semibold">Full Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="John Doe"
            className="h-12 md:h-14 rounded-xl border-2 border-border bg-background-ivory focus:border-gold focus:ring-gold/20 text-sm md:text-base"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground-soft text-xs md:text-sm font-semibold">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="john@example.com"
            className="h-12 md:h-14 rounded-xl border-2 border-border bg-background-ivory focus:border-gold focus:ring-gold/20 text-sm md:text-base"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="frequency" className="text-foreground-soft text-xs md:text-sm font-semibold">Donation Frequency</Label>
        <Select value={frequency} onValueChange={setFrequency}>
          <SelectTrigger className="h-12 md:h-14 rounded-xl border-2 border-border bg-background-ivory focus:border-gold text-sm md:text-base">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-2 border-border">
            <SelectItem value="one-time" className="py-3">One-time</SelectItem>
            <SelectItem value="monthly" className="py-3">Monthly</SelectItem>
            <SelectItem value="yearly" className="py-3">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount" className="text-foreground-soft text-xs md:text-sm font-semibold">Custom Amount ($)</Label>
        <Input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          placeholder="Enter amount"
          min="1"
          step="0.01"
          className="h-12 md:h-14 rounded-xl border-2 border-border bg-background-ivory focus:border-gold focus:ring-gold/20 text-sm md:text-base"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-foreground-soft text-xs md:text-sm font-semibold">Payment Information</Label>
        <div className="p-4 md:p-5 border-2 border-border rounded-xl bg-background-ivory">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: 'hsl(12, 45%, 25%)',
                  '::placeholder': { color: 'hsl(25, 15%, 55%)' },
                },
                invalid: { color: '#9e2146' },
              },
            }}
          />
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={!stripe || isProcessing}
        className="btn-gold w-full h-14 md:h-16 text-sm md:text-lg flex items-center justify-center gap-3 touch-manipulation"
        whileHover={{ scale: 1.02, boxShadow: "0 12px 40px rgba(148, 115, 55, 0.3)" }}
        whileTap={{ scale: 0.98 }}
      >
        {isProcessing ? (
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Processing...
          </motion.span>
        ) : (
          <>
            <Heart className="h-4 w-4 md:h-5 md:w-5" />
            <span>Give Now</span>
          </>
        )}
      </motion.button>
    </form>
  );
};

const DonationSystem = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.7, 0.3]);

  return (
    <section 
      ref={sectionRef}
      id="donate" 
      className="py-14 md:py-24 lg:py-32 bg-divine-white relative overflow-hidden"
    >
      {/* Divine Light Effect with Parallax */}
      <motion.div 
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ y: backgroundY }}
      >
        <motion.div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[500px] h-[200px] md:h-[300px] bg-gradient-radial from-gold/10 to-transparent blur-[60px]"
          style={{ opacity: glowOpacity }}
        />
      </motion.div>

      <div className="max-w-4xl mx-auto px-5 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 md:mb-14">
          <ScrollReveal>
            <motion.div
              className="flex items-center justify-center gap-3 mb-4 md:mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Cross className="w-5 h-5 md:w-6 md:h-6 text-gold celestial-cross" />
            </motion.div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <div className="flex items-center justify-center gap-2 md:gap-3 mb-4 md:mb-5">
              <Star className="w-3 h-3 md:w-4 md:h-4 text-gold" fill="currentColor" />
              <span 
                className="text-[10px] md:text-xs font-semibold tracking-[0.18em] md:tracking-[0.22em] uppercase text-gold"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                Give Generously
              </span>
              <Star className="w-3 h-3 md:w-4 md:h-4 text-gold" fill="currentColor" />
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.15}>
            <h2 
              className="text-2xl md:text-4xl lg:text-5xl font-medium mb-4 md:mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Support Our <span className="text-gradient-gold">Ministry</span>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2} direction="none">
            <motion.div 
              className="w-16 md:w-24 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-4 md:mb-6"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </ScrollReveal>
          
          <ScrollReveal delay={0.25}>
            <p 
              className="text-foreground-soft text-base md:text-xl max-w-xl mx-auto px-4"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Your generous donations help us continue our mission and serve our community
            </p>
          </ScrollReveal>
        </div>

        <div className="max-w-2xl mx-auto">
          <ScrollReveal delay={0.3}>
            <MobileGlassCard variant="gold" className="overflow-hidden">
              {/* Card Header */}
              <motion.div 
                className="bg-gradient-to-br from-secondary via-secondary to-secondary-dark p-5 md:p-9 relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                {/* Animated stars background */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-gold/40 rounded-full"
                      style={{
                        top: `${20 + i * 15}%`,
                        left: `${10 + i * 18}%`,
                      }}
                      animate={{ 
                        opacity: [0.2, 0.8, 0.2],
                        scale: [1, 1.5, 1]
                      }}
                      transition={{ 
                        duration: 2 + i * 0.5, 
                        repeat: Infinity,
                        delay: i * 0.3
                      }}
                    />
                  ))}
                </div>
                
                <div className="relative z-10 flex items-center gap-3 md:gap-4">
                  <motion.div 
                    className="w-11 h-11 md:w-14 md:h-14 rounded-xl bg-gold/20 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <CreditCard className="h-5 w-5 md:h-6 md:w-6 text-gold" />
                  </motion.div>
                  <div>
                    <h3 
                      className="text-lg md:text-2xl text-white font-medium" 
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      Secure Donation
                    </h3>
                    <p className="text-white/60 text-xs md:text-sm">Your payment is encrypted and secure</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Card Body */}
              <div className="p-5 md:p-10 bg-divine-ivory">
                <Elements stripe={stripePromise}>
                  <DonationForm />
                </Elements>
              </div>
            </MobileGlassCard>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <motion.div 
              className="mt-6 md:mt-8 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p className="text-foreground-muted text-xs md:text-sm flex items-center justify-center gap-2">
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-gold" />
                All donations are tax-deductible. Contact us for a receipt.
              </p>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default DonationSystem;