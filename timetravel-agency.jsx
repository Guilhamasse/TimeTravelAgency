import { useState, useEffect, useRef } from "react";

const DESTINATIONS = [
  {
    id: "paris1889",
    name: "Paris 1889",
    subtitle: "Belle Époque",
    era: "19e siècle",
    price: "4 200 €",
    desc: "Assistez à l'inauguration de la Tour Eiffel, déambulez dans l'Exposition Universelle, sirotez un café dans les grands boulevards illuminés au gaz.",
    color: "#C9A96E",
    bg: "linear-gradient(135deg, #1a0f00 0%, #3d2200 50%, #1a0f00 100%)",
    accent: "#FFD580",
    emoji: "🗼",
    highlights: ["Tour Eiffel (construction)", "Exposition Universelle", "Moulin Rouge", "Cafés parisiens"],
    duration: "7 jours",
    difficulty: "Facile",
  },
  {
    id: "cretace",
    name: "Crétacé",
    subtitle: "-65 millions d'années",
    era: "Préhistoire",
    price: "9 800 €",
    desc: "Observez les derniers dinosaures dans leur habitat naturel. Une expérience unique protégée par notre bulle temporelle de sécurité certifiée ISO-9001T.",
    color: "#4CAF7D",
    bg: "linear-gradient(135deg, #001a00 0%, #0d3d1a 50%, #001a00 100%)",
    accent: "#7FFF9F",
    emoji: "🦕",
    highlights: ["T-Rex en liberté", "Ptérosaures géants", "Forêts primitives", "Mers tropicales"],
    duration: "3 jours",
    difficulty: "Aventure",
  },
  {
    id: "florence1504",
    name: "Florence 1504",
    subtitle: "Haute Renaissance",
    era: "15e siècle",
    price: "5 600 €",
    desc: "Croisez Léonard de Vinci et Michel-Ange dans leurs ateliers, assistez aux fêtes des Médicis et contemplez le David fraîchement sculpté.",
    color: "#B87FC4",
    bg: "linear-gradient(135deg, #0d0014 0%, #2d0040 50%, #0d0014 100%)",
    accent: "#E8A0FF",
    emoji: "🎨",
    highlights: ["Atelier de Vinci", "David de Michel-Ange", "Palais Pitti", "Marchés de la Renaissance"],
    duration: "5 jours",
    difficulty: "Culturel",
  },
];

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe.
Ton rôle : conseiller les clients sur les meilleures destinations temporelles.

Ton ton :
- Professionnel mais chaleureux
- Passionné d'histoire
- Toujours enthousiaste sans être trop familier
- Expertise en voyage temporel (fictif mais crédible)

Tu connais parfaitement :
- Paris 1889 (Belle Époque, Tour Eiffel, Exposition Universelle) — à partir de 4 200 €, 7 jours
- Crétacé -65M (dinosaures, nature préhistorique, bulle de sécurité) — à partir de 9 800 €, 3 jours  
- Florence 1504 (Renaissance, art, Michel-Ange, Médicis) — à partir de 5 600 €, 5 jours

