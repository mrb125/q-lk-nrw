# Anforderungsdokumentation & Feature-Übersicht (Changelog)

Dieses Dokument fasst die heutigen Iterationen und neu implementierten Features des "Quantenphysik LK Dashboards" zusammen. Ziel der Entwicklung war die Ausweitung der Lernplanke um Simulationen, spielerische Lernkontrollen und strukturierte Übersichten.

## 🌟 1. Die große Feature-Erweiterung (Heutiges Update)

### 1.1 Photoeffekt-Simulator (Phase 1)
Ein interaktives Experiment für die Lerneinheit zum Lichtelektrischen Effekt.
* **Requirements erfüllt:** 
  * Der Nutzer muss Wellenlänge (UV bis Infrarot) und Intensität stufenlos regeln können.
  * Das Material der Kathode (Zink, Kalium, Cäsium) muss mit realistischen Werten für die Austrittsarbeit ($W_A$) wählbar sein.
  * Live-Kalkulation der Photonenenergie und der resultierenden kinetischen Energie der Elektronen.
  * **Physikalische Korrektheit:** Die aus den Photonen entstehenden Elektronen werden auf Seiten der Anode (Auffänger) korrekt absorbiert (fliegen nicht aus dem Bild heraus). Ist die Wellenlänge zu groß ($E_{ph} < W_A$), findet keine Emission statt.

### 1.2 "Trainer" / Flashcard-System (Phase 2)
Eine gamifizierte Lernkontrolle zur Abfrage des Wissens.
* **Requirements erfüllt:**
  * Das System speist sich autonom aus den Inhalten in `modules.ts` (Theorie-Häppchen und Abituraufgaben).
  * Anzeige einer interaktiven Karteikarte (Vorder- und Rückseite).
  * Markierung gewusster und nicht-gewusster Karten zur dauerhaften Speicherung des Fortschritts pro Session (mittels `localStorage`).
  * Eine Reset-Funktion, um den Trainer zurückzusetzen.

### 1.3 Strukturlegekarten QoL-Updates (Phase 3)
Verbesserung des virtuellen Zettelkastens zum Verständnis der Fachbegriffe-Relation.
* **Requirements erfüllt:**
  * **Bereitstellen eines PNG-Exports:** Die Nutzer können fertige Struktur-Netzwerke direkt als Bilddatei herunterladen. Das Bild inkludiert einen Header-Titel, schließt aber störende UI-Elemente aus.
  * **Multiple Workspaces (Boards):** Die Nutzer haben nicht nur eine einzige Arbeitsfläche, sondern können beliebig viele "Boards" anlegen, zwischen ihnen navigieren und alte Boards löschen. Boards werden komplett im `localStorage` abgebildet.

### 1.4 Formelsammlung ("Spickzettel") & Neue Lerneinheiten (Phase 4)
Strukturierung von Wissen für die Klausurvorbereitung.
* **Requirements erfüllt:**
  * **Vollständige Content-Erfassung:** Die Quantenphysik-Lektionen wurden komplettiert, inkl. Unschärferelation, Fullerene, Schrödingers Katze, etc.
  * **Formelsammlung:** Eine neue abrufbare Seite inkludiert die wichtigsten NRW-Abiturformeln (Photonenenergie, Materiewellen, Bragg-Reflexion) sowie alle Naturkonstanten.
  * **KaTeX Implementierung:** Die Formelsammlung und alle Variablen werden durch KaTeX mathematisch perfekt repräsentiert (`react-katex`).
  * **Ressourcen im Entdecken-Tab:** Der Discovery-Tab wurde überarbeitet und verweist nun auf weiterführende externe Links (Leifiphysik, PhET) und intern auf die Formelsammlung.

## 🛠️ 2. Technischer Status

* Das App-Routing von `react-router-dom` funktioniert stabil (keine TS-Errors).
* Das Frontend basiert durchgehend auf Vite, React18, und purem CSS mit Lucide-Icons.
* Die Simulation verbraucht dank Vanilla JavaScript Particle-Engine via SVG und konsequentem cleanup von RequestAnimationFrame wenig Ressourcen.
* Alle lokalen States sind im `window.localStorage` gesichert, wodurch Session-Abbrüche nicht zu Datenverlust führen.
* Der Code ist auf GitHub dem Repository hinzugefügt worden.

**Mission Complete!** Das Quantenphysik Dashboard ist fit für die Abiturienten. 🎓
