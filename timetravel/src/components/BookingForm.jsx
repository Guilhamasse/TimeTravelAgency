import { useState, useEffect } from "react";
import { DESTINATIONS } from "../data/destinations";

const FIELD_STYLE = {
  width: "100%", background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,200,80,0.2)", borderRadius: 2,
  padding: "11px 14px", color: "white", fontSize: 14,
  outline: "none", boxSizing: "border-box", colorScheme: "dark",
  fontFamily: "'Cormorant Garamond', Georgia, serif",
  transition: "border-color 0.2s",
};

function Field({ label, error, children }) {
  return (
    <div>
      <label style={{
        color: "rgba(255,255,255,0.45)", fontSize: 10,
        letterSpacing: 2.5, textTransform: "uppercase", display: "block", marginBottom: 8,
      }}>
        {label}
      </label>
      {children}
      {error && (
        <p style={{ color: "#FF6B6B", fontSize: 11, margin: "5px 0 0" }}>⚠ {error}</p>
      )}
    </div>
  );
}

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Nom requis";
  if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.email = "Email invalide";
  if (!form.dest) errors.dest = "Choisissez une destination";
  if (!form.date) errors.date = "Date requise";
  else if (new Date(form.date) < new Date()) errors.date = "La date doit être dans le futur";
  return errors;
}

export default function BookingForm({ bookRef, preselected }) {
  const [form, setForm] = useState({
    name: "", email: "", dest: preselected?.id || "",
    date: "", travelers: 1, message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (preselected) setForm(f => ({ ...f, dest: preselected.id }));
  }, [preselected]);

  const selectedDest = DESTINATIONS.find(d => d.id === form.dest);

  const handleChange = (key, value) => {
    const next = { ...form, [key]: value };
    setForm(next);
    if (touched[key]) setErrors(validate(next));
  };

  const handleBlur = (key) => {
    setTouched(t => ({ ...t, [key]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = () => {
    const allTouched = { name: true, email: true, dest: true, date: true };
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSubmitted(true);
  };

  if (submitted) {
    return (
      <section ref={bookRef} style={{ background: "#06060f", padding: "7rem 2rem", textAlign: "center" }}>
        <div style={{
          maxWidth: 520, margin: "0 auto",
          background: "rgba(255,200,80,0.04)",
          border: "1px solid rgba(255,200,80,0.15)",
          borderRadius: 4, padding: "3rem",
        }}>
          <div style={{ fontSize: 56, marginBottom: 20 }}>⏳</div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif", color: "#FFD580",
            fontSize: 28, margin: "0 0 16px",
          }}>
            Demande reçue !
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 24 }}>
            Notre équipe de chrononautes vous contactera à <strong style={{ color: "white" }}>{form.email}</strong> dans les 48 heures pour finaliser votre voyage vers {selectedDest?.name || "votre destination"}.
          </p>
          <div style={{
            background: "rgba(255,200,80,0.08)", borderRadius: 2,
            padding: "1rem", fontSize: 13, color: "rgba(255,255,255,0.5)",
          }}>
            Référence : TTA-{Math.random().toString(36).substr(2, 8).toUpperCase()}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={bookRef} style={{ background: "#06060f", padding: "7rem 2rem" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p style={{ color: "#FFD580", letterSpacing: 5, fontSize: 10, textTransform: "uppercase", marginBottom: 16, opacity: 0.7 }}>
            ✦ Réservation ✦
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif", color: "white",
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)", margin: "0 0 12px",
          }}>
            Planifiez votre voyage
          </h2>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 14 }}>
            Tous les champs marqués sont obligatoires. Un conseiller vous rappelle sous 48h.
          </p>
        </div>

        <div style={{
          background: "rgba(255,200,80,0.03)",
          border: "1px solid rgba(255,200,80,0.12)",
          borderRadius: 4, padding: "2.5rem",
        }}>
          {/* Ligne 1 : Nom + Email */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 18 }}>
            <Field label="Votre nom *" error={errors.name}>
              <input
                type="text" placeholder="Jean Dupont" value={form.name}
                onChange={e => handleChange("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                style={{ ...FIELD_STYLE, borderColor: errors.name ? "#FF6B6B" : "rgba(255,200,80,0.2)" }}
              />
            </Field>
            <Field label="Email *" error={errors.email}>
              <input
                type="email" placeholder="vous@exemple.com" value={form.email}
                onChange={e => handleChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                style={{ ...FIELD_STYLE, borderColor: errors.email ? "#FF6B6B" : "rgba(255,200,80,0.2)" }}
              />
            </Field>
          </div>

          {/* Destination */}
          <div style={{ marginBottom: 18 }}>
            <Field label="Destination *" error={errors.dest}>
              <select
                value={form.dest}
                onChange={e => handleChange("dest", e.target.value)}
                onBlur={() => handleBlur("dest")}
                style={{ ...FIELD_STYLE, borderColor: errors.dest ? "#FF6B6B" : "rgba(255,200,80,0.2)" }}
              >
                <option value="" style={{ background: "#0d0014" }}>Choisir une époque…</option>
                {DESTINATIONS.map(d => (
                  <option key={d.id} value={d.id} style={{ background: "#0d0014" }}>
                    {d.emoji} {d.name} — {d.price} / {d.duration}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          {/* Prix estimé si sélectionné */}
          {selectedDest && (
            <div style={{
              background: `${selectedDest.color}15`,
              border: `1px solid ${selectedDest.color}30`,
              borderRadius: 2, padding: "12px 16px", marginBottom: 18,
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 13 }}>
                {selectedDest.emoji} {selectedDest.name} · {selectedDest.duration} · {selectedDest.difficulty}
              </span>
              <span style={{ color: selectedDest.color, fontFamily: "'Playfair Display', serif", fontSize: 18 }}>
                {form.travelers > 1
                  ? `≈ ${(selectedDest.priceNum * form.travelers).toLocaleString("fr-FR")} €`
                  : selectedDest.price}
              </span>
            </div>
          )}

          {/* Date + Voyageurs */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 18 }}>
            <Field label="Date de départ souhaitée *" error={errors.date}>
              <input
                type="date" value={form.date}
                onChange={e => handleChange("date", e.target.value)}
                onBlur={() => handleBlur("date")}
                style={{ ...FIELD_STYLE, borderColor: errors.date ? "#FF6B6B" : "rgba(255,200,80,0.2)" }}
              />
            </Field>
            <Field label={`Nombre de voyageurs : ${form.travelers}`}>
              <input
                type="range" min={1} max={8} step={1}
                value={form.travelers}
                onChange={e => handleChange("travelers", Number(e.target.value))}
                style={{ width: "100%", marginTop: 10, accentColor: "#FFD580" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,0.25)", fontSize: 10, marginTop: 4 }}>
                <span>1</span><span>4</span><span>8</span>
              </div>
            </Field>
          </div>

          {/* Message */}
          <div style={{ marginBottom: 28 }}>
            <Field label="Message (optionnel)">
              <textarea
                rows={3} placeholder="Préférences particulières, questions, demandes spéciales…"
                value={form.message}
                onChange={e => handleChange("message", e.target.value)}
                style={{ ...FIELD_STYLE, resize: "vertical" }}
              />
            </Field>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            style={{
              width: "100%", background: "#FFD580", color: "#1a0f00", border: "none",
              padding: "15px", fontSize: 12, letterSpacing: 3, textTransform: "uppercase",
              borderRadius: 2, cursor: "pointer", fontWeight: 700,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              boxShadow: "0 0 40px rgba(255,200,80,0.25)",
              transition: "all 0.25s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 40px rgba(255,200,80,0.45)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 0 40px rgba(255,200,80,0.25)"; }}
          >
            Envoyer ma demande de réservation
          </button>

          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 11, textAlign: "center", marginTop: 14 }}>
            Réponse garantie sous 48h · Aucun paiement requis à ce stade
          </p>
        </div>
      </div>
    </section>
  );
}
