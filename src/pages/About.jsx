import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: "500+", label: "Acres Developed" },
  { value: "5,000+", label: "Happy Families" },
  { value: "20+", label: "Landmark Projects" },
  { value: "₹3,200Cr+", label: "Total Transactions" },
];

const SERVICES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    title: "Residential Development",
    items: ["Premium Villas", "Apartments & Housing", "Gated Communities", "Affordable Housing"],
    color: "#1a3a6b",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
    title: "Commercial Development",
    items: ["Office Spaces", "Retail Complexes", "Shopping Centers", "Business Parks"],
    color: "#b07d2a",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
      </svg>
    ),
    title: "Land Development",
    items: ["Residential Plotting", "Township Development", "Infrastructure Planning", "Land Acquisition"],
    color: "#2d6a4f",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
    title: "Real Estate Consulting",
    items: ["Investment Advisory", "Project Planning", "Market Analysis", "Property Management"],
    color: "#6b3a1a",
  },
];

const VALUES = [
  {
    icon: "◆",
    title: "Integrity",
    desc: "Transparent dealings and ethical practices in every transaction — no exceptions.",
  },
  {
    icon: "◈",
    title: "Quality",
    desc: "Construction and design that meets the highest standards, built to endure generations.",
  },
  {
    icon: "◉",
    title: "Innovation",
    desc: "Modern technologies and creative solutions shaping future-ready developments.",
  },
  {
    icon: "◎",
    title: "Customer First",
    desc: "Our customers are at the heart of every decision we make.",
  },
  {
    icon: "◇",
    title: "Sustainability",
    desc: "Environmentally responsible practices woven into every project we deliver.",
  },
];

const WHY_US = [
  "Trusted & Transparent Approach",
  "Timely Project Delivery",
  "Customer-Focused Service",
  "Innovative Designs",
  "Long-Term Value Creation",
  "Sustainable Development Practices",
];

const MILESTONES = [
  {
    year: "Founded",
    title: "The Vision",
    text: "Avyaya Developers established with a commitment to build spaces that endure — inspired by the Sanskrit for 'eternal'.",
  },
  {
    year: "Growth",
    title: "NCR Footprint",
    text: "Expanded across residential, commercial, and land segments, earning trust with quality over speed.",
  },
  {
    year: "Scale",
    title: "Landmark Projects",
    text: "Crossed 20+ landmark developments spanning villas, gated communities, business parks, and townships.",
  },
  {
    year: "Today",
    title: "Industry Leader",
    text: "₹3,200Cr+ in transactions, 5,000+ families housed, and a legacy of lasting communities across NCR.",
  },
];

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Fade({ children, className = "", delay = 0, from = "bottom" }) {
  const [ref, inView] = useInView();
  const transforms = { bottom: "translateY(36px)", left: "translateX(-36px)", right: "translateX(36px)" };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translate(0)" : transforms[from],
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// Decorative mark used as section divider
function GoldRule() {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <div style={{ width: 32, height: 2, background: "#b8892e" }} />
      <div style={{ width: 6, height: 6, background: "#b8892e", transform: "rotate(45deg)" }} />
      <div style={{ width: 32, height: 2, background: "#b8892e" }} />
    </div>
  );
}

function Eyebrow({ children }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <GoldRule />
      <span style={{ color: "#b8892e", fontSize: 11, letterSpacing: "0.28em", fontWeight: 700, textTransform: "uppercase" }}>
        {children}
      </span>
      <GoldRule />
    </div>
  );
}

function EyebrowLeft({ children }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div style={{ width: 28, height: 2, background: "#b8892e" }} />
      <span style={{ color: "#b8892e", fontSize: 11, letterSpacing: "0.28em", fontWeight: 700, textTransform: "uppercase" }}>
        {children}
      </span>
    </div>
  );
}

