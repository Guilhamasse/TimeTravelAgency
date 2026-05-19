import { useState, useRef } from "react";
import { Nav, Footer } from "./components/Layout";
import Hero from "./components/Hero";
import Destinations from "./components/Destinations";
import BookingForm from "./components/BookingForm";
import Chatbot from "./components/Chatbot";

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
    setActiveSection("Réserver");
    setTimeout(() => bookRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  return (
    <div style={{
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      background: "#04040f", minHeight: "100vh",
      color: "white", margin: 0, padding: 0,
      width: "100%", overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:wght@300;400;500&display=swap');

        html, body, #root {
          margin: 0; padding: 0; width: 100%;
          background: #04040f; overflow-x: hidden;
        }
        * { box-sizing: border-box; }

        @keyframes twinkle  { from { opacity: 0.2; } to { opacity: 0.85; } }
        @keyframes pulse    { from { opacity: 0.4; transform: translate(-50%,-55%) scale(1); } to { opacity: 0.9; transform: translate(-50%,-55%) scale(1.12); } }
        @keyframes bounce   { 0%,80%,100% { transform: translateY(0); } 40% { transform: translateY(-5px); } }
        @keyframes fadeIn   { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp  { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scrollPulse { 0%,100% { opacity: 0.3; } 50% { opacity: 0.8; } }

        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.22); }
        select option { background: #0d0014; }

        ::-webkit-scrollbar       { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,200,80,0.25); border-radius: 2px; }
      `}</style>

      <Nav activeSection={activeSection} onNav={handleNav} />
      <Hero onExplore={() => handleNav("Destinations")} onBook={() => handleNav("Réserver")} />
      <Destinations destRef={destRef} onBook={handleBook} />
      <BookingForm bookRef={bookRef} preselected={bookingDest} />
      <Footer />
      <Chatbot />
    </div>
  );
}
