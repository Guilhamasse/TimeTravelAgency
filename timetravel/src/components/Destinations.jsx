import { useState } from "react";
import { DESTINATIONS } from "../data/destinations";

function DestinationCard({ dest, isSelected, onClick }) {
  const [hovered, setHovered] = useState(false);
  const active = hovered || isSelected;

  return (
    <div
      onClick={() => onClick(dest)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: dest.bg,
        border: `1px solid ${active ? dest.color : "rgba(255,255,255,0.07)"}`,
        borderRadius: 4, cursor: "pointer", position: "relative", overflow: "hidden",
        transform: active ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.35s ease",
        boxShadow: active ? `0 24px 60px ${dest.color}30` : "none",
        outline: isSelected ? `2px solid ${dest.color}` : "none",
        outlineOffset: 2,
      }}
    >
      <div style={{ padding: "2rem" }}>
        {/* Icône & badge époque */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <span style={{ fontSize: 44, filter: `drop-shadow(0 0 10px ${dest.color}88)` }}>
            {dest.emoji}
          </span>
          <span style={{
            background: `${dest.color}22`, color: dest.accent,
            border: `1px solid ${dest.color}44`,
            borderRadius: 2, padding: "4px 10px", fontSize: 10, letterSpacing: 2,
            textTransform: "uppercase",
          }}>
            {dest.era}
          </span>
        </div>

        {/* Nom + sous-titre */}
        <h3 style={{
          fontFamily: "'Playfair Display', serif", color: "white",
          fontSize: 24, margin: "0 0 4px",
        }}>
          {dest.name}
        </h3>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, margin: "0 0 16px" }}>
          {dest.subtitle}
        </p>

        {/* Description courte */}
        <p style={{ color: "rgba(255,255,255,0.68)", fontSize: 14, lineHeight: 1.75, margin: "0 0 20px" }}>
          {dest.desc}
        </p>

        {/* Tags highlights */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
          {dest.highlights.slice(0, 3).map((h) => (
            <span key={h} style={{
              background: `${dest.color}18`, color: dest.accent,
              border: `1px solid ${dest.color}33`,
              borderRadius: 2, padding: "3px 9px", fontSize: 11,
            }}>
              {h}
            </span>
          ))}
        </div>

        {/* Prix / durée */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          borderTop: `1px solid ${dest.color}25`, paddingTop: 16,
        }}>
          <div>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, textTransform: "uppercase", letterSpacing: 2, margin: 0 }}>
              À partir de
            </p>
            <p style={{ color: dest.color, fontFamily: "'Playfair Display', serif", fontSize: 22, margin: 0 }}>
              {dest.price}
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, margin: 0 }}>{dest.duration}</p>
            <p style={{ color: dest.accent, fontSize: 11, margin: "4px 0 0" }}>{dest.difficulty}</p>
          </div>
        </div>
      </div>

      {/* CTA hover */}
      {active && (
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: `linear-gradient(transparent, ${dest.color}20)`,
          padding: "12px", textAlign: "center",
        }}>
          <span style={{ color: dest.color, fontSize: 12, letterSpacing: 2, textTransform: "uppercase" }}>
            {isSelected ? "Sélectionné ✓" : "Voir les détails →"}
          </span>
        </div>
      )}
    </div>
  );
}

function DetailPanel({ dest, onClose, onBook }) {
  const [activeTab, setActiveTab] = useState("description");
  if (!dest) return null;

  return (
    <div style={{
      background: `${dest.bg}`,
      border: `1px solid ${dest.color}40`,
      borderRadius: 4, padding: "2rem", marginBottom: "3rem",
      position: "relative",
      animation: "fadeIn 0.3s ease",
    }}>
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: 16, right: 16,
          background: "rgba(255,255,255,0.08)", border: "none",
          color: "rgba(255,255,255,0.5)", fontSize: 14, cursor: "pointer",
          width: 32, height: 32, borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.2s",
        }}
        onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "white"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
      >
        ✕
      </button>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
        <span style={{ fontSize: 48, filter: `drop-shadow(0 0 12px ${dest.color}99)` }}>{dest.emoji}</span>
        <div>
          <p style={{ color: dest.color, fontSize: 10, letterSpacing: 4, textTransform: "uppercase", margin: "0 0 6px" }}>
            {dest.era}
          </p>
          <h3 style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: 28, margin: 0 }}>
            {dest.name}
          </h3>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, margin: "4px 0 0" }}>{dest.subtitle}</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, borderBottom: `1px solid ${dest.color}25`, marginBottom: 24 }}>
        {["description", "inclus", "faq"].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            background: "none", border: "none",
            borderBottom: activeTab === tab ? `2px solid ${dest.color}` : "2px solid transparent",
            color: activeTab === tab ? dest.color : "rgba(255,255,255,0.4)",
            fontSize: 11, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer",
            padding: "8px 16px", transition: "all 0.2s", marginBottom: -1,
          }}>
            {tab === "description" ? "Description" : tab === "inclus" ? "Inclus" : "FAQ"}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "description" && (
        <p style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.85, fontSize: 15, maxWidth: 700 }}>
          {dest.longDesc}
        </p>
      )}
      {activeTab === "inclus" && (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {dest.included.map((item) => (
            <li key={item} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <span style={{ color: dest.color, fontSize: 16 }}>◆</span>
              <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 14 }}>{item}</span>
            </li>
          ))}
        </ul>
      )}
      {activeTab === "faq" && (
        <div>
          {dest.faq.map(({ q, a }) => (
            <div key={q} style={{ marginBottom: 20 }}>
              <p style={{ color: dest.accent, fontSize: 14, fontWeight: 600, margin: "0 0 6px" }}>Q : {q}</p>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, lineHeight: 1.7, margin: 0 }}>→ {a}</p>
            </div>
          ))}
        </div>
      )}

      {/* CTA réservation */}
      <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
        <button
          onClick={() => onBook(dest)}
          style={{
            background: dest.color, color: "#0d0014", border: "none",
            padding: "13px 32px", fontSize: 12, letterSpacing: 3,
            textTransform: "uppercase", borderRadius: 2, cursor: "pointer", fontWeight: 700,
            transition: "all 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
          onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
        >
          Réserver ce voyage
        </button>
        <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 13 }}>
          à partir de <strong style={{ color: dest.color }}>{dest.price}</strong> · {dest.duration}
        </span>
      </div>
    </div>
  );
}

export default function Destinations({ destRef, onBook }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (dest) => {
    setSelected(prev => prev?.id === dest.id ? null : dest);
  };

  return (
    <section ref={destRef} style={{ background: "#04040f", padding: "7rem 2rem" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>

        {/* Header section */}
        <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
          <p style={{ color: "#FFD580", letterSpacing: 5, fontSize: 10, textTransform: "uppercase", marginBottom: 16, opacity: 0.7 }}>
            ✦ Nos Destinations ✦
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif", color: "white",
            fontSize: "clamp(2rem, 4vw, 3rem)", margin: "0 0 16px",
          }}>
            Trois époques, une infinité de souvenirs
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 15, maxWidth: 500, margin: "0 auto" }}>
            Cliquez sur une destination pour découvrir tous les détails, les inclusions et la FAQ.
          </p>
        </div>

        {/* Panel détail (si une dest sélectionnée) */}
        {selected && (
          <DetailPanel dest={selected} onClose={() => setSelected(null)} onBook={onBook} />
        )}

        {/* Grille de cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}>
          {DESTINATIONS.map((d) => (
            <DestinationCard
              key={d.id}
              dest={d}
              isSelected={selected?.id === d.id}
              onClick={handleSelect}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
