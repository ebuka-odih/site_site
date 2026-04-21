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
  X,
  Building2,
  Users,
  Award,
  Key
} from "lucide-react";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

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

// --- Shared Components ---

function Nav({ isMenuOpen, setIsMenuOpen }: { isMenuOpen: boolean, setIsMenuOpen: (v: boolean) => void }) {
  const location = useLocation();
  const isPortal = location.pathname === "/portal";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-elegant-border bg-elegant-bg/95 backdrop-blur-md">
      <div className="mx-auto h-full flex max-w-7xl items-center justify-between px-6 md:px-12">
        <Link to="/" className="flex flex-col">
          <h1 className="text-lg font-bold tracking-[0.4em] text-white">
            NORTHSHORE UNLIMITED
          </h1>
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium">Institutional Digital Liquidity</span>
        </Link>

        {!isPortal && (
          <nav className="hidden items-center gap-8 text-[12px] font-medium uppercase tracking-[0.1em] text-white/60 md:flex">
            <Link to="/company" className="transition hover:text-gold">Company</Link>
            <Link to="/portal" className="transition hover:text-gold">Portal</Link>
          </nav>
        )}

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-elegant-border bg-elegant-bg px-6 py-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-xs uppercase tracking-widest text-white/60">
              <Link to="/company" onClick={() => setIsMenuOpen(false)} className="transition hover:text-gold">Company</Link>
              <Link to="/portal" onClick={() => setIsMenuOpen(false)} className="transition hover:text-gold">Portal</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mx-auto max-w-7xl h-auto md:h-[80px] border-t border-elegant-border flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-8 md:py-0 gap-4 text-[10px] uppercase tracking-[0.2em] text-white/20">
      <div className="text-center md:text-left">&copy; 2026 NORTHSHORE UNLIMITED PARTNERS.</div>
      <div className="text-center md:block">PRIVATE ACCESS ONLY • JURISDICTIONAL RESTRICTIONS APPLY</div>
    </footer>
  );
}

// --- Home Page ---

