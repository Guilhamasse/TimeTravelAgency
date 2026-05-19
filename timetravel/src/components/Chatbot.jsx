import { useState, useEffect, useRef } from "react";
import { callClaude } from "../utils/api";

const SUGGESTIONS = [
  "Quelle destination me conseillez-vous ?",
  "Quels sont les tarifs ?",
  "Est-ce dangereux ?",
  "Comment se passe une réservation ?",
];

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: 4, padding: "10px 14px", alignItems: "center" }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 6, height: 6, borderRadius: "50%", background: "#FFD580",
          animation: `bounce 1s ${i * 0.18}s infinite`,
        }} />
      ))}
    </div>
  );
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Bonjour ! Je suis votre conseiller TimeTravel Agency. Quelle époque vous fait rêver ? ⏳",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [messages, open]);

  const send = async (text) => {
    const msg = text || input;
    if (!msg.trim() || loading) return;
    setHasInteracted(true);
    const userMsg = { role: "user", content: msg };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const reply = await callClaude(next.map(m => ({ role: m.role, content: m.content })));
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...next, { role: "assistant", content: "Désolé, une connexion au serveur temporel est requise. Réessayez dans un instant." }]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={() => setOpen(o => !o)}
        title={open ? "Fermer" : "Parler à un conseiller"}
        style={{
          position: "fixed", bottom: 28, right: 28, zIndex: 200,
          width: 58, height: 58, borderRadius: "50%",
          background: open ? "rgba(30,20,50,0.95)" : "#FFD580",
          color: open ? "white" : "#1a0f00",
          border: open ? "1px solid rgba(255,200,80,0.3)" : "none",
          fontSize: open ? 18 : 24, cursor: "pointer",
          boxShadow: open ? "none" : "0 4px 24px rgba(255,200,80,0.5)",
          transition: "all 0.3s",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        {open ? "✕" : "💬"}
      </button>

      {/* Fenêtre de chat */}
      {open && (
        <div style={{
          position: "fixed", bottom: 98, right: 28, zIndex: 200,
          width: 370,
          background: "rgba(10,8,22,0.98)",
          border: "1px solid rgba(255,200,80,0.2)",
          borderRadius: 10, display: "flex", flexDirection: "column",
          boxShadow: "0 24px 80px rgba(0,0,0,0.85)",
          overflow: "hidden",
          animation: "slideUp 0.25s ease",
          maxHeight: "70vh",
        }}>
          {/* Header */}
          <div style={{
            padding: "14px 18px",
            borderBottom: "1px solid rgba(255,200,80,0.1)",
            display: "flex", alignItems: "center", gap: 10,
            background: "rgba(255,200,80,0.04)",
          }}>
            <span style={{ fontSize: 20 }}>⏳</span>
            <div style={{ flex: 1 }}>
              <p style={{ color: "#FFD580", fontSize: 14, fontWeight: 600, margin: 0, fontFamily: "'Playfair Display', serif" }}>
                Conseiller TimeTravel
              </p>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, margin: 0 }}>
                <span style={{ color: "#4CAF7D" }}>●</span> En ligne — répond en quelques secondes
              </p>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "14px 14px 6px" }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                marginBottom: 10, display: "flex",
                justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                alignItems: "flex-end", gap: 6,
              }}>
                {m.role === "assistant" && (
                  <span style={{ fontSize: 14, flexShrink: 0, marginBottom: 2 }}>⏳</span>
                )}
                <div style={{
                  maxWidth: "78%", padding: "9px 13px",
                  borderRadius: m.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                  background: m.role === "user" ? "#FFD580" : "rgba(255,255,255,0.07)",
                  color: m.role === "user" ? "#1a0f00" : "rgba(255,255,255,0.85)",
                  fontSize: 13, lineHeight: 1.65,
                  border: m.role === "assistant" ? "1px solid rgba(255,255,255,0.05)" : "none",
                }}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", alignItems: "flex-end", gap: 6 }}>
                <span style={{ fontSize: 14 }}>⏳</span>
                <div style={{
                  background: "rgba(255,255,255,0.07)", borderRadius: "12px 12px 12px 2px",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}>
                  <TypingDots />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions rapides */}
          {!hasInteracted && (
            <div style={{ padding: "6px 10px", display: "flex", gap: 6, flexWrap: "wrap" }}>
              {SUGGESTIONS.map(s => (
                <button key={s} onClick={() => send(s)} style={{
                  background: "rgba(255,200,80,0.08)",
                  border: "1px solid rgba(255,200,80,0.2)",
                  color: "#FFD580", borderRadius: 20, padding: "4px 10px",
                  fontSize: 11, cursor: "pointer", transition: "all 0.15s",
                  whiteSpace: "nowrap",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,200,80,0.18)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,200,80,0.08)"}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{
            padding: "10px 12px",
            borderTop: "1px solid rgba(255,200,80,0.08)",
            display: "flex", gap: 8,
          }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
              placeholder="Posez votre question…"
              style={{
                flex: 1, background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,200,80,0.15)",
                borderRadius: 20, padding: "9px 15px",
                color: "white", fontSize: 13, outline: "none",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                transition: "border-color 0.2s",
              }}
              onFocus={e => e.target.style.borderColor = "rgba(255,200,80,0.4)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,200,80,0.15)"}
            />
            <button
              onClick={() => send()}
              disabled={loading || !input.trim()}
              style={{
                background: input.trim() && !loading ? "#FFD580" : "rgba(255,200,80,0.2)",
                color: input.trim() && !loading ? "#1a0f00" : "rgba(255,255,255,0.3)",
                border: "none", width: 38, height: 38, borderRadius: "50%",
                cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s", flexShrink: 0,
              }}
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
