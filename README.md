# 🍽️ Lumine — Fine Dining Food Website

A cinematic food website built with **React + Vite + Framer Motion**.

## ✨ Features

### Intro Animation (Cinema-style)
- Word cycling animation: SAVOR → TASTE → INDULGE → DELIGHT
- Reveals the **LUMINE** logo with staggered letter animations
- Animated loading bar before transitioning to the main site
- Smooth exit transition with scale + fade

### Page Sections
| Section | Animations |
|---|---|
| **Navbar** | Slide-in on load, scroll-aware blur + transparency |
| **Hero** | Parallax background, text reveal, scroll-linked opacity |
| **Featured Dishes** | Staggered card reveal, image scale on hover, overlay CTA |
| **About** | Image stack with offset, counter stats, split layout |
| **Menu** | Tab-switching with AnimatePresence, staggered items |
| **Testimonials** | Cards reveal on scroll |
| **Footer CTA** | Bounce-in on scroll enter |

## 🚀 Getting Started

```bash
cd FoodWebsite
npm install
npm run dev
```

Open http://localhost:5173

## 📦 Dependencies

- `react` + `react-dom` — UI framework
- `framer-motion` — All animations (intro, scroll, hover, transitions)
- `vite` — Build tool

## 🎨 Design System

- **Colors**: Deep charcoal (`#0a0804`) + Warm amber (`#e8913a`) + Cream (`#f5efe6`)
- **Fonts**: Playfair Display (headings) + Cormorant Garamond (body/labels)
- **Aesthetic**: Luxury fine dining — cinematic, dark, editorial

## 📁 File Structure

```
src/
  App.jsx                          — Root with intro gate
  main.jsx                         — Entry point
  index.css                        — Global styles + fonts
  components/
    IntroAnimation.jsx             — Cinematic intro sequence
    Navbar.jsx                     — Sticky nav with scroll effects
    Hero.jsx                       — Full-screen hero with parallax
    FeaturedDishes.jsx             — 3 signature dish cards
    AboutSection.jsx               — Story + stats split layout
    MenuSection.jsx                — Full à la carte with tab switching
    TestimonialsSection.jsx        — Press quotes + footer
    Footer.jsx                     — Re-export
```