Tu peux suggérer des destinations selon les intérêts du client et répondre à toutes les questions sur l'agence.
Réponds toujours en français. Sois concis (3-4 phrases max par réponse).`;

async function callClaude(messages) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages,
    }),
  });
  const data = await res.json();
  return data.content?.[0]?.text || "Désolé, une erreur s'est produite.";
}

function StarField() {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    delay: Math.random() * 3,
    duration: Math.random() * 2 + 2,
  }));
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

function Nav({ activeSection, onNav }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 2rem",
      background: scrolled ? "rgba(4,4,16,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,200,80,0.15)" : "none",
      transition: "all 0.4s ease",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: 64,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 22, filter: "drop-shadow(0 0 8px rgba(255,200,80,0.8))" }}>⏳</span>
        <span style={{ color: "#FFD580", fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, letterSpacing: 1 }}>
          TimeTravel Agency
        </span>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        {["Accueil", "Destinations", "Réserver"].map((label) => (
          <button
            key={label}
            onClick={() => onNav(label)}
            style={{
              background: "none", border: "none", color: activeSection === label ? "#FFD580" : "rgba(255,255,255,0.7)",
              fontSize: 13, letterSpacing: 1.5, textTransform: "uppercase", cursor: "pointer",
              padding: "6px 14px", borderRadius: 4,
              borderBottom: activeSection === label ? "1px solid #FFD580" : "1px solid transparent",
              transition: "all 0.2s",
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}

function Hero({ onExplore }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);
  return (
    <section style={{
      minHeight: "100vh", position: "relative", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", textAlign: "center",
      background: "radial-gradient(ellipse at 50% 40%, #0d0820 0%, #04040f 70%)",
      overflow: "hidden", padding: "2rem",
    }}>
      <StarField />
      <div style={{
        position: "absolute", width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,200,80,0.07) 0%, transparent 70%)",
        top: "50%", left: "50%", transform: "translate(-50%, -55%)",
        animation: "pulse 4s infinite alternate",
      }} />
      <div style={{ position: "relative", zIndex: 2, transition: "all 1.2s ease", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)" }}>
        <p style={{ color: "#FFD580", letterSpacing: 6, fontSize: 11, textTransform: "uppercase", marginBottom: 24, opacity: 0.8 }}>
          ✦ Agence de Voyages Temporels de Luxe ✦
        </p>
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
          lineHeight: 1.1, color: "white", margin: "0 0 24px",
          textShadow: "0 0 60px rgba(255,200,80,0.3)",
        }}>
          Voyagez à travers<br />
          <span style={{ color: "#FFD580" }}>le Temps</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "clamp(1rem, 2vw, 1.25rem)", maxWidth: 560, margin: "0 auto 48px", lineHeight: 1.7 }}>
          De la Belle Époque parisienne aux forêts préhistoriques du Crétacé, vivez les moments qui ont façonné l'Histoire.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={onExplore} style={{
            background: "#FFD580", color: "#1a0f00", border: "none",
            padding: "14px 36px", fontSize: 14, letterSpacing: 2, textTransform: "uppercase",
            borderRadius: 2, cursor: "pointer", fontWeight: 700,
            boxShadow: "0 0 30px rgba(255,200,80,0.4)",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => e.target.style.transform = "scale(1.04)"}
            onMouseLeave={e => e.target.style.transform = "scale(1)"}
          >
            Explorer les Destinations
          </button>
          <button style={{
            background: "transparent", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.3)",
            padding: "14px 36px", fontSize: 14, letterSpacing: 2, textTransform: "uppercase",
            borderRadius: 2, cursor: "pointer",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.target.style.borderColor = "#FFD580"; e.target.style.color = "#FFD580"; }}
            onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.3)"; e.target.style.color = "rgba(255,255,255,0.8)"; }}
          >
            Regarder la démo
          </button>
        </div>
        <div style={{ display: "flex", gap: 48, justifyContent: "center", marginTop: 72, flexWrap: "wrap" }}>
          {[["1 200+", "Voyageurs satisfaits"], ["3", "Époques disponibles"], ["100%", "Retour garanti"]].map(([num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <p style={{ color: "#FFD580", fontFamily: "'Playfair Display', serif", fontSize: 28, margin: 0 }}>{num}</p>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, textTransform: "uppercase", letterSpacing: 2, margin: "4px 0 0" }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DestinationCard({ dest, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={() => onClick(dest)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: dest.bg,
        border: `1px solid ${hovered ? dest.color : "rgba(255,255,255,0.08)"}`,
        borderRadius: 4, cursor: "pointer", overflow: "hidden", position: "relative",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        transition: "all 0.4s ease",
        boxShadow: hovered ? `0 20px 60px ${dest.color}33` : "none",
      }}
    >
      <div style={{ padding: "2rem", minHeight: 320 }}>
        <div style={{ fontSize: 48, marginBottom: 16, filter: `drop-shadow(0 0 12px ${dest.color}66)` }}>
          {dest.emoji}
        </div>
        <p style={{ color: dest.color, fontSize: 11, letterSpacing: 4, textTransform: "uppercase", margin: "0 0 8px" }}>
          {dest.era}
        </p>
        <h3 style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: 26, margin: "0 0 6px" }}>
          {dest.name}
        </h3>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, margin: "0 0 16px" }}>{dest.subtitle}</p>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.7, margin: "0 0 24px" }}>
          {dest.desc}
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
          {dest.highlights.slice(0, 3).map((h) => (
            <span key={h} style={{
              background: `${dest.color}22`, color: dest.accent,
              border: `1px solid ${dest.color}44`, borderRadius: 2,
              padding: "3px 10px", fontSize: 11, letterSpacing: 1,
            }}>{h}</span>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${dest.color}33`, paddingTop: 16 }}>
          <div>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, margin: 0 }}>À partir de</p>
            <p style={{ color: dest.color, fontFamily: "'Playfair Display', serif", fontSize: 22, margin: 0 }}>{dest.price}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, margin: 0 }}>{dest.duration}</p>
            <p style={{ color: dest.accent, fontSize: 12, margin: 0 }}>{dest.difficulty}</p>
          </div>
        </div>
      </div>
      {hovered && (
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: `linear-gradient(transparent, ${dest.color}22)`,
          padding: "16px 2rem",
          display: "flex", justifyContent: "center",
        }}>
          <span style={{ color: dest.color, fontSize: 13, letterSpacing: 2, textTransform: "uppercase" }}>
            En savoir plus →
          </span>
        </div>
      )}
    </div>
  );
}