function HomePage() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const features = [
    {
      title: "Private OTC Support",
      description: "A discreet request-based process for clients seeking to buy or sell digital assets through a direct company-managed workflow.",
      icon: <Lock className="w-5 h-5 text-gold/60" />,
    },
    {
      title: "Compliance First",
      description: "Every transaction is subject to identity verification, internal review, and applicable regulatory requirements before approval.",
      icon: <ShieldCheck className="w-5 h-5 text-gold/60" />,
    },
    {
      title: "Fast Settlement",
      description: "Approved trades are coordinated directly with our team for clear pricing, payment confirmation, and wallet delivery steps.",
      icon: <Zap className="w-5 h-5 text-gold/60" />,
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
    <>
      <main className="pt-24 md:pt-32 mx-auto max-w-7xl min-h-[calc(100vh-60px)] px-6 md:px-12">
        <section className="py-12 lg:py-20">
          <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <motion.div initial="initial" animate="animate" variants={staggerContainer} className="hero-content">
              <motion.div variants={fadeIn} className="mb-6 inline-flex items-center gap-2 rounded-full border border-elegant-border px-4 py-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">SECURED OTC GATEWAY</span>
              </motion.div>
              <motion.h2 variants={fadeIn} className="font-serif italic text-5xl font-normal leading-[1.1] md:text-6xl text-white">
                Discreet capital movement <br /> through private settlement.
              </motion.h2>
              <motion.p variants={fadeIn} className="mt-8 text-lg leading-relaxed text-white/60 max-w-lg">
                Northshore Unlimited provides a professional request-based framework for high-volume Bitcoin liquidity. Every transaction is managed through our proprietary compliance engine.
              </motion.p>
              <motion.div variants={fadeIn} className="mt-12 flex flex-wrap gap-5">
                <a href="#trade-request" className="rounded-sm bg-white px-8 py-4 text-xs font-bold uppercase tracking-widest text-black transition-all hover:bg-neutral-200">Initiate Request</a>
                <Link to="/company" className="rounded-sm border border-elegant-border bg-transparent px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-white/5">Our Company</Link>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="bento-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col justify-between rounded-xl border border-elegant-border bg-elegant-card p-8 sm:col-span-2 text-white">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4 block">Active Operations</span>
                  <div className="font-sans text-xl font-medium mb-2">Private P2P Settlement</div>
                  <p className="text-sm leading-relaxed text-white/50">Direct company-managed workflow bypassing public order books to ensure zero slippage and total discretion.</p>
                </div>
                <div className="mt-6 flex items-center gap-3 text-[12px] text-gold font-medium">
                  <div className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_8px_#D4AF37]" />
                  Desk Status: Accepting Inquiries
                </div>
              </div>
              <div className="rounded-xl border border-elegant-border bg-elegant-card p-8 text-white">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4 block">Verification</span>
                <div className="font-sans text-lg font-medium mb-2 font-white">KYC Level 3</div>
                <p className="text-xs leading-relaxed text-white/50">Full identity and source-of-wealth vetting required prior to quote issuance.</p>
              </div>
              <div className="rounded-xl border border-elegant-border bg-elegant-card p-8 text-white transition-colors hover:border-gold/30">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4 block">Velocity</span>
                <div className="font-sans text-lg font-medium mb-2">T+0 Finality</div>
                <p className="text-xs leading-relaxed text-white/50">Coordination with global banking partners for same-day settlement.</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="about" className="border-t border-elegant-border py-24">
          <div className="grid gap-16 md:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="group">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-elegant-card border border-elegant-border group-hover:border-gold/30 transition-colors">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-medium mb-4 text-white">{feature.title}</h4>
                <p className="text-sm leading-relaxed text-white/50">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="process" className="border-t border-elegant-border py-24">
          <div className="max-w-4xl">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold mb-4 font-semibold">Protocol Execution</p>
            <h3 className="font-serif italic text-4xl mb-12 text-white">Controlled Settlement Path</h3>
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

        <section id="trade-request" className="border-t border-elegant-border py-24">
          <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <h3 className="font-serif italic text-4xl mb-6 text-white">Initiate Secure Request</h3>
              <p className="text-white/50 mb-12 max-w-lg leading-relaxed text-sm">Submit your inquiry for institutional review through the Northshore Unlimited framework.</p>
              {!formSubmitted ? (
                <form onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }} className="grid gap-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <input required type="text" placeholder="Full Name" className="w-full border-b border-elegant-border bg-transparent py-4 text-sm text-white placeholder:text-white/20 outline-none transition focus:border-gold" />
                    <input required type="email" placeholder="Email Address" className="w-full border-b border-elegant-border bg-transparent py-4 text-sm text-white placeholder:text-white/20 outline-none transition focus:border-gold" />
                    <input type="text" placeholder="Jurisdiction / Country" className="w-full border-b border-elegant-border bg-transparent py-4 text-sm text-white placeholder:text-white/20 outline-none transition focus:border-gold" />
                    <input required type="text" placeholder="Estimated BTC Volume" className="w-full border-b border-elegant-border bg-transparent py-4 text-sm text-white placeholder:text-white/20 outline-none transition focus:border-gold" />
                  </div>
                  <textarea rows={4} placeholder="Transaction context..." className="w-full border-b border-elegant-border bg-transparent py-4 text-sm text-white placeholder:text-white/20 outline-none transition focus:border-gold resize-none" />
                  <div className="flex items-start gap-4 py-4">
                    <input required type="checkbox" className="mt-1 h-3.5 w-3.5 border-elegant-border bg-transparent text-gold focus:ring-0 rounded-sm" id="consent" />
                    <label htmlFor="consent" className="text-[10px] leading-relaxed text-white/30 uppercase tracking-wider select-none cursor-pointer">Confirmed: AML vetting per protocol.</label>
                  </div>
                  <button type="submit" className="w-fit rounded-sm bg-white px-12 py-5 text-xs font-bold uppercase tracking-[0.2em] text-black transition-all hover:bg-neutral-200">Transmit Request</button>
                </form>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 border border-gold/20 bg-gold/5 rounded-lg">
                  <CheckCircle2 className="w-12 h-12 text-gold mx-auto mb-4" />
                  <h4 className="text-xl mb-2 text-white">Request Transmitted</h4>
                  <p className="text-sm text-white/50">Our desk operations will process your inquiry shortly.</p>
                </motion.div>
              )}
            </div>
            <div className="space-y-8">
              <div className="rounded-xl border border-elegant-border bg-elegant-card p-10">
                <h4 className="text-xs uppercase tracking-[0.3em] font-semibold text-white/30 mb-6">Desk Operations</h4>
                <div className="space-y-6">
                  <div className="flex items-center justify-between text-xs"><span className="text-white/40">PROTOCOL EMAIL</span><span className="text-white/80 font-medium">trades@northshore.com</span></div>
                  <div className="flex items-center justify-between text-xs"><span className="text-white/40">SERVICE STATUS</span><span className="text-gold font-medium tracking-widest">• ONLINE</span></div>
                  <div className="flex items-center justify-between text-xs"><span className="text-white/40">SLA WINDOW</span><span className="text-white/80 font-medium">T+0 SETTLEMENT</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

