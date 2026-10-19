# ABRAHAM COLLECTION — LIVING PROJECT MEMORY & AUDIT LEDGER

> **CRITICAL PROTOCOL FOR AI AGENTS & DEVELOPERS**:  
> This file is the primary persistent memory store for the Abraham Collection web platform.  
> **Rule**: You MUST consult this document at the start of every interaction, and you MUST update this document at the conclusion of every prompt where architectural decisions, code changes, or user preferences are introduced.

---

## 1. Project Vital Statistics

| Parameter | Value |
| :--- | :--- |
| **Project Name** | Abraham Collection Atelier Web Platform (`abrhamcollectionweb`) |
| **Founder & Creative Director** | **Bolaji Abayomi Abraham** (Est. 2002 &bull; Lagos, Nigeria) |
| **Brand Motto** | *"Clothing That Suits"* |
| **Primary Framework** | Next.js 14.2.1 (App Router), React 18, TypeScript |
| **Styling Engine** | Tailwind CSS 3.4.1, Framer Motion, next-themes |
| **Backend & Persistence** | Supabase (Database, Auth, Leads, Wishlist, Storage) |
| **Offline Engine** | PWA Service Worker (`/sw.js`) with image/catalog cache |
| **Production URL** | [https://abrhamcollectionweb.vercel.app](https://abrhamcollectionweb.vercel.app) |
| **Working Directory** | `c:\Users\USER\OneDrive\Documents\abraham-collection\abrhamcollectionweb` |
| **Current Git Branch** | `main` |
| **Last Verified Build** | `✓ Compiled successfully (18/18 static & API routes passing)` |
| **Last Memory Update** | October 2026 (Prompt 14) |


---

## 2. Immutable Brand & Design System Rules (Non-Negotiables)

These eight rules represent hard user constraints established through iterative refinement. They MUST NOT be altered or violated in any future code change:

```
+----------------------------------------------------------------------------------------------------+
| 1. ZERO GREEN DOTS & ZERO GREEN ACCENTS                                                            |
|    - Strictly NO emerald or green colors (no #25D366, no bg-emerald-*, no text-green-*).            |
|    - All status beacons, indicators, and WhatsApp CTAs use brand gold (#F2C14E) or crimson (#A61C32).|
+----------------------------------------------------------------------------------------------------+
| 2. ZERO BUBBLE PILL BARS ON HEADINGS                                                               |
|    - No rounded-full capsule badges for section subheadings or categories.                         |
|    - Use architectural accents: .heading-accent (2px gold left border, translucent background)      |
|      or subtle hairline dividers.                                                                  |
+----------------------------------------------------------------------------------------------------+
| 3. UNIQUE GLOBAL FONT STYLE FOR NAMES                                                              |
|    - All names (Abraham Collection, Bolaji Abayomi Abraham, patron/client names, garment titles)  |
|      MUST use Italiana via .font-name, .name-italic, or .patron-name.                              |
|    - Distinct, high-fashion editorial serif with subtle tracking.                                  |
+----------------------------------------------------------------------------------------------------+
| 4. THEME CONFIGURATION (DEFAULT LIGHT, VELVET OBSIDIAN DARK)                                       |
|    - Default theme is LIGHT (defaultTheme="light", enableSystem={false}).                          |
|    - Dark mode is calibrated to deep velvety obsidian (#0B0908 background, #151210 cards),         |
|      engineered to make vibrant African textiles and sovereign gold pop with gallery contrast.      |
+----------------------------------------------------------------------------------------------------+
| 5. UNMISTAKABLE DUAL THEME SWITCHERS                                                               |
|    - Theme toggle MUST be permanently accessible in TWO locations:                                 |
|      a) Top Navbar (desktop badge and mobile drawer row with explicit 'Light'/'Dark' label).       |
|      b) Persistent Floating Dock (Node 6 Sun/Moon button, visible on every page and scroll depth). |
+----------------------------------------------------------------------------------------------------+
| 6. UNIFIED "BOOK BESPOKE" CALL TO ACTION                                                           |
|    - Every primary bespoke conversion button across the entire site MUST say "Book Bespoke"        |
|      linking to /bespoke/commission. No "Book a consultation" or "Book appointment" fragmentation. |
+----------------------------------------------------------------------------------------------------+
| 7. STRICT DECOUPLING OF STOREFRONT & ADMIN OS                                                      |
|    - StorefrontShell.tsx isolates public routes from /admin*.                                      |
|    - Admin route renders WITHOUT storefront navbar, footer, or consumer shopping dock.             |
|    - Zero public links in the footer or menu point to /admin.                                      |
|    - Admin OS is guarded by in-page Master Cutter Key authentication and features a dedicated      |
|      Staff AI Copilot (AdminCopilotModal.tsx).                                                     |
+----------------------------------------------------------------------------------------------------+
| 8. TONGORO LUXURY TYPOGRAPHIC PROPORTIONS                                                          |
|    - Brand title on homepage masthead is grand, authoritative, and centered.                       |
|    - All secondary buttons, links, and navigation items are delicate micro-typography               |
|      (text-[9px] to text-[10px], tracking-[0.25em] to tracking-[0.3em], uppercase, whitespace-nowrap).|
+----------------------------------------------------------------------------------------------------+
```

---

## 3. Verified Atelier Contacts & Founder Profile

- **Founder**: **Bolaji Abayomi Abraham**
- **Atelier Lineage**: 24 Years of Architectural Master Tailoring in Lagos, Nigeria (Est. 2002).
- **Direct Phone**: `0812 264 0820` (Urgent fittings & direct consultations)
- **WhatsApp Concierge**: `0803 443 2759` (*Eranibaniso* - fabric swatches & diaspora fittings)
- **Founder Facebook**: `https://www.facebook.com/bolaji.abraham.10`
- **Brand TikTok**: `https://www.tiktok.com/@abraham00031`
- **Location**: Lagos Atelier & Cutting Rooms, Nigeria (Private appointment only)
- **Diaspora Coverage**: United Kingdom, United States, Canada, and European Union (via DHL Express)

---

## 4. Prompt-by-Prompt Ledger & Historical Audit Trail

| Prompt # | Timestamp | Key Directives & Objectives | Actions Executed | Commits / Output |
| :--- | :--- | :--- | :--- | :--- |
| **01** | Oct 14 | Initial platform creation for Abraham Collection. | Set up Next.js 14 App Router, TypeScript, Tailwind, core routes (`/`, `/bespoke`, `/heritage`, `/men`, `/women`, `/corporate`). | `847099b` |
| **02** | Oct 15 | Add local media assets and fix PostCSS build issues. | Integrated `/media/*.jpg` and `/media/hero_video.mp4`; installed autoprefixer. | `1136cd3`, `db554b3` |
| **03** | Oct 15 | Brand strategy pivot and African luxury visual identity. | Created `DESIGN_ARCHITECTURE.md` (20-brand matrix); built 8 sacred African SVG icons (`BespokeIcons.tsx`); integrated Supabase client. | `26bcfbb` |
| **04** | Oct 16 | REAVO-inspired floating dock, AI assistant, 3-click commerce, lookbook. | Built `FloatingDock.tsx`, resizable `AtelierAssistantModal.tsx`, `ProductCommerceCard.tsx`, `QuickBuyModal.tsx`, *The Style Anthology* (`/stories`), `/privacy`, `/terms`, `/contact`. | `e1c65f1` |
| **05** | Oct 16 | Resilient multi-gateway payments and offline PWA capability. | Built `payments.ts` (Paystack, Flutterwave, Kora, WhatsApp); configured `sw.js` and `PwaManager.tsx` with outage recovery. | `23119a6`, `2fdafaa` |
| **06** | Oct 16 | Right-align collapsible dock, warm luxury glow, rhythm storytelling. | Added orientation switch (vertical/horizontal), applied brand luxury glow keyframes, built `StorytellingAuthPopup.tsx` (2-per-session limit). | `b8423eb` |
| **07** | Oct 16 | Pure masthead initially; reveal navigation on scroll/hover. | Redesigned `Navigation.tsx` so initial unscrolled view displays only centered brand title and motto; links reveal on scroll. | `db0ba0c` |
| **08** | Oct 16 | Unify booking button text across the entire site. | Harmonized all consultation/bespoke buttons to "Book Bespoke" linking to `/bespoke/commission`. | `8922757` |
| **09** | Oct 16 | Fix raw HTTP basic auth prompt appearing on `/admin`. | Replaced browser Basic Auth popup with bespoke in-page lock screen requiring Master Cutter Key. | `a44b4c3` |
| **10** | Oct 16 | Tongoro proportions: grand centered title, micro-typography for buttons. | Scaled masthead title to `text-5xl tracking-[0.38em]`; scaled secondary buttons/links to `text-[9px]`/`text-[10px]` micro-typography. | `842d8e4` |
| **11** | Oct 17 | Purge pill bars and green dots; unique global name font; accessible theme switcher; decouple Admin OS. | Configured *Italiana* (`.font-name`) for all names; replaced pills with `.heading-accent`; purged `#25D366`; calibrated obsidian dark mode; placed theme toggles in navbar and dock; built `StorefrontShell.tsx` and `AdminCopilotModal.tsx`. | `e120f7e`, `9e5ceb4`, `2e77003` |
| **12** | Oct 17 | Full audit and creation of living memory documentation engine. | Created `DOCUMENTATION.md` and `PROJECT_MEMORY.md`; verified all 17 static routes compile cleanly with code 0. | `547a7e1` |
| **13** | Oct 17 | Production backend finishing touches: Supabase schema migrations, resilient database service, server-side admin authentication, orders management, and form wiring. | Created `supabase/schema.sql` (6 production tables with RLS and performance indices); created `src/types/database.types.ts`; built resilient `AtelierDatabase` (`src/lib/services/database.ts`); built `/api/admin/verify` server-side route handler; wired commissions, corporate leads, newsletter, auth profiles, and QuickBuyModal order creation; added Orders tab to Studio OS and Copilot intelligence; verified 18/18 routes pass build. | `feat(backend)` |
| **14** | Oct 18 | Align establishment year to **Est. 2002** across the entire platform. | Harmonized founding year across metadata, navigation bar, hero banner, manifestos, founder story, PWA manifest, admin passkeys (`abraham2002`), and living documentation. | Pending commit |



---

## 5. Architectural Directory & Component Registry

```
src/
├── app/
│   ├── about/page.tsx               # Founder Spotlight Bolaji Abayomi Abraham, 25-Year Chronicle
│   ├── admin/page.tsx               # Decoupled Studio OS: Commissions, Inventory, In-Page Key Guard
│   ├── bespoke/page.tsx             # 5-Stage Atelier Protocol, Sankofa Diaspora Concierge
│   │   └── commission/page.tsx      # Multi-step commission booking form with Archival Reference Code
│   ├── contact/page.tsx             # Studio address, studio hours, direct WhatsApp & phone lines
│   ├── corporate/page.tsx           # Corporate wardrobe inquiries (saved to Supabase corporate_leads)
│   ├── heritage/page.tsx            # Ceremonial Agbada, Royal Dandogo, Senator, Kaftan collections
│   ├── men/page.tsx                 # British-Italian suiting, tuxedos, blazers, pleated trousers
│   ├── women/page.tsx               # Sculptural crepe dresses, bespoke Aso Oke gowns, power suits
│   ├── stories/page.tsx             # The Style Anthology, Patron Exhibition Chapter VII, Founder Story
│   ├── offline/page.tsx             # PWA offline fallback page with cached catalog guidance
│   ├── privacy/page.tsx             # NDPR/GDPR privacy policy, client measurement vault confidentiality
│   ├── terms/page.tsx               # Bespoke terms of service, fitting milestones, alteration protocols
│   ├── globals.css                  # Design tokens, themes, .font-name, .heading-accent, .glass-dock
│   └── layout.tsx                   # Root layout, Google Fonts (Italiana, Jost, Inter), StorefrontShell
├── components/
│   ├── Navigation.tsx               # Masthead, scrolled reveal, theme toggle, Book Bespoke CTA
│   ├── Footer.tsx                   # Atelier links, verified handles, copyright with founder name
│   ├── ThemeProvider.tsx            # next-themes wrapper (default: light)
│   ├── SplashScreen.tsx             # Royal heraldry initial splash
│   ├── icons/BespokeIcons.tsx       # 8 authentic African SVG glyphs with hairline geometry
│   ├── commerce/ProductCommerceCard.tsx # 3-Action product card (Buy Now, Custom, Wishlist Heart)
│   ├── layout/StorefrontShell.tsx   # Isolates public storefront chrome from /admin* routes
│   ├── admin/AdminCopilotModal.tsx  # Staff AI Copilot for Admin OS (WhatsApp drafts, status updates)
│   ├── auth/
│   │   ├── AuthModal.tsx            # Supabase sign-in/sign-up with measurement vault linking
│   │   └── StorytellingAuthPopup.tsx# Non-intrusive storytelling prompt (max 2 per session)
│   ├── pwa/PwaManager.tsx           # Offline detection banner and service worker updater
│   └── dock/
│       ├── FloatingDock.tsx         # 6-Node dock with orientation toggle (horizontal/vertical)
│       ├── AtelierAssistantModal.tsx# Resizable multi-stage reasoning AI concierge
│       ├── QuickBuyModal.tsx        # 3-Click instant purchase drawer with standard sizes & sizing input
│       ├── CartDrawerModal.tsx      # Sartorial bag drawer with direct WhatsApp order generator
│       ├── WishlistModal.tsx        # Saved pieces wardrobe drawer
│       ├── UserProfileModal.tsx     # Client dossier, member tier badge, measurement vault trigger
│       └── VisualSearchModal.tsx    # Textile & occasion visual search
├── context/
│   └── AtelierContext.tsx           # Global state (user, cart, wishlist, active modal)
└── lib/
    ├── supabase.ts                  # Supabase client with graceful mock fallbacks
    └── payments.ts                  # Multi-gateway router (Paystack, Flutterwave, Kora, WhatsApp)
```

---

## 6. Route Build & Verification Log

```
Route (app)                              Size     First Load JS
┌ ○ /                                    188 B            99 kB
├ ○ /_not-found                          871 B          87.8 kB
├ ○ /about                               293 B          92.3 kB
├ ○ /admin                               13.1 kB         107 kB
├ ○ /bespoke                             188 B            99 kB
├ ○ /bespoke/commission                  5.26 kB          99 kB
├ ○ /contact                             4.55 kB        98.3 kB
├ ○ /corporate                           2.75 kB         154 kB
├ ○ /heritage                            2.45 kB         104 kB
├ ○ /men                                 2.45 kB         104 kB
├ ○ /offline                             3.48 kB        97.2 kB
├ ○ /privacy                             176 B          93.9 kB
├ ○ /stories                             188 B            99 kB
├ ○ /terms                               176 B          93.9 kB
└ ○ /women                               2.45 kB         104 kB
+ First Load JS shared by all            86.9 kB
```
- **Total Static Routes**: 17/17 generated with 0 errors.
- **Middleware**: 27 kB bundle managing authentication and session headers.

---

## 7. Protocol for Future Prompts (How to Update This Memory)

Whenever you (the AI assistant) or any future developer work on this project, follow this exact workflow:
1. **Pre-Flight**: Read `PROJECT_MEMORY.md` to verify active constraints (Rule 1 through 8).
2. **Execute Work**: Implement features, refactorings, or bug fixes ensuring all rules are respected.
3. **Audit**: Verify zero green dots, no pill bars, `font-name` applied to all names, and test `npm run build`.
4. **Update Memory**:
   - Add a new row to the **Prompt-by-Prompt Ledger** in Section 4.
   - Update **Project Vital Statistics** (commit hash, timestamps, route counts).
   - If files were added/removed/renamed, update Section 5.
   - If new constraints were established by the user, add them to Section 2.
