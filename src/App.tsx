/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldCheck, 
  Lock, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  Mail, 
  Clock, 
  Globe,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function NorthshoreUnlimitedP2PPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const features = [
    {
      title: "Private OTC Support",
      description: "A discreet request-based process for clients seeking to buy or sell digital assets through a direct company-managed workflow.",
      icon: <Lock className="w-5 h-5 text-gold/60" />,
      label: "Active Operations"
    },
    {
      title: "Compliance First",
      description: "Every transaction is subject to identity verification, internal review, and applicable regulatory requirements before approval.",
      icon: <ShieldCheck className="w-5 h-5 text-gold/60" />,
      label: "Verification"
    },
    {
      title: "Fast Settlement",
      description: "Approved trades are coordinated directly with our team for clear pricing, payment confirmation, and wallet delivery steps.",
      icon: <Zap className="w-5 h-5 text-gold/60" />,
      label: "Velocity"
    },
  ];

  const steps = [
    "Submit a private trade request",
    "Complete KYC and verification",
    "Receive quote and trade terms",
    "Confirm payment and settlement details",
    "Finalize transfer with company support",
  ];

  return (
    <div className="min-h-screen bg-elegant-bg font-sans selection:bg-gold selection:text-black">
      {/* Navigation - Elegant Higher Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-elegant-border bg-elegant-bg/95 backdrop-blur-md">
        <div className="mx-auto h-full flex max-w-7xl items-center justify-between px-6 md:px-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <h1 className="text-lg font-bold tracking-[0.4em] text-white">
              NORTHSHORE UNLIMITED
            </h1>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium">Institutional Digital Liquidity</span>
          </motion.div>

          <nav className="hidden items-center gap-8 text-[12px] font-medium uppercase tracking-[0.1em] text-white/60 md:flex">
            {["Overview", "Governance", "Portal"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(" ", "-")}`} 
                className="transition hover:text-gold"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-elegant-border bg-elegant-bg px-12 py-6 md:hidden"
            >
              <div className="flex flex-col gap-6 text-xs uppercase tracking-widest text-white/60">
                {["Overview", "Governance", "Portal"].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase().replace(" ", "-")}`} 
                    onClick={() => setIsMenuOpen(false)}
                    className="transition hover:text-gold"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-24 md:pt-32 mx-auto max-w-7xl min-h-[calc(100vh-60px)] px-6 md:px-12">
        {/* Hero Section - Elegant Split Side */}
        <section className="py-12 lg:py-20">
          <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <motion.div 
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="hero-content"
            >
              <motion.div variants={fadeIn} className="mb-6 inline-flex items-center gap-2 rounded-full border border-elegant-border px-4 py-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
                  SECURED OTC GATEWAY
                </span>
              </motion.div>
              
              <motion.h2 variants={fadeIn} className="font-serif italic text-5xl font-normal leading-[1.1] md:text-6xl text-white">
                Discreet capital movement <br />
                through private settlement.
              </motion.h2>
              
              <motion.p variants={fadeIn} className="mt-8 text-lg leading-relaxed text-white/60 max-w-lg">
                Northshore Unlimited provides a professional request-based framework for high-volume Bitcoin liquidity. Every transaction is managed through our proprietary compliance engine and direct settlement desk.
              </motion.p>
              
              <motion.div variants={fadeIn} className="mt-12 flex flex-wrap gap-5">
                <a
                  href="#trade-request"
                  className="rounded-sm bg-white px-8 py-4 text-xs font-bold uppercase tracking-widest text-black transition-all hover:bg-neutral-200"
                >
                  Initiate Request
                </a>
                <a
                  href="#process"
                  className="rounded-sm border border-elegant-border bg-transparent px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-white/5"
                >
                  Review Protocol
                </a>
              </motion.div>
              
              <motion.div variants={fadeIn} className="mt-12 border-l border-gold pl-6 italic">
                <p className="text-sm text-white/40 leading-relaxed max-w-sm">
                  "A standard of privacy and speed tailored for institutional requirements."
                </p>
              </motion.div>
            </motion.div>

            {/* Bento Grid Features */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bento-grid grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="flex flex-col justify-between rounded-xl border border-elegant-border bg-elegant-card p-8 sm:col-span-2">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4 block">Active Operations</span>
                  <div className="font-sans text-xl font-medium mb-2">Private P2P Settlement</div>
                  <p className="text-sm leading-relaxed text-white/50">Direct company-managed workflow bypassing public order books to ensure zero slippage and total discretion for verified clients.</p>
                </div>
                <div className="mt-6 flex items-center gap-3 text-[12px] text-gold font-medium">
                  <div className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_8px_#D4AF37]" />
                  Desk Status: Accepting Inquiries
                </div>
              </div>
              
              <div className="rounded-xl border border-elegant-border bg-elegant-card p-8">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4 block">Verification</span>
                <div className="font-sans text-lg font-medium mb-2">KYC Level 3</div>
                <p className="text-xs leading-relaxed text-white/50">Full identity and source-of-wealth vetting required prior to quote issuance.</p>
              </div>
              
              <motion.div 
                whileHover={{ borderColor: "rgba(212, 175, 55, 0.3)" }}
                className="rounded-xl border border-elegant-border bg-elegant-card p-8 transition-colors"
              >
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4 block">Velocity</span>
                <div className="font-sans text-lg font-medium mb-2">T+0 Finality</div>
                <p className="text-xs leading-relaxed text-white/50">Coordination with global banking partners for same-day settlement.</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Feature/Benefits Section */}
        <section id="about" className="border-t border-elegant-border py-24">
          <div className="grid gap-16 md:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="group">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-elegant-card border border-elegant-border group-hover:border-gold/30 transition-colors">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-medium mb-4">{feature.title}</h4>
                <p className="text-sm leading-relaxed text-white/50">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Elegant Timeline Process */}
        <section id="process" className="border-t border-elegant-border py-24">
          <div className="max-w-4xl">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold mb-4 font-semibold">Protocol Execution</p>
            <h3 className="font-serif italic text-4xl mb-12">Controlled Settlement Path</h3>
            
            <div className="space-y-0 border-l border-elegant-border">
              {steps.map((step, index) => (
                <div key={step} className="relative pl-12 pb-16 last:pb-0">
                  <div className="absolute left-[-4px] top-1.5 h-2 w-2 rounded-full bg-gold" />
                  <span className="text-[10px] uppercase tracking-widest text-white/20 mb-2 block italic font-serif">Phase 0{index + 1}</span>
                  <p className="text-lg text-white/80">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Improved Form Section */}
        <section id="trade-request" className="border-t border-elegant-border py-24">
          <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <h3 className="font-serif italic text-4xl mb-6">Initiate Secure Request</h3>
              <p className="text-white/50 mb-12 max-w-lg leading-relaxed text-sm">
                Complete the inquiry form below for institutional review. Our compliance desk evaluates all requests through the Northshore Unlimited liquidity framework.
              </p>

              {!formSubmitted ? (
                <form 
                  onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }}
                  className="grid gap-6"
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <input
                      required
                      type="text"
                      placeholder="Full Name"
                      className="w-full border-b border-elegant-border bg-transparent py-4 text-sm text-white placeholder:text-white/20 outline-none transition focus:border-gold"
                    />
                    <input
                      required
                      type="email"
                      placeholder="Email Address"
                      className="w-full border-b border-elegant-border bg-transparent py-4 text-sm text-white placeholder:text-white/20 outline-none transition focus:border-gold"
                    />
                    <input
                      type="text"
                      placeholder="Jurisdiction / Country"
                      className="w-full border-b border-elegant-border bg-transparent py-4 text-sm text-white placeholder:text-white/20 outline-none transition focus:border-gold"
                    />
                    <input
                      required
                      type="text"
                      placeholder="Estimated BTC Volume"
                      className="w-full border-b border-elegant-border bg-transparent py-4 text-sm text-white placeholder:text-white/20 outline-none transition focus:border-gold"
                    />
                  </div>
                  <textarea
                    rows={4}
                    placeholder="Transaction context and specific settlement requirements..."
                    className="w-full border-b border-elegant-border bg-transparent py-4 text-sm text-white placeholder:text-white/20 outline-none transition focus:border-gold resize-none"
                  />
                  
                  <div className="flex items-start gap-4 py-4">
                    <input required type="checkbox" className="mt-1 h-3.5 w-3.5 border-elegant-border bg-transparent text-gold focus:ring-0 rounded-sm" id="consent" />
                    <label htmlFor="consent" className="text-[10px] leading-relaxed text-white/30 uppercase tracking-wider select-none cursor-pointer">
                      Confirmed: I agree to jurisdictional review and AML vetting per protocol.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-fit rounded-sm bg-white px-12 py-5 text-xs font-bold uppercase tracking-[0.2em] text-black transition-all hover:bg-neutral-200"
                  >
                    Transmit Request
                  </button>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16 border border-gold/20 bg-gold/5 rounded-lg"
                >
                  <CheckCircle2 className="w-12 h-12 text-gold mx-auto mb-4" />
                  <h4 className="text-xl mb-2">Request Transmitted</h4>
                  <p className="text-sm text-white/50">Our desk operations will process your inquiry shortly.</p>
                </motion.div>
              )}
            </div>

            <div className="space-y-8">
              <div className="rounded-xl border border-elegant-border bg-elegant-card p-10">
                <h4 className="text-xs uppercase tracking-[0.3em] font-semibold text-white/30 mb-6">Desk Operations</h4>
                <div className="space-y-6">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/40">PROTOCOL EMAIL</span>
                    <span className="text-white/80 font-medium">trades@northshore.com</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/40">SERVICE STATUS</span>
                    <span className="text-gold font-medium tracking-widest">• ONLINE</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/40">SLA WINDOW</span>
                    <span className="text-white/80 font-medium">T+0 SETTLEMENT</span>
                  </div>
                </div>
              </div>

              <div className="p-8 border border-white/5 rounded-xl text-[11px] leading-relaxed text-white/20 italic">
                Notice: All digital asset movements are subject to compliance flagging and regulatory reporting where applicable. Private access is granted at company discretion.
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-7xl h-auto md:h-[80px] border-t border-elegant-border flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-8 md:py-0 gap-4 text-[10px] uppercase tracking-[0.2em] text-white/20">
        <div className="text-center md:text-left">&copy; 2026 NORTHSHORE UNLIMITED PARTNERS.</div>
        <div className="text-center md:block">PRIVATE ACCESS ONLY • JURISDICTIONAL RESTRICTIONS APPLY</div>
      </footer>
    </div>
  );
}
