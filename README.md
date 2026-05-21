# TimeTravel Agency

Site vitrine d'une agence de voyages temporels de luxe, construit avec React + Vite. Propose la réservation de voyages dans trois époques historiques avec un chatbot IA intégré.

## Aperçu

L'application simule le site d'une agence haut de gamme permettant de voyager dans le temps. L'interface est entièrement en français, avec un design sombre et doré inspiré du luxe.

**Destinations disponibles :**
- **Paris 1889** — Belle Époque, inauguration de la Tour Eiffel (à partir de 4 200 €)
- **Crétacé** — -65 millions d'années, forêts préhistoriques et dinosaures (à partir de 9 800 €)
- **Troisième destination** — à découvrir dans l'application

## Stack technique

| Technologie | Usage |
|---|---|
| React 19 | Framework UI |
| Vite 8 | Bundler / dev server |
| Claude API (Anthropic) | Chatbot conseiller IA |
| Google Fonts | Playfair Display, Cormorant Garamond |

## Structure du projet

```
timetravel/
├── src/
│   ├── components/
│   │   ├── Hero.jsx          # Section d'accueil avec stats
│   │   ├── Destinations.jsx  # Grille de cartes + panneau détail
│   │   ├── BookingForm.jsx   # Formulaire de réservation
│   │   ├── Chatbot.jsx       # Chat flottant IA
│   │   └── Layout.jsx        # Nav, Footer, StarField
│   ├── data/
│   │   └── destinations.js   # Données des destinations + system prompt
│   ├── utils/
│   │   └── api.js            # Appel à l'API Claude
│   └── App.jsx
└── index.html
```

## Installation

```bash
cd timetravel
npm install
```

## Configuration

Le chatbot appelle directement l'API Anthropic depuis le navigateur. Vous devez fournir une clé API valide.

Créez un fichier `.env` dans le dossier `timetravel/` :

```env
VITE_ANTHROPIC_API_KEY=sk-ant-...
```

> **Note :** Exposer une clé API dans le navigateur est adapté à un projet de démonstration. En production, les appels API doivent transiter par un backend.

## Lancement

```bash
npm run dev
```

L'application sera disponible sur [https://timetravel-1fnavaxlg-jordanquins-projects.vercel.app/](https://timetravel-1fnavaxlg-jordanquins-projects.vercel.app/).

## Scripts disponibles

| Commande | Description |
|---|---|
| `npm run dev` | Démarre le serveur de développement |
| `npm run build` | Génère le build de production |
| `npm run preview` | Prévisualise le build de production |
| `npm run lint` | Lint du code avec ESLint |

## Fonctionnalités

- **Hero animé** — champ d'étoiles, halo pulsé, compteurs clés (1 200+ voyageurs, 3 époques, retour garanti)
- **Cartes destinations** — hover interactif, panneau de détail avec onglets (description / inclusions / FAQ)
- **Formulaire de réservation** — pré-remplissage automatique depuis les cartes destinations
- **Chatbot IA** — conseiller temporel propulsé par Claude Sonnet, avec suggestions rapides et animation de frappe
- **Design responsive** — adapté mobile et desktop
