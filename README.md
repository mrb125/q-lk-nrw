# Quantenphysik LK Dashboard

> Digitale Lernplattform für das Abitur Quantenphysik NRW  
> Stack: **React 18 · Vite · TypeScript · KaTeX · html2canvas · @xyflow/react**

## Features

| Feature | Route |
|---------|-------|
| 📊 Dashboard (Fortschritt, Module) | `/` |
| 🗺️ Strukturlegekarten (Multi-Board, PNG-Export) | `/strukturlegekarten` |
| 🌐 Entdecken (externe Links: LEIFI, PhET…) | `/explore` |
| 🃏 Karteikarten-Trainer (AFB-Filter, localStorage) | `/flashcards` |
| 📐 Messwert-Auswertung (h, λ, Bragg, De-Broglie) | `/auswertung` |
| 🎓 Abitur-Simulation (Timer, Selbstbewertung, Note) | `/abitur` |
| 🏆 Abzeichen-System (10 Achievements) | `/badges` |
| 📖 Formelsammlung (KaTeX) | `/formulas` |
| 📚 Lernmodul-Detail | `/module/:id` |

## Interaktive Simulationen

- **Photoeffekt** – Wellenlänge & Intensität, Materialauswahl, Elektronenemission mit Anoden-Absorption
- **Doppelspalt** – Interferenzmuster + Intensitätsprofil live, Einzelphotonen-Modus
- **Bragg-Reflexion** – Kristallgitter-Canvas, Glanzwinkel-Slider, konstruktive Interferenz

## Inhalt (modules.ts)

11 Themen vollständig mit TheoryBites und AbiturTasks:

1. Doppelspalt mit Einzelphotonen
2. Welle-Teilchen-Dualismus
3. Röntgenstrahlung
4. Compton-Effekt
5. Lichtelektrischer Effekt
6. De-Broglie-Wellenlänge
7. Elektronenbeugung
8. Heisenbergsche Unschärferelation
9. Fullerene-Interferenz
10. Schrödingers Katze
11. Hallwachs-Versuch

## Lokale Entwicklung

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # Produktions-Build
```

## GitHub

Repository: https://github.com/mrb125/q-lk-nrw
