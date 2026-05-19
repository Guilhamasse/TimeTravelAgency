# TimeTravel Agency — Webapp Interactive

Webapp pour une agence de voyage temporel fictive, créée avec IA générative dans le cadre d'un projet pédagogique M1/M2 Digital & IA.

## 🗂️ Structure du projet

```
src/
├── App.jsx                    # Composant racine, routing des sections
├── data/
│   └── destinations.js        # Données des 3 destinations + prompt IA
├── utils/
│   └── api.js                 # Client API Anthropic (Claude)
└── components/
    ├── Layout.jsx             # Nav, StarField, Footer
    ├── Hero.jsx               # Section hero avec animation
    ├── Destinations.jsx       # Galerie cards + panneau détail
    ├── BookingForm.jsx        # Formulaire de réservation avec validation
    └── Chatbot.jsx            # Widget chatbot IA flottant
```

## 🛠️ Stack Technique

- **Framework** : React 18 + Vite
- **Style** : CSS-in-JS (inline styles), Google Fonts
- **IA Chatbot** : Claude Sonnet via API Anthropic
- **Hébergement recommandé** : Vercel

## ✨ Features implémentées

### Page d'accueil (Hero.jsx)
- Hero plein écran avec champ d'étoiles animé
- Titre animé au chargement (fade-in + translateY)
- Deux CTA : Explorer les destinations / Réserver
- Indicateur de scroll animé
- Stats de l'agence

### Galerie des destinations (Destinations.jsx)
- 3 cards interactives avec hover effects
- Panneau de détail expandable avec onglets (Description / Inclus / FAQ)
- CTA direct vers réservation depuis le panneau
- Données enrichies dans `destinations.js`

### Agent conversationnel (Chatbot.jsx)
- Widget flottant (bouton en bas à droite)
- Connexion à Claude Sonnet via API Anthropic
- Suggestions rapides pour démarrer
- Indicateur de frappe animé
- Historique de conversation maintenu

### Formulaire de réservation (BookingForm.jsx)
- Validation en temps réel (email, date, champs requis)
- Calcul de prix automatique selon le nombre de voyageurs
- Pré-sélection de destination depuis les cards
- Écran de confirmation avec numéro de référence

## 🚀 Installation

```bash
npm create vite@latest timetravel -- --template react
cd timetravel
# Remplacer src/ par les fichiers du projet
npm install
npm run dev
```

## 🔑 Configuration API

Le chatbot nécessite une clé API Anthropic. Créez un fichier `.env` :

```
VITE_ANTHROPIC_API_KEY=sk-ant-...
```

Puis dans `src/utils/api.js`, ajoutez le header :
```js
"x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
"anthropic-version": "2023-06-01",
```

> ⚠️ En production, ne jamais exposer la clé côté client. Utilisez un backend proxy.

## 🤖 IA Utilisées

- **Code** : Claude Sonnet 4.5 (Anthropic)
- **Chatbot** : Claude Sonnet via API Anthropic
- **Visuels** : À intégrer depuis le Projet 1 (Midjourney / DALL-E)

## 📄 Licence

Projet pédagogique — M1/M2 Digital & IA. Usage non-commercial.
