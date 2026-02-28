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
                classicalText: "Licht ist eine klassische Welle. Es entsteht sofort ein kontinuierliches, hell-dunkles Streifenmuster durch Überlagerung (Interferenz) der Wellenberge und -täler von beiden Spalten.",
                quantumText: "Jeder Photonentreffer ist ein einzelner, zufälliger Punkt (Teilchencharakter bei der Messung). Das typische Interferenzmuster baut sich erst nach sehr vielen Photonen allmählich auf (stochastischer Aufbau).",
            },
            {
                title: "Die Bahn des Photons",
                classicalText: "Licht besteht aus kleinen Teilchen (wie Billardkugeln). Ein Teilchen muss sich an den Spalten entscheiden und fliegt entweder durch den linken ODER den rechten Spalt. Es dürften also nur zwei Streifen entstehen.",
                quantumText: "Das einzelne Photon hat keine klassische Bahnkurve. Für die Ausbreitung wird es als ausgedehnte Wahrscheinlichkeitswelle beschrieben, die durch BEIDE Spalte gleichzeitig geht und mit sich selbst interferiert.",
            },
            {
                title: "Beobachtung am Spalt (Welcher-Weg)",
                classicalText: "Man kann jederzeit mit einem Detektor messen, durch welchen Spalt das Teilchen geflogen ist, ohne das Muster auf dem Schirm dahinter zu beeinflussen.",
                quantumText: "Sobald man misst, welchen Weg (linker oder rechter Spalt) das Photon genommen hat ('Welcher-Weg-Information'), verschwindet das Interferenzmuster sofort und weicht der klassischen Doppelspalt-Verteilung. Dies nennt man Komplementarität.",
            },
        ],
        abiturTasks: [
            {
                afb: 'I',
                operator: "Beschreiben",
                question: "Beschreibe das Interferenzmuster, das bei einem Doppelspaltexperiment mit extrem schwacher Lichtquelle (Einzelphotonen) nach sehr kurzer und nach sehr langer Belichtungszeit auf dem Detektor zu sehen ist.",
                answer: "Nach kurzer Zeit erkennt man nur einzelne, scheinbar zufällig verteilte Punkte auf dem Detektor (Teilchencharakter).\n\nNach langer Zeit / bei sehr vielen Einzelphotonen entsteht allmählich das klassische Dichtemuster bzw. Interferenzmuster mit Intensitätsmaxima und -minima (stochastischer Aufbau).",
            },
            {
                afb: 'II',
                operator: "Erläutern",
                question: "Erläutere an diesem Experiment die wellenmechanische Wahrscheinlichkeitsinterpretation (nach Born).",
                answer: "Das Quadrat der Amplitude der Wellenfunktion |Ψ|² an einem bestimmten Ort (Streifenmuster-Intensität) ist proportional zur Wahrscheinlichkeit, ein einzelnes Photon an einem bestimmten Ort (in einem bestimmten Intervall) zu detektieren.\n\nDie klassische Welle bestimmt also nur die Aufenthaltswahrscheinlichkeit des Teilchens.",
            },
            {
                afb: 'III',
                operator: "Beurteilen",
                question: "Ein Schüler behauptet: 'Ein Photon teilt sich am Doppelspalt, geht zur Hälfte durch den linken und zur Hälfte durch den rechten Spalt und fügt sich am Schirm wieder zusammen.' Beurteile diese Aussage.",
                answer: "Die Behauptung ist falsch. Ein Photon ist unteilbar; man registriert am Schirm immer ein GANZES Energiequant (Photon).\n\nMan muss das Ausbreitungsverhalten als Wahrscheinlichkeitswelle (die durch beide Spalte geht) vom Detektionsverhalten als punktförmiges Teilchen streng trennen.",
            },
        ],
        resources: [
            {
                title: "LEIFIphysik: Doppelspalt & Einzelphotonen",
                description: "Die beste deutschsprachige Ressource für den Physik-Unterricht. Mit interaktiven Applets und klaren Erklärungen zum stochastischen Aufbau.",
                url: "https://www.leifiphysik.de/quantenphysik/quantenobjekt-photon/versuche/doppelspalt-experiment-mit-einzelphotonen",
                type: 'leifi',
            },
            {
                title: "100SekundenPhysik: Das Geheimnis der Quanten",
                description: "Ein exzellentes Video, das die Absurdität der Quantenwelt und die Rolle der Beobachtung visuell beeindruckend erklärt.",
                url: "https://www.youtube.com/watch?v=RE9di2x1sub",
                type: 'video',
                duration: "7:45",
            },
            {
                title: "Studyflix: Doppelspaltexperiment",
                description: "Kompakte Zusammenfassung der wichtigsten Fakten für das Abitur. Ideal zur schnellen Wiederholung vor der Klausur.",
                url: "https://studyflix.de/ingenieurwissenschaften/doppelspalt-experiment-2633",
                type: 'video',
                duration: "4:32",
            },
        ],
    },
    {
        id: "photoeffekt",
        topicNumber: "03",
        title: "Lichtelektrischer Effekt",
        description: "Herauslösen von Elektronen durch Licht (Photonen).",
        progress: 0,
        iconName: "Sun",
        hasSimulation: true,
        theoryBites: [
            {
                title: "Klassische Wellenvorstellung",
                classicalText: "Die Energie des Lichts hängt von seiner Intensität (Helligkeit) ab. Selbst schwaches Licht müsste bei langer Bestrahlungsdauer Elektronen aus dem Metall lösen können (Energieakkumulation).",
                quantumText: "Die Emission von Elektronen erfolgt sofort ohne Zeitverzögerung, aber erst ab einer bestimmten Grenzfrequenz (blaues UV-Licht). Rotes, hochintensives Licht löst keine Elektronen aus."
            },
            {
                title: "Einsteins Lichtquantenhypothese",
                classicalText: "Licht breitet sich kontinuierlich in allen Richtungen im Raum aus.",
                quantumText: "Licht besteht aus unteilbaren Energiepaketen (Photonen) mit der Energie E = h * f. Ein Elektron absorbiert immer genau ein Ganzes Photon."
            },
            {
                title: "Kinetische Energie",
                classicalText: "Hellere Glühbirnen werfen mehr Lichtenergie auf die Platte, folglich müssten die Elektronen mit größerer Wucht (höherer Geschwindigkeit) austreten.",
                quantumText: "Die Intensität erhöht nur die *Anzahl* der ausgelösten Elektronen. Die *maximale kinetische Energie* (Geschwindigkeit) hängt nur von der Frequenz (Farbe) des Lichts ab: E_kin = h*f - W_A."
            }
        ],
        abiturTasks: [
            {
                afb: 'II',
                operator: "Erklären",
                question: "Erkläre den Begriff 'Austrittsarbeit' im Kontext des Photoeffekts.",
                answer: "Die Austrittsarbeit (W_A oder W_K) ist die minimale Energie, die benötigt wird, um ein Elektron aus der Oberfläche eines bestimmten Metalls zu lösen. Diese ist materialabhängig."
            },
            {
                afb: 'III',
                operator: "Begründen",
                question: "Begründe mit Einsteins Photonenhypothese, warum bei der Bestrahlung einer Zinkplatte mit einer sehr hellen roten Lampe keine Elektronen austreten, bei einer sehr schwachen UV-Lampe hingegen sofort.",
                answer: "Die Photonen des roten Lichts haben eine geringe Frequenz und damit eine Energie (E=h*f), die kleiner als die Austrittsarbeit von Zink ist. Daher kann kein Elektron ausgelöst werden. UV-Licht-Photonen haben eine hohe Frequenz; ihre Energie ist größer als die Austrittsarbeit, weshalb selbst ein einzelnes Photon reicht, um sofort ein Elektron auszulösen."
            }
        ]
    },
    {
        id: "polarisation",
        topicNumber: "02",
        title: "Polarisation",
        description: "Eigenschaften von Photonen und Filtern.",
        progress: 0,
        iconName: "Filter",
    },
    {
        id: "wegentscheidung",
        topicNumber: "04",
        title: "Wegentscheidung & Komplementarität",
        description: "Welle-Teilchen-Dualismus im Experiment.",
        progress: 0,
        iconName: "GitBranch",
    },
    {
        id: "mach-zehnder",
        topicNumber: "05",
        title: "Mach-Zehnder-Interferometer",
        description: "Interferenz am Strahlteiler.",
        progress: 0,
        iconName: "Minimize2",
    },
    {
        id: "delayed-choice",
        topicNumber: "06",
        title: "Delayed-Choice-Experiment",
        description: "Die verzögerte Entscheidung von Wheeler.",
        progress: 0,
        iconName: "Clock",
    },
    {
        id: "de-broglie",
        topicNumber: "06",
        title: "De-Broglie-Wellenlänge",
        description: "Der Impuls von Materiewellen.",
        progress: 0,
        iconName: "Activity",
        theoryBites: [
            {
                title: "Teilchen-Impuls",
                classicalText: "Elektronen sind kleine geladene Kügelchen. Ihr Verhalten wird vollständig durch ihre Masse und Geschwindigkeit (p = m*v) beschrieben.",
                quantumText: "Auch Teilchen mit Masse haben Welleneigenschaften. Louis de Broglie postulierte: Jedes Teilchen mit Impuls p hat eine Wellenlänge $\\lambda = h / p$."
            }
        ],
        abiturTasks: [
            {
                afb: 'I',
                operator: "Berechnen",
                question: "Berechne die De-Broglie-Wellenlänge eines Elektrons, das mit einer Beschleunigungsspannung von U = 4 kV beschleunigt wurde.",
                answer: "1. Kinetische Energie: $E_{kin} = e \\cdot U$ \n2. Impuls: $p = \\sqrt{2 \cdot m_e \cdot E_{kin}}$ \n3. Wellenlänge: $\\lambda = \\frac{h}{p} \\approx 1{,}94 \\cdot 10^{-11} \\text{ m}$"
            }
        ]
    },
    {
        id: "elektronenbeugung",
        topicNumber: "07",
        title: "Elektronenbeugung",
        description: "Materiewellen am Graphitgitter.",
        progress: 0,
        iconName: "Target",
        theoryBites: [
            {
                title: "Elektronen am Kristallgitter",
                classicalText: "Elektronen prallen wie kleine Kugeln am Graphitgitter ab und fliegen in zufällige Richtungen davon (diffuse Streuung).",
                quantumText: "Die Elektronen-Wellen interferieren am Kristallgitter (Bragg-Reflexion oder Debye-Scherrer) und erzeugen auf dem Schirm konzentrische Interferenzringe. Dies beweist den Wellencharakter der Materie."
            }
        ],
        abiturTasks: [
            {
                afb: 'II',
                operator: "Erklären",
                question: "Erkläre das Zustandekommen der Interferenzringe bei der Elektronenbeugungsröhre.",
                answer: "Die Elektronen haben laut de Broglie eine Wellenlänge $\\lambda$. Die Graphitfolie besteht aus vielen zufällig ausgerichteten Mikrokristallen. An den Netzebenen der Kristalle kommt es zur konstruktiven Interferenz (Bragg-Bedingung: $n\\cdot\\lambda = 2d\\cdot\\sin\\alpha$). Durch die zufällige Ausrichtung der Kristalle entsteht keine Punktmatrix, sondern ein Ringsystem (Debye-Scherrer-Verfahren)."
            }
        ]
    },
    {
        id: "unschaerfe",
        topicNumber: "08",
        title: "Heisenbergsche Unschärferelation",
        description: "Ort und Impuls sind nicht gleichzeitig bestimmbar.",
        progress: 0,
        iconName: "EyeOff",
        theoryBites: [
            {
                title: "Ort und Impuls",
                classicalText: "Ort und Impuls (Geschwindigkeit) eines Teilchens lassen sich gleichzeitig beliebig genau messen.",
                quantumText: "Nach Heisenberg können Ort und Impuls eines Quantenobjekts niemals gleichzeitig beliebig genau bestimmt werden: $\\Delta x \\cdot \\Delta p \\ge \\frac{h}{4\\pi}$."
            }
        ],
        abiturTasks: [
            {
                afb: 'II',
                operator: "Erklären",
                question: "Erkläre anhand der Unschärferelation, warum das Bohrsche Atommodell kritisiert wird.",
                answer: "Im Bohrschen Atommodell bewegen sich Elektronen auf festen Kreisbahnen. Dies würde bedeuten, dass Ort (Radius) und Impuls der Elektronen exakt bekannt wären, was im strikten Widerspruch zur Heisenbergschen Unschärferelation steht."
            }
        ]
    },
    {
        id: "fullerene",
        topicNumber: "09",
        title: "Fullerene-Interferenz",
        description: "Beugung von großen Molekülen.",
        progress: 0,
        iconName: "Hexagon",
        theoryBites: [
            {
                title: "Makromolekül-Interferenz",
                classicalText: "Große Moleküle wie C60 bestehen aus 60 Atomen und verhalten sich eindeutig als klassische Teilchen ohne Welleneigenschaften.",
                quantumText: "Selbst riesige Moleküle wie Fullerene (C60) zeigen am optischen Gitter messbare Interferenzmuster. Ihre De-Broglie-Wellenlänge ist extrem klein, aber unstrittig existent."
            }
        ],
        abiturTasks: [
            {
                afb: 'I',
                operator: "Nennen",
                question: "Nenne die experimentelle Herausforderung für Interferenzversuche mit massereichen Molekülen wie Fullerenen.",
                answer: "Die Wellenlänge $\\lambda$ von massereichen Molekülen ist winzig ($p = m \\cdot v$ ist hoch). Das Spaltmaß des Gitters muss in der Größenordnung der Wellenlänge liegen, weshalb extrem feine Gitterstrukturen und sehr langsame Molekülstrahlen benötigt werden."
            }
        ]
    },
    {
        id: "schroedinger",
        topicNumber: "10",
        title: "Schrödingers Katze",
        description: "Makroskopische Überlagerungszustände.",
        progress: 0,
        iconName: "Cat",
        theoryBites: [
            {
                title: "Das Gedankenexperiment",
                classicalText: "Eine Katze in einer Box ist zu jedem Zeitpunkt objektiv entweder lebendig oder tot.",
                quantumText: "In Schrödingers Gedankenexperiment ist die Katze mit einem quantenmechanischen Zerfall gekoppelt. Bis zur Messung (Öffnen der Box) befindet sich die Katze quantenmechanisch im Superpositionszustand 'lebendig und tot' zugleich."
            }
        ],
        abiturTasks: [
            {
                afb: 'III',
                operator: "Beurteilen",
                question: "Beurteile die Aussagekraft von Schrödingers Katzen-Gedankenexperiment für die Interpretation der Quantenphysik.",
                answer: "Es verdeutlicht paradoxe Konsequenzen der Kopenhagener Deutung. Eine lineare Superposition mikroskopischer Zustände (radioaktiver Zerfall) wird auf makroskopische Objekte übertragen, was in unserer Alltagswelt absurd erscheint, aber die zentrale Rolle des 'Beobachters' (Messung) aufzeigt."
            }
        ]
    },
    {
        id: "hallwachs",
        topicNumber: "11",
        title: "Hallwachs-Versuch",
        description: "Grundlagen des lichtelektrischen Effekts.",
        progress: 0,
        iconName: "Sun",
        theoryBites: [
            {
                title: "Entladung per UV-Licht",
                classicalText: "Licht, das lang genug einstrahlt, sollte durch Akkumulation genügend Energie liefern, um Elektronen zu lösen.",
                quantumText: "Eine negativ geladene Zinkplatte wird unverzüglich entladen, aber nur bei Bestrahlung mit UV-Licht, nicht jedoch bei sichtbarem Licht (egal wie intensiv). Dies war der entscheidende erste Nachweis, dass Lichtportionen existieren."
            }
        ],
        abiturTasks: [
            {
                afb: 'II',
                operator: "Erklären",
                question: "Erkläre, warum eine positiv geladene Zinkplatte unter UV-Licht auf dem Elektroskop anscheinend nicht entladen wird.",
                answer: "Bei einer positiv geladenen Platte gibt es einen Elektronenmangel. Wenn das UV-Licht nun vereinzelt Elektronen auslöst, werden diese durch die starke positive Ladung der Platte sofort wieder angezogen. Der Zeiger des Elektroskops behält seinen Ausschlag fast unverändert bei."
            }
        ]
    },
    {
        id: "photoeffekt",
        topicNumber: "13",
        title: "Photoeffekt",
        description: "Bestimmung des Planckschen Wirkungsquantums.",
        progress: 0,
        iconName: "Sun",
        hasSimulation: true,
        theoryBites: [
            {
                title: "Was passiert, wenn Licht auf Metall trifft?",
                classicalText: "Licht ist eine klassische Welle. Je größer die Intensität (Helligkeit) der Welle, desto mehr Energie überträgt sie auf die Metalloberfläche. Bei genügend hoher Intensität sollten also immer Elektronen ausgelöst werden – egal welche Farbe das Licht hat.",
                quantumText: "Licht besteht aus einzelnen Energiepaketen (Photonen) mit E = h·f. Ein Elektron kann nur dann herausgelöst werden, wenn EIN einzelnes Photon genug Energie hat (E ≥ Austrittsarbeit W_A). Unter der Grenzfrequenz f_G passiert gar nichts – egal wie hell das Licht ist.",
            },
            {
                title: "Kinetische Energie der Elektronen",
                classicalText: "Wenn Licht heller wird (mehr Intensität), überträgt es mehr Energie. Die ausgelösten Elektronen sollten also mit mehr Intensität auch schneller werden. Die Frequenz (Farbe) des Lichts spielt dabei keine Rolle.",
                quantumText: "Die kinetische Energie der ausgelösten Elektronen hängt NUR von der Frequenz des Lichts ab: Ekin = h·f − W_A. Eine höhere Intensität bedeutet lediglich mehr Elektronen pro Sekunde (höherer Photostrom), NICHT schnellere Elektronen.",
            },
            {
                title: "Einsteins Lichtquantenhypothese",
                classicalText: "Der Photoeffekt ist mit der klassischen Wellentheorie erklärbar – man muss nur lange genug warten, bis genug Energie akkumuliert wurde, um ein Elektron freizusetzen.",
                quantumText: "Die Wellenerklärung scheitert: Selbst bei extrem schwachem UV-Licht werden Elektronen sofort ausgelöst. Einstein erklärte dies 1905 mit der Lichtquantenhypothese (Nobelpreis 1921). E_Photon = h·f muss die Austrittsarbeit W_A überwinden; der Rest geht in kinetische Energie.",
            },
        ],
        abiturTasks: [
            {
                afb: 'I',
                operator: "Beschreiben",
                question: "Beschreibe, welche experimentellen Beobachtungen beim Photoeffekt die klassische Wellentheorie des Lichts widerlegen. Nenne mindestens zwei Beobachtungen.",
                answer: "1. Grenzfrequenz: Unterhalb einer materialspezifischen Grenzfrequenz f_G werden keine Elektronen ausgelöst – egal wie hoch die Intensität des Lichts ist. Dies widerspricht der Wellentheorie, nach der bei genügend hoher Intensität immer Elektronen ausgelöst werden müssten.\n\n2. Sofortige Emission: Elektronen werden auch bei sehr geringer Intensität sofort ausgelöst (keine Zeitverzögerung). Die Wellentheorie würde eine Aufladungszeit vorhersagen.\n\n3. Unabhängigkeit der Maximalenergie von der Intensität: Die maximale kinetische Energie der Elektronen hängt nur von der Lichtfrequenz ab, nicht von der Intensität.",
            },
            {
                afb: 'II',
                operator: "Erläutern",
                question: "Erläutere mit der Einstein'schen Lichtquantenhypothese, warum die maximale kinetische Energie der Photoelektronen linear von der Lichtfrequenz abhängt und unabhängig von der Lichtintensität ist.",
                answer: "Nach Einstein besteht Licht aus Photonen mit der Energie E = h·f. Bei der Wechselwirkung überträgt genau EIN Photon seine Energie auf EIN Elektron.\n\nDie Energiebilanz lautet: h·f = W_A + E_kin,max (Einsteinsche Gleichung)\n\nDaraus folgt: E_kin,max = h·f − W_A\n\nDa h und W_A konstant sind, hängt E_kin,max linear von f ab. Die Intensität bestimmt nur die Anzahl der Photonen pro Zeiteinheit und damit nur den Photostrom – nicht die Energie der einzelnen Photonen.",
            },
            {
                afb: 'III',
                operator: "Bewerten",
                question: "Mit der Gegenfeldmethode wird die Gegenspannung U_G gemessen, bei der kein Photostrom mehr fließt. Eine Schülerin schreibt: 'Wir haben U_G = 1,8 V gemessen. Da h bekannt ist, können wir damit experimentell die Lichtgeschwindigkeit c bestimmen.' Bewerte diese Aussage kritisch.",
                answer: "Die Aussage ist so nicht korrekt, aber der Ansatz geht in die richtige Richtung.\n\nAus der Gegenfeldmethode folgt: e·U_G = h·f − W_A. Man kann mit bekanntem f und mehreren Messpaaren h/e bestimmen (slope der E_kin-f-Gerade).\n\nUm h allein zu bestimmen, muss man h/e mit dem bekannten e multiplizieren. Die Lichtgeschwindigkeit c ist in diesem Experiment nicht direkt messbar, da f und λ unabhängig voneinander gemessen werden müssten. Korrekt: Man kann h bestimmen (Plancksches Wirkungsquantum), nicht c.",
            },
        ],
        resources: [
            {
                title: "LEIFIphysik: Einsteins Theorie des Lichts",
                description: "Fundierte Erklärung des Photoeffekts mit Einsteins Lichtquantenhypothese, Formelherleitung und interaktiven Elementen.",
                url: "https://www.leifiphysik.de/quantenphysik/quantenobjekt-photon/grundwissen/einsteins-theorie-des-lichts",
                type: 'leifi',
            },
            {
                title: "Studyflix: Photoeffekt erklärt",
                description: "Kompaktes Erklärvideo zum Photoeffekt mit Experiment, Formel und Diagrammen – ideal zur Abitur-Vorbereitung.",
                url: "https://studyflix.de/ingenieurwissenschaften/photoeffekt-2720",
                type: 'video',
                duration: "5:10",
            },
            {
                title: "TheSimplePhysics: Der Photoeffekt (NRW Abitur)",
                description: "Klare Schritt-für-Schritt-Erklärung mit Einstein-Gleichung, Gegenfeldmethode und typischen Abituraufgaben.",
                url: "https://www.youtube.com/watch?v=x3ToBIB3U0I",
                type: 'video',
                duration: "12:34",
            },
        ],
    },
    {
        id: "photonen-energie",
        topicNumber: "14",
        title: "Impuls und Energie von Photonen",
        description: "Die Eigenschaften von Lichtquanten.",
        progress: 0,
        iconName: "BatteryCharging",
    },
    {
        id: "compton",
        topicNumber: "15",
        title: "Compton-Effekt",
        description: "Stoß zwischen Photon und Elektron.",
        progress: 0,
        iconName: "Radiation",
    },
    {
        id: "bremsstrahlung",
        topicNumber: "16",
        title: "Bremsstrahlung & Röntgenspektrum",
        description: "Erzeugung kurzwelliger Strahlung.",
        progress: 0,
        iconName: "Radio",
    },
];
