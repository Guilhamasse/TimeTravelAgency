export const DESTINATIONS = [
  {
    id: "paris1889",
    name: "Paris 1889",
    subtitle: "Belle Époque",
    era: "19e siècle",
    price: "4 200 €",
    priceNum: 4200,
    desc: "Assistez à l'inauguration de la Tour Eiffel, déambulez dans l'Exposition Universelle, sirotez un café dans les grands boulevards illuminés au gaz.",
    longDesc: "Paris en 1889, c'est une ville en pleine effervescence. Gustave Eiffel vient d'achever sa tour de fer, symbole d'une modernité triomphante. L'Exposition Universelle attire des millions de visiteurs du monde entier. Nos guides chrononautes vous emmèneront dans les cafés de Montmartre, aux premières loges du Moulin Rouge, et jusqu'au sommet de la dame de fer fraîchement inaugurée.",
    color: "#C9A96E",
    bg: "linear-gradient(135deg, #1a0f00 0%, #3d2200 50%, #1a0f00 100%)",
    accent: "#FFD580",
    emoji: "🗼",
    highlights: ["Tour Eiffel (construction)", "Exposition Universelle", "Moulin Rouge", "Cafés parisiens"],
    duration: "7 jours",
    difficulty: "Facile",
    included: ["Guide chrononaute dédié", "Bulle de discrétion temporelle", "Hébergement Belle Époque", "Repas gastronomiques d'époque"],
    faq: [
      { q: "Parle-t-on français en 1889 ?", a: "Oui, le français de 1889 est très proche du moderne. Notre guide vous briefera sur les expressions d'époque." },
      { q: "Peut-on interagir avec les habitants ?", a: "Absolument, c'est même encouragé ! Nos guides vous accompagnent pour éviter tout paradoxe temporel." },
    ],
  },
  {
    id: "cretace",
    name: "Crétacé",
    subtitle: "-65 millions d'années",
    era: "Préhistoire",
    price: "9 800 €",
    priceNum: 9800,
    desc: "Observez les derniers dinosaures dans leur habitat naturel. Une expérience unique protégée par notre bulle temporelle de sécurité certifiée ISO-9001T.",
    longDesc: "Le Crétacé supérieur est l'ère des titans. Le T-Rex règne en maître, les ptérosaures planent au-dessus de forêts luxuriantes, et les mers tropicales regorgent de créatures fantastiques. Notre technologie de bulle temporelle vous garantit une observation en totale sécurité, à quelques mètres des plus grands animaux ayant jamais foulé la Terre.",
    color: "#4CAF7D",
    bg: "linear-gradient(135deg, #001a00 0%, #0d3d1a 50%, #001a00 100%)",
    accent: "#7FFF9F",
    emoji: "🦕",
    highlights: ["T-Rex en liberté", "Ptérosaures géants", "Forêts primitives", "Mers tropicales"],
    duration: "3 jours",
    difficulty: "Aventure",
    included: ["Bulle de sécurité ISO-9001T", "Équipement de safari temporel", "Biologiste paléontologue", "Drone d'observation silencieux"],
    faq: [
      { q: "La bulle est-elle vraiment sûre ?", a: "Certifiée ISO-9001T et testée sur plus de 500 voyages. Aucun incident en 12 ans d'exploitation." },
      { q: "Peut-on toucher les dinosaures ?", a: "Non, la bulle maintient une distance de sécurité. Mais vous pouvez observer à 2-3 mètres sans risque." },
    ],
  },
  {
    id: "florence1504",
    name: "Florence 1504",
    subtitle: "Haute Renaissance",
    era: "15e siècle",
    price: "5 600 €",
    priceNum: 5600,
    desc: "Croisez Léonard de Vinci et Michel-Ange dans leurs ateliers, assistez aux fêtes des Médicis et contemplez le David fraîchement sculpté.",
    longDesc: "Florence en 1504 est le centre du monde artistique. Michel-Ange vient de terminer le David, Léonard de Vinci perfectionne la Joconde dans son atelier. Les Médicis organisent des fêtes somptueuses, les rues bruissent de débats philosophiques et de musique. Nos guides vous introduiront dans les cercles artistiques les plus fermés de la Renaissance.",
    color: "#B87FC4",
    bg: "linear-gradient(135deg, #0d0014 0%, #2d0040 50%, #0d0014 100%)",
    accent: "#E8A0FF",
    emoji: "🎨",
    highlights: ["Atelier de Vinci", "David de Michel-Ange", "Palais Pitti", "Marchés de la Renaissance"],
    duration: "5 jours",
    difficulty: "Culturel",
    included: ["Guide historien spécialisé Renaissance", "Tenues d'époque sur mesure", "Accès aux ateliers d'artistes", "Dîner au Palais Médicis"],
    faq: [
      { q: "Faut-il parler italien ?", a: "Non, nos guides maîtrisent le florentin du XVe siècle et feront la traduction en temps réel." },
      { q: "Rencontrera-t-on vraiment de Vinci ?", a: "Nous organisons une visite de son atelier. Une rencontre directe est possible selon les activités du moment." },
    ],
  },
];

export const SYSTEM_PROMPT = `Tu es l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe.
Ton rôle : conseiller les clients sur les meilleures destinations temporelles.

Ton ton :
- Professionnel mais chaleureux
- Passionné d'histoire
- Toujours enthousiaste sans être trop familier
- Expertise en voyage temporel (fictif mais crédible)

Tu connais parfaitement :
- Paris 1889 (Belle Époque, Tour Eiffel, Exposition Universelle) — à partir de 4 200 €, 7 jours, niveau Facile
- Crétacé -65M (dinosaures, nature préhistorique, bulle de sécurité ISO-9001T) — à partir de 9 800 €, 3 jours, niveau Aventure
- Florence 1504 (Renaissance, art, Michel-Ange, Médicis) — à partir de 5 600 €, 5 jours, niveau Culturel

FAQ agence :
- Remboursement intégral si paradoxe temporel détecté
- Départs chaque vendredi depuis le Hub Temporal de Genève
- Assurance chrononaute incluse dans tous les forfaits
- Minimum 18 ans requis pour le Crétacé

Réponds toujours en français. Sois concis (3-4 phrases max). Propose toujours une prochaine étape (réserver, en savoir plus, etc.).`;
