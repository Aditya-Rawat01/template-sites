"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const CYCLING_WORDS = ["THINGS.", "LIVES.", "FORWARD.", "MOUNTAINS."];

const STATS = [
  { value: 1400, suffix: "+", label: "Successful Moves" },
  { value: 98, suffix: "%", label: "5-Star Reviews" },
  { value: 12, suffix: "yrs", label: "In Business" },
];

const SERVICES = [
  { icon: "⬡", title: "Residential Moving", desc: "Full-service home relocation handled with obsessive care." },
  { icon: "◈", title: "Commercial & Office", desc: "Zero-downtime business moves, weekend-friendly scheduling." },
  { icon: "◎", title: "Long Distance", desc: "Cross-country hauls with real-time GPS tracking." },
  { icon: "⬟", title: "Packing & Unpacking", desc: "Pro-grade materials. Museum-quality wrapping for every item." },
  { icon: "⊞", title: "Storage Solutions", desc: "Climate-controlled, 24/7-monitored, flexible-term storage." },
  { icon: "◇", title: "Specialty Items", desc: "Pianos, art, antiques — we speak fragile fluently." },
];

const STEPS = [
  { num: "01", title: "Request a Quote", desc: "Fill out our quick form or call. We respond in under an hour." },
  { num: "02", title: "Custom Plan", desc: "We survey your items and build a precise, no-surprise plan." },
  { num: "03", title: "Move Day", desc: "Our crew arrives on time, fully equipped and ready to work." },
  { num: "04", title: "Settle In", desc: "Unpacked, assembled, placed. You open a bottle. We handle the rest." },
];

const TESTIMONIALS = [
  { text: "Atlas didn't just move our furniture — they moved us with a level of care we didn't think was possible from a moving company.", name: "Rachel M.", city: "New York" },
  { text: "Every single item arrived exactly as it left. Flawless execution, polite crew, and the most transparent pricing I've ever seen.", name: "James T.", city: "Chicago" },
  { text: "I've moved seven times in ten years. Atlas is in a different league. I will never use anyone else.", name: "Priya K.", city: "San Francisco" },
  { text: "The team wrapped our grand piano like it was going to the Louvre. Zero scratches. Zero stress. Pure class.", name: "David L.", city: "Boston" },
  { text: "From quote to final box, every interaction felt premium. Worth every single penny and then some.", name: "Sofia R.", city: "Miami" },
  { text: "Showed up 10 minutes early. Finished 2 hours ahead of schedule. Then helped me hang my TV. These people are unreal.", name: "Marcus W.", city: "Austin" },
];

