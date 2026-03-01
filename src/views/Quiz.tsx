import React, { useState, useEffect, useRef } from 'react';

interface QuizQuestion {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
    topic: string;
}

const ALL_QUESTIONS: QuizQuestion[] = [
    {
        topic: 'Photoeffekt',
        question: 'Was geschieht, wenn man die Intensität des Lichts beim Photoeffekt erhöht?',
        options: ['Die Elektronenenergie steigt', 'Es werden mehr Elektronen ausgelöst', 'Die Grenzfrequenz sinkt', 'Die Austrittsarbeit sinkt'],
        correct: 1,
        explanation: 'Die Intensität bestimmt die Anzahl der Photonen → mehr Elektronen, aber nicht deren Energie.'
    },
    {
        topic: 'Photoeffekt',
        question: 'Welche Aussage beschreibt Einsteins Lichtquanten-Hypothese?',
        options: ['Licht ist eine kontinuierliche Welle', 'Licht besteht aus Paketen der Energie E = hf', 'Die Energie hängt von der Intensität ab', 'Elektronen haben Welleneigenschaften'],
        correct: 1,
        explanation: 'Einstein: E = hf, Licht kommt in diskreten Quanten (Photonen).'
    },
    {
        topic: 'Doppelspalt',
        question: 'Was wird beim Doppelspaltexperiment mit einzelnen Elektronen beobachtet?',
        options: ['Zwei Streifen', 'Kein Muster', 'Ein Interferenzmuster', 'Ein Beugungsscheibchen'],
        correct: 2,
        explanation: 'Auch einzelne Elektronen erzeugen ein Interferenzmuster – sie "gehen durch beide Spalten gleichzeitig".'
    },
    {
        topic: 'Heisenberg',
        question: 'Was besagt Heisenbergs Unschärferelation?',
        options: ['Wir können Ort und Impuls nicht gleichzeitig beliebig genau kennen', 'Elektronen haben keinen definierten Ort', 'Je schneller ein Teilchen, desto ungenauer seine Energie', 'Die Messung ist immer ungenau'],
        correct: 0,
        explanation: 'Δx · Δp ≥ ℏ/2: Je genauer der Ort, desto ungenauer der Impuls – prinzipiell, nicht messtechnisch.'
    },
    {
        topic: 'Compton-Effekt',
        question: 'Was zeigt der Compton-Effekt?',
        options: ['Licht hat Wellencharakter', 'Elektronen haben Welleneigenschaften', 'Photonen haben Impuls', 'Atome sind quantisiert'],
        correct: 2,
        explanation: 'Im Compton-Effekt überträgt ein Photon Impuls auf ein Elektron – Beweis für den Teilchencharakter des Lichts.'
    },
    {
        topic: 'De-Broglie',
        question: 'Welche Formel beschreibt die De-Broglie-Wellenlänge?',
        options: ['λ = hf', 'λ = h/p', 'λ = mc²', 'λ = E/c'],
        correct: 1,
        explanation: 'λ = h/p verbindet die Wellenlänge mit dem Impuls p des Teilchens.'
    },
    {
        topic: 'Tunneleffekt',
        question: 'Was ist der Tunneleffekt?',
        options: ['Teilchen beschleunigen durch Hindernisse', 'Teilchen können Barrieren durchdringen, die klassisch unüberwindbar sind', 'Wellen werden an Hindernissen gebrochen', 'Elektronen verlieren Energie an Wänden'],
        correct: 1,
        explanation: 'Wegen der Wellennatur hat die Wellenfunktion auch hinter einer Barriere eine Amplitude → endliche Tunnelwahrscheinlichkeit.'
    },
    {
        topic: 'Quantenzahlen',
        question: 'Welche Werte kann die magnetische Quantenzahl m_l für l=2 annehmen?',
        options: ['-2, -1, 0, 1, 2', '0, 1, 2, 3', '-2, -1, 0', '1, 2, 3, 4, 5'],
        correct: 0,
        explanation: 'm_l reicht von −l bis +l, also −2, −1, 0, +1, +2 (5 Werte).'
    },
    {
        topic: 'Photoeffekt',
        question: 'Was ist die Austrittsarbeit W_A?',
        options: ['Die Energie eines Photons', 'Die minimale Energie zum Herauslösen eines Elektrons', 'Die kinetische Energie des Elektrons', 'Die Frequenz des Lichts'],
        correct: 1,
        explanation: 'W_A ist material­spezifisch und beschreibt die Energie, die benötigt wird, um ein Elektron aus der Metalloberfläche zu lösen.'
    },
    {
        topic: 'Verschränkung',
        question: 'Was charakterisiert verschränkte Photonen besonders?',
        options: ['Sie haben gleiche Wellenlängen', 'Ihre Quantenzustände sind korreliert, egal wie weit sie entfernt sind', 'Sie reisen schneller als Licht', 'Sie können nicht gemessen werden'],
        correct: 1,
        explanation: 'Verschränkte Teilchen zeigen instantane Korrelation über beliebige Distanzen – Einstein nannte es "spukhafte Fernwirkung".'
    },
    {
        topic: 'Röntgenstrahlung',
        question: 'Wovon hängt die minimale Wellenlänge λ_min im Röntgenspektrum ab?',
        options: ['Vom Kathodenmaterial', 'Von der Anodenspannung U_A', 'Von der Stromstärke', 'Von der Temperatur'],
        correct: 1,
        explanation: 'λ_min = hc/(e·U_A) – je höher die Spannung, desto kürzer die minimale Wellenlänge (Duane-Hunt).'
    },
    {
        topic: 'Bohr-Atommodell',
        question: 'Was passiert, wenn ein Elektron im Bohr-Modell auf eine tiefere Schale wechselt?',
        options: ['Es nimmt Energie auf', 'Es emittiert ein Photon', 'Es wird ionisiert', 'Es ändert seine Masse'],
        correct: 1,
        explanation: 'Der Energieunterschied ΔE = hf wird als Photon abgestrahlt.'
    },
];