function Destinations({ destRef, onBook }) {
  const [selected, setSelected] = useState(null);
  return (
    <section ref={destRef} style={{ background: "#04040f", padding: "6rem 2rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{ color: "#FFD580", letterSpacing: 5, fontSize: 11, textTransform: "uppercase", marginBottom: 16 }}>✦ Nos Destinations ✦</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: "clamp(2rem, 4vw, 3rem)", margin: 0 }}>
            Trois époques, une infinité de souvenirs
          </h2>
        </div>
        {selected && (
          <div style={{
            background: "rgba(255,200,80,0.05)", border: "1px solid rgba(255,200,80,0.2)",
            borderRadius: 4, padding: "2rem", marginBottom: "3rem", position: "relative",
          }}>
            <button onClick={() => setSelected(null)} style={{
              position: "absolute", top: 16, right: 16,
              background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 20, cursor: "pointer",
            }}>✕</button>
            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", alignItems: "flex-start" }}>
              <div style={{ flex: 1, minWidth: 260 }}>
                <p style={{ color: selected.color, fontSize: 11, letterSpacing: 4, textTransform: "uppercase", margin: "0 0 8px" }}>{selected.era}</p>
                <h3 style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: 32, margin: "0 0 8px" }}>{selected.name}</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", margin: "0 0 20px" }}>{selected.subtitle}</p>
                <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.8 }}>{selected.desc}</p>
              </div>
              <div style={{ minWidth: 220 }}>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 12px" }}>Points forts</p>
                {selected.highlights.map((h) => (
                  <div key={h} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <span style={{ color: selected.color, fontSize: 16 }}>◆</span>
                    <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 14 }}>{h}</span>
                  </div>
                ))}
                <button onClick={() => onBook(selected)} style={{
                  marginTop: 24, width: "100%", background: selected.color, color: "#0d0014",
                  border: "none", padding: "12px 24px", fontSize: 13, letterSpacing: 2,
                  textTransform: "uppercase", borderRadius: 2, cursor: "pointer", fontWeight: 700,
                  transition: "all 0.2s",
                }}>
                  Réserver ce voyage
                </button>
              </div>
            </div>
          </div>
        )}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {DESTINATIONS.map((d) => <DestinationCard key={d.id} dest={d} onClick={setSelected} />)}
        </div>
      </div>
    </section>
  );
}