export default function AvyayaDevelopersAbout() {
  return (
    <div style={{ background: "#f7f4ef", color: "#12243d", fontFamily: "'Georgia', 'Times New Roman', serif", overflowX: "hidden" }}>

      {/* ── HERO ── */}
      <section style={{ background: "#12243d", minHeight: "92vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
        {/* Grid texture */}
      
      

        <div style={{ position: "relative", zIndex: 10, maxWidth: 1200, margin: "0 auto", padding: "6rem 2.5rem", width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>

            {/* Left — text */}
            <Fade>
              <EyebrowLeft>Est. in NCR · Avyaya Developers</EyebrowLeft>
              <h1 style={{ fontSize: "clamp(2.6rem,5vw,4.2rem)", fontWeight: 700, color: "#fff", lineHeight: 1.06, marginBottom: "1.5rem", letterSpacing: "-0.01em" }}>
                Building Dreams,<br />
                <span style={{ color: "#b8892e" }}>Creating Futures</span>
              </h1>
              <p style={{ color: "rgba(255,255,255,0.52)", fontSize: "1rem", lineHeight: 1.8, maxWidth: 420, marginBottom: "2.5rem" }}>
                Inspired by the Sanskrit word <em>Avyaya</em> — eternal, enduring, everlasting — we build spaces that stand the test of time and create lasting value for communities.
              </p>
              {/* Sanskrit word callout */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "1.2rem",
                border: "1px solid rgba(184,137,46,0.35)", padding: "1rem 1.5rem", borderRadius: 2,
                background: "rgba(184,137,46,0.06)", marginBottom: "2.5rem",
              }}>
                <span style={{ fontFamily: "serif", fontSize: "1.8rem", color: "#b8892e", lineHeight: 1 }}>अव्यय</span>
                <div style={{ width: 1, height: 36, background: "rgba(184,137,46,0.3)" }} />
                <div>
                  <p style={{ color: "#b8892e", fontWeight: 700, fontSize: 13, letterSpacing: "0.15em" }}>AVYAYA</p>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, marginTop: 2 }}>Eternal · Enduring · Everlasting</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <a href="#story" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "#b8892e", color: "#fff", fontWeight: 700,
                  padding: "0.85rem 2rem", borderRadius: 2, textDecoration: "none",
                  fontSize: 14, letterSpacing: "0.05em",
                }}>
                  Our Story
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a href="#services" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.75)",
                  fontWeight: 600, padding: "0.85rem 2rem", borderRadius: 2,
                  textDecoration: "none", fontSize: 14,
                }}>
                  Our Services
                </a>
              </div>
            </Fade>

            {/* Right — image collage */}
            <Fade delay={200} from="right">
              <div style={{ position: "relative", height: 460 }}>
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80"
                  alt="Luxury development"
                  style={{ position: "absolute", top: 0, right: 0, width: "78%", height: "68%", objectFit: "cover", borderRadius: 2, boxShadow: "0 24px 60px rgba(0,0,0,0.4)" }} />
                <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80"
                  alt="Commercial building"
                  style={{ position: "absolute", bottom: 0, left: 0, width: "50%", height: "50%", objectFit: "cover", borderRadius: 2, boxShadow: "0 16px 40px rgba(0,0,0,0.4)", border: "3px solid #12243d" }} />
                <div style={{
                  position: "absolute", bottom: 72, right: 8, zIndex: 10,
                  background: "#b8892e", color: "#fff", padding: "1rem 1.25rem",
                  borderRadius: 2, boxShadow: "0 8px 32px rgba(184,137,46,0.4)",
                  textAlign: "center",
                }}>
                  <p style={{ fontSize: "2rem", fontWeight: 800, lineHeight: 1 }}>20+</p>
                  <p style={{ fontSize: 11, opacity: 0.85, marginTop: 4 }}>Landmark<br />Projects</p>
                </div>
              </div>
            </Fade>
          </div>
        </div>

  
      </section>

      {/* ── STATS ── */}
      <section style={{ background: "#f7f4ef", padding: "0 0 2rem" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "#e2d9cc", borderRadius: 2, overflow: "hidden", boxShadow: "0 4px 24px rgba(18,36,61,0.08)" }}>
            {STATS.map((s, i) => (
              <Fade key={s.label} delay={i * 60} className="stat-cell" style={{ background: "#fff", padding: "2rem 1.5rem", textAlign: "center" }}>
                <div style={{ background: "#fff", padding: "2rem 1.5rem", textAlign: "center" }}>
                  <p style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)", fontWeight: 800, color: "#12243d" }}>{s.value}</p>
                  <div style={{ width: 28, height: 2, background: "#b8892e", margin: "0.6rem auto" }} />
                  <p style={{ fontSize: 13, color: "rgba(18,36,61,0.5)", fontWeight: 600, lineHeight: 1.4 }}>{s.label}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ── STORY ── */}
      <section id="story" style={{ padding: "6rem 2.5rem", background: "#f7f4ef" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>

          {/* Images left */}
          <Fade from="left">
            <div style={{ position: "relative", height: 460 }}>
              <img src="https://images.unsplash.com/photo-1560184897-ae75f418493e?w=700&q=80"
                alt="Construction site"
                style={{ position: "absolute", top: 0, left: 0, width: "66%", height: "70%", objectFit: "cover", borderRadius: 2, boxShadow: "0 16px 48px rgba(18,36,61,0.14)" }} />
              <img src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&q=80"
                alt="Property"
                style={{ position: "absolute", bottom: 0, right: 0, width: "54%", height: "54%", objectFit: "cover", borderRadius: 2, boxShadow: "0 12px 36px rgba(18,36,61,0.12)", border: "4px solid #fff" }} />
              <div style={{
                position: "absolute", top: "55%", left: "42%", zIndex: 10,
                background: "#12243d", padding: "1rem 1.2rem", borderRadius: 2,
                maxWidth: 170, boxShadow: "0 8px 32px rgba(18,36,61,0.3)",
              }}>
                <p style={{ color: "#b8892e", fontSize: 12, fontWeight: 600, lineHeight: 1.6, fontStyle: "italic" }}>
                  "Real estate is more than buildings — it is about creating a legacy."
                </p>
              </div>
            </div>
          </Fade>

          {/* Text right */}
          <Fade delay={150}>
            <EyebrowLeft>Our Story</EyebrowLeft>
            <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.5rem)", fontWeight: 700, color: "#12243d", lineHeight: 1.25, marginBottom: "1.5rem" }}>
              Built to Create Spaces That Outlast Generations
            </h2>
            <p style={{ color: "rgba(18,36,61,0.6)", lineHeight: 1.85, marginBottom: "1.25rem", fontSize: 15 }}>
              Avyaya Developers was founded with a singular conviction: that real estate development in India
              deserved the same rigour, vision, and integrity that the world's finest developers bring to their
              work. The name itself — drawn from Sanskrit — sets the standard we hold ourselves to.
            </p>
            <p style={{ color: "rgba(18,36,61,0.6)", lineHeight: 1.85, marginBottom: "2rem", fontSize: 15 }}>
              Our mission is to transform land into thriving destinations through innovative design, superior
              construction, and customer-centric service. Every project reflects our commitment to excellence,
              sustainability, and enduring trust.
            </p>

            {/* Vision box */}
            <div style={{
              border: "1px solid #e2d9cc", borderLeft: "3px solid #b8892e",
              padding: "1.25rem 1.5rem", background: "#fff", borderRadius: "0 2px 2px 0",
            }}>
              <p style={{ color: "#b8892e", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>Our Vision</p>
              <p style={{ color: "rgba(18,36,61,0.7)", fontSize: 14, lineHeight: 1.75 }}>
                To become a trusted and leading real estate developer known for sustainable, innovative,
                and value-driven developments that enhance quality of life for generations.
              </p>
            </div>
          </Fade>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section style={{ padding: "5rem 2.5rem", background: "#12243d", position: "relative", overflow: "hidden" }}>
   
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1100, margin: "0 auto" }}>
          <Fade className="text-center" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <Eyebrow>Our Mission</Eyebrow>
              <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)", fontWeight: 700, color: "#fff" }}>
                Five Pillars of Purpose
              </h2>
            </div>
          </Fade>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "1.5rem" }}>
            {[
              { n: "01", t: "Exceptional Quality", d: "Uncompromising standards in every project we deliver." },
              { n: "02", t: "Sustainable Communities", d: "Future-ready developments built with the planet in mind." },
              { n: "03", t: "Trust & Transparency", d: "Long-term relationships built on honesty, always." },
              { n: "04", t: "Stakeholder Value", d: "Maximising returns for customers, partners, and investors." },
              { n: "05", t: "Social Impact", d: "Contributing positively to economic and community growth." },
            ].map((p, i) => (
              <Fade key={p.n} delay={i * 80}>
                <div style={{
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(184,137,46,0.2)",
                  borderRadius: 2, padding: "1.75rem 1.25rem", textAlign: "center",
                  transition: "border-color 0.3s, background 0.3s",
                }}>
                  <div style={{ color: "#b8892e", fontSize: "2rem", fontWeight: 800, lineHeight: 1, marginBottom: "1rem", opacity: 0.7 }}>{p.n}</div>
                  <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 14, marginBottom: "0.6rem", lineHeight: 1.35 }}>{p.t}</h3>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, lineHeight: 1.7 }}>{p.d}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding: "6rem 2.5rem", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Fade style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <Eyebrow>What We Build</Eyebrow>
              <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)", fontWeight: 700, color: "#12243d" }}>Our Services</h2>
            </div>
          </Fade>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.5rem" }}>
            {SERVICES.map((s, i) => (
              <Fade key={s.title} delay={i * 90}>
                <div style={{
                  background: "#faf8f4", border: "1px solid #e2d9cc", borderRadius: 2,
                  padding: "2rem 1.5rem", height: "100%", transition: "box-shadow 0.3s, transform 0.3s",
                }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 2,
                    background: `${s.color}12`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: s.color, marginBottom: "1.25rem",
                  }}>
                    {s.icon}
                  </div>
                  <h3 style={{ fontWeight: 700, color: "#12243d", marginBottom: "1rem", fontSize: 15 }}>{s.title}</h3>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {s.items.map(item => (
                      <li key={item} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                        <div style={{ width: 4, height: 4, background: "#b8892e", borderRadius: "50%", flexShrink: 0 }} />
                        <span style={{ color: "rgba(18,36,61,0.6)", fontSize: 13, lineHeight: 1.5 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section style={{ padding: "6rem 2.5rem", background: "#f7f4ef" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "5rem", alignItems: "center" }}>
            <Fade from="left">
              <EyebrowLeft>What Drives Us</EyebrowLeft>
              <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)", fontWeight: 700, color: "#12243d", lineHeight: 1.25, marginBottom: "1.5rem" }}>
                Core Values That Shape Every Decision
              </h2>
              <p style={{ color: "rgba(18,36,61,0.55)", fontSize: 15, lineHeight: 1.8, marginBottom: "2rem" }}>
                Our values aren't aspirational posters on a wall. They are the operating principles behind
                how we acquire land, design projects, manage construction, and serve our customers.
              </p>
              <img src="https://images.unsplash.com/photo-1560472355-536de3962603?w=500&q=80"
                alt="Team meeting"
                style={{ width: "100%", borderRadius: 2, boxShadow: "0 12px 40px rgba(18,36,61,0.1)" }} />
            </Fade>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {VALUES.map((v, i) => (
                <Fade key={v.title} delay={i * 70} from="right">
                  <div style={{
                    display: "flex", alignItems: "flex-start", gap: "1.25rem",
                    background: "#fff", border: "1px solid #e2d9cc", borderRadius: 2,
                    padding: "1.4rem 1.5rem",
                  }}>
                    <span style={{ fontSize: "1.3rem", color: "#b8892e", lineHeight: 1, paddingTop: 2 }}>{v.icon}</span>
                    <div>
                      <h3 style={{ fontWeight: 700, color: "#12243d", marginBottom: 6, fontSize: 15 }}>{v.title}</h3>
                      <p style={{ color: "rgba(18,36,61,0.55)", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{v.desc}</p>
                    </div>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section style={{ padding: "6rem 2.5rem", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          <Fade>
            <Eyebrow>Why Avyaya</Eyebrow>
            <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)", fontWeight: 700, color: "#12243d", textAlign: "center", marginBottom: "2.5rem" }}>
              Why Choose Avyaya Developers
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {WHY_US.map((w, i) => (
                <div key={w} style={{
                  display: "flex", alignItems: "flex-start", gap: 10,
                  background: "#faf8f4", border: "1px solid #e2d9cc",
                  padding: "0.9rem 1rem", borderRadius: 2,
                }}>
                  <svg style={{ width: 18, height: 18, color: "#b8892e", flexShrink: 0, marginTop: 1 }} fill="none" stroke="#b8892e" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style={{ color: "rgba(18,36,61,0.75)", fontSize: 13, lineHeight: 1.5, fontWeight: 600 }}>{w}</span>
                </div>
              ))}
            </div>
          </Fade>
          <Fade from="right" delay={150}>
            <div style={{ position: "relative" }}>
              <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80"
                alt="Architecture"
                style={{ width: "100%", borderRadius: 2, boxShadow: "0 16px 56px rgba(18,36,61,0.13)" }} />
              <div style={{
                position: "absolute", bottom: -24, left: -24,
                background: "#12243d", padding: "1.5rem 2rem", borderRadius: 2,
                boxShadow: "0 8px 32px rgba(18,36,61,0.25)",
              }}>
                <p style={{ color: "#b8892e", fontWeight: 800, fontSize: "1.6rem", lineHeight: 1 }}>5,000+</p>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, marginTop: 4 }}>Happy Families Housed</p>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* ── MILESTONES ── */}
      <section style={{ padding: "6rem 2.5rem", background: "#f7f4ef" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Fade style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <Eyebrow>Our Journey</Eyebrow>
              <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)", fontWeight: 700, color: "#12243d" }}>Milestones That Define Us</h2>
              <p style={{ color: "rgba(18,36,61,0.45)", fontSize: 14, marginTop: 12 }}>
                A journey built on excellence, trust, and an unwavering commitment to lasting quality.
              </p>
            </div>
          </Fade>

          {/* Horizontal timeline */}
          <div style={{ position: "relative" }}>
            {/* connector line */}
            <div style={{ position: "absolute", top: 52, left: "8%", right: "8%", height: 2, zIndex: 0 }}>
              <svg width="100%" height="4">
                <line x1="0" y1="2" x2="100%" y2="2" stroke="#b8892e" strokeWidth="1.5" strokeDasharray="10 7" strokeLinecap="round" />
              </svg>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.5rem" }}>
              {MILESTONES.map((m, i) => (
                <Fade key={m.year} delay={i * 100}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                    {/* Circle */}
                    <div style={{
                      position: "relative", zIndex: 1,
                      width: 104, height: 104, borderRadius: "50%",
                      background: "#fff", border: "2px solid #e2d9cc",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginBottom: "1.25rem", boxShadow: "0 4px 20px rgba(18,36,61,0.08)",
                    }}>
                      <div style={{
                        width: 64, height: 64, borderRadius: "50%",
                        background: "#f7f4ef",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#b8892e" strokeWidth="1.5" style={{ width: 28, height: 28 }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                        </svg>
                      </div>
                    </div>
                    {/* Year pill */}
                    <div style={{
                      display: "inline-flex", padding: "4px 14px", borderRadius: 20,
                      background: "#12243d", marginBottom: "0.75rem",
                    }}>
                      <span style={{ color: "#b8892e", fontSize: 11, fontWeight: 800, letterSpacing: "0.2em" }}>{m.year.toUpperCase()}</span>
                    </div>
                    <h3 style={{ fontWeight: 700, color: "#12243d", fontSize: 15, marginBottom: "0.5rem" }}>{m.title}</h3>
                    <p style={{ color: "rgba(18,36,61,0.55)", fontSize: 13, lineHeight: 1.7, padding: "0 0.5rem" }}>{m.text}</p>
                    <div style={{ marginTop: 12, width: 28, height: 2, background: "rgba(184,137,46,0.4)" }} />
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COMMITMENT / CTA ── */}
      <section style={{ padding: "6rem 2.5rem", background: "#12243d", position: "relative", overflow: "hidden" }}>

        <div style={{ position: "relative", zIndex: 2, maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <Fade>
            <Eyebrow>Our Commitment</Eyebrow>
            <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: "1.5rem" }}>
              Building Legacy,<br />
              <span style={{ color: "#b8892e" }}>One Community at a Time</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, lineHeight: 1.85, maxWidth: 560, margin: "0 auto 2.5rem", }}>
              At Avyaya Developers, we believe real estate is more than buildings — it is about creating
              communities, nurturing dreams, and building a legacy that lasts for generations. Our commitment
              to excellence ensures every project becomes a landmark of trust, quality, and innovation.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#" style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                background: "#b8892e", color: "#fff", fontWeight: 700,
                padding: "1rem 2.5rem", borderRadius: 2, textDecoration: "none", fontSize: 14,
                letterSpacing: "0.05em",
              }}>
                Explore Our Projects
              </a>
              <a href="#" style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                border: "2px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.75)",
                fontWeight: 600, padding: "1rem 2.5rem", borderRadius: 2,
                textDecoration: "none", fontSize: 14,
              }}>
                Get in Touch
              </a>
            </div>
          </Fade>
        </div>
      </section>

    </div>
  );
}