// --- Company Page ---

function CompanyPage() {
  return (
    <>
      <main className="pt-32 mx-auto max-w-7xl min-h-[calc(100vh-60px)] px-6 md:px-12">
        <section className="py-12 lg:py-20">
          <motion.div initial="initial" animate="animate" variants={staggerContainer} className="max-w-4xl">
            <motion.p variants={fadeIn} className="text-[11px] uppercase tracking-[0.3em] text-gold mb-4 font-semibold">Institutional Heritage</motion.p>
            <motion.h2 variants={fadeIn} className="font-serif italic text-5xl font-normal leading-[1.1] md:text-6xl text-white mb-10">
              The Northshore standard of excellence.
            </motion.h2>
            <motion.div variants={fadeIn} className="grid gap-12 md:grid-cols-2 text-white/60 leading-relaxed text-lg">
              <p>Founded on the principles of absolute discretion and professional integrity, Northshore Unlimited Partners serves as a critical bridge between digital asset markets and institutional capital requirements. We specialize in non-custodial, high-volume settlement services tailored for private clients and global firms.</p>
              <p>Our approach combines proprietary compliance software with a dedicated human-led settlement desk, ensuring that every transaction meets the highest standards of regulatory governance and operational efficiency.</p>
            </motion.div>
          </motion.div>

          <div className="mt-24 grid gap-8 sm:grid-cols-3">
            {[
              { detail: "$1.2T", title: "Annual Trading Volume*" },
              { detail: "$376B", title: "Assets on Platform*" },
              { detail: "100+", title: "Countries" },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-xl border border-elegant-border bg-elegant-card p-12 flex flex-col items-center text-center group transition-colors hover:border-gold/20"
              >
                <p className="text-4xl font-serif italic text-white mb-4 tracking-tight">{item.detail}</p>
                <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-semibold">{item.title}</h4>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 text-right">
             <p className="text-[10px] uppercase tracking-[0.2em] text-white/10">* As of 12/31/25</p>
          </div>

          <div className="mt-24 rounded-2xl bg-white/[0.02] border border-elegant-border p-12 overflow-hidden relative">
             <div className="max-w-2xl relative z-10">
                <h3 className="font-serif italic text-3xl text-white mb-6">Our Mission</h3>
                <p className="text-lg text-white/50 leading-relaxed">To provide the most secure and private infrastructure for high-velocity capital movement in the digital age, without compromising on jurisdictional integrity or operational speed.</p>
             </div>
             <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-gold/5 to-transparent pointer-events-none" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

// --- Portal (Login) Page ---

function PortalPage() {
  const [pin, setPin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert("Invalid Portal Credentials. Please contact your Northshore account manager.");
      setLoading(false);
    }, 1500);
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md rounded-2xl border border-elegant-border bg-elegant-card p-10 shadow-2xl"
      >
        <div className="mb-10 text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-gold/20 bg-gold/5 text-gold">
            <Key className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Client Portal Access</h2>
          <p className="mt-2 text-sm text-white/40 uppercase tracking-widest font-medium">Secured Terminal V0.4</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-white/40 ml-2 font-semibold">Access PIN</label>
            <input
              required
              type="password"
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
              placeholder="••••••"
              className="w-full border-b border-elegant-border bg-transparent py-4 text-center text-2xl tracking-[1em] text-gold placeholder:text-white/10 outline-none transition focus:border-gold"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-white/40 ml-2 font-semibold">Password</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full border-b border-elegant-border bg-transparent py-4 text-sm text-white placeholder:text-white/10 outline-none transition focus:border-gold"
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full flex items-center justify-center gap-3 rounded-sm bg-white py-5 text-xs font-bold uppercase tracking-[0.2em] text-black transition-all hover:bg-neutral-200 disabled:opacity-50"
          >
            {loading ? "Decrypting..." : "Establish Secure Link"}
            {!loading && <ChevronRight className="w-4 h-4" />}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] leading-relaxed">
            Unauthorized access attempts are logged. <br /> Account registration is strictly invite-only.
          </p>
        </div>
      </motion.div>
    </main>
  );
}

// --- Main App ---

export default function NorthshoreUnlimitedP2PPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-elegant-bg font-sans selection:bg-gold selection:text-black">
        <Nav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/portal" element={<PortalPage />} />
        </Routes>
      </div>
    </Router>
  );
}