function BookingForm({ bookRef, preselected, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", dest: preselected?.id || "", date: "", travelers: 1, message: "" });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = () => {
    if (form.name && form.email && form.dest) setSubmitted(true);
  };
  if (submitted) return (
    <section ref={bookRef} style={{ background: "#06060f", padding: "6rem 2rem", textAlign: "center" }}>
      <div style={{ maxWidth: 500, margin: "0 auto" }}>
        <div style={{ fontSize: 64, marginBottom: 24 }}>⏳</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#FFD580", fontSize: 32 }}>Demande envoyée !</h2>
        <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.8 }}>
          Notre équipe de chrononautes vous contactera dans les 48 heures pour finaliser votre voyage temporel.
        </p>
      </div>
    </section>
  );
  return (
    <section ref={bookRef} style={{ background: "#06060f", padding: "6rem 2rem" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ color: "#FFD580", letterSpacing: 5, fontSize: 11, textTransform: "uppercase", marginBottom: 16 }}>✦ Réservation ✦</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", margin: 0 }}>
            Préparez votre voyage
          </h2>
        </div>
        <div style={{ background: "rgba(255,200,80,0.04)", border: "1px solid rgba(255,200,80,0.15)", borderRadius: 4, padding: "2.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            {[["Votre nom", "name", "text", "Jean Dupont"], ["Email", "email", "email", "vous@exemple.com"]].map(([label, key, type, ph]) => (
              <div key={key}>
                <label style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 8 }}>{label}</label>
                <input
                  type={type} placeholder={ph} value={form[key]}
                  onChange={e => setForm({ ...form, [key]: e.target.value })}
                  style={{
                    width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,200,80,0.2)",
                    borderRadius: 2, padding: "10px 14px", color: "white", fontSize: 14, outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 8 }}>Destination</label>
            <select
              value={form.dest} onChange={e => setForm({ ...form, dest: e.target.value })}
              style={{
                width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,200,80,0.2)",
                borderRadius: 2, padding: "10px 14px", color: "white", fontSize: 14, outline: "none",
              }}
            >
              <option value="" style={{ background: "#0d0014" }}>Choisir une époque…</option>
              {DESTINATIONS.map(d => <option key={d.id} value={d.id} style={{ background: "#0d0014" }}>{d.name} — {d.price}</option>)}
            </select>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            {[["Date souhaitée", "date", "date"], ["Voyageurs", "travelers", "number"]].map(([label, key, type]) => (
              <div key={key}>
                <label style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 8 }}>{label}</label>
                <input
                  type={type} value={form[key]} min={type === "number" ? 1 : undefined} max={type === "number" ? 8 : undefined}
                  onChange={e => setForm({ ...form, [key]: e.target.value })}
                  style={{
                    width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,200,80,0.2)",
                    borderRadius: 2, padding: "10px 14px", color: "white", fontSize: 14, outline: "none",
                    colorScheme: "dark", boxSizing: "border-box",
                  }}
                />
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 8 }}>Message (optionnel)</label>
            <textarea
              rows={3} placeholder="Vos préférences, questions particulières…"
              value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
              style={{
                width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,200,80,0.2)",
                borderRadius: 2, padding: "10px 14px", color: "white", fontSize: 14, outline: "none",
                resize: "vertical", boxSizing: "border-box",
              }}
            />
          </div>
          <button onClick={handleSubmit} style={{
            width: "100%", background: "#FFD580", color: "#1a0f00", border: "none",
            padding: "14px", fontSize: 14, letterSpacing: 3, textTransform: "uppercase",
            borderRadius: 2, cursor: "pointer", fontWeight: 700,
            boxShadow: "0 0 30px rgba(255,200,80,0.3)",
            transition: "all 0.2s",
          }}>
            Envoyer ma demande
          </button>
        </div>
      </div>
    </section>
  );
}

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Bonjour ! Je suis votre conseiller TimeTravel Agency. Comment puis-je vous aider à planifier votre voyage dans le temps ? ⏳" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const apiMsgs = newMessages.filter(m => m.role !== "system").map(m => ({ role: m.role, content: m.content }));
      const reply = await callClaude(apiMsgs);
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Désolé, une erreur s'est produite. Veuillez réessayer." }]);
    }
    setLoading(false);
  };

  const suggestions = ["Quelle destination me conseillez-vous ?", "Quels sont les tarifs ?", "Est-ce dangereux ?"];

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed", bottom: 28, right: 28, zIndex: 200,
          width: 60, height: 60, borderRadius: "50%",
          background: open ? "#333" : "#FFD580", color: open ? "white" : "#1a0f00",
          border: "none", fontSize: 24, cursor: "pointer",
          boxShadow: "0 4px 20px rgba(255,200,80,0.5)",
          transition: "all 0.3s",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        {open ? "✕" : "💬"}
      </button>
      {open && (
        <div style={{
          position: "fixed", bottom: 100, right: 28, zIndex: 200,
          width: 360, maxHeight: 520,
          background: "#0d0820", border: "1px solid rgba(255,200,80,0.25)",
          borderRadius: 8, display: "flex", flexDirection: "column",
          boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
          overflow: "hidden",
        }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,200,80,0.15)", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 20 }}>⏳</span>
            <div>
              <p style={{ color: "#FFD580", fontSize: 14, fontWeight: 600, margin: 0 }}>Assistant TimeTravel</p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, margin: 0 }}>● En ligne</p>
            </div>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 8px" }}>
            {messages.map((m, i) => (
              <div key={i} style={{ marginBottom: 12, display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "80%", padding: "10px 14px", borderRadius: m.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                  background: m.role === "user" ? "#FFD580" : "rgba(255,255,255,0.08)",
                  color: m.role === "user" ? "#1a0f00" : "rgba(255,255,255,0.85)",
                  fontSize: 13, lineHeight: 1.6,
                }}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", gap: 4, padding: "10px 14px" }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#FFD580", animation: `bounce 1s ${i * 0.2}s infinite` }} />
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          {messages.length < 3 && (
            <div style={{ padding: "0 12px 8px", display: "flex", gap: 6, flexWrap: "wrap" }}>
              {suggestions.map(s => (
                <button key={s} onClick={() => { setInput(s); }} style={{
                  background: "rgba(255,200,80,0.1)", border: "1px solid rgba(255,200,80,0.25)",
                  color: "#FFD580", borderRadius: 20, padding: "4px 10px", fontSize: 11, cursor: "pointer",
                }}>
                  {s}
                </button>
              ))}
            </div>
          )}
          <div style={{ padding: "10px 12px", borderTop: "1px solid rgba(255,200,80,0.1)", display: "flex", gap: 8 }}>
            <input
              value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Votre question…"
              style={{
                flex: 1, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,200,80,0.2)",
                borderRadius: 20, padding: "8px 14px", color: "white", fontSize: 13, outline: "none",
              }}
            />
            <button onClick={send} disabled={loading || !input.trim()} style={{
              background: "#FFD580", color: "#1a0f00", border: "none",
              width: 36, height: 36, borderRadius: "50%", cursor: "pointer",
              fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center",
              opacity: (!input.trim() || loading) ? 0.4 : 1,
            }}>→</button>
          </div>
        </div>
      )}
    </>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#02020a", borderTop: "1px solid rgba(255,200,80,0.1)", padding: "3rem 2rem", textAlign: "center" }}>
      <p style={{ color: "#FFD580", fontFamily: "'Playfair Display', serif", fontSize: 18, marginBottom: 8 }}>TimeTravel Agency</p>
      <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, letterSpacing: 2 }}>
        © 2024 — Tous droits réservés dans toutes les lignes temporelles
      </p>
      <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 11, marginTop: 8 }}>
        Propulsé par Claude AI · Projet pédagogique M1/M2 Digital & IA
      </p>
    </footer>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("Accueil");
  const [bookingDest, setBookingDest] = useState(null);
  const destRef = useRef(null);
  const bookRef = useRef(null);

  const handleNav = (section) => {
    setActiveSection(section);
    if (section === "Destinations") destRef.current?.scrollIntoView({ behavior: "smooth" });
    if (section === "Réserver") bookRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBook = (dest) => {
    setBookingDest(dest);
    setTimeout(() => bookRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", background: "#04040f", minHeight: "100vh", color: "white" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:wght@300;400;500&display=swap');
        @keyframes twinkle { from { opacity: 0.3; } to { opacity: 0.9; } }
        @keyframes pulse { from { opacity: 0.5; transform: translate(-50%,-55%) scale(1); } to { opacity: 1; transform: translate(-50%,-55%) scale(1.15); } }
        @keyframes bounce { 0%,80%,100% { transform: translateY(0); } 40% { transform: translateY(-6px); } }
        * { box-sizing: border-box; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.25); }
        select option { background: #0d0014; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,200,80,0.3); border-radius: 2px; }
      `}</style>
      <Nav activeSection={activeSection} onNav={handleNav} />
      <Hero onExplore={() => handleNav("Destinations")} />
      <Destinations destRef={destRef} onBook={handleBook} />
      <BookingForm bookRef={bookRef} preselected={bookingDest} />
      <Footer />
      <Chatbot />
    </div>
  );
}