const FAQS = [
  { q: "Are you fully licensed and insured?", a: "Absolutely. Atlas Moving Co. holds full FMCSA licensing and comprehensive cargo + liability insurance. Every move is covered — no exceptions." },
  { q: "How far in advance should I book?", a: "For local moves, 2–3 weeks is ideal. For long-distance or commercial moves, 4–6 weeks gives us room to plan perfectly. That said, call us — we've made last-minute work." },
  { q: "Do you offer binding estimates?", a: "Yes. We offer both binding and non-binding estimates. For most clients, we recommend our guaranteed-price binding quote so there are absolutely no day-of surprises." },
  { q: "What items can't you move?", a: "Hazardous materials, live animals, and perishable food are the only exclusions. Everything else — including oversized art, safes, and vintage vehicles — we handle regularly." },
  { q: "How do you protect my belongings?", a: "Furniture pads, shrink-wrap, custom crating for fragiles, and a fully padded truck interior. We treat your belongings the way a jeweler treats a watch." },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function useCountUp(target: number, started: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target, duration]);
  return count;
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ stat, delay }: { stat: typeof STATS[0]; delay: number }) {
  const { ref, visible } = useScrollReveal();
  const count = useCountUp(stat.value, visible);
  return (
    <div ref={ref} className="stat-card" style={{ transitionDelay: `${delay}ms`, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(60px)" }}>
      <div className="stat-value">{count}<span className="stat-suffix">{stat.suffix}</span></div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
}

// ─── Service Card ─────────────────────────────────────────────────────────────
function ServiceCard({ s, i }: { s: typeof SERVICES[0]; i: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { ref, visible } = useScrollReveal();

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    card.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateY(-6px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) cardRef.current.style.transform = "";
  }, []);

  return (
    <div ref={ref} style={{ transitionDelay: `${i * 80}ms`, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(50px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
      <div ref={cardRef} className="service-card" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        <div className="service-icon">{s.icon}</div>
        <h3 className="service-card-title">{s.title}</h3>
        <p className="service-card-desc">{s.desc}</p>
        <div className="service-arrow">→</div>
      </div>
    </div>
  );
}

// ─── Magnetic Button ──────────────────────────────────────────────────────────
function MagneticBtn({ children, className, onClick }: { children: React.ReactNode; className: string; onClick?: () => void }) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.35;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.35;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  }, []);
  const handleMouseLeave = useCallback(() => {
    if (btnRef.current) btnRef.current.style.transform = "";
  }, []);
  return (
    <button ref={btnRef} className={className} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onClick={onClick}>
      {children}
    </button>
  );
}

// ─── FAQ Row ──────────────────────────────────────────────────────────────────
function FAQRow({ item, i }: { item: typeof FAQS[0]; i: number }) {
  const [open, setOpen] = useState(false);
  const { ref, visible } = useScrollReveal();
  return (
    <div ref={ref} className="faq-row" style={{ transitionDelay: `${i * 80}ms`, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}>
      <button className="faq-trigger" onClick={() => setOpen(!open)}>
        <span className="faq-num">0{i + 1}</span>
        <span className="faq-q">{item.q}</span>
        <span className="faq-icon" style={{ transform: open ? "rotate(135deg)" : "rotate(0deg)" }}>+</span>
      </button>
      <div className="faq-body" style={{ maxHeight: open ? "300px" : "0" }}>
        <p>{item.a}</p>
      </div>
    </div>
  );
}

// ─── Process Item ──────────────────────────────────────────────────────────────
function ProcessItem({ step, i }: { step: typeof STEPS[0]; i: number }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div ref={ref} className="process-item" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: `opacity 0.6s ease ${i * 120}ms, transform 0.6s ease ${i * 120}ms` }}>
      <div className="process-num-bg">{step.num}</div>
      <div className="process-num">{step.num}</div>
      <div className="process-title">{step.title}</div>
      <p className="process-desc">{step.desc}</p>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Page() {
  const [wordIdx, setWordIdx] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorHover, setCursorHover] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const statsReveal = useScrollReveal();
  const servicesReveal = useScrollReveal();
  const processReveal = useScrollReveal();
  const testReveal = useScrollReveal();
  const ctaReveal = useScrollReveal();

  // Hero word cycling
  useEffect(() => {
    const cycle = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIdx(i => (i + 1) % CYCLING_WORDS.length);
        setWordVisible(true);
      }, 400);
    }, 2400);
    return () => clearInterval(cycle);
  }, []);

  // Page load
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Cursor
  useEffect(() => {
    const move = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    const over = (e: MouseEvent) => {
      if ((e.target as Element).closest("button,a,.service-card,.faq-trigger")) setCursorHover(true);
      else setCursorHover(false);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); };
  }, []);

  // Scroll
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMobileOpen(false); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;700&family=Instrument+Serif:ital@0;1&display=swap');

        :root {
          --black: #080808;
          --lime: #D4FF00;
          --cream: #F2EDE4;
          --muted: rgba(242,237,228,0.45);
          --card: #111111;
          --border: rgba(242,237,228,0.08);
          --red: #FF3B00;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          font-family: 'DM Sans', sans-serif;
          background: var(--black);
          color: var(--cream);
          overflow-x: hidden;
          cursor: none;
        }
        ::selection { background: var(--lime); color: var(--black); }

        /* ── Grain overlay ── */
        body::after {
          content: '';
          position: fixed; inset: 0; z-index: 9999; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.028;
        }

        /* ── Custom cursor ── */
        .cursor {
          position: fixed; pointer-events: none; z-index: 10000;
          width: 12px; height: 12px;
          background: var(--lime);
          border-radius: 50%;
          transition: transform 0.15s ease, width 0.25s ease, height 0.25s ease, background 0.25s ease;
          transform: translate(-50%, -50%);
        }
        .cursor.hover {
          width: 48px; height: 48px;
          background: transparent;
          border: 1.5px solid var(--lime);
          mix-blend-mode: normal;
        }
        .cursor-ring {
          position: fixed; pointer-events: none; z-index: 9999;
          width: 36px; height: 36px;
          border: 1px solid rgba(212,255,0,0.35);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: left 0.08s ease, top 0.08s ease;
        }

        /* ── Page reveal ── */
        .page-wrap {
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        .page-wrap.loaded { opacity: 1; transform: translateY(0); }

        /* ── Navbar ── */
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 500;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.4rem 4rem;
          transition: background 0.5s, backdrop-filter 0.5s, padding 0.4s;
        }
        .navbar.scrolled {
          background: rgba(8,8,8,0.92);
          backdrop-filter: blur(20px);
          padding: 1rem 4rem;
          border-bottom: 1px solid var(--border);
        }
        .nav-logo {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.8rem; letter-spacing: 0.06em;
          color: var(--cream); text-decoration: none;
        }
        .nav-logo span { color: var(--lime); }
        .nav-links { display: flex; gap: 2.5rem; list-style: none; }
        .nav-links a {
          text-decoration: none; color: var(--muted);
          font-size: 0.85rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase;
          transition: color 0.25s;
        }
        .nav-links a:hover { color: var(--cream); }
        .nav-btn {
          background: var(--lime); color: var(--black);
          border: none; padding: 0.65rem 1.6rem; border-radius: 4px;
          font-weight: 700; font-size: 0.82rem; letter-spacing: 0.08em; text-transform: uppercase;
          cursor: none; transition: transform 0.2s, box-shadow 0.2s;
        }
        .nav-btn:hover { box-shadow: 0 0 30px rgba(212,255,0,0.35); }
        .hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: none; padding: 4px; }
        .hamburger span { display: block; width: 22px; height: 1.5px; background: var(--cream); transition: all 0.3s; }
        .mobile-nav {
          position: fixed; inset: 0; z-index: 450;
          background: var(--black); display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 2.5rem;
          transform: translateX(100%); transition: transform 0.5s cubic-bezier(0.77,0,0.18,1);
        }
        .mobile-nav.open { transform: translateX(0); }
        .mobile-nav a {
          font-family: 'Bebas Neue', sans-serif; font-size: 3rem; letter-spacing: 0.08em;
          text-decoration: none; color: var(--cream);
          transition: color 0.2s;
        }
        .mobile-nav a:hover { color: var(--lime); }
        .mobile-close { position: absolute; top: 1.8rem; right: 2rem; background: none; border: none; color: var(--cream); font-size: 1.8rem; cursor: none; }

        /* ── Hero ── */
        .hero {
          position: relative; min-height: 100vh;
          display: flex; flex-direction: column; justify-content: center;
          padding: 8rem 4rem 4rem;
          overflow: hidden;
        }
        .hero-bg-grid {
          position: absolute; inset: 0; z-index: 0;
          background-image:
            linear-gradient(rgba(212,255,0,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,255,0,0.04) 1px, transparent 1px);
          background-size: 80px 80px;
          animation: gridDrift 20s linear infinite;
        }
        @keyframes gridDrift { from { background-position: 0 0; } to { background-position: 80px 80px; } }
        .hero-glow {
          position: absolute; top: -20%; right: -10%; z-index: 0;
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(212,255,0,0.07) 0%, transparent 70%);
          animation: glowPulse 6s ease-in-out infinite;
        }
        @keyframes glowPulse { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.15); opacity: 0.7; } }
        .hero-content { position: relative; z-index: 1; }
        .hero-eyebrow {
          display: flex; align-items: center; gap: 0.8rem;
          font-size: 0.78rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--lime); margin-bottom: 1.5rem;
          opacity: 0; animation: fadeUp 0.8s 0.4s forwards;
        }
        .hero-eyebrow::before { content: ''; display: block; width: 40px; height: 1px; background: var(--lime); }
        .hero-headline {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(5rem, 13vw, 14rem);
          line-height: 0.9; letter-spacing: -0.01em;
          color: var(--cream);
          opacity: 0; animation: fadeUp 0.9s 0.55s forwards;
        }
        .hero-headline .line2 { display: flex; align-items: baseline; gap: 0.2em; flex-wrap: wrap; }
        .hero-headline .we { color: var(--cream); }
        .hero-headline .move { color: var(--lime); }
        .cycling-word {
          display: inline-block; min-width: 4ch;
          color: var(--cream);
          opacity: 0; transform: translateY(20px) skewY(3deg);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .cycling-word.visible { opacity: 1; transform: translateY(0) skewY(0deg); }
        .hero-sub {
          max-width: 480px; margin-top: 2.5rem;
          font-family: 'Instrument Serif', serif; font-style: italic;
          font-size: clamp(1.1rem, 1.8vw, 1.4rem); color: var(--muted); line-height: 1.6;
          opacity: 0; animation: fadeUp 0.9s 0.8s forwards;
        }
        .hero-btns {
          display: flex; gap: 1rem; margin-top: 3rem; flex-wrap: wrap;
          opacity: 0; animation: fadeUp 0.9s 1s forwards;
        }
        .btn-lime {
          background: var(--lime); color: var(--black); border: none;
          padding: 1rem 2.5rem; border-radius: 4px;
          font-weight: 700; font-size: 0.9rem; letter-spacing: 0.08em; text-transform: uppercase;
          cursor: none; transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-lime:hover { box-shadow: 0 0 40px rgba(212,255,0,0.4); }
        .btn-outline-cream {
          background: transparent; color: var(--cream);
          border: 1px solid rgba(242,237,228,0.3);
          padding: 1rem 2.5rem; border-radius: 4px;
          font-weight: 500; font-size: 0.9rem; letter-spacing: 0.06em; text-transform: uppercase;
          cursor: none; transition: border-color 0.2s, color 0.2s;
        }
        .btn-outline-cream:hover { border-color: var(--cream); color: var(--cream); }
        .hero-scroll-hint {
          position: absolute; bottom: 2.5rem; left: 4rem; z-index: 1;
          display: flex; align-items: center; gap: 0.8rem;
          font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted);
          opacity: 0; animation: fadeUp 1s 1.4s forwards;
        }
        .scroll-line { width: 40px; height: 1px; background: var(--muted); animation: scrollLine 2s ease-in-out infinite; }
        @keyframes scrollLine { 0%,100% { transform: scaleX(1); opacity: 0.4; } 50% { transform: scaleX(0.4); opacity: 1; } }
        .hero-year {
          position: absolute; bottom: 2.5rem; right: 4rem; z-index: 1;
          font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted);
          opacity: 0; animation: fadeIn 1s 1.6s forwards;
        }

        /* ── Ticker ── */
        .ticker {
          background: var(--lime); overflow: hidden; padding: 0.9rem 0;
          border-top: 1px solid rgba(0,0,0,0.1);
        }
        .ticker-track {
          display: flex; width: max-content;
          animation: ticker 25s linear infinite;
        }
        .ticker-item {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.3rem; letter-spacing: 0.12em;
          color: var(--black); white-space: nowrap;
          padding: 0 2rem;
        }
        .ticker-dot { color: rgba(0,0,0,0.35); font-size: 1rem; }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        /* ── Stats ── */
        .stats-section {
          padding: 7rem 4rem;
          display: grid; grid-template-columns: 1fr 1fr 1fr;
          gap: 0; border-bottom: 1px solid var(--border);
        }
        .stat-card {
          padding: 3rem; text-align: center;
          border-right: 1px solid var(--border);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .stat-card:last-child { border-right: none; }
        .stat-value {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(4rem, 8vw, 7rem); line-height: 1;
          color: var(--lime); display: flex; justify-content: center; align-items: baseline; gap: 0.1em;
        }
        .stat-suffix { font-size: 0.5em; color: var(--cream); }
        .stat-label { font-size: 0.85rem; color: var(--muted); letter-spacing: 0.12em; text-transform: uppercase; margin-top: 0.5rem; }

        /* ── Section shared ── */
        .section { padding: 7rem 4rem; }
        .section-tag {
          display: inline-flex; align-items: center; gap: 0.6rem;
          font-size: 0.72rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--lime); margin-bottom: 1.2rem;
        }
        .section-tag::before { content: ''; width: 30px; height: 1px; background: var(--lime); }
        .section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3rem, 6vw, 6rem); line-height: 0.95; letter-spacing: 0.01em;
          color: var(--cream);
        }
        .section-title em { font-style: italic; color: var(--lime); font-family: 'Instrument Serif', serif; }

        /* ── Services ── */
        .services-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1px; background: var(--border);
          border: 1px solid var(--border); border-radius: 12px; overflow: hidden;
          margin-top: 3.5rem;
        }
        .service-card {
          background: var(--card); padding: 2.5rem 2rem;
          position: relative; overflow: hidden;
          transition: transform 0.3s ease, background 0.3s;
          cursor: none;
        }
        .service-card::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(212,255,0,0.06) 0%, transparent 60%);
          opacity: 0; transition: opacity 0.3s;
        }
        .service-card:hover { background: #161616; }
        .service-card:hover::after { opacity: 1; }
        .service-icon {
          font-size: 1.8rem; color: var(--lime); margin-bottom: 1.2rem;
          display: block; transition: transform 0.3s;
        }
        .service-card:hover .service-icon { transform: scale(1.2) rotate(15deg); }
        .service-card-title { font-family: 'Bebas Neue', sans-serif; font-size: 1.5rem; letter-spacing: 0.05em; color: var(--cream); margin-bottom: 0.7rem; }
        .service-card-desc { font-size: 0.88rem; color: var(--muted); line-height: 1.7; }
        .service-arrow {
          position: absolute; bottom: 1.5rem; right: 1.5rem;
          color: var(--lime); font-size: 1.2rem; opacity: 0;
          transform: translate(-8px, 8px); transition: opacity 0.3s, transform 0.3s;
        }
        .service-card:hover .service-arrow { opacity: 1; transform: translate(0, 0); }

        /* ── Process ── */
        .process-section { padding: 7rem 4rem; border-top: 1px solid var(--border); }
        .process-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; margin-top: 4rem; }
        .process-item { position: relative; padding: 2rem 1.5rem 2rem; border-top: 1px solid var(--border); }
        .process-num-bg {
          position: absolute; top: -1.5rem; right: 0;
          font-family: 'Bebas Neue', sans-serif; font-size: 7rem; line-height: 1;
          color: rgba(242,237,228,0.03); pointer-events: none; user-select: none;
        }
        .process-num { font-family: 'Bebas Neue', sans-serif; font-size: 3.5rem; color: var(--lime); line-height: 1; margin-bottom: 1rem; }
        .process-title { font-family: 'Bebas Neue', sans-serif; font-size: 1.4rem; color: var(--cream); margin-bottom: 0.7rem; letter-spacing: 0.04em; }
        .process-desc { font-size: 0.88rem; color: var(--muted); line-height: 1.7; }

        /* ── Testimonials ── */
        .test-section { padding: 7rem 0; border-top: 1px solid var(--border); overflow: hidden; }
        .test-header { padding: 0 4rem; margin-bottom: 4rem; }
        .marquee-wrap { overflow: hidden; position: relative; }
        .marquee-wrap::before, .marquee-wrap::after {
          content: ''; position: absolute; top: 0; bottom: 0; width: 150px; z-index: 2; pointer-events: none;
        }
        .marquee-wrap::before { left: 0; background: linear-gradient(to right, var(--black), transparent); }
        .marquee-wrap::after { right: 0; background: linear-gradient(to left, var(--black), transparent); }
        .marquee-track { display: flex; gap: 1.5rem; width: max-content; animation: marqueeFwd 35s linear infinite; }
        .marquee-track.rev { animation-direction: reverse; animation-duration: 28s; margin-top: 1.5rem; }
        .marquee-track:hover, .marquee-track.rev:hover { animation-play-state: paused; }
        @keyframes marqueeFwd { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .test-card {
          width: 320px; flex-shrink: 0; padding: 2rem;
          background: var(--card); border: 1px solid var(--border); border-radius: 12px;
          transition: border-color 0.3s, transform 0.3s;
        }
        .test-card:hover { border-color: rgba(212,255,0,0.3); transform: translateY(-4px); }
        .test-stars { color: var(--lime); font-size: 0.8rem; letter-spacing: 0.2em; margin-bottom: 1rem; }
        .test-text { font-family: 'Instrument Serif', serif; font-style: italic; font-size: 1rem; color: var(--cream); line-height: 1.65; }
        .test-author { display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem; }
        .test-name { font-weight: 700; font-size: 0.82rem; letter-spacing: 0.08em; text-transform: uppercase; }
        .test-city { font-size: 0.78rem; color: var(--muted); }

        /* ── FAQ ── */
        .faq-section { padding: 7rem 4rem; border-top: 1px solid var(--border); }
        .faq-list { max-width: 820px; margin: 4rem auto 0; }
        .faq-row { border-bottom: 1px solid var(--border); }
        .faq-trigger {
          width: 100%; display: flex; align-items: center; gap: 1.5rem;
          padding: 1.8rem 0; background: none; border: none; cursor: none;
          text-align: left;
        }
        .faq-trigger:hover .faq-q { color: var(--cream); }
        .faq-num { font-family: 'Bebas Neue', sans-serif; font-size: 1.1rem; color: var(--lime); letter-spacing: 0.06em; flex-shrink: 0; }
        .faq-q { font-size: 1rem; font-weight: 500; color: var(--muted); flex: 1; transition: color 0.25s; letter-spacing: 0.02em; }
        .faq-icon { font-size: 1.5rem; font-weight: 300; color: var(--lime); flex-shrink: 0; transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1); }
        .faq-body { overflow: hidden; transition: max-height 0.45s ease; }
        .faq-body p { padding: 0 0 1.8rem 2.6rem; font-size: 0.92rem; color: var(--muted); line-height: 1.75; }

        /* ── CTA ── */
        .cta-section {
          padding: 8rem 4rem;
          border-top: 1px solid var(--border);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center; position: relative; overflow: hidden;
        }
        .cta-bg-text {
          position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
          font-family: 'Bebas Neue', sans-serif; font-size: clamp(8rem, 20vw, 22rem);
          color: rgba(212,255,0,0.03); pointer-events: none; user-select: none; white-space: nowrap; letter-spacing: 0.05em;
        }
        .cta-tag { display: inline-flex; align-items: center; gap: 0.6rem; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--lime); margin-bottom: 2rem; }
        .cta-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3.5rem, 8vw, 9rem); line-height: 0.9; letter-spacing: 0.02em;
          color: var(--cream); position: relative; z-index: 1;
        }
        .cta-title em { font-style: italic; color: var(--lime); font-family: 'Instrument Serif', serif; }
        .cta-sub { font-size: 1rem; color: var(--muted); max-width: 460px; margin: 2rem auto; line-height: 1.7; position: relative; z-index: 1; }
        .cta-btns { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; position: relative; z-index: 1; }

        /* ── Footer ── */
        .footer {
          border-top: 1px solid var(--border);
          padding: 5rem 4rem 2.5rem;
        }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 4rem; padding-bottom: 4rem; border-bottom: 1px solid var(--border); }
        .footer-brand-name { font-family: 'Bebas Neue', sans-serif; font-size: 2.5rem; letter-spacing: 0.08em; color: var(--cream); }
        .footer-brand-name span { color: var(--lime); }
        .footer-tagline { font-family: 'Instrument Serif', serif; font-style: italic; color: var(--muted); font-size: 0.95rem; margin-top: 0.5rem; max-width: 260px; line-height: 1.6; }
        .footer-col h4 { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--cream); margin-bottom: 1.5rem; }
        .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 0.7rem; }
        .footer-col ul li a { text-decoration: none; font-size: 0.88rem; color: var(--muted); transition: color 0.2s; }
        .footer-col ul li a:hover { color: var(--cream); }
        .footer-bottom { padding-top: 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: gap; gap: 1rem; }
        .footer-copy { font-size: 0.78rem; color: rgba(242,237,228,0.3); letter-spacing: 0.08em; }
        .footer-legal { display: flex; gap: 2rem; }
        .footer-legal a { font-size: 0.78rem; color: rgba(242,237,228,0.3); text-decoration: none; transition: color 0.2s; }
        .footer-legal a:hover { color: var(--muted); }

        /* ── Keyframes ── */
        @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); }
          .process-grid { grid-template-columns: repeat(2, 1fr); }
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 2.5rem; }
          .stats-section { grid-template-columns: 1fr; }
          .stat-card { border-right: none; border-bottom: 1px solid var(--border); }
          .stat-card:last-child { border-bottom: none; }
        }
        @media (max-width: 768px) {
          .navbar { padding: 1.2rem 1.8rem; }
          .navbar.scrolled { padding: 0.9rem 1.8rem; }
          .nav-links, .nav-btn { display: none; }
          .hamburger { display: flex; }
          .hero { padding: 6rem 1.8rem 3rem; }
          .hero-scroll-hint, .hero-year { display: none; }
          .section, .process-section, .faq-section, .cta-section, .footer { padding-left: 1.8rem; padding-right: 1.8rem; }
          .test-header { padding: 0 1.8rem; }
          .services-grid { grid-template-columns: 1fr; }
          .process-grid { grid-template-columns: 1fr; }
          .footer-grid { grid-template-columns: 1fr; }
          .footer-bottom { flex-direction: column; align-items: flex-start; }
          body { cursor: auto; }
          .cursor, .cursor-ring { display: none; }
        }
        @media (max-width: 480px) {
          .hero-headline { font-size: clamp(3.5rem, 18vw, 5rem); }
          .stats-section { padding: 4rem 1.8rem; }
        }
      `}</style>

      {/* ── Custom Cursor ── */}
      <div className="cursor" style={{ left: cursorPos.x, top: cursorPos.y }} data-hover={cursorHover ? "1" : undefined}
        ref={(el) => { if (el) { el.classList.toggle("hover", cursorHover); } }}
      />
      <div className="cursor-ring" style={{ left: cursorPos.x, top: cursorPos.y }} />

      <div className={`page-wrap${loaded ? " loaded" : ""}`}>

        {/* ── Navbar ── */}
        <nav className={`navbar${navScrolled ? " scrolled" : ""}`}>
          <a href="#" className="nav-logo">ATL<span>A</span>S</a>
          <ul className="nav-links">
            <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo("services"); }}>Services</a></li>
            <li><a href="#process" onClick={(e) => { e.preventDefault(); scrollTo("process"); }}>How It Works</a></li>
            <li><a href="#faq" onClick={(e) => { e.preventDefault(); scrollTo("faq"); }}>FAQ</a></li>
          </ul>
          <MagneticBtn className="nav-btn" onClick={() => scrollTo("cta")}>Get a Quote</MagneticBtn>
          <button className="hamburger" onClick={() => setMobileOpen(true)} aria-label="menu">
            <span /><span /><span />
          </button>
        </nav>

        {/* Mobile nav */}
        <div className={`mobile-nav${mobileOpen ? " open" : ""}`}>
          <button className="mobile-close" onClick={() => setMobileOpen(false)}>✕</button>
          <a href="#" onClick={() => setMobileOpen(false)}>Home</a>
          <a href="#services" onClick={() => { scrollTo("services"); }}>Services</a>
          <a href="#process" onClick={() => { scrollTo("process"); }}>Process</a>
          <a href="#faq" onClick={() => { scrollTo("faq"); }}>FAQ</a>
          <a href="#cta" onClick={() => { scrollTo("cta"); }}>Get Quote</a>
        </div>

        {/* ── Hero ── */}
        <section className="hero">
          <div className="hero-bg-grid" />
          <div className="hero-glow" />
          <div className="hero-content">
            <div className="hero-eyebrow">Est. 2012 &nbsp;·&nbsp; New York City</div>
            <h1 className="hero-headline">
              <div>ATLAS</div>
              <div className="line2">
                <span className="we">WE&nbsp;</span>
                <span className="move">MOVE&nbsp;</span>
                <span className={`cycling-word${wordVisible ? " visible" : ""}`}>{CYCLING_WORDS[wordIdx]}</span>
              </div>
            </h1>
            <p className="hero-sub">
              A moving company that treats your belongings like artifacts —
              handled with precision, wrapped with care, delivered with pride.
            </p>
            <div className="hero-btns">
              <MagneticBtn className="btn-lime" onClick={() => scrollTo("cta")}>Book Your Move</MagneticBtn>
              <MagneticBtn className="btn-outline-cream" onClick={() => scrollTo("services")}>Our Services</MagneticBtn>
            </div>
          </div>
          <div className="hero-scroll-hint">
            <div className="scroll-line" />
            Scroll to explore
          </div>
          <div className="hero-year">© 2025</div>
        </section>

        {/* ── Ticker ── */}
        <div className="ticker">
          <div className="ticker-track">
            {Array(8).fill(null).map((_, i) => (
              <span key={i} className="ticker-item">
                FULLY INSURED <span className="ticker-dot">·</span>&nbsp;
                5-STAR RATED <span className="ticker-dot">·</span>&nbsp;
                ZERO HIDDEN FEES <span className="ticker-dot">·</span>&nbsp;
                LICENSED &amp; BONDED <span className="ticker-dot">·</span>&nbsp;
              </span>
            ))}
          </div>
        </div>

        {/* ── Stats ── */}
        <div ref={statsReveal.ref} className="stats-section">
          {STATS.map((s, i) => <StatCard key={s.label} stat={s} delay={i * 150} />)}
        </div>

        {/* ── Services ── */}
        <section id="services" className="section">
          <div ref={servicesReveal.ref} style={{ opacity: servicesReveal.visible ? 1 : 0, transform: servicesReveal.visible ? "translateY(0)" : "translateY(40px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}>
            <div className="section-tag">What We Do</div>
            <h2 className="section-title">EVERY MOVE,<br /><em>precisely handled.</em></h2>
          </div>
          <div className="services-grid">
            {SERVICES.map((s, i) => <ServiceCard key={s.title} s={s} i={i} />)}
          </div>
        </section>

        {/* ── Process ── */}
        <section id="process" className="process-section">
          <div ref={processReveal.ref} style={{ opacity: processReveal.visible ? 1 : 0, transform: processReveal.visible ? "translateY(0)" : "translateY(40px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}>
            <div className="section-tag">How It Works</div>
            <h2 className="section-title">FOUR STEPS TO<br /><em>effortless.</em></h2>
          </div>
          <div className="process-grid">
            {STEPS.map((step, i) => <ProcessItem key={step.num} step={step} i={i} />)}
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="test-section">
          <div ref={testReveal.ref} className="test-header" style={{ opacity: testReveal.visible ? 1 : 0, transform: testReveal.visible ? "translateY(0)" : "translateY(40px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}>
            <div className="section-tag">Testimonials</div>
            <h2 className="section-title">WORDS FROM<br /><em>people who moved.</em></h2>
          </div>

          <div className="marquee-wrap">
            <div className="marquee-track">
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <div className="test-card" key={i}>
                  <div className="test-stars">★★★★★</div>
                  <p className="test-text">"{t.text}"</p>
                  <div className="test-author">
                    <span className="test-name">{t.name}</span>
                    <span className="test-city">{t.city}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="marquee-wrap" style={{ marginTop: "1.5rem" }}>
            <div className="marquee-track rev">
              {[...TESTIMONIALS, ...TESTIMONIALS].reverse().map((t, i) => (
                <div className="test-card" key={i}>
                  <div className="test-stars">★★★★★</div>
                  <p className="test-text">"{t.text}"</p>
                  <div className="test-author">
                    <span className="test-name">{t.name}</span>
                    <span className="test-city">{t.city}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="faq-section">
          <div className="section-tag">FAQ</div>
          <h2 className="section-title">GOT<br /><em>questions?</em></h2>
          <div className="faq-list">
            {FAQS.map((item, i) => <FAQRow key={item.q} item={item} i={i} />)}
          </div>
        </section>

        {/* ── CTA ── */}
        <section id="cta" className="cta-section">
          <div className="cta-bg-text">ATLAS</div>
          <div ref={ctaReveal.ref} style={{ opacity: ctaReveal.visible ? 1 : 0, transform: ctaReveal.visible ? "scale(1)" : "scale(0.94)", transition: "opacity 0.9s ease, transform 0.9s ease", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="cta-tag">Ready to Move?</div>
            <h2 className="cta-title">LET'S PLAN<br />YOUR <em>next</em><br />CHAPTER.</h2>
            <p className="cta-sub">Tell us about your move and we'll craft a precise, pressure-free plan — with a price that doesn't change on moving day.</p>
            <div className="cta-btns">
              <MagneticBtn className="btn-lime">Get a Free Quote</MagneticBtn>
              <MagneticBtn className="btn-outline-cream">Call Us Now</MagneticBtn>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="footer">
          <div className="footer-grid">
            <div>
              <div className="footer-brand-name">ATL<span>A</span>S</div>
              <p className="footer-tagline">Moving Co. — treating your story with the care it deserves, since 2012.</p>
            </div>
            <div className="footer-col">
              <h4>Services</h4>
              <ul>
                <li><a href="#">Residential</a></li>
                <li><a href="#">Commercial</a></li>
                <li><a href="#">Long Distance</a></li>
                <li><a href="#">Packing</a></li>
                <li><a href="#">Storage</a></li>
                <li><a href="#">Specialty Items</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Our Team</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Press</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <ul>
                <li><a href="#">hello@atlasmoving.co</a></li>
                <li><a href="#">+1 (800) 285-2767</a></li>
                <li><a href="#">New York · Chicago · LA</a></li>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copy">© 2025 Atlas Moving Co. All rights reserved.</div>
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Licensing</a>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}