const QUIZ_DURATION = 60; // seconds

const Quiz: React.FC = () => {
    const [questions] = useState(() => [...ALL_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 10));
    const [currentQ, setCurrentQ] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(QUIZ_DURATION);
    const [phase, setPhase] = useState<'playing' | 'finished'>('playing');
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (phase !== 'playing') return;
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current!);
                    setPhase('finished');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timerRef.current!);
    }, [phase]);

    const handleAnswer = (idx: number) => {
        if (selected !== null) return;
        setSelected(idx);
        const isCorrect = idx === questions[currentQ].correct;
        if (isCorrect) setScore(s => s + 1);
        setTimeout(() => {
            if (currentQ + 1 >= questions.length) {
                clearInterval(timerRef.current!);
                setPhase('finished');
            } else {
                setCurrentQ(q => q + 1);
                setSelected(null);
            }
        }, 1500);
    };

    const restart = () => {
        setCurrentQ(0);
        setSelected(null);
        setScore(0);
        setTimeLeft(QUIZ_DURATION);
        setPhase('playing');
    };

    const q = questions[currentQ];
    const percent = Math.round((score / questions.length) * 100);

    if (phase === 'finished') {
        const grade = percent >= 85 ? '⭐' : percent >= 70 ? '✅' : percent >= 50 ? '⚠️' : '❌';
        return (
            <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '4rem 2rem' }}>
                <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>{grade}</div>
                <h1 className="text-gradient" style={{ fontSize: '2.5rem' }}>Quiz abgeschlossen!</h1>
                <p style={{ fontSize: '1.5rem', color: 'var(--text-muted)', margin: '1rem 0' }}>
                    {score} / {questions.length} Richtig ({percent}%)
                </p>
                {percent >= 85 && <p style={{ color: 'var(--accent-neon)' }}>Hervorragend! Du beherrschst die Quantenphysik.</p>}
                {percent >= 50 && percent < 85 && <p style={{ color: 'var(--text-muted)' }}>Gut gemacht! Übe noch die schwächeren Themen.</p>}
                {percent < 50 && <p style={{ color: '#ff6b6b' }}>Noch Übungsbedarf – schau dir die Module nochmal an!</p>}
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
                    <button onClick={restart} className="button button-primary">Nochmal spielen</button>
                </div>
            </div>
        );
    }

    const timerColor = timeLeft < 15 ? '#ff6b6b' : timeLeft < 30 ? '#ffd166' : 'var(--accent-neon)';

    return (
        <div style={{ maxWidth: '700px', margin: '0 auto', paddingBottom: '100px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 className="text-gradient" style={{ fontSize: '2.2rem', margin: 0 }}>⚡ Quick-Quiz</h1>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{currentQ + 1} / {questions.length}</span>
                    <div style={{
                        padding: '0.5rem 1.25rem',
                        borderRadius: '8px',
                        background: `${timerColor}22`,
                        border: `1px solid ${timerColor}`,
                        color: timerColor,
                        fontWeight: 700,
                        fontSize: '1.2rem',
                        fontVariantNumeric: 'tabular-nums'
                    }}>
                        ⏱ {timeLeft}s
                    </div>
                </div>
            </div>

            {/* Progress bar */}
            <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginBottom: '2rem', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${((currentQ) / questions.length) * 100}%`, background: 'var(--accent-neon)', transition: 'width 0.3s' }} />
            </div>

            <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--accent-neon)', marginBottom: '1rem' }}>
                    {q.topic}
                </div>
                <p style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-main)', lineHeight: 1.5 }}>
                    {q.question}
                </p>
            </div>

            <div style={{ display: 'grid', gap: '0.75rem' }}>
                {q.options.map((opt, i) => {
                    let bg = 'rgba(255,255,255,0.03)';
                    let border = 'rgba(255,255,255,0.1)';
                    let color = 'var(--text-main)';
                    if (selected !== null) {
                        if (i === q.correct) { bg = 'rgba(57,255,20,0.12)'; border = '#39ff14'; color = '#39ff14'; }
                        else if (i === selected && i !== q.correct) { bg = 'rgba(255,107,107,0.12)'; border = '#ff6b6b'; color = '#ff6b6b'; }
                    }
                    return (
                        <button
                            key={i}
                            onClick={() => handleAnswer(i)}
                            style={{
                                padding: '1rem 1.5rem',
                                borderRadius: '10px',
                                background: bg,
                                border: `1.5px solid ${border}`,
                                color,
                                textAlign: 'left',
                                cursor: selected !== null ? 'default' : 'pointer',
                                fontSize: '1rem',
                                transition: 'all 0.25s',
                                fontFamily: 'inherit',
                            }}
                        >
                            <span style={{ marginRight: '1rem', fontWeight: 700, color: 'var(--text-muted)' }}>{['A', 'B', 'C', 'D'][i]}</span>
                            {opt}
                        </button>
                    );
                })}
            </div>

            {selected !== null && (
                <div className="glass-panel" style={{ marginTop: '1.5rem', padding: '1rem 1.5rem', borderLeft: '4px solid var(--accent-neon)', background: 'rgba(0,240,255,0.05)' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-neon)', textTransform: 'uppercase', letterSpacing: '1px' }}>💡 Erklärung</span>
                    <p style={{ marginTop: '0.5rem', color: 'var(--text-main)' }}>{q.explanation}</p>
                </div>
            )}
        </div>
    );
};

export default Quiz;
