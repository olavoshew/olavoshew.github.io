# olavoshew.github.io

Personal portfolio website for **Olavo C. Shewchenko** — developer since 2010, musician since age 4.

**Live:** [olavoshew.github.io](https://olavoshew.github.io/)

## About

A single-page portfolio showcasing AR/mobile projects, video editing & motion graphics work, and music. Designed with a dark cinematic aesthetic and a "kinetic, crafted, rhythmic" brand identity.

## Built With

- **Plain HTML / CSS / JS** — no frameworks, no build step
- **OKLCH color system** with warm copper-amber accent
- **Fluid typography** using `clamp()` (Archivo + Figtree via Google Fonts)
- **YouTube IFrame API** for auto-playing video reel on scroll
- **IntersectionObserver** for scroll reveal animations and nav state
- **CSS @keyframes** for hero entrance animation
- **`prefers-reduced-motion`** support for accessibility (WCAG AA)

## Structure

```
index.html    — Single-page layout (hero, about, work, reel, contact)
style.css     — Design tokens, components, responsive breakpoints
main.js       — Scroll interactions, YouTube auto-play, smooth nav
favicon.svg   — SVG favicon
images/       — Profile photo and project icons
```

## Deployment

Hosted on **GitHub Pages** from the `master` branch. Push to deploy.
