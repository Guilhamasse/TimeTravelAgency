import { useState, useEffect } from "react";
import { StarField } from "./Layout";

const STATS = [
  { num: "1 200+", label: "Voyageurs satisfaits" },
  { num: "3", label: "Époques disponibles" },
  { num: "100%", label: "Retour garanti" },
];

export default function Hero({ onExplore, onBook }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 120); return () => clearTimeout(t); }, []);

  return (
    <section style={{
      minHeight: "100vh", width: "100%",
      position: "relative", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", textAlign: "center",
      background: "transparent",
      overflow: "hidden", padding: "6rem 2rem 4rem",
    }}>
      <StarField count={100} />

      {/* Halo central */}
      <div style={{
        position: "absolute", width: 700, height: 700, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,200,80,0.06) 0%, transparent 70%)",
        top: "50%", left: "50%", transform: "translate(-50%, -55%)",
        animation: "pulse 5s infinite alternate",
        pointerEvents: "none",
      }} />

      {/* Ligne décorative */}
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: 1, height: "100%",
        background: "linear-gradient(to bottom, transparent, rgba(255,200,80,0.08), transparent)",
        pointerEvents: "none",
      }} />

      <div style={{
        position: "relative", zIndex: 2,
        transition: "opacity 1.2s ease, transform 1.2s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
      }}>
        {/* Eyebrow */}
        <p style={{
          color: "#FFD580", letterSpacing: 6, fontSize: 10,
          textTransform: "uppercase", marginBottom: 28, opacity: 0.75,
        }}>
          ✦ Agence de Voyages Temporels de Luxe ✦
        </p>

        {/* Titre */}
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(3rem, 7vw, 6rem)",
          lineHeight: 1.05, color: "white", margin: "0 0 28px",
          textShadow: "0 0 80px rgba(255,200,80,0.2)",
        }}>
          Voyagez à travers<br />
          <em style={{ color: "#FFD580", fontStyle: "italic" }}>le Temps</em>
        </h1>

        {/* Sous-titre */}
        <p style={{
          color: "rgba(255,255,255,0.55)",
          fontSize: "clamp(1rem, 2vw, 1.2rem)",
          maxWidth: 540, margin: "0 auto 52px",
          lineHeight: 1.8, fontWeight: 300,
        }}>
          De la Belle Époque parisienne aux forêts préhistoriques du Crétacé,
          vivez les moments qui ont façonné l'Histoire.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 80 }}>
          <button
            onClick={onExplore}
            style={{
              background: "#FFD580", color: "#1a0f00", border: "none",
              padding: "15px 40px", fontSize: 12, letterSpacing: 3,
              textTransform: "uppercase", borderRadius: 2, cursor: "pointer",
              fontWeight: 700, fontFamily: "'Cormorant Garamond', Georgia, serif",
              boxShadow: "0 0 40px rgba(255,200,80,0.35)",
              transition: "all 0.25s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 40px rgba(255,200,80,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 0 40px rgba(255,200,80,0.35)"; }}
          >
            Explorer les Destinations
          </button>
          <button
            onClick={onBook}
            style={{
              background: "transparent", color: "rgba(255,255,255,0.75)",
              border: "1px solid rgba(255,255,255,0.25)",
              padding: "15px 40px", fontSize: 12, letterSpacing: 3,
              textTransform: "uppercase", borderRadius: 2, cursor: "pointer",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              transition: "all 0.25s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#FFD580"; e.currentTarget.style.color = "#FFD580"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
          >
            Réserver maintenant
          </button>
        </div>

        {/* Stats */}
        <div style={{
          display: "flex", gap: "clamp(2rem, 6vw, 6rem)",
          justifyContent: "center", flexWrap: "wrap",
          borderTop: "1px solid rgba(255,200,80,0.1)",
          paddingTop: 40,
        }}>
          {STATS.map(({ num, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <p style={{
                color: "#FFD580", fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)", margin: 0, lineHeight: 1,
              }}>
                {num}
              </p>
              <p style={{
                color: "rgba(255,255,255,0.35)", fontSize: 10,
                textTransform: "uppercase", letterSpacing: 3, margin: "8px 0 0",
              }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
        opacity: visible ? 0.4 : 0, transition: "opacity 2s ease 1s",
      }}>
        <span style={{ color: "white", fontSize: 10, letterSpacing: 3, textTransform: "uppercase" }}>Défiler</span>
        <div style={{
          width: 1, height: 40,
          background: "linear-gradient(to bottom, rgba(255,200,80,0.8), transparent)",
          animation: "scrollPulse 2s infinite",
        }} />
      </div>
    </section>
  );
}
