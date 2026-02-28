export type TheoryBiteData = {
    title: string;
    classicalText: string;
    quantumText: string;
};

export type AbiturTaskData = {
    afb: 'I' | 'II' | 'III';
    operator: string;
    question: string;
    answer: string;
};

export type ResourceData = {
    title: string;
    description: string;
    url: string;
    type: 'video' | 'article' | 'leifi';
    duration?: string;
};

export type ModuleData = {
    id: string;
    topicNumber: string;
    title: string;
    description: string;
    progress: number;
    iconName: string;
    theoryBites?: TheoryBiteData[];
    abiturTasks?: AbiturTaskData[];
    resources?: ResourceData[];
    hasSimulation?: boolean;
};

export const modules: ModuleData[] = [
    // ─── 01 ────────────────────────────────────────────────────────────────────
    {
        id: "doppelspalt",
        topicNumber: "01",
        title: "Doppelspalt mit Einzelphotonen",
        description: "Interferenzmuster beim schrittweisen Aufbau.",
        progress: 0,
        iconName: "Waves",
        hasSimulation: true,
        theoryBites: [
            {
                title: "Das Muster auf dem Schirm",
                classicalText: "Licht ist eine klassische Welle. Es entsteht sofort ein kontinuierliches Interferenzmuster durch Überlagerung der Wellen von beiden Spalten.",
                quantumText: "Jeder Photonentreffer ist ein einzelner, zufälliger Punkt. Das Interferenzmuster baut sich erst nach sehr vielen Photonen statistisch auf (stochastischer Aufbau).",
            },
            {
                title: "Die Bahn des Photons",
                classicalText: "Ein klassisches Teilchen muss sich am Spalt entscheiden – entweder links oder rechts. Es entstünden nur zwei Streifen.",
                quantumText: "Das Photon hat keine klassische Bahn. Es wird als Wahrscheinlichkeitswelle beschrieben, die durch BEIDE Spalte gleichzeitig geht und mit sich selbst interferiert.",
            },
            {
                title: "Welcher-Weg-Information",
                classicalText: "Man kann messen, welchen Weg das Teilchen genommen hat, ohne das Schirmbild zu beeinflussen.",
                quantumText: "Sobald man misst, durch welchen Spalt das Photon ging, verschwindet das Interferenzmuster sofort. Weg-Information und Interferenz schließen sich aus (Komplementarität).",
            },
        ],
        abiturTasks: [
            {
                afb: 'I',
                operator: "Beschreiben",
                question: "Beschreibe das Muster, das bei sehr kurzer und bei sehr langer Belichtungszeit auf dem Detektor zu sehen ist.",
                answer: "Kurze Zeit: einzelne, zufällig verteilte Punkte (Teilchencharakter).\nLange Zeit: klassisches Interferenzmuster mit Maxima und Minima (stochastischer Aufbau).",
            },
            {
                afb: 'II',
                operator: "Erläutern",
                question: "Erläutere die Wahrscheinlichkeitsinterpretation nach Born anhand dieses Experiments.",
                answer: "|Ψ|² an einem bestimmten Ort ist proportional zur Wahrscheinlichkeit, das Photon dort zu detektieren. Die Welle beschreibt die Aufenthaltswahrscheinlichkeit des Teilchens.",
            },
            {
                afb: 'III',
                operator: "Beurteilen",
                question: "Ein Schüler sagt: 'Das Photon teilt sich am Doppelspalt.' Beurteile diese Aussage.",
                answer: "Falsch. Ein Photon ist unteilbar – am Schirm wird immer ein ganzes Energiequant registriert. Das Wellenmodell gilt für die Ausbreitung (Wahrscheinlichkeit), das Teilchenmodell für die Detektion.",
            },
        ],
        resources: [
            { title: "LEIFIphysik: Doppelspalt & Einzelphotonen", description: "Interaktive Applets und Erklärungen.", url: "https://www.leifiphysik.de/quantenphysik/quantenobjekt-photon/versuche/doppelspalt-experiment-mit-einzelphotonen", type: 'leifi' },
            { title: "Studyflix: Doppelspaltexperiment", description: "Kompakte Abi-Zusammenfassung.", url: "https://studyflix.de/ingenieurwissenschaften/doppelspalt-experiment-2633", type: 'video', duration: "4:32" },
        ],
    },
    // ─── 02 ────────────────────────────────────────────────────────────────────
    {
        id: "polarisation",
        topicNumber: "02",
        title: "Polarisation",
        description: "Transversalwelleneigenschaft des Lichts und Photonen.",
        progress: 0,
        iconName: "Minus",
        theoryBites: [
            {
                title: "Was ist Polarisation?",
                classicalText: "Klassisches Licht ist eine Transversalwelle. Ein Polarisationsfilter lässt nur Schwingungen einer bestimmten Richtung durch. Hintereinandergeschaltete, gekreuzte Filter löschen das Licht vollständig aus.",
                quantumText: "Ein einzelnes Photon hat einen Polarisationszustand. Trifft es auf einen Filter, wird es entweder mit Wahrscheinlichkeit cos²(θ) durchgelassen oder absorbiert. Das einzelne Photon entscheidet sich beim Durchtritt.",
            },
            {
                title: "Polarisationswinkel und Intensität",
                classicalText: "Das Gesetz von Malus: I = I₀ · cos²(θ). Klassisch erklärt: Der Filter projiziert die Wellenamplitude auf seine Vorzugsrichtung.",
                quantumText: "Quantenmechanisch: P(Transmittiert) = cos²(θ) ist die Wahrscheinlichkeit, dass ein einzelnes Photon den Filter passiert. Ein einzelnes Photon kann nicht 'halb' durchgehen – es ist ein Alles-oder-Nichts-Ereignis.",
            },
        ],
        abiturTasks: [
            {
                afb: 'I',
                operator: "Beschreiben",
                question: "Beschreibe den Effekt von zwei hintereinandergeschalteten Polarisationsfiltern, wenn ihr Winkel von 0° auf 90° erhöht wird.",
                answer: "Bei 0° (parallele Filter): maximale Intensität, das Licht wird kaum geschwächt.\nBei 90° (gekreuzte Filter): Intensität = 0, kein Licht wird transmittiert.",
            },
            {
                afb: 'II',
                operator: "Erläutern",
                question: "Erläutere mithilfe des Malus'schen Gesetzes, warum bei θ = 45° genau 50 % der Lichtintensität transmittiert werden.",
                answer: "I = I₀ · cos²(45°) = I₀ · (√2/2)² = I₀ · 0,5 = 50 %.\nQuantenmechanisch: Jedes Photon hat eine 50%-Chance, den Filter zu passieren.",
            },
            {
                afb: 'III',
                operator: "Beurteilen",
                question: "Zwei gekreuzte Filter lassen kein Licht durch. Ein dritter Filter (45°) wird dazwischengestellt – danach ist wieder Licht zu sehen. Erkläre dieses paradox erscheinende Ergebnis.",
                answer: "Der mittlere Filter 'projiziert' den Polarisationszustand neu auf 45°. Danach hat das Licht eine Polarisationskomponente in Richtung des dritten Filters (90°).\nP₁: cos²(45°) = 50 % durch. P₂: cos²(45°) = 50 % davon. Gesamt: 25 % Restintensität.",
            },
        ],
        resources: [
            { title: "LEIFIphysik: Polarisation", description: "Erläuterungen zum Malus'schen Gesetz.", url: "https://www.leifiphysik.de/optik/polarisation", type: 'leifi' },
        ],
    },
    // ─── 04 ────────────────────────────────────────────────────────────────────
    {
        id: "wegentscheidung",
        topicNumber: "04",
        title: "Wegentscheidung & Komplementarität",
        description: "Interferenz vs. Welcher-Weg-Information.",
        progress: 0,
        iconName: "GitFork",
        theoryBites: [
            {
                title: "Komplementarität",
                classicalText: "Klassisch kann man gleichzeitig wissen, welchen Weg ein Teilchen nimmt UND wie es sich an einem Schirm verteilt. Beides schließt sich nicht aus.",
                quantumText: "Quantenmechanisch schließen sich Welcher-Weg-Information und Interferenz gegenseitig aus (Komplementarität, Bohr). Gewinnt man Weg-Information, verschwindet das Muster – egal wie.",
            },
            {
                title: "Quantenradierer",
                classicalText: "Einmal verlorene Information ist unwiderruflich verschwunden – so die klassische Sicht.",
                quantumText: "Im Quantenradierer-Experiment kann verfügbare Welcher-Weg-Information nachträglich 'gelöscht' werden. Das Interferenzmuster taucht dann im Koinzidenz-Histogram wieder auf – obwohl die Photonen längst registriert sind.",
            },
        ],
        abiturTasks: [
            {
                afb: 'I',
                operator: "Nennen",
                question: "Nenne das Prinzip, das beschreibt, dass Interferenz und Welcher-Weg-Wissen sich gegenseitig ausschließen.",
                answer: "Das Komplementaritätsprinzip (nach Niels Bohr).",
            },
            {
                afb: 'II',
                operator: "Erläutern",
                question: "Ein Polarisationsfilter wird direkt hinter einem Spalt angebracht, um den Weg des Photons zu markieren. Erläutere, was mit dem Interferenzmuster passiert.",
                answer: "Das Interferenzmuster verschwindet, weil nun prinzipiell erkennbar ist, durch welchen Spalt das Photon gegangen ist (Welcher-Weg-Information). Die Überlagerung der Wahrscheinlichkeitswellen findet nicht mehr konstruktiv statt.",
            },
            {
                afb: 'III',
                operator: "Beurteilen",
                question: "Beurteile: Könnte man durch extrem schnelles Messen 'Welcher-Weg' und 'Interferenz' gleichzeitig beobachten?",
                answer: "Nein. Die Komplementarität ist eine fundamentale Eigenschaft der Quantenmechanik, keine technische Einschränkung. Sie ist mathematisch in der Unschärferelation verankert. Eine simultane vollständige Kenntnis beider Größen ist prinzipiell unmöglich.",
            },
        ],
        resources: [
            { title: "LEIFIphysik: Komplementarität", description: "Grundlage des Welle-Teilchen-Dualismus.", url: "https://www.leifiphysik.de/quantenphysik/quantenobjekt-photon", type: 'leifi' },
        ],
    },
    // ─── 05 ────────────────────────────────────────────────────────────────────
    {
        id: "machzehnder",
        topicNumber: "05",
        title: "Mach-Zehnder-Interferometer",
        description: "Einzelphotonen im Interferometer – Superposition und Messung.",
        progress: 0,
        iconName: "Share2",
        theoryBites: [
            {
                title: "Aufbau des Interferometers",
                classicalText: "Ein halbdurchlässiger Spiegel teilt einen Lichtstrahl in zwei Wege auf. Am Ende werden sie wieder zusammengeführt. Je nach Weglängenunterschied entsteht konstruktive oder destruktive Interferenz.",
                quantumText: "Ein einzelnes Photon nimmt nicht einen von zwei Wegen – es ist in einer Superposition beider Wege. Am zweiten Strahlteiler 'interferiert es mit sich selbst'. Erst die Messung kollabiert die Superposition.",
            },
            {
                title: "Detektion eines Weges",
                classicalText: "Setzt man einen Detektor in einen Arm, misst man den Strahl in diesem Arm. Der andere Strahl ist unberührt.",
                quantumText: "Setzt man einen Detektor in einen Arm, weiß man, welchen Weg das Photon genommen hat. Dadurch zerstört man die Superposition – das Interferenzmuster bei D1/D2 verschwindet und das Photon landet zu 50/50 bei beiden Detektoren.",
            },
        ],
        abiturTasks: [
            {
                afb: 'I',
                operator: "Beschreiben",
                question: "Beschreibe, was am Mach-Zehnder-Interferometer beobachtet wird, wenn kein Detektor in einem Arm vorhanden ist.",
                answer: "Das Photon landet mit 100%-Wahrscheinlichkeit immer am selben Ausgangs-Detektor (konstruktive Interferenz dort, destruktive am anderen). Das Interferenzmuster ist vollständig.",
            },
            {
                afb: 'II',
                operator: "Erläutern",
                question: "Erläutere, warum das Einsetzen eines Blockiers in einen Arm dazu führt, dass das Photon mit 50% Wahrscheinlichkeit am anderen Detektor ankommt.",
                answer: "Der Blockierer liefert Welcher-Weg-Information: Kommt das Photon an, war es im offenen Arm. Damit ist die Superposition aufgehoben, die Interferenz entfällt und beide Ausgangsdetektoren werden gleich wahrscheinlich.",
            },
            {
                afb: 'III',
                operator: "Analysieren",
                question: "Analysiere, was das Mach-Zehnder-Experiment über die Realität des Photon-Weges zwischen zwei Messungen aussagt.",
                answer: "Das Experiment zeigt, dass der Weg des Photons zwischen zwei Messungen kein definierter klassischer Pfad ist. Das Photon existiert in einer Superposition beider Wege. Erst die Messung (Wechselwirkung) erzeugt eine 'Realität'. Zwischen den Messungen sind keine klassischen Eigenschaften zuschreibbar.",
            },
        ],
        resources: [
            { title: "Welt der Physik: Mach-Zehnder", description: "Verständliche Erklärung des Interferometers.", url: "https://www.weltderphysik.de/gebiet/quanten/", type: 'article' },
        ],
    },
    // ─── 06 ────────────────────────────────────────────────────────────────────
    {
        id: "delayedchoice",
        topicNumber: "06",
        title: "Delayed-Choice-Experiment",
        description: "Entscheidet die Messung nachträglich über den Wellencharakter?",
        progress: 0,
        iconName: "Clock",
        theoryBites: [
            {
                title: "Das Experiment (Wheeler)",
                classicalText: "Klassisch: Ein Teilchen legt seinen Weg fest, sobald es das Experiment betritt. Spätere Einstellungen ändern daran nichts mehr.",
                quantumText: "Wheeler schlug vor, die Messmethode (Interferenz oder Welcher-Weg) erst NACH dem Durchgang des Photons durch den Strahlteiler zu entscheiden. Das Ergebnis hängt dennoch von der Messmethode ab – als würde das Photon 'wissen', was danach gemessen wird.",
            },
            {
                title: "Interpretation",
                classicalText: "Klassisch erscheint es, als ob die spätere Entscheidung rückwirkend die Vergangenheit ändert.",
                quantumText: "Die QM-Interpretation: Das Photon hat bis zur Messung keinen definierten 'Weg'. Es macht keinen Sinn zu fragen, 'was das Photon in der Vergangenheit getan hat'. Die Messung konstituiert erst die Realität.",
            },
        ],
        abiturTasks: [
            {
                afb: 'I',
                operator: "Beschreiben",
                question: "Beschreibe die Grundidee des Delayed-Choice-Experiments nach Wheeler.",
                answer: "Die Entscheidung, ob Interferenz oder Welcher-Weg gemessen wird, wird erst getroffen, nachdem das Photon den ersten Strahlteiler passiert hat. Dennoch stimmt das Ergebnis mit der gewählten Messmethode überein.",
            },
            {
                afb: 'II',
                operator: "Erläutern",
                question: "Erläutere, warum das Delayed-Choice-Experiment zeigt, dass man dem Photon keine klassischen Eigenschaften 'unterwegs' zuschreiben kann.",
                answer: "Wäre der Weg des Photons von Anfang an festgelegt, müsste das Ergebnis unabhängig von der späteren Messentscheidung sein. Das ist aber nicht der Fall. Das Photon befindet sich in einer unbestimmten Superposition, bis die Messung stattfindet.",
            },
            {
                afb: 'III',
                operator: "Beurteilen",
                question: "Wird durch das Delayed-Choice-Experiment Kausalität verletzt? Beurteile diese Aussage.",
                answer: "Nein. Kausalität ist nicht verletzt. Es können keine Signale oder Information in die Vergangenheit übertragen werden. Die scheinbare Rückwirkung ist eine Konsequenz der Tatsache, dass dem Photon vor der Messung kein definierter Zustand zukommt. Die Quantenmechanik ist mit dem Relativitätsprinzip vereinbar.",
            },
        ],
        resources: [
            { title: "Welt der Physik: Delayed Choice", description: "Artikel zur Messung in der Quantenwelt.", url: "https://www.weltderphysik.de/gebiet/quanten/", type: 'article' },
        ],
    },
    // ─── 08 ────────────────────────────────────────────────────────────────────
    {
        id: "elektronenbeugung",
        topicNumber: "08",
        title: "Elektronenbeugung",
        description: "Welleneigenschaften von Elektronen am Kristallgitter.",
        progress: 0,
        iconName: "Zap",
        hasSimulation: true,
        theoryBites: [
            {
                title: "Bragg-Reflexion am Kristall",
                classicalText: "Klassisch: Röntgenstrahlen (elektromagnetische Wellen) werden an den Netzebenen eines Kristalls reflektiert und interferieren konstruktiv, wenn die Bragg-Bedingung gilt: nλ = 2d·sin(α).",
                quantumText: "Elektronen zeigen dasselbe Beugungsmuster wie Röntgenstrahlen, obwohl sie Materie sind. Davisson & Germer (1927) bestätigten dies experimentell. Elektronen besitzen eine Materiewelle mit λ = h/p (De-Broglie).",
            },
            {
                title: "Das Davisson-Germer-Experiment",
                classicalText: "Klassisch: Elektronen sind klassische Teilchen und sollten am Kristall gestreut werden – kein Interferenzmuster, nur diffuse Reflexion.",
                quantumText: "Tatsächlich beobachtet man scharfe Maxima bei bestimmten Winkeln (Bragg-Reflexion), das eindeutige Zeichen von Wellennatur. Der Abstand der Maxima stimmt mit λ = h/p überein.",
            },
        ],
        abiturTasks: [
            {
                afb: 'I',
                operator: "Beschreiben",
                question: "Beschreibe das Ergebnis des Davisson-Germer-Experiments und nennen, was es beweist.",
                answer: "Elektronen werden an Nickelkristallen reflektiert und zeigen Intensitätsmaxima bei 50° (bei 54 V). Dies beweist den Wellencharakter von Elektronen (Materiewellen).",
            },
            {
                afb: 'II',
                operator: "Berechnen",
                question: "Ein Elektron wird durch U_B = 54 V beschleunigt. Berechne seine De-Broglie-Wellenlänge.",
                answer: "E_kin = e · U_B = 1,6·10⁻¹⁹ · 54 = 8,64·10⁻¹⁸ J\np = √(2mE) = √(2 · 9,11·10⁻³¹ · 8,64·10⁻¹⁸) = 3,96·10⁻²⁴ kg·m/s\nλ = h/p = 6,63·10⁻³⁴ / 3,96·10⁻²⁴ ≈ 0,167 nm",
            },
            {
                afb: 'III',
                operator: "Beurteilen",
                question: "Beurteile: Könnte man Elektronen in einem Doppelspalt-Experiment auch einzeln schicken, um ein Interferenzmuster aufzubauen?",
                answer: "Ja. Tatsächlich wurde dies experimentell gezeigt (Jönsson, Tonomura). Auch einzelne Elektronen erzeugen statistisch ein Interferenzmuster – analog zu Photonen. Jedes Elektron interferiert mit sich selbst als Materiewelle.",
            },
        ],
        resources: [
            { title: "LEIFIphysik: Elektronenbeugung", description: "Davisson-Germer-Experiment erklärt.", url: "https://www.leifiphysik.de/quantenphysik/materiewellen/versuche/davisson-germer-experiment", type: 'leifi' },
        ],
    },
    // ─── 07 ────────────────────────────────────────────────────────────────────
    {
        id: "debroglie",
        topicNumber: "07",
        title: "De-Broglie-Wellenlänge",
        description: "Materiewellen: Jedem Teilchen eine Wellenlänge λ = h/p.",
        progress: 0,
        iconName: "Activity",
        theoryBites: [
            {
                title: "Die Hypothese De Broglies (1924)",
                classicalText: "Klassisch: Nur Licht (elektromagnetische Strahlung) besitzt Welleneigenschaften. Materie (Elektronen, Protonen) sind klassische Teilchen ohne Wellennatur.",
                quantumText: "De Broglie postulierte: JEDES Teilchen mit Impuls p besitzt eine Materiewelle mit λ = h/p. Je größer der Impuls, desto kürzer die Wellenlänge – und desto schwieriger zu messen.",
            },
            {
                title: "Warum zeigen große Objekte keine Wellennatur?",
                classicalText: "Klassisch: Makroskopische Objekte haben zu großen Impuls, daher zu kleine de-Broglie-Wellenlänge (z. B. ein Ball bei 1 m/s: λ ≈ 10⁻³⁴ m – weit unterhalb jeder messbaren Skala).",
                quantumText: "Selbst Fullerenenmoleküle (C₆₀, 60 Kohlenstoffatome) wurden erfolgreich am Doppelspalt gebeugt! Die Grenze zwischen Quanten- und klassischer Welt liegt nicht bei 'groß' vs. 'klein', sondern bei der Dekohärenz.",
            },
        ],
        abiturTasks: [
            {
                afb: 'I',
                operator: "Nennen",
                question: "Nenne die Formel für die De-Broglie-Wellenlänge und erkläre die verwendeten Größen.",
                answer: "λ = h/p, wobei h = 6,626·10⁻³⁴ Js (Plancksches Wirkungsquantum) und p = m·v (Impuls des Teilchens).",
            },
            {
                afb: 'II',
                operator: "Berechnen",
                question: "Berechne die De-Broglie-Wellenlänge eines Elektrons, das mit U_B = 1000 V beschleunigt wurde.",
                answer: "E_kin = e·U_B = 1,6·10⁻¹⁹ · 1000 = 1,6·10⁻¹⁶ J\np = √(2·9,11·10⁻³¹ · 1,6·10⁻¹⁶) = 1,71·10⁻²³ kg·m/s\nλ = h/p = 6,63·10⁻³⁴ / 1,71·10⁻²³ ≈ 3,87·10⁻¹¹ m = 38,7 pm",
            },
            {
                afb: 'III',
                operator: "Beurteilen",
                question: "Beurteile, warum die Wellennatur eines geworfenen Balls (m = 0,1 kg, v = 10 m/s) praktisch nicht beobachtbar ist.",
                answer: "λ = h/(m·v) = 6,63·10⁻³⁴ / (0,1 · 10) = 6,63·10⁻³³ m.\nDieser Wert ist um viele Größenordnungen kleiner als der Atomdurchmesser (~10⁻¹⁰ m). Kein physikalisches Experiment könnte solche Wellenlängen messen. Daher erscheint der Ball rein klassisch.",
            },
        ],
        resources: [
            { title: "LEIFIphysik: De-Broglie-Wellenlänge", description: "Materiewellen und ihre Berechnung.", url: "https://www.leifiphysik.de/quantenphysik/materiewellen", type: 'leifi' },
        ],
    },
    // ─── 09 ────────────────────────────────────────────────────────────────────
    {
        id: "unschaerfe",
        topicNumber: "09",
        title: "Heisenbergsche Unschärferelation",
        description: "Ort und Impuls sind prinzipiell unscharf zugleich.",
        progress: 0,
        iconName: "AlertTriangle",
        theoryBites: [
            {
                title: "Die Unschärferelation",
                classicalText: "Klassisch: Ort und Impuls eines Teilchens können gleichzeitig beliebig genau gemessen werden. Ungenauigkeiten sind nur technische Probleme.",
                quantumText: "Heisenberg (1927): Δx · Δp ≥ ħ/2. Die Ungenauigkeiten in Ort (Δx) und Impuls (Δp) sind nicht unabhängig. Je genauer der Ort, desto ungenauer der Impuls – prinzipiell, nicht technisch.",
            },
            {
                title: "Energie-Zeit-Unschärfe",
                classicalText: "Klassisch: Energiezustände haben exakt definierte Energiewerte. Spektrallinien wären unendlich scharf.",
                quantumText: "Analog gilt: ΔE · Δt ≥ ħ/2. Kurzlebige angeregte Zustände (kleines Δt) haben eine breite Energieunschärfe (Lorentz-Linienbreite). Das erklärt die natürliche Linienbreite von Spektrallinien.",
            },
        ],
        abiturTasks: [
            {
                afb: 'I',
                operator: "Nennen",
                question: "Formuliere die Heisenbergsche Unschärferelation für Ort und Impuls und erläutere die verwendeten Symbole.",
                answer: "Δx · Δp ≥ ħ/2, wobei ħ = h/(2π) das reduzierte Plancksche Wirkungsquantum ist. Δx ist die Ortsunschärfe, Δp die Impulsunschärfe.",
            },
            {
                afb: 'II',
                operator: "Berechnen",
                question: "Ein Elektron ist auf Δx = 0,1 nm lokalisiert. Berechne die minimale Impulsunschärfe Δp.",
                answer: "Δp ≥ ħ/2Δx = (1,055·10⁻³⁴)/(2 · 0,1·10⁻⁹) ≈ 5,3·10⁻²⁵ kg·m/s",
            },
            {
                afb: 'III',
                operator: "Beurteilen",
                question: "Ein Schüler sagt: 'Die Unschärfe entsteht nur weil wir beim Messen das Elektron stören.' Beurteile diese Aussage.",
                answer: "Die Störungsinterpretation ist zu kurz greifend. Die Unschärferelation ist eine fundamentale Eigenschaft quantenmechanischer Objekte, keine Messkritik. Auch ohne Messung hat ein Quantenobjekt keine simultanen Eigenwerte für Ort und Impuls. Es ist eine ontologische Aussage, keine epistemische.",
            },
        ],
        resources: [
            { title: "LEIFIphysik: Unschärferelation", description: "Grundlagen mit Beispielen.", url: "https://www.leifiphysik.de/quantenphysik/unschaerferelation", type: 'leifi' },
        ],
    },
    // ─── 11 ────────────────────────────────────────────────────────────────────
    {
        id: "schroedinger",
        topicNumber: "11",
        title: "Schrödingers Katze",
        description: "Superposition und Messproblem auf makroskopischer Ebene.",
        progress: 0,
        iconName: "Cat",
        theoryBites: [
            {
                title: "Das Gedankenexperiment",
                classicalText: "Klassisch: Eine Katze ist entweder lebendig oder tot. Ihr Zustand ist unabhängig davon, ob man in die Kiste schaut.",
                quantumText: "Schrödinger (1935) koppelte das Leben einer Katze an den Zerfall eines radioaktiven Atoms: Vor der Messung wäre die Katze (quantenmechanisch) in einer Superposition aus lebendig und tot. Das Öffnen der Kiste = Messung = Kollaps.",
            },
            {
                title: "Was lehrte uns das Experiment?",
                classicalText: "Superposition ist nur ein Rechentrick der Quantenmechanik, keine physikalische Realität.",
                quantumText: "Das Experiment zeigt das Messproblem der QM: Wann genau findet der Kollaps statt? In der modernen QM erklärt Dekohärenz, warum makroskopische Objekte klassisch erscheinen – Superposition wird durch Umweltkopplung extrem schnell zerstört.",
            },
        ],
        abiturTasks: [
            {
                afb: 'I',
                operator: "Beschreiben",
                question: "Beschreibe das Gedankenexperiment von Schrödinger und den Zweck, für den es ursprünglich gedacht war.",
                answer: "Eine Katze ist in einer Kiste mit einem radioaktiven Atom und Gift. Zerfällt das Atom (QM-Zufall), stirbt die Katze. Schrödinger wollte zeigen, dass die konsequente Anwendung der QM-Superposition auf Makroobjekte zu absurden Aussagen führt (Katze = lebendig + tot).",
            },
            {
                afb: 'II',
                operator: "Erläutern",
                question: "Erläutere den Begriff 'Dekohärenz' und warum er die Schrödingers-Katze-Paradoxie auflöst.",
                answer: "Dekohärenz: In der realen Welt koppeln makroskopische Objekte ständig mit ihrer Umgebung (viele Luftmoleküle, Photonen). Dadurch werden Superpositionszustände extrem schnell (~10⁻²³ s) in klassische Mischzustände überführt. Die Katze dekohäriert sofort – lange bevor man schaut.",
            },
            {
                afb: 'III',
                operator: "Beurteilen",
                question: "Beurteile, ob das Gedankenexperiment zeigt, dass Quantenmechanik für Makroobjekte falsch ist.",
                answer: "Nein. Die QM gilt prinzipiell auch für Makroobjekte. Dekohärenz erklärt jedoch, warum Superpositionszustände für große Systeme praktisch nie beobachtet werden. Die QM ist auch makroskopisch korrekt, aber die Effekte sind auf diese Skala nicht mehr direkt messbar.",
            },
        ],
        resources: [
            { title: "Welt der Physik: Dekohärenz", description: "Erklärung des Messproblem und Übergang zur klassischen Welt.", url: "https://www.weltderphysik.de/gebiet/quanten/", type: 'article' },
        ],
    },
    // ─── 10 ────────────────────────────────────────────────────────────────────
    {
        id: "fullerene",
        topicNumber: "10",
        title: "Fullerene-Interferenz",
        description: "Interferenz von C₆₀-Molekülen – Welle-Teilchen-Dualismus bei 720 amu.",
        progress: 0,
        iconName: "Hexagon",
        theoryBites: [
            {
                title: "Das Zeilinger-Experiment (1999)",
                classicalText: "Klassisch: Makromoleküle wie C₆₀ (60 Kohlenstoffatome, 720 u) sind 'zu groß' für Quanteneffekte. Man erwartete kein Interferenzmuster.",
                quantumText: "Zeilinger und sein Team (Wien) zeigten, dass C₆₀-Moleküle am Gitter interferieren und ein Beugungsmuster erzeugen. λ_dB = h/p ≈ 2,5 pm. Das war der damalige Rekord für Materiewellen.",
            },
            {
                title: "Grenzen des Welle-Teilchen-Dualismus",
                classicalText: "Klassisch: Ab einer bestimmten Größe werden Objekte rein klassisch.",
                quantumText: "Dekohärenz setzt Grenzen: Mit zunehmender Komplexität (mehr Wechselwirkungen mit der Umgebung) wird die Superposition schneller zerstört. Neuere Experimente zeigten Interferenz für noch größere Moleküle (bis über 25.000 u).",
            },
        ],
        abiturTasks: [
            {
                afb: 'I',
                operator: "Beschreiben",
                question: "Beschreibe das Ergebnis des Fullerene-Interferenz-Experiments und welche Schlussfolgerung daraus gezogen wurde.",
                answer: "C₆₀-Moleküle erzeugen hinter einem Gitter ein Beugungsmuster mit Maxima und Minima. Das zeigt, dass auch Makromoleküle Welleneigenschaften besitzen (De-Broglie-Materiewelle).",
            },
            {
                afb: 'II',
                operator: "Berechnen",
                question: "Ein C₆₀-Molekül (m = 1,2·10⁻²⁴ kg) bewegt sich mit v = 200 m/s. Berechne seine De-Broglie-Wellenlänge.",
                answer: "p = m·v = 1,2·10⁻²⁴ · 200 = 2,4·10⁻²² kg·m/s\nλ = h/p = 6,63·10⁻³⁴ / 2,4·10⁻²² ≈ 2,76·10⁻¹² m = 2,76 pm",
            },
            {
                afb: 'III',
                operator: "Beurteilen",
                question: "Beurteile, ob dieses Experiment die Grenze zwischen Quanten- und klassischer Mechanik zeigt.",
                answer: "Es zeigt, dass diese Grenze fließend ist und von der Dekohärenz abhängt, nicht von einer festen Größenskala. Das Experiment verschiebt die 'Grenze' stetig zu komplexeren Systemen. Eine scharfe Trennlinie gibt es nicht – außer durch Dekohärenz.",
            },
        ],
        resources: [
            { title: "Max-Planck-Gesellschaft: Materiewellen", description: "Hintergrund zu Materiewellen großer Moleküle.", url: "https://www.mpg.de/physik", type: 'article' },
        ],
    },
    // ─── 12 ────────────────────────────────────────────────────────────────────
    {
        id: "hallwachs",
        topicNumber: "12",
        title: "Hallwachs-Versuch",
        description: "Entladung eines Zinkblechs durch UV-Licht – erster Hinweis auf den Photoeffekt.",
        progress: 0,
        iconName: "Zap",
        theoryBites: [
            {
                title: "Der Hallwachs-Versuch (1888)",
                classicalText: "Klassisch: Licht ist eine Welle. Genug Energie angesammelt und ein Elektron müsste herausgelöst werden – auch bei schwachem Licht, nur langsamer.",
                quantumText: "Hallwachs beobachtete: UV-Licht entlädt positiv aufgeladene Zinkbleche nicht – aber negativ aufgeladene sofort. Sichtbares Licht hat diesen Effekt gar nicht. Dies deutet auf eine Mindestfrequenz hin.",
            },
            {
                title: "Deutung durch Einstein (1905)",
                classicalText: "Wellen-Modell scheitert: Intensität des Lichts sollte entscheidend sein, nicht Farbe. Aber auch extrem helles rotes Licht löst keine Elektronen aus Zink.",
                quantumText: "Einstein: Licht kommt in Paketen (Photonen) der Energie E = h·f. Nur wenn h·f ≥ W_A (Austrittsarbeit), wird ein Elektron herausgelöst. Intensität bestimmt die Anzahl, Frequenz die Energie pro Photon.",
            },
        ],
        abiturTasks: [
            {
                afb: 'I',
                operator: "Beschreiben",
                question: "Beschreibe, was Hallwachs bei seinem Versuch beobachtet hat und welche Schlussfolgerung er zog.",
                answer: "UV-Licht entlädt ein negativ geladenes Zinkblech (Elektronen werden freigesetzt). Rotes oder sichtbares Licht hat diesen Effekt nicht. Schlussfolgerung: Die Frequenz des Lichts ist entscheidend, nicht die Intensität.",
            },
            {
                afb: 'II',
                operator: "Erläutern",
                question: "Erläutere, warum das Wellenbild des Lichts den Hallwachs-Versuch nicht erklären kann.",
                answer: "Im Wellenmodell hängt die auf ein Elektron übertragene Energie von der Intensität ab. Helles rotes Licht sollte nach langer Zeit dennoch Elektronen freisetzen. Das passiert aber nicht. Die Grenzfrequenz ν_G erklärt sich nur durch das Photonen-Modell: E = h·f.",
            },
            {
                afb: 'III',
                operator: "Beurteilen",
                question: "Beurteile, welche Bedeutung der Hallwachs-Versuch für die Entwicklung der Quantenphysik hatte.",
                answer: "Der Hallwachs-Versuch lieferte den ersten experimentellen Hinweis auf die Quantenstruktur des Lichts. Einsteins Deutung (1905, Nobelpreis 1921) zeigte erstmals, dass Licht aus Quanten (Photonen) besteht und ebnete den Weg für die gesamte Quantenmechanik.",
            },
        ],
        resources: [
            { title: "LEIFIphysik: Hallwachs-Versuch", description: "Historische und physikalische Einordnung.", url: "https://www.leifiphysik.de/quantenphysik/photoeffekt/versuche/hallwachs-versuch", type: 'leifi' },
        ],
    },
    // ─── 13 ────────────────────────────────────────────────────────────────────
    {
        id: "photoeffekt",
        topicNumber: "13",
        title: "Lichtelektrischer Effekt (Photoeffekt)",
        description: "Herauslösen von Elektronen durch Licht – Einstein und die Photonen.",
        progress: 0,
        iconName: "Sun",
        hasSimulation: true,
        theoryBites: [
            {
                title: "Das Gegenfeldmethode-Experiment",
                classicalText: "Klassisch: Elektronen können durch Licht ausgelöst werden. Mit mehr Lichtintensität sollten die Elektronen mehr Energie haben (schneller sein).",
                quantumText: "Messung mit Gegenfeld: E_kin = e·U_g. Ergebnis: U_g hängt nur von der Lichtfrequenz ab, NICHT von der Intensität. Mit steigender Intensität kommen mehr Elektronen, aber nicht schnellere.",
            },
            {
                title: "Einsteinsche Gleichung",
                classicalText: "Kein klassisches Modell konnte die lineare Abhängigkeit von U_g und Lichtfrequenz erklären.",
                quantumText: "E_kin = h·f - W_A. Die Steigung der U_g-f-Kurve liefert direkt h. Der y-Achsenabschnitt entspricht -W_A/e. Mit dieser Gleichung lässt sich h experimentell bestimmen.",
            },
        ],
        abiturTasks: [
            {
                afb: 'I',
                operator: "Nennen",
                question: "Nenne drei experimentelle Befunde des Photoeffekts, die das klassische Wellenmodell nicht erklären kann.",
                answer: "1. Unmittelbare Elektronenemission ohne Zeitverzögerung.\n2. Grenzfrequenz: Unterhalb von ν_G keine Emission, unabhängig von der Intensität.\n3. E_kin hängt von ν ab, nicht von der Intensität.",
            },
            {
                afb: 'II',
                operator: "Berechnen",
                question: "Licht der Wellenlänge λ = 300 nm trifft auf Zink (W_A = 4,3 eV). Berechne die kinetische Energie der ausgelösten Elektronen.",
                answer: "f = c/λ = 3·10⁸ / 300·10⁻⁹ = 1·10¹⁵ Hz\nE_Ph = h·f = 6,63·10⁻³⁴ · 1·10¹⁵ = 6,63·10⁻¹⁹ J = 4,14 eV\nE_kin = 4,14 eV - 4,3 eV = -0,16 eV → keine Emission möglich!",
            },
            {
                afb: 'III',
                operator: "Analysieren",
                question: "Analysiere, wie man aus dem Diagramm U_g gegen f das Plancksche Wirkungsquantum h und die Grenzfrequenz ν_G bestimmt.",
                answer: "Die Steigung der U_g-f-Gerade ist gleich h/e: Δu/Δf = h/e → h = e · Steigung.\nDie Grenzfrequenz ν_G ist der Schnittpunkt mit der f-Achse (U_g = 0): ν_G = W_A/h.\nDieser Zusammenhang wurde durch Millikan (1916) präzise bestätigt.",
            },
        ],
        resources: [
            { title: "LEIFIphysik: Photoeffekt", description: "Vollständige Erkläreung mit Gegenfeldmethode.", url: "https://www.leifiphysik.de/quantenphysik/photoeffekt", type: 'leifi' },
            { title: "PhET: Photoelectric Effect", description: "Interaktive Simulation des Photoeffekts.", url: "https://phet.colorado.edu/sims/html/photoelectric/latest/photoelectric_en.html", type: 'article' },
        ],
    },
    // ─── 14 ────────────────────────────────────────────────────────────────────
    {
        id: "impulsenergie",
        topicNumber: "14",
        title: "Impuls und Energie von Photonen",
        description: "Photonen transportieren Energie E = hf und Impuls p = h/λ.",
        progress: 0,
        iconName: "Zap",
        theoryBites: [
            {
                title: "Photonenenergie",
                classicalText: "Klassisch: Energie einer Welle hängt von der Amplitude (Intensität) ab, nicht von der Frequenz.",
                quantumText: "Ein Photon trägt die Energie E = h·f = h·c/λ. Ein Photon mit hoher Frequenz (UV, γ) hat viel Energie. Zwei Photonen mit niedriger Frequenz haben zusammen gleich viel – aber einzeln zu wenig, um ein Elektron auszulösen.",
            },
            {
                title: "Photonenimpuls (Compton)",
                classicalText: "Klassisch: Licht hat keine Masse und sollte daher auch keinen Impuls haben.",
                quantumText: "Obwohl ruhmasselos, tragen Photonen einen Impuls: p = h/λ = E/c. Der Compton-Effekt bestätigt dies durch Impulsübertrag auf Elektronen beim Stoß (Frequenzverschiebung der Strahlung).",
            },
        ],
        abiturTasks: [
            {
                afb: 'I',
                operator: "Berechnen",
                question: "Berechne Energie und Impuls eines gelben Photons mit λ = 589 nm.",
                answer: "E = h·c/λ = (6,63·10⁻³⁴ · 3·10⁸) / 589·10⁻⁹ = 3,38·10⁻¹⁹ J = 2,11 eV\np = h/λ = 6,63·10⁻³⁴ / 589·10⁻⁹ = 1,13·10⁻²⁷ kg·m/s",
            },
            {
                afb: 'II',
                operator: "Erläutern",
                question: "Erläutere den Unterschied zwischen der Energie eines Photons und der Intensität eines Lichtstrahls.",
                answer: "Die Energie eines einzelnen Photons hängt nur von der Frequenz ab: E = h·f.\nDie Intensität eines Lichtstrahls hängt von der Anzahl der Photonen pro Zeit ab. Intensiveres Licht enthält mehr Photonen pro Sekunde, aber nicht energiereichere.",
            },
            {
                afb: 'III',
                operator: "Ableiten",
                question: "Zeige, dass für relativistische Photonen E = p·c gilt und weise nach, dass dies mit E = h·f und p = h/λ konsistent ist.",
                answer: "Aus E = h·f und p = h/λ folgt:\np·c = (h/λ)·c = h·(c/λ) = h·f = E ✓\nDas bestätigt die relativistische Energie-Impuls-Relation E = p·c für masselose Teilchen.",
            },
        ],
        resources: [
            { title: "LEIFIphysik: Photonenimpuls", description: "Compton-Effekt und Impuls des Photons.", url: "https://www.leifiphysik.de/quantenphysik/compton-effekt", type: 'leifi' },
        ],
    },
    // ─── 15 ────────────────────────────────────────────────────────────────────
    {
        id: "compton",
        topicNumber: "15",
        title: "Compton-Effekt",
        description: "Impulsübertrag von Photonen auf Elektronen – Beweis des Photonenimpulses.",
        progress: 0,
        iconName: "Crosshair",
        theoryBites: [
            {
                title: "Das Compton-Experiment (1923)",
                classicalText: "Klassisch: Röntgenstrahlen sollten beim Thomson-Streuung-Prozess immer dieselbe Wellenlänge behalten. Die Wellenlänge der gestreuten Strahlung sollte gleich der der einfallenden sein.",
                quantumText: "Compton beobachtete: Die gestreute Röntgenstrahlung hat je nach Streuwinkel θ eine größere Wellenlänge als die einfallende: Δλ = (h/m_e·c)·(1 - cos θ). Erklärung nur durch Photonenimpuls möglich.",
            },
            {
                title: "Compton-Wellenlänge",
                classicalText: "Keine klassische Erklärung möglich, da Wellen keine Impulse tragen sollten.",
                quantumText: "λ_c = h/(m_e·c) ≈ 2,43 pm (Compton-Wellenlänge des Elektrons). Der Stoßprozess folgt den Erhaltungssätzen für Impuls und Energie mit Photonen als Teilchen.",
            },
        ],
        abiturTasks: [
            {
                afb: 'I',
                operator: "Beschreiben",
                question: "Beschreibe das Ergebnis des Compton-Experiments und was daran überraschend war.",
                answer: "Röntgenstrahlung wird an Elektronen gestreut und dabei ihre Wellenlänge vergrößert (Δλ > 0). Das ist überraschend, weil klassische Streuung keine Wellenlängenänderung vorhersagt.",
            },
            {
                afb: 'II',
                operator: "Berechnen",
                question: "Röntgenstrahlen treffen unter θ = 90° auf ein freies Elektron. Berechne die Wellenlängenverschiebung Δλ.",
                answer: "Δλ = (h/m_e·c)·(1 - cos 90°) = λ_c · (1 - 0) = 2,43 pm",
            },
            {
                afb: 'III',
                operator: "Beurteilen",
                question: "Beurteile, warum der Compton-Effekt als endgültiger Beweis für die Teilchennatur des Lichts gilt.",
                answer: "Die Wellenlängenverschiebung passt exakt zur Stoßrechnung mit Impulserhaltung, wenn man p = h/λ für Photonen ansetzt. Kein Wellenmodell kann Δλ ≠ 0 erklären. Der exakte Zusammenhang Δλ = f(θ) ist ein quantitativer Beweis für den Photonenimpuls.",
            },
        ],
        resources: [
            { title: "LEIFIphysik: Compton-Effekt", description: "Herleitung und Experiment.", url: "https://www.leifiphysik.de/quantenphysik/compton-effekt", type: 'leifi' },
        ],
    },
    // ─── 16 ────────────────────────────────────────────────────────────────────
    {
        id: "roentgen",
        topicNumber: "16",
        title: "Bremsstrahlung & Röntgenspektrum",
        description: "Entstehung von Röntgenstrahlung und charakteristisches Spektrum.",
        progress: 0,
        iconName: "RadioTower",
        hasSimulation: true,
        theoryBites: [
            {
                title: "Bremsstrahlung",
                classicalText: "Klassisch: Abgebremste Elektronen emittieren Strahlung (beschleunigte Ladungen strahlen). Das Spektrum ist kontinuierlich.",
                quantumText: "Das kontinuierliche Bremsstrahlungsspektrum hat eine kurzwellige Grenze λ_min = h·c/(e·U). Kein Photon kann mehr Energie haben als das Elektron selbst. Diese Grenzwellenlänge liefert einen weiteren Weg, h zu bestimmen.",
            },
            {
                title: "Charakteristische Röntgenstrahlung",
                classicalText: "Klassisch: Die scharfen Linien des Röntgenspektrums waren zunächst unerklärlich.",
                quantumText: "Elektronen schlagen Elektronen aus inneren Schalen. Elektronen aus höheren Schalen fallen nach – und emittieren dabei Röntgenphotonen mit diskreter Energie ΔE = E_höher - E_tiefer. Diese Linien sind materialspezifisch.",
            },
        ],
        abiturTasks: [
            {
                afb: 'I',
                operator: "Beschreiben",
                question: "Beschreibe die zwei Bestandteile des Röntgenspektrums: kontinuierlicher und diskreter Anteil.",
                answer: "Kontinuierlich: Bremsstrahlung entsteht beim Abbremsen von Elektronen. Das Spektrum reicht bis zu einer Grenzwellenlänge λ_min.\nDiskret: Charakteristische Linien entstehen durch Elektronenübergänge in der Atomhülle. Linien sind materialspezifisch (z.B. Kα, Kβ).",
            },
            {
                afb: 'II',
                operator: "Berechnen",
                question: "Eine Röntgenröhre wird mit U = 40 kV betrieben. Berechne die minimale Wellenlänge der Bremsstrahlung.",
                answer: "λ_min = h·c/(e·U) = (6,63·10⁻³⁴ · 3·10⁸) / (1,6·10⁻¹⁹ · 40·10³)\n= 1,989·10⁻²⁵ / 6,4·10⁻¹⁵ ≈ 3,1·10⁻¹¹ m = 31 pm",
            },
            {
                afb: 'III',
                operator: "Analysieren",
                question: "Analysiere, wie aus dem Röntgenspektrum das Plancksche Wirkungsquantum h bestimmt werden kann.",
                answer: "Aus λ_min = h·c/(e·U) folgt: h = e·U·λ_min/c.\nMisst man λ_min für verschiedene Spannungen U, erhält man eine Gerade λ_min gegen 1/U. Die Steigung ist h·c/e, woraus h bestimmt wird. Diese Methode war historisch eine unabhängige Bestimmung von h.",
            },
        ],
        resources: [
            { title: "LEIFIphysik: Röntgenstrahlung", description: "Entstehung und Spektrum der Röntgenstrahlung.", url: "https://www.leifiphysik.de/atomphysik/roentgenstrahlung", type: 'leifi' },
        ],
    },
];
