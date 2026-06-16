import { useEffect, useRef, useState } from "react";

const OFFICES = [
  {
    city: "Noida",
    tag: "Headquarters",
    address: "Galaxy Diamond Plaza, Noida,\nUttar Pradesh – 201 309",
    phone: "+91 7004397655",
    email: "info@avyayadevelopers.com",
    hours: "Mon – Sat, 10 AM – 7 PM",
  },
  {
    city: "Greater Noida",
    tag: "West Office",
    address: "Tower A, Gaur City Centre,\nGreater Noida West – 201 306",
      phone: "+91 7004397655",
    email: "support@avyayadevelopers.com",
    hours: "Mon – Sat, 10 AM – 7 PM",
  },
  {
    city: "Delhi",
    tag: "South Delhi",
    address: "B-42, Defence Colony,\nNew Delhi – 110 024",
      phone: "+91 7004397655",
    hours: "Mon – Sat, 10 AM – 7 PM",
  },
];

const ENQUIRY_TYPES = [
  "Residential Project",
  "Commercial Project",
  "Land / Plotting",
  "Investment Advisory",
  "General Enquiry",
];

function useInView(threshold = 0.1) {
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

function Fade({ children, style = {}, delay = 0, from = "bottom" }) {
  const [ref, inView] = useInView();
  const transforms = {
    bottom: "translateY(30px)",
    left: "translateX(-30px)",
    right: "translateX(30px)",
  };
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translate(0)" : transforms[from],
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 18, height: 18, flexShrink: 0 }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 18, height: 18, flexShrink: 0 }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 18, height: 18, flexShrink: 0 }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
function IconPin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 18, height: 18, flexShrink: 0 }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}
function IconWhatsapp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", type: "", message: "" });
  const [sent, setSent] = useState(false);
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => { e.preventDefault(); setSent(true); };

  const inputBase = {
    width: "100%",
    boxSizing: "border-box",
    background: "#fff",
    border: "1px solid #d9cfc2",
    borderRadius: 2,
    padding: "0.78rem 1rem",
    fontSize: 14,
    color: "#12243d",
    fontFamily: "inherit",
    outline: "none",
  };

  if (sent) {
    return (
      <div style={{ textAlign: "center", padding: "3rem 1.5rem" }}>
        <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#b8892e", margin: "0 auto 1.25rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} style={{ width: 26, height: 26 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#12243d", marginBottom: 10 }}>Enquiry Received!</h3>
        <p style={{ color: "rgba(18,36,61,0.55)", fontSize: 14, lineHeight: 1.75, marginBottom: 20 }}>
          Thank you{form.name ? `, ${form.name}` : ""}. A senior advisor will contact you within 24 hours.
        </p>
        <button onClick={() => { setSent(false); setForm({ name: "", phone: "", email: "", type: "", message: "" }); }}
          style={{ background: "#12243d", color: "#fff", border: "none", borderRadius: 2, padding: "0.7rem 1.8rem", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
          New Enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#12243d", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 7 }}>Full Name *</label>
          <input name="name" required value={form.name} onChange={handle} placeholder="Your Name" style={inputBase} />
        </div>
        <div>
          <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#12243d", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 7 }}>Phone *</label>
          <input name="phone" required value={form.phone} onChange={handle} placeholder="+91 98000 00000" style={inputBase} />
        </div>
      </div>
      <div>
        <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#12243d", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 7 }}>Email Address</label>
        <input name="email" type="email" value={form.email} onChange={handle} placeholder="abc@example.com" style={inputBase} />
      </div>
      <div>
        <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#12243d", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 7 }}>Enquiry Type</label>
        <select name="type" value={form.type} onChange={handle} style={{ ...inputBase, appearance: "none", cursor: "pointer" }}>
          <option value="">Select a category…</option>
          {ENQUIRY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div>
        <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#12243d", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 7 }}>Message</label>
        <textarea name="message" rows={4} value={form.message} onChange={handle}
          placeholder="Tell us about the project, budget range, preferred location…"
          style={{ ...inputBase, resize: "vertical", lineHeight: 1.65 }} />
      </div>
      <button type="submit" style={{
        background: "#b8892e", color: "#fff", border: "none", borderRadius: 2,
        padding: "0.9rem 2rem", fontSize: 14, fontWeight: 700, cursor: "pointer",
        letterSpacing: "0.05em", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
      }}>
        Send Enquiry
        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} style={{ width: 16, height: 16 }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
      </button>
      <p style={{ fontSize: 12, color: "rgba(18,36,61,0.4)", textAlign: "center", marginTop: -4 }}>
        We respect your privacy. Your information will never be shared.
      </p>
    </form>
  );
}

export default function ContactPage() {
  return (
    <div style={{ background: "#f7f4ef", color: "#12243d", fontFamily: "'Georgia', serif", overflowX: "hidden" }}>

      {/* ─── GLOBAL RESPONSIVE STYLES ─── */}
      <style>{`
        @media (max-width: 768px) {
          .hero-content { padding: 5rem 1.25rem 4rem !important; }
          .hero-title { font-size: 2rem !important; }
          .hero-chips { flex-direction: column !important; }
          .contact-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .form-name-phone { grid-template-columns: 1fr !important; }
          .offices-grid { grid-template-columns: 1fr !important; }
          .footer-inner { flex-direction: column !important; align-items: flex-start !important; gap: 1.25rem !important; }
          .whatsapp-strip { flex-direction: column !important; align-items: flex-start !important; gap: 1rem !important; }
        }
        @media (max-width: 480px) {
          .hero-title { font-size: 1.7rem !important; }
          .section-pad { padding: 3rem 1.25rem !important; }
        }
        .hero-img-overlay {
          background: linear-gradient(to right, rgba(10,20,45,0.88) 45%, rgba(10,20,45,0.45) 100%);
        }
        @media (max-width: 768px) {
          .hero-img-overlay {
            background: linear-gradient(to bottom, rgba(10,20,45,0.7) 0%, rgba(10,20,45,0.82) 100%);
          }
        }
        input:focus, textarea:focus, select:focus {
          border-color: #b8892e !important;
          box-shadow: 0 0 0 3px rgba(184,137,46,0.12);
        }
        .office-card:hover {
          border-color: #b8892e !important;
          box-shadow: 0 4px 20px rgba(18,36,61,0.1) !important;
        }
        .submit-btn:hover { background: #a07828 !important; }
        .social-link:hover { border-color: #b8892e !important; color: #b8892e !important; }
      `}</style>

      {/* ─── HERO WITH FULL IMAGE ─── */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>

        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=85"
          alt="Avyaya Developers headquarters"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
        />

        {/* Dark overlay */}
        <div className="hero-img-overlay" style={{ position: "absolute", inset: 0 }} />

        {/* Top gold bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,transparent,#b8892e 35%,#d4a84b 65%,transparent)", zIndex: 2 }} />

        {/* Content */}
        <div className="hero-content" style={{ position: "relative", zIndex: 3, maxWidth: 1200, margin: "0 auto", padding: "7rem 2.5rem 5rem", width: "100%", boxSizing: "border-box" }}>

          {/* Eyebrow */}
          <Fade style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <div style={{ width: 28, height: 2, background: "#b8892e" }} />
            <span style={{ color: "#b8892e", fontSize: 11, letterSpacing: "0.28em", fontWeight: 700, textTransform: "uppercase" }}>Get in Touch</span>
          </Fade>

          {/* Headline */}
          <Fade delay={80}>
            <h1 className="hero-title" style={{ fontSize: "clamp(2rem,4.5vw,3.8rem)", fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: "1.25rem", letterSpacing: "-0.01em", maxWidth: 620 }}>
              Let's Build Something<br />
              <span style={{ color: "#b8892e" }}>Extraordinary Together</span>
            </h1>
          </Fade>

          {/* Subtitle */}
          <Fade delay={160}>
            <p style={{ color: "rgba(255,255,255,0.58)", fontSize: "clamp(0.9rem,1.5vw,1.05rem)", lineHeight: 1.8, maxWidth: 480, marginBottom: "2.5rem" }}>
              Whether you're looking for a dream home, a strategic commercial investment, or expert real estate advisory — our team is ready to guide you.
            </p>
          </Fade>

          {/* Quick contact chips */}
          <Fade delay={220}>
            <div className="hero-chips" style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
              {[
                { icon: <IconPhone />, label: "+91 7004397655" },
                { icon: <IconMail />, label: "info@avyayadevelopers.com" },
              ].map((c, i) => (
                <div key={i} style={{
                  display: "inline-flex", alignItems: "center", gap: 9,
                  border: "1px solid rgba(184,137,46,0.4)", borderRadius: 2,
                  padding: "0.65rem 1.2rem", background: "rgba(10,20,45,0.45)",
                  backdropFilter: "blur(6px)", color: "rgba(255,255,255,0.75)", fontSize: 13,
                }}>
                  <span style={{ color: "#b8892e" }}>{c.icon}</span>
                  {c.label}
                </div>
              ))}
            </div>
          </Fade>

          {/* CTA buttons */}
          <Fade delay={280}>
            <div style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap" }}>
              <a href="#contact-form" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "#b8892e", color: "#fff", fontWeight: 700,
                padding: "0.9rem 2rem", borderRadius: 2, textDecoration: "none", fontSize: 14, letterSpacing: "0.05em",
              }}>
                Send an Enquiry
                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} style={{ width: 15, height: 15 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="#offices" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.8)",
                fontWeight: 600, padding: "0.9rem 2rem", borderRadius: 2, textDecoration: "none", fontSize: 14,
                background: "rgba(10,20,45,0.3)", backdropFilter: "blur(4px)",
              }}>
                Our Offices
              </a>
            </div>
          </Fade>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: 1, height: 36, background: "linear-gradient(to bottom, rgba(184,137,46,0.8), transparent)" }} />
        </div>
      </section>

      {/* ─── FORM + INFO ─── */}
      <section id="contact-form" className="section-pad" style={{ padding: "5rem 2.5rem", background: "#f7f4ef" }}>
        <div className="contact-grid" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "3.5rem", alignItems: "start" }}>

          {/* FORM */}
          <Fade from="left">
            <div style={{ background: "#fff", borderRadius: 2, boxShadow: "0 8px 48px rgba(18,36,61,0.09)", overflow: "hidden" }}>
              {/* Form header */}
              <div style={{ background: "#12243d", padding: "1.75rem 2rem", borderBottom: "3px solid #b8892e" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <div style={{ width: 22, height: 2, background: "#b8892e" }} />
                  <span style={{ color: "#b8892e", fontSize: 11, letterSpacing: "0.28em", fontWeight: 700, textTransform: "uppercase" }}>Send an Enquiry</span>
                </div>
                <h2 style={{ color: "#fff", fontSize: "1.3rem", fontWeight: 700, margin: 0, lineHeight: 1.3 }}>Speak with a Senior Advisor</h2>
                <p style={{ color: "rgba(255,255,255,0.42)", fontSize: 13, marginTop: 6, lineHeight: 1.6 }}>Free consultation · No pressure · Expert guidance</p>
              </div>
              <div style={{ padding: "2rem" }}>
                <ContactForm />
              </div>
            </div>
          </Fade>

          {/* INFO */}
          <div>
            <Fade delay={100}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <div style={{ width: 24, height: 2, background: "#b8892e" }} />
                <span style={{ color: "#b8892e", fontSize: 11, letterSpacing: "0.28em", fontWeight: 700, textTransform: "uppercase" }}>Direct Contact</span>
              </div>
              <h2 style={{ fontSize: "clamp(1.5rem,2.5vw,2rem)", fontWeight: 700, color: "#12243d", marginBottom: "0.6rem", lineHeight: 1.25 }}>
                Reach Us Directly
              </h2>
              <p style={{ color: "rgba(18,36,61,0.5)", fontSize: 14, lineHeight: 1.8, marginBottom: "2rem" }}>
                Prefer a direct call or email? Our advisors are available six days a week across all three NCR offices.
              </p>
            </Fade>

            {/* Contact detail rows */}
            <Fade delay={140}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
                {[
                  { icon: <IconPhone />, label: "Call Us", value: "+91 7004397655", sub: "Mon – Sat, 10 AM – 7 PM" },
                  { icon: <IconMail />, label: "Email Us", value: "info@avyayadevelopers.com,", sub: "We reply within 12 hours" },
                  { icon: <IconPin />, label: "Head Office", value: "Galaxy Diamond Plaza, Noida, UP – 201 309", sub: "Open for walk-ins" },
                ].map((row, i) => (
                  <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", background: "#fff", border: "1px solid #e2d9cc", borderRadius: 2, padding: "1.1rem 1.25rem" }}>
                    <div style={{ width: 40, height: 40, borderRadius: 2, background: "#12243d", display: "flex", alignItems: "center", justifyContent: "center", color: "#b8892e", flexShrink: 0 }}>
                      {row.icon}
                    </div>
                    <div>
                      <p style={{ fontSize: 11, fontWeight: 700, color: "#b8892e", letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 3px" }}>{row.label}</p>
                      <p style={{ fontSize: 14, fontWeight: 700, color: "#12243d", margin: "0 0 2px" }}>{row.value}</p>
                      <p style={{ fontSize: 12, color: "rgba(18,36,61,0.45)", margin: 0 }}>{row.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Fade>

            {/* WhatsApp */}
            <Fade delay={200}>
              <div className="whatsapp-strip" style={{ background: "#12243d", borderRadius: 2, padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
                <div>
                  <p style={{ color: "#fff", fontWeight: 700, fontSize: 14, margin: 0 }}>Prefer WhatsApp?</p>
                  <p style={{ color: "rgba(255,255,255,0.42)", fontSize: 12, margin: "4px 0 0" }}>Message us directly for quick responses</p>
                </div>
                <a href="https://wa.me/917004397655" target="_blank" rel="noreferrer" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "#25d366", color: "#fff", fontWeight: 700,
                  padding: "0.7rem 1.25rem", borderRadius: 2, textDecoration: "none", fontSize: 13, flexShrink: 0,
                }}>
                  <IconWhatsapp /> Chat Now
                </a>
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* ─── OFFICES ─── */}
      <section id="offices" className="section-pad" style={{ padding: "5rem 2.5rem", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Fade style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 28, height: 2, background: "#b8892e" }} />
              <div style={{ width: 6, height: 6, background: "#b8892e", transform: "rotate(45deg)" }} />
              <span style={{ color: "#b8892e", fontSize: 11, letterSpacing: "0.28em", fontWeight: 700, textTransform: "uppercase" }}>Our Offices</span>
              <div style={{ width: 6, height: 6, background: "#b8892e", transform: "rotate(45deg)" }} />
              <div style={{ width: 28, height: 2, background: "#b8892e" }} />
            </div>
            <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 700, color: "#12243d", margin: 0 }}>Visit Us Across NCR</h2>
            <p style={{ color: "rgba(18,36,61,0.45)", fontSize: 14, marginTop: 10, lineHeight: 1.75 }}>
              Drop in at any of our three offices for a face-to-face consultation with our advisory team.
            </p>
          </Fade>

          <div className="offices-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
            {OFFICES.map((o, i) => (
              <Fade key={o.city} delay={i * 90}>
                <div className="office-card" style={{ background: "#faf8f4", border: "1px solid #e2d9cc", borderRadius: 2, overflow: "hidden", transition: "border-color 0.25s, box-shadow 0.25s" }}>
                  {/* Card top */}
                  <div style={{ background: "#12243d", padding: "1.1rem 1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <div style={{ width: 34, height: 34, borderRadius: 2, background: "rgba(184,137,46,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#b8892e" }}>
                        <IconPin />
                      </div>
                      <p style={{ fontWeight: 700, color: "#fff", fontSize: 15, margin: 0 }}>{o.city}</p>
                    </div>
                    <span style={{ background: "rgba(184,137,46,0.15)", color: "#b8892e", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 9px", borderRadius: 20 }}>{o.tag}</span>
                  </div>

                  {/* Card body */}
                  <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                    {[
                      { icon: <IconPin />, text: o.address },
                      { icon: <IconPhone />, text: o.phone },
                      { icon: <IconMail />, text: o.email },
                      { icon: <IconClock />, text: o.hours },
                    ].map((row, j) => (
                      <div key={j} style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
                        <span style={{ color: "#b8892e", marginTop: 2 }}>{row.icon}</span>
                        <p style={{ margin: 0, fontSize: 13, color: "rgba(18,36,61,0.65)", lineHeight: 1.6, whiteSpace: "pre-line" }}>{row.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MAP ─── */}
      <section className="section-pad" style={{ padding: "0 2.5rem 5rem", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Fade>
            <div style={{ borderRadius: 2, overflow: "hidden", border: "1px solid #e2d9cc", boxShadow: "0 4px 24px rgba(18,36,61,0.08)" }}>
              {/* Map header bar */}
              <div style={{ background: "#12243d", padding: "0.85rem 1.5rem", borderBottom: "3px solid #b8892e", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#b8892e" }}><IconPin /></span>
                <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>Avyaya Developers – Noida Headquarters</span>
              </div>
              {/* Google Maps iframe – Sector 62 Noida */}
              <iframe
                title="Avyaya Developers Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.7818344659636!2d77.42722827927595!3d28.606321022581717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cee4b71461185%3A0xd1989111c49e52fa!2sGalaxy%20Diamond%20Plaza!5e0!3m2!1sen!2sin!4v1781358485127!5m2!1sen!2sin"
                width="100%"
                height="420"
                style={{ border: 0, display: "block" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Fade>
        </div>
      </section>



    </div>
  );
}