import { useState, useEffect, useRef } from "react";

const CATEGORIES = ["All", "Residential", "Commercial", "Villas", "Interiors", "Townships"];

const GALLERY = [
  { id: 1, cat: "Residential", title: "Avyaya Heights", location: "Sector 62, Noida", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", size: "tall" },
  { id: 2, cat: "Residential", title: "Green Valley Homes", location: "Greater Noida West", img: "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800&q=80", size: "wide" },
  { id: 3, cat: "Residential", title: "Skyline Residency", location: "Sector 93, Noida", img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80", size: "normal" },
  { id: 4, cat: "Residential", title: "Urban Nest", location: "Indirapuram, Ghaziabad", img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80", size: "normal" },
  { id: 5, cat: "Commercial", title: "Avyaya Business Hub", location: "Sector 18, Noida", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80", size: "wide" },
  { id: 6, cat: "Commercial", title: "Metro Commerce Centre", location: "Sector 62, Noida", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", size: "normal" },
  { id: 7, cat: "Commercial", title: "The Office Square", location: "Greater Noida", img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80", size: "tall" },
  { id: 8, cat: "Commercial", title: "Retail Boulevard", location: "Sector 50, Noida", img: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800&q=80", size: "normal" },
  { id: 9, cat: "Villas", title: "The Grand Villa", location: "Noida Extension", img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80", size: "wide" },
  { id: 10, cat: "Villas", title: "Heritage Villa Estate", location: "Greater Noida", img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80", size: "tall" },
  { id: 11, cat: "Villas", title: "Serene Villas", location: "Sector 150, Noida", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80", size: "normal" },
  { id: 12, cat: "Villas", title: "Lakeview Bungalow", location: "Yamuna Expressway", img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80", size: "normal" },
  { id: 13, cat: "Interiors", title: "Living Room – Grand Villa", location: "Noida Extension", img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80", size: "normal" },
  { id: 14, cat: "Interiors", title: "Master Suite", location: "Skyline Residency", img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80", size: "tall" },
  { id: 15, cat: "Interiors", title: "Modern Kitchen", location: "Heritage Villa Estate", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80", size: "wide" },
  { id: 16, cat: "Interiors", title: "Lobby – Business Hub", location: "Sector 18, Noida", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80", size: "normal" },
  { id: 17, cat: "Townships", title: "Avyaya Smart Township", location: "Greater Noida West", img: "https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&q=80", size: "wide" },
  { id: 18, cat: "Townships", title: "Eco Valley Township", location: "Yamuna Expressway", img: "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=80", size: "tall" },
  { id: 19, cat: "Townships", title: "Riverside Enclave", location: "Indirapuram", img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80", size: "normal" },
  { id: 20, cat: "Townships", title: "Central Park Homes", location: "Sector 77, Noida", img: "https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800&q=80", size: "normal" },
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

// Simple hook to track window width
function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

function Fade({ children, style = {}, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function Lightbox({ item, items, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  const idx = items.findIndex(i => i.id === item.id);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(8,16,36,0.96)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      <button onClick={onClose} style={{
        position: "fixed", top: 16, right: 16, zIndex: 1001,
        background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: 2, width: 44, height: 44, color: "#fff",
        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 20,
      }}>✕</button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        style={{
          position: "fixed", left: 8, top: "50%", transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 2, width: 44, height: 44, color: "#fff",
          cursor: "pointer", fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 1001,
        }}
      >‹</button>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        style={{
          position: "fixed", right: 8, top: "50%", transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 2, width: 44, height: 44, color: "#fff",
          cursor: "pointer", fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 1001,
        }}
      >›</button>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 900, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <img
          src={item.img}
          alt={item.title}
          style={{ width: "100%", maxHeight: "70vh", objectFit: "contain", borderRadius: 2, display: "block" }}
        />
        <div style={{ marginTop: "1.25rem", textAlign: "center" }}>
          <p style={{ color: "#fff", fontWeight: 700, fontSize: "1.05rem", margin: "0 0 4px" }}>{item.title}</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ color: "#b8892e", fontSize: 12 }}>◆</span>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, margin: 0 }}>{item.location}</p>
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>·</span>
            <p style={{ color: "rgba(184,137,46,0.7)", fontSize: 12, margin: 0, textTransform: "uppercase", letterSpacing: "0.1em" }}>{item.cat}</p>
          </div>
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 12, marginTop: 12 }}>{idx + 1} / {items.length}</p>
        </div>
      </div>
    </div>
  );
}

function GalleryCard({ item, onClick, delay, isMobile, isTablet }) {
  const [hovered, setHovered] = useState(false);
  const [ref, inView] = useInView();

  // Height based on screen size and card type
  let h = 300;
  if (isMobile) {
    h = 240;
  } else if (isTablet) {
    h = item.size === "tall" ? 360 : 280;
  } else {
    const heightMap = { tall: 420, wide: 280, normal: 320 };
    h = heightMap[item.size] || 320;
  }

  return (
    <div
      ref={ref}
      onClick={() => onClick(item)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", overflow: "hidden", borderRadius: 2,
        cursor: "pointer", height: h,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      <img
        src={item.img}
        alt={item.title}
        loading="lazy"
        style={{
          width: "100%", height: "100%", objectFit: "cover", display: "block",
          transform: hovered ? "scale(1.06)" : "scale(1)",
          transition: "transform 0.55s ease",
        }}
      />

      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(8,16,36,0.75) 0%, rgba(8,16,36,0.1) 50%, transparent 100%)",
        transition: "opacity 0.35s",
        opacity: hovered ? 1 : 0.6,
      }} />

      <div style={{
        position: "absolute", top: 12, left: 12,
        background: "rgba(10,20,45,0.75)", backdropFilter: "blur(6px)",
        border: "1px solid rgba(184,137,46,0.3)",
        padding: "3px 10px", borderRadius: 20,
        color: "#b8892e", fontSize: 10, fontWeight: 700,
        letterSpacing: "0.15em", textTransform: "uppercase",
      }}>
        {item.cat}
      </div>

      <div style={{
        position: "absolute", top: 12, right: 12,
        width: 34, height: 34, borderRadius: 2,
        background: "rgba(184,137,46,0.85)",
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: hovered ? 1 : 0,
        transform: hovered ? "scale(1)" : "scale(0.8)",
        transition: "opacity 0.3s, transform 0.3s",
      }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} style={{ width: 16, height: 16 }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
        </svg>
      </div>

      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "1.25rem 1rem 1rem",
        transform: hovered ? "translateY(0)" : "translateY(8px)",
        opacity: hovered ? 1 : 0.85,
        transition: "transform 0.35s, opacity 0.35s",
      }}>
        <p style={{ color: "#fff", fontWeight: 700, fontSize: "clamp(0.82rem,1.2vw,1rem)", margin: "0 0 3px", lineHeight: 1.3 }}>{item.title}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#b8892e" strokeWidth={2} style={{ width: 12, height: 12, flexShrink: 0 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, margin: 0 }}>{item.location}</p>
        </div>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const windowWidth = useWindowWidth();

  const isMobile = windowWidth <= 600;
  const isTablet = windowWidth > 600 && windowWidth <= 1024;
  const isDesktop = windowWidth > 1024;

  const filtered = active === "All" ? GALLERY : GALLERY.filter(g => g.cat === active);

  const openLightbox = (item) => setLightbox(item);
  const closeLightbox = () => setLightbox(null);

  const prevItem = () => {
    const idx = filtered.findIndex(i => i.id === lightbox.id);
    setLightbox(filtered[(idx - 1 + filtered.length) % filtered.length]);
  };
  const nextItem = () => {
    const idx = filtered.findIndex(i => i.id === lightbox.id);
    setLightbox(filtered[(idx + 1) % filtered.length]);
  };

  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  // Grid columns based on screen
  const gridCols = isMobile ? 1 : isTablet ? 2 : 3;

  // Decide gridColumn for each item
  const getGridCol = (item) => {
    if (isMobile) return "span 1";
    if (isTablet) return item.size === "wide" ? "span 2" : "span 1";
    return item.size === "wide" ? "span 2" : "span 1";
  };

  return (
    <div style={{ background: "#f7f4ef", color: "#12243d", fontFamily: "'Georgia', serif", overflowX: "hidden" }}>

      <style>{`
      

        .filter-pill {
          padding: 0.5rem 1.2rem;
          border-radius: 30px;
          border: 1px solid #d9cfc2;
          background: transparent;
          color: rgba(18,36,61,0.6);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
          letter-spacing: 0.03em;
          transition: all 0.22s;
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .filter-pill:hover {
          border-color: #b8892e;
          color: #b8892e;
        }
        .filter-pill.active {
          background: #12243d;
          border-color: #12243d;
          color: #fff;
        }

        .count-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          background: #b8892e;
          color: #fff;
          font-size: 9px;
          font-weight: 700;
          border-radius: 50%;
          font-family: sans-serif;
          flex-shrink: 0;
        }
        .filter-pill.active .count-badge {
          background: rgba(184,137,46,0.85);
        }

        @keyframes pulse-line {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        @media (max-width: 600px) {
          .filter-pill {
            padding: 0.42rem 0.9rem;
            font-size: 11.5px;
          }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{
        position: "relative",
        minHeight: isMobile ? "55vh" : "68vh",
        display: "flex", alignItems: "center", overflow: "hidden"
      }}>
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=85"
          alt="Avyaya Developers projects"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(8,16,36,0.55) 0%, rgba(8,16,36,0.72) 100%)" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,transparent,#b8892e 35%,#d4a84b 65%,transparent)", zIndex: 2 }} />

        <div style={{
          position: "relative", zIndex: 3,
          maxWidth: 1200, margin: "0 auto",
          padding: isMobile ? "5rem 1.25rem 3rem" : isTablet ? "6rem 2rem 3.5rem" : "7rem 2.5rem 4rem",
          width: "100%"
        }}>
          <Fade>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 22, height: 2, background: "#b8892e" }} />
              <span style={{ color: "#b8892e", fontSize: 11, letterSpacing: "0.28em", fontWeight: 700, textTransform: "uppercase" }}>Our Portfolio</span>
            </div>
          </Fade>
          <Fade delay={80}>
            <h1 style={{
              fontSize: isMobile ? "2rem" : isTablet ? "2.8rem" : "clamp(2.2rem,5vw,4rem)",
              fontWeight: 700, color: "#fff", lineHeight: 1.1,
              marginBottom: "0.85rem", letterSpacing: "-0.01em"
            }}>
              Projects That<br />
              <span style={{ color: "#b8892e" }}>Define Skylines</span>
            </h1>
          </Fade>
          <Fade delay={160}>
            <p style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: isMobile ? "0.9rem" : "clamp(0.9rem,1.4vw,1.05rem)",
              lineHeight: 1.8, maxWidth: 480
            }}>
              A curated showcase of Avyaya Developers' landmark residential, commercial, villa, and township projects across NCR.
            </p>
          </Fade>

          <Fade delay={240}>
            <div style={{ display: "flex", gap: isMobile ? "1.5rem" : "2.5rem", marginTop: "2rem", flexWrap: "wrap" }}>
              {[
                { v: "20+", l: "Projects" },
                { v: "5", l: "Categories" },
                { v: "₹3,200Cr+", l: "Delivered" },
              ].map(s => (
                <div key={s.l}>
                  <p style={{ color: "#b8892e", fontWeight: 800, fontSize: isMobile ? "1.4rem" : "clamp(1.4rem,2.5vw,1.9rem)", lineHeight: 1 }}>{s.v}</p>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.l}</p>
                </div>
              ))}
            </div>
          </Fade>
        </div>

        {!isMobile && (
          <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase" }}>Scroll</span>
            <div style={{ width: 1, height: 30, background: "#b8892e", animation: "pulse-line 1.8s ease-in-out infinite" }} />
          </div>
        )}
      </section>

      {/* ── FILTER + GALLERY ── */}
      <section style={{
        padding: isMobile ? "3rem 1.25rem 4rem" : isTablet ? "4rem 1.75rem 4.5rem" : "4.5rem 2.5rem 5rem",
        background: "#f7f4ef"
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          {/* Section header */}
          <Fade>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 22, height: 2, background: "#b8892e" }} />
                <div style={{ width: 5, height: 5, background: "#b8892e", transform: "rotate(45deg)" }} />
                <span style={{ color: "#b8892e", fontSize: 11, letterSpacing: "0.26em", fontWeight: 700, textTransform: "uppercase" }}>Gallery</span>
                <div style={{ width: 5, height: 5, background: "#b8892e", transform: "rotate(45deg)" }} />
                <div style={{ width: 22, height: 2, background: "#b8892e" }} />
              </div>
              <h2 style={{ fontSize: isMobile ? "1.5rem" : "clamp(1.6rem,3vw,2.3rem)", fontWeight: 700, color: "#12243d" }}>Explore Our Work</h2>
              <p style={{ color: "rgba(18,36,61,0.45)", fontSize: 14, marginTop: 8, lineHeight: 1.75, maxWidth: 500 }}>
                Filter by category to explore our residential, commercial, and lifestyle developments.
              </p>
            </div>
          </Fade>

          {/* Filter pills — scrollable on mobile */}
          <Fade delay={80}>
            <div style={{
              display: "flex",
              gap: "0.55rem",
              justifyContent: isMobile ? "flex-start" : "center",
              flexWrap: isMobile ? "nowrap" : "wrap",
              overflowX: isMobile ? "auto" : "visible",
              marginBottom: "2rem",
              paddingBottom: isMobile ? "0.5rem" : 0,
              // hide scrollbar but keep scrollable
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}>
              {CATEGORIES.map(cat => {
                const count = cat === "All" ? GALLERY.length : GALLERY.filter(g => g.cat === cat).length;
                return (
                  <button
                    key={cat}
                    className={`filter-pill ${active === cat ? "active" : ""}`}
                    onClick={() => setActive(cat)}
                    style={{ flexShrink: 0 }}
                  >
                    {cat}
                    <span className="count-badge">{count}</span>
                  </button>
                );
              })}
            </div>
          </Fade>

          {/* Gallery Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
            gap: isMobile ? "10px" : "14px",
          }}>
            {filtered.map((item, i) => (
              <div
                key={item.id}
                style={{ gridColumn: getGridCol(item) }}
              >
                <GalleryCard
                  item={item}
                  onClick={openLightbox}
                  delay={(i % 6) * 70}
                  isMobile={isMobile}
                  isTablet={isTablet}
                />
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "4rem 0", color: "rgba(18,36,61,0.35)" }}>
              <p style={{ fontSize: "2rem", marginBottom: 12 }}>◇</p>
              <p style={{ fontSize: 15 }}>No projects found in this category.</p>
            </div>
          )}

          <Fade delay={100}>
            <p style={{ textAlign: "center", color: "rgba(18,36,61,0.35)", fontSize: 13, marginTop: "1.75rem" }}>
              Showing <strong style={{ color: "#12243d" }}>{filtered.length}</strong> projects
              {active !== "All" && <> in <span style={{ color: "#b8892e" }}>{active}</span></>}
            </p>
          </Fade>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section style={{
        background: "#12243d",
        padding: isMobile ? "3rem 1.25rem" : "4rem 2.5rem",
        borderTop: "3px solid #b8892e"
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <Fade>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 22, height: 2, background: "#b8892e" }} />
              <span style={{ color: "#b8892e", fontSize: 11, letterSpacing: "0.26em", fontWeight: 700, textTransform: "uppercase" }}>Start Your Journey</span>
              <div style={{ width: 22, height: 2, background: "#b8892e" }} />
            </div>
            <h2 style={{
              color: "#fff",
              fontSize: isMobile ? "1.5rem" : "clamp(1.6rem,3vw,2.3rem)",
              fontWeight: 700, marginBottom: "1rem", lineHeight: 1.2
            }}>
              Inspired by What You See?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, lineHeight: 1.8, maxWidth: 480, margin: "0 auto 2rem" }}>
              Let's discuss your dream project. Our advisors are ready to guide you from vision to keys-in-hand.
            </p>
            <div style={{
              display: "flex", gap: "0.85rem",
              justifyContent: "center",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center"
            }}>
              <a href="#" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "#b8892e", color: "#fff", fontWeight: 700,
                padding: "0.9rem 2rem", borderRadius: 2,
                textDecoration: "none", fontSize: 14, letterSpacing: "0.05em",
                width: isMobile ? "100%" : "auto", justifyContent: "center"
              }}>
                Book a Consultation
                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} style={{ width: 15, height: 15 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="#" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.75)",
                fontWeight: 600, padding: "0.9rem 2rem", borderRadius: 2,
                textDecoration: "none", fontSize: 14,
                width: isMobile ? "100%" : "auto", justifyContent: "center"
              }}>
                View All Projects
              </a>
            </div>
          </Fade>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <Lightbox
          item={lightbox}
          items={filtered}
          onClose={closeLightbox}
          onPrev={prevItem}
          onNext={nextItem}
        />
      )}
    </div>
  );
}