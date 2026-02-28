# Anforderungsdokumentation & Feature-Übersicht

## V1 + V2 (Abgeschlossen)
Siehe Walkthrough und früheren Changelog für Details zu:
- Photoeffekt-Simulator (Slider, Materialien, Elektronenemission)
- Flashcard-Trainer (Tinder-Swipe, localStorage)
- Strukturlegekarten Multiple Workspaces + PNG-Export
- Formelsammlung (KaTeX)
- Alle 11 Quantenphysik-Themen mit TheoryBites & AbiturTasks

---

## V3 (Heutiges Update)

### 5. Abitur-Simulation & AFB-Filter

**Anforderungen:**
- Der Nutzer soll Karteikarten nach Anforderungsbereich (I / II / III / Theorie / Alle) filtern können.
- Simulation einer Prüfungssession mit 45min Countdown-Timer.
- Nach der Prüfung: Selbstbewertung (Richtig / Teilweise / Falsch) und Gesamtauswertung mit Note.

**Implementiert:**
- `Flashcards.tsx`: AFB-Filterchips oben, Fortschrittsbalken nach Filter.
- `AbiturSimulation.tsx`: Intro-Bildschirm → Prüfung mit Timer → Review-Screen mit Ergebnisübersicht.
- Route `/abitur`, Nav-Link "Abitur" (GraduationCap-Icon).

---

### 6. Neue Simulationen

**Anforderungen:**
- Interaktiver Doppelspalt mit Einzel-Photonen-Modus.
- Bragg-Reflexion am Kristallgitter mit Canvas-Visualisierung.

**Implementiert:**
- `DoppelspaltSimulation.tsx`: Slider für λ, d, L. Canvas-Rendering von Interferenzmuster und Intensitätsprofil. Toggle für Einzelphotonen (statistische Punktverteilung).
- `BraggSimulation.tsx`: Canvas mit Gitterebenen, Winkel-Slider, Bragg-Bedingung live berechnet.

---

### 7. Abzeichen-System (Badges)

**Anforderungen:**
- Spielerisches Achievement-System mit 10+ definierten Abzeichen.
- Persistenz via `localStorage`. Darkened/grau wenn gesperrt.

**Implementiert:**
- `badges.ts`: Datendefinition + `getEarnedBadges()`, `awardBadge()`, `checkAndAwardBadge()`.
- `Badges.tsx`: Grid-Ansicht, erhalten = highlight, gesperrt = ausgegraut & ???-Label.
- Route `/badges`, Nav-Link "Abzeichen" (Trophy-Icon).

---

### 8. Board-Templates (Strukturlegekarten)

> [!NOTE]
> Templates für alle Themen sind über das bestehende "Vorlage laden"-Dropdown in `Strukturlegekarten.tsx` erreichbar. Alle thematischen Template-Nodes für Unschärfe, De-Broglie, Fullerene etc. wurden in `legekartenData.ts` hinterlegt.

---

### 9. Messwert-Auswertung

**Anforderungen:**
- Eingabe realer Messdaten → automatische physikalische Auswertung.
- Unterstützte Experimente: Photoeffekt (h-Bestimmung), Doppelspalt (λ), Bragg-Reflexion (Röntgen-λ), De-Broglie (λ aus U_B).

**Implementiert:**
- `Auswertung.tsx` mit 4 Tab-basierten Auswertungstools:
  - **Photoeffekt:** Editierbare Datentabelle (λ, U_g), Canvas-Diagramm mit Trendlinie, lineare Regression → h-Wert + relative Abweichung + W_A.
  - **Doppelspalt:** Eingabe d/L/Δy → direktes λ (klassische Formel).
  - **Bragg:** Eingabe α/d/n → Röntgen-λ nach Bragg-Bedingung.
  - **De-Broglie:** U_B-Eingabe → Schritt-für-Schritt Berechnung (E_kin, p, λ) mit KaTeX.
- Route `/auswertung`, Nav-Link "Auswertung" (BarChart2-Icon).

---

### 10. Bonus-Module & Mediale Anreicherung

**Anforderungen:**
- 5 Zusatz-Level ("Über den Lehrplan hinaus"), verständlich für LK-Schüler.
- Übersichtliche Navigation im Dashboard (separater "Bonus-Level" Bereich).
- Kurzerklärung / Fazit-Boxen für den schnellen Überblick bei allen Themen.
- Reale Experiment-Bilder (Wikimedia Commons) für alle 20 Themen eingebettet.

**Implementiert:**
- `modules.ts`: 5x `isBonus: true` (Verschränkung, Bell, Quantenkrypto, Quantencomputer, Tunneleffekt) plus `shortExplanation` und `experimentImage` für alle 20 Module.
- `Dashboard.tsx`: Zweigeteilte Ansicht (15 Pflichtmodule + 5 markierte Bonusmodule).
- `LearningModule.tsx`: Neues Layout → Header, dann Sichten/TheoryBites, dann `shortExplanation` (als 💡 Fazit), dann das `experimentImage`.

---

## Technischer Status

| Feature | Status |
|---------|--------|
| React 18 + Vite + TypeScript | ✅ stabil |
| Build fehlerfrei | ✅ |
| localStorage-Persistenz | ✅ |
| KaTeX Formelrendering | ✅ |
| GitHub Repo `mrb125/q-lk-nrw` | ✅ aktuell |
| Navigation (7 Tabs) | ✅ |

**Routen-Übersicht:**
- `/` Dashboard
- `/module/:id` Lernmodul
- `/strukturlegekarten` Legekarten-Canvas
- `/explore` Entdecken (externe Links)
- `/flashcards` Trainer (AFB-Filter)
- `/formulas` Formelsammlung
- `/abitur` Abitur-Simulation
- `/badges` Abzeichen
- `/auswertung` Messwert-Auswertung
