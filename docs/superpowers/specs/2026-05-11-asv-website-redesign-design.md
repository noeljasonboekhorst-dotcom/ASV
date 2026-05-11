# ASV Hamm Tennis — Website Redesign

**Datum:** 2026-05-11
**Ziel:** Modernes Redesign der bestehenden Vereinswebsite (https://asv-hamm-tennis.jimdosite.com/) mit identischen Inhalten und stärker visuellem Auftritt im "Sport-Modern (Bold & Energetisch)"-Stil.

## Stack

- Reines HTML5, CSS3, vanilla JavaScript
- Keine Build-Tools, kein Framework
- Direkt per Doppelklick öffnbar / auf jeden statischen Hoster deploybar
- Bilder werden direkt aus `Bilder/` referenziert (bereits in modernem `.avif`/`.webp` Format)

## Design Tokens

### Farben (aus den Vereinsbildern abgeleitet)

| Token | Hex | Verwendung |
|-------|-----|------------|
| `--clay` | `#C2502E` | Sandplatz-Terracotta — Primäre Akzentfarbe, Buttons, Highlights |
| `--clay-dark` | `#9C3E22` | Hover-Zustand für Clay |
| `--forest` | `#1F3D2F` | Tiefes Waldgrün — Sekundärfarbe, Footer, Headlines auf Hell |
| `--forest-light` | `#2D5A44` | Hover-Zustand für Forest |
| `--cream` | `#F5EFE6` | Warmes Off-White — Haupthintergrund |
| `--sand` | `#E8DDD0` | Sand-Beige — Sektions-Trenner, Cards |
| `--ink` | `#1A1A1A` | Anthrazit — Fließtext |
| `--ink-soft` | `#4A4A4A` | Sekundärtext |
| `--white` | `#FFFFFF` | Cards auf Cream-Hintergrund |

### Typografie

- **Display/Headlines:** `Bricolage Grotesque` (700, 800) — Variable Font, sehr modern, sportlich
- **Body:** `Inter` (400, 500, 600, 700) — clean, hochlesbar
- Beide via Google Fonts geladen
- Display-Sizing: `clamp(2.5rem, 6vw, 7rem)` für Hero-Headlines
- Headlines: `text-transform: uppercase`, `letter-spacing: -0.02em`
- Fließtext: `1.0625rem` / line-height `1.65`

### Spacing & Layout

- 8px-Basis-Raster
- Container max-width: `1280px`
- Section-Padding: `clamp(4rem, 10vw, 9rem)` vertikal
- Border-Radius: `--radius-sm: 8px`, `--radius-md: 16px`, `--radius-lg: 24px`

## Komponenten (in styles.css)

1. **Sticky Top-Nav** — Logo links, Menü rechts, mobiler Burger; verändert Hintergrund beim Scrollen (transparent → cream mit Schatten)
2. **Hero** — Asymmetrisches Split-Layout: links Display-Headline + CTA, rechts großes Bild mit Clay-Tint-Overlay; animierter Score-Marquee unten
3. **Section-Header** — kleines Eyebrow-Label + großer Display-Title + optionaler Lead-Text
4. **News-Card / Bento-Grid** — verschieden große Cards mit Bild, Datum-Badge, Titel, Kurztext
5. **Team-Card** — Mannschaftsfoto + Name + Saison-Bilanz
6. **Image-Tile (Galerie)** — quadratisches Bild mit Hover-Zoom + Caption-Overlay
7. **CTA-Block** — Clay-Hintergrund, große Headline, Button
8. **Footer** — Forest-Hintergrund, 3-spaltig: Adresse / Termine 2026 / Quick-Links

## Seiten

| Datei | Zweck |
|-------|-------|
| `index.html` | Hero, News (Jahreshauptversammlung 2026, Termine), Schnuppertennis, Warum Tennis, Galerie, Footer |
| `mannschaften.html` | Herren 40, Herren 55, U15, weitere Mannschaften, Trainer-Infos, Berichte |
| `kontakt.html` | Adresse "Am Wellenbad, Hamm Werries", Karte (Google Maps Embed), Schnuppertennis-Kontakt |
| `vorstand.html` | Vorstands-Cards inkl. Liam (2. Jugendwart, neu 2026) |
| `platzpflege.html` | Galerie Wintersaison 2024/25 Platzarbeiten |
| `impressum.html` | Schlicht |
| `datenschutz.html` | Schlicht |

## Interaktion (script.js)

- Mobile Burger-Toggle
- Sticky-Nav Background-Wechsel ab Scroll > 50px
- IntersectionObserver für `.reveal`-Klasse → Fade+Slide-up beim Scroll
- Galerie-Bilder: Hover-Zoom via CSS, Klick öffnet Lightbox (vanilla, ohne Library)

## Inhalte

Alle Texte werden 1:1 aus der bestehenden Seite übernommen (Wunsch des Users). Keine Umformulierungen. Emojis bleiben drin.

## Bildquellen

Alle Bilder aus `Bilder/`. Drohnen-Aufnahme als Hero-Hauptbild. Teamfoto + Schnuppertennis-Bilder auf Startseite. Match-Berichts-Bilder auf Mannschaften-Seite.

## Datei-Struktur

```
ASV/
├── Bilder/                  (existiert)
├── index.html
├── mannschaften.html
├── kontakt.html
├── vorstand.html
├── platzpflege.html
├── impressum.html
├── datenschutz.html
├── assets/
│   ├── styles.css
│   └── script.js
└── docs/superpowers/specs/2026-05-11-asv-website-redesign-design.md
```

## Liefer-Reihenfolge

1. `assets/styles.css` (Design Tokens + alle gemeinsamen Komponenten)
2. `assets/script.js`
3. `index.html` — als Live-Preview für User-Feedback
4. **Checkpoint:** User schaut Startseite an, Feedback sammeln
5. Restliche Seiten mit identischer Header/Footer-Struktur

## Out of Scope

- Kein CMS / kein Backend
- Kein Kontaktformular-Backend (nur Layout, Submit nicht funktional)
- Keine Mehrsprachigkeit
- Kein Cookie-Consent-Banner (DSGVO-Hinweis statisch im Footer)
