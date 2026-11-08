<div align="center">

  <img src="public/campuscode-logo.png" alt="CampusCode Logo" width="220" />

  # CampusCode — ReBuild '26

  **The Digital Home for Student Innovation · Build. Compete. Ship.**

  [![React](https://img.shields.io/badge/React-19.0.0-61dafb?style=flat-square&logo=react)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-6.2.0-646cff?style=flat-square&logo=vite)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38b2ac?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
  [![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel)](https://vercel.com/)
  [![Status](https://img.shields.io/badge/ReBuild_'26-Round_1_Complete-a8e62e?style=flat-square&logoColor=111111)](#)

</div>

---

## 📌 Overview

**CampusCode ReBuild '26** is a faithful, production-grade recreation of the [CampusCode](https://campuscode.co.in) platform. Built desktop-first (optimized for 1440px and 1920px viewports) with an obsession over micro-details, precision typography, responsive aesthetics, and ambient micro-interactions.

The project encompasses all 4 primary application views: the high-converting **Landing Page**, split-column **Login & Register authentication portals**, and the interactive **Student Dashboard** complete with real-time mock data stores and local authentication state management.

---

## ✨ Features & Architecture

### 1. Landing Page (`/`)
* **Navigation Header (`LandingNav`):** Brand logo asset, anchor links (`#about`, `#how`, `#hackathons`, `#community`), and direct action buttons (`LOGIN`, `JOIN CAMPUSCODE ↗`).
* **Hero Section (`LandingHero`, `TiltedGridHero`, `Hero3DVisual`):** 
  * Massive typography (`BUILD COMPETE SHIP.` with -7px tracking).
  * Atmospheric gradient lighting (`--hero-gradient` radial blends).
  * 3D isometric tilted canvas mesh powered by Three.js shaders.
* **Continuous Marquee Strips (`MarqueeTicker`, `MarqueeLogoScroller`):** Infinite horizontal brand ticker and technology partner scroller.
* **Core Value Pillars (`SectionWhereStudentsBuild`):** 3-column value propositions highlighting Hackathons, Tech Communities, and Startup incubation.
* **Interactive Experience Showcase (`SectionExperience`):** Custom video/demo card featuring subtle hover transitions and status pills.
* **The Process (`SectionHowItWorks`):** 4-step sequence cards (`01 DISCOVER`, `02 TEAM UP`, `03 BUILD`, `04 SHIP`).
* **Arena Challenges Feed (`SectionArenaChallenges`):** Categorized hackathons (AI Innovation, Web3, Future Web) with live tags, prize pools, and registration badges.
* **Mission & Final CTA (`SectionMission`, `SectionFinalCta`):** High-impact call to action prompting students to enter the arena.
* **Application Footer (`LandingFooter`):** Global status indicator (`● ALL SYSTEMS OPERATIONAL`), ecosystem links, and legal copy.

### 2. Authentication Flow (`/login` & `/register`)
* **Dual-Column Layout:** Ambient backdrop grid, brand manifesto on the left, and glass-card forms on the right.
* **Interactive Security Controls:**
  * Password reveal/conceal toggle.
  * Live CAPTCHA generator with instant reload (`↻`).
  * Form validation feedback.
* **Client-Side State Persistence:** Simulates instant session creation by writing authentication tokens and user profiles to `localStorage` and smoothly routing to the student workspace.

### 3. Student Dashboard (`/student`)
* **Top Navigation Bar (`DashboardTopNav`):** Live operational telemetry, quick search, notification dropdown, and profile badge.
* **Collapsible Sidebar (`DashboardSidebar`):** Switch seamlessly between `Overview`, `Events`, `My Events`, `Challenges`, and `Settings`.
* **Telemetry & Analytics (`StatsGrid`):** Key metrics tracking active hackathons, submitted repositories, points earned, and team rank.
* **Events Explorer (`EventsView`, `EventCard`):** Filter and search open hackathons with deadlines, tags, and team registration modals.
* **Registered Events Tracking (`MyEventsView`, `RegistrationCard`):** Manage active project submissions, team members, and check-in statuses.

---

## 🎨 Design System & Brand Tokens

The design is engineered from a strict set of brand tokens specified in [`src/styles/tokens.css`](src/styles/tokens.css):

| Token | Hex / Value | Description |
|---|---|---|
| `--bg` | `#F7F7F4` | Soft warm canvas background |
| `--surface` | `#FFFFFF` | Primary white card surface |
| `--surface-soft` | `#F0F0EC` | Subtle secondary card fill |
| `--purple` | `#7665FF` | Primary vibrant brand purple |
| `--lime` | `#A8E62E` | High-visibility accent lime |
| `--lime-dark` | `#82B91A` | High-contrast accessible text lime |
| `--text` | `#111111` | Pure dark body and headline text |
| `--border` | `#DEDED8` | Crisp structural divider borders |

### Typography
* **Headings & Body UI:** `Inter`, `-apple-system`, `BlinkMacSystemFont`, `sans-serif`
* **Metadata, Badges & Labels:** `DM Mono`, `monospace` (all-caps tracking + letter spacing)
* **Custom Skewed Accents:** `.slanted-card` and `.slanted-tag` CSS transformations (`skewX(-12deg)` with counter-skewed text).

---

## 📂 Repository Structure

```text
campuscode-rebuild26/
├── public/                       # Static public assets
│   ├── challenges/               # Hackathon & challenge imagery
│   ├── logos/                    # Partner & sponsor brand vectors
│   ├── slides/                   # Interactive slide show visuals
│   ├── campuscode-logo.png       # Original CampusCode tri-slash logo
│   ├── grid-pattern.jpg          # Ambient subtle grid backdrop
│   └── texturebackground.jpg     # Textured card underlays
├── src/
│   ├── components/
│   │   ├── auth/                 # Login & Registration subcomponents
│   │   ├── common/               # Shared badges, buttons, cards, headers
│   │   ├── dashboard/            # Student portal views, cards, and navigation
│   │   ├── landing/              # Landing page hero, marquee, and sections
│   │   └── ui/                   # Primitive design system components (Radix)
│   ├── data/                     # Mock data stores (events, user, stats)
│   ├── lib/                      # Utility functions & helpers (cn, formatting)
│   ├── pages/                    # Route pages (Landing, Login, Register, Dashboard)
│   ├── styles/                   # Design tokens and Tailwind directives
│   ├── App.tsx                   # Central router & route configuration
│   └── main.tsx                  # React 19 root bootstrap
├── BUILD_ORDER.md                # Engineering implementation roadmap
├── SPEC.md                       # Comprehensive design & specification blueprint
├── tailwind.config.js            # Tailwind typography, colors, and keyframes
├── vercel.json                   # Single-Page-App routing rewrite configuration
└── vite.config.ts                # Vite 6 bundler setup & path aliases
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm** / **pnpm** / **yarn**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bilalhydercodes/campus-code-hackathon.git
   cd campus-code-hackathon
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Compile production build:**
   ```bash
   npm run build
   ```

5. **Preview production build locally:**
   ```bash
   npm run preview
   ```

---

## ⚡ Deployment

This project is configured out-of-the-box for seamless deployment on **Vercel**:

* Includes [`vercel.json`](vercel.json) rewrite rules to support HTML5 History API push-state routing on client routes (`/login`, `/register`, `/student`).
* Build Command: `npm run build`
* Output Directory: `dist`

---

## 🛠 Tech Stack

* **Core:** [React 19](https://react.dev/), [TypeScript 5.8](https://www.typescriptlang.org/)
* **Bundler:** [Vite 6](https://vitejs.dev/)
* **Styling:** [Tailwind CSS 3](https://tailwindcss.com/), [PostCSS](https://postcss.org/), CSS Variables
* **Primitives & Icons:** [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/)
* **3D Visuals & Shaders:** [Three.js](https://threejs.org/), `@paper-design/shaders-react`
* **Routing:** [React Router v7](https://reactrouter.com/)

---

## 📄 License & Attribution

Designed, rebuilt, and maintained by **Mahammad Bilal Hyder** ([@bilalhydercodes](https://github.com/bilalhydercodes)).  
Built for the **ReBuild '26 Challenge** — Round 1 Recreation.  
Original brand, assets, and design identity belong to [CampusCode](https://campuscode.co.in).
