import { useState, useEffect } from "react";

export function StarField({ count = 80 }) {
  const [stars] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 4,
      duration: Math.random() * 2 + 2,
    }))
  );
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {stars.map((s) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: "white",
            opacity: 0.6,
            animation: `twinkle ${s.duration}s ${s.delay}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

export function Nav({ activeSection, onNav }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 clamp(1rem, 5vw, 5rem)",
      background: scrolled ? "rgba(4,4,16,0.35)" : "transparent",
      backdropFilter: scrolled ? "blur(8px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,200,80,0.06)" : "none",
      transition: "all 0.4s ease",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: 70, width: "100%",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        <span style={{ fontSize: 22, filter: "drop-shadow(0 0 8px rgba(255,200,80,0.8))" }}>⏳</span>
        <span style={{
          color: "#FFD580",
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 18, letterSpacing: 1, whiteSpace: "nowrap",
        }}>
          TimeTravel Agency
        </span>
      </div>
      <div style={{ display: "flex", gap: 4 }}>
        {["Accueil", "Destinations", "Réserver"].map((label) => (
          <button
            key={label}
            onClick={() => onNav(label)}
            style={{
              background: "none", border: "none",
              color: activeSection === label ? "#FFD580" : "rgba(255,255,255,0.6)",
              fontSize: 11, letterSpacing: 2.5, textTransform: "uppercase", cursor: "pointer",
              padding: "8px 14px",
              borderBottom: activeSection === label ? "1px solid #FFD580" : "1px solid transparent",
              transition: "all 0.2s", whiteSpace: "nowrap",
            }}
            onMouseEnter={e => { if (activeSection !== label) e.currentTarget.style.color = "white"; }}
            onMouseLeave={e => { if (activeSection !== label) e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer style={{
      background: "#02020a",
      borderTop: "1px solid rgba(255,200,80,0.08)",
      padding: "4rem 2rem",
      textAlign: "center",
    }}>
      <span style={{ fontSize: 28, display: "block", marginBottom: 12 }}>⏳</span>
      <p style={{
        color: "#FFD580",
        fontFamily: "'Playfair Display', serif",
        fontSize: 20, marginBottom: 8,
      }}>
        TimeTravel Agency
      </p>
      <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>
        Tous droits réservés dans toutes les lignes temporelles
      </p>
      <p style={{ color: "rgba(255,255,255,0.15)", fontSize: 11, marginTop: 24 }}>
        Propulsé par Claude AI · Projet pédagogique M1/M2 Digital &amp; IA
      </p>
    </footer>
  );
}
