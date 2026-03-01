import React, { useState } from 'react';
import { Search, BookOpen } from 'lucide-react';

interface GlossaryEntry {
    term: string;
    definition: string;
    tags: string[];
}

interface OperatorEntry {
    operator: string;
    afb: 'I' | 'II' | 'III';
    meaning: string;
    example: string;
}

const GLOSSARY: GlossaryEntry[] = [
    { term: 'Austrittsarbeit W_A', definition: 'Minimale Energie, die benötigt wird, um ein Elektron aus der Metalloberfläche zu lösen. Materialspezifisch. E_kin = hf − W_A.', tags: ['Photoeffekt', 'Energie'] },
    { term: 'Aufenthaltswahrscheinlichkeit', definition: 'Maß für die Wahrscheinlichkeit, ein Teilchen an einem bestimmten Ort zu finden. Gegeben durch |ψ(x)|². Zentral für die Quantenmechanik.', tags: ['Wellenfunktion', 'Grundlagen'] },
    { term: 'Bragg-Reflexion', definition: 'Konstruktive Interferenz bei Streuung an Kristallgitterebenen. Bragg-Bedingung: 2d·sin(α) = n·λ. Anwendung: Röntgenkristallographie.', tags: ['Interferenz', 'Wellen'] },
    { term: 'Compton-Effekt', definition: 'Streuung von Röntgenphotonen an (quasi-freien) Elektronen. Wellenlängenverschiebung: Δλ = (h/m_e·c)·(1−cos θ). Beweis für Teilchencharakter des Lichts.', tags: ['Photonen', 'Impuls'] },
    { term: 'De-Broglie-Wellenlänge', definition: 'Jedem Teilchen mit Impuls p wird eine Wellenlänge λ = h/p zugeordnet. Verbindet Teilchen- und Wellenbild.', tags: ['Welle-Teilchen-Dualismus', 'Impuls'] },
    { term: 'Doppelspaltexperiment', definition: 'Versuch, der den Wellencharakter von Materie (Elektronen, Photonen) durch Interferenzmuster nachweist. Selbst mit einzelnen Teilchen entsteht ein Interferenzbild.', tags: ['Interferenz', 'Welle-Teilchen-Dualismus'] },
    { term: 'Emission', definition: 'Abgabe von elektromagnetischer Strahlung (Photonen) durch Atome beim Übergang von einem höheren auf ein niedrigeres Energieniveau.', tags: ['Atommodell', 'Energie'] },
    { term: 'Energieerhaltung', definition: 'Beim Photoeffekt: E_kin = hf − W_A. Beim Compton-Effekt: Energie des Photons + Elektron ist konstant.', tags: ['Grundlagen', 'Energie'] },
    { term: 'Energieniveaus', definition: 'Diskrete, erlaubte Energieszustände in einem Atom. Elektronen können nur diese bestimmten Energiebeträge aufnehmen oder abgeben.', tags: ['Atommodell', 'Quantisierung'] },
    { term: 'Franck-Hertz-Versuch', definition: 'Experimenteller Nachweis der diskreter Energieniveaus in Atomen (Hg). Elektronen verlieren bei Stößen genau die Anregungsenergie.', tags: ['Atommodell', 'Quantisierung'] },
    { term: 'Gegenspannung U_g', definition: 'Spannung, die notwendig ist, um selbst die schnellsten Photoelektronen zu stoppen. Damit gilt: e·U_g = E_kin,max.', tags: ['Photoeffekt', 'Messung'] },
    { term: 'Grenzfrequenz f_g', definition: 'Minimale Lichtfrequenz, ab der beim Photoeffekt Elektronen ausgelöst werden. Gilt: hf_g = W_A.', tags: ['Photoeffekt'] },
    { term: 'Heisenbergsche Unschärferelation', definition: 'Δx · Δp ≥ ℏ/2 und ΔE · Δt ≥ ℏ/2. Ort und Impuls (bzw. Energie und Zeit) können nicht gleichzeitig beliebig genau bekannt sein.', tags: ['Grundlagen', 'Fundamentalprinzip'] },
    { term: 'Interferenz', definition: 'Überlagerung von Wellen. Bei gleichphasiger Überlagerung: konstruktive Interferenz (Maximum). Bei gegenphasiger: destruktive Interferenz (Minimum).', tags: ['Wellen', 'Doppelspalt'] },
    { term: 'Ioniserungsenergie', definition: 'Energie, die benötigt wird, um ein Elektron vollständig aus dem Atom zu lösen (aus dem niedrigsten Energieniveau in den freien Zustand).', tags: ['Atommodell', 'Energie'] },
    { term: 'Kohärenz', definition: 'Eigenschaft von Wellen, die eine konstante Phasenbeziehung haben und daher Interferenz zeigen können.', tags: ['Wellen', 'Interferenz'] },
    { term: 'Lichtquant / Photon', definition: 'Energie-Quantum der elektromagnetischen Strahlung. E = hf = hc/λ. Impuls: p = h/λ. Ruhemasse: 0.', tags: ['Photoeffekt', 'Grundlagen'] },
    { term: 'Nullpunktenergie', definition: 'Minimalenergie eines Quantensystems, auch bei T = 0 K. Folge der Unschärferelation: Ein Teilchen im Potentialtopf hat stets E > 0.', tags: ['Quantenmechanik', 'Pottentialtopf'] },
    { term: 'Photoeffekt (lichtelektrischer Effekt)', definition: 'Elektronen werden aus Metalloberflächen herausgelöst, wenn Licht einer Mindestfrequenz einfällt. Erklärt von Einstein durch Lichtquanten.', tags: ['Grundlagen', 'Photonen'] },
    { term: 'Planck-Konstante h', definition: 'Fundamentale Naturkonstante: h = 6,626 × 10⁻³⁴ J·s. Verbindet Frequenz und Energie von Quanten: E = hf.', tags: ['Konstanten', 'Grundlagen'] },
    { term: 'Röntgenstrahlung', definition: 'Hochenergetische elektromagnetische Strahlung (λ ~ 0,01–10 nm). Entsteht durch Abbremsung von Elektronen (Bremsspektrum) und Elektronenübergänge (char. Spektrum).', tags: ['Strahlung', 'Spektrum'] },
    { term: 'Schrödingergleichung', definition: 'Fundamentale Gleichung der Quantenmechanik, die die Zeitentwicklung der Wellenfunktion ψ beschreibt: iℏ ∂ψ/∂t = Ĥψ.', tags: ['Quantenmechanik', 'Wellenfunktion'] },
    { term: 'Tunneleffekt', definition: 'Quanten-Phänomen: Ein Teilchen kann durch eine Potentialbarriere tunneln, die es klassisch nicht überwinden könnte. Basis von STM und Kernfusion in Sternen.', tags: ['Quantenmechanik', 'Wellenfunktion'] },
    { term: 'Unschärferelation', definition: 'Siehe: Heisenbergsche Unschärferelation', tags: ['Grundlagen'] },
    { term: 'Verschränkung', definition: 'Zwei Quantenteilchen sind verschränkt, wenn ihr gemeinsamer Zustand nicht als Produkt von Einzelzuständen geschrieben werden kann. Messung an einem beeinflusst sofort den anderen.', tags: ['Quantenmechanik', 'Korrelation'] },
    { term: 'Welle-Teilchen-Dualismus', definition: 'Quantenobjekte zeigen je nach Experiment Wellen- oder Teilchencharakter. De Broglie: Jedes Teilchen hat eine zugeordnete Wellenlänge λ = h/p.', tags: ['Grundlagen', 'Fundamentalprinzip'] },
    { term: 'Wellenfunktion ψ', definition: 'Mathematische Beschreibung des Quantenzustands. |ψ(x)|² gibt die Aufenthaltswahrscheinlichkeitsdichte an.', tags: ['Quantenmechanik'] },
    { term: 'Wirkungsquantum ℏ', definition: 'ℏ = h/(2π) ≈ 1,055 × 10⁻³⁴ J·s (h-quer). Taucht in der Unschärferelation auf: Δx·Δp ≥ ℏ/2.', tags: ['Konstanten', 'Grundlagen'] },
];

const OPERATORS: OperatorEntry[] = [
    { operator: 'Nennen / Angeben', afb: 'I', meaning: 'Fakten, Begriffe oder Definitionen reproduzieren – keine Erklärung nötig.', example: 'Nenne die Formel für die Photonenenergie.' },
    { operator: 'Beschreiben', afb: 'I', meaning: 'Einen Sachverhalt, eine Grafik oder einen Versuch mit Fachbegriffen darstellen.', example: 'Beschreibe den Versuchsaufbau des Millikan-Versuchs.' },
    { operator: 'Darstellen', afb: 'I', meaning: 'Fakten, Zusammenhänge oder Ergebnisse strukturiert wiedergeben (z.B. als Tabelle, Grafik).', example: 'Stelle das Energieniveauschema des Wasserstoffatoms dar.' },
    { operator: 'Berechnen', afb: 'I', meaning: 'Einen gesuchten Wert durch Formeloperationen ermitteln. Rechenweg muss erkennbar sein.', example: 'Berechne die Wellenlänge eines Photons der Energie E = 3,2 eV.' },
    { operator: 'Erklären', afb: 'II', meaning: 'Einen Sachverhalt kausal nachvollziehbar machen – die Ursache-Wirkungs-Kette aufzeigen.', example: 'Erkläre, warum beim Photoeffekt die Elektronen-Energie nicht von der Intensität abhängt.' },
    { operator: 'Erläutern', afb: 'II', meaning: 'Einen Sachverhalt verständlich machen, ggf. mit Beispielen oder Analogien veranschaulichen.', example: 'Erläutere den Begriff der Aufenthaltswahrscheinlichkeit mithilfe der Wellenfunktion.' },
    { operator: 'Begründen', afb: 'II', meaning: 'Eine Aussage oder ein Ergebnis mit physikalischen Gesetzmäßigkeiten rechtfertigen.', example: 'Begründe, warum das Interferenzmuster am Doppelspalt ein Wellenphänomen ist.' },
    { operator: 'Auswerten', afb: 'II', meaning: 'Daten, Messwerte oder Grafiken analysieren und physikalisch interpretieren.', example: 'Werte die Messdaten des Photoeffekts aus und bestimme das Planck\'sche Wirkungsquantum.' },
    { operator: 'Analysieren', afb: 'II', meaning: 'Einen komplexen Sachverhalt in seine Bestandteile zerlegen und die Zusammenhänge untersuchen.', example: 'Analysiere das gezeigte Spektrum und identifiziere Brems- und charakteristisches Spektrum.' },
    { operator: 'Beurteilen / Bewerten', afb: 'III', meaning: 'Einen Sachverhalt unter Anwendung von Kriterien einschätzen – ein begründetes Urteil fällen.', example: 'Beurteile, inwieweit das Bohr-Modell geeignet ist, die Spectrallinien des Wasserstoffs zu erklären.' },
    { operator: 'Diskutieren', afb: 'III', meaning: 'Argumente gegenüberstellen und abwägen – mehrere Perspektiven einnehmen.', example: 'Diskutiere das Konzept des Welle-Teilchen-Dualismus am Beispiel des Doppelspaltversuchs.' },
    { operator: 'Entwickeln / Entwerfen', afb: 'III', meaning: 'Einen neuen Lösungsweg, Versuch oder Ansatz eigenständig konzipieren.', example: 'Entwickle einen Versuch zur Bestimmung des Planckschen Wirkungsquantums.' },
];

const AFB_COLOR: Record<string, string> = { I: '#06d6a0', II: '#ffd166', III: '#ef233c' };
const ALL_TAGS = Array.from(new Set(GLOSSARY.flatMap(g => g.tags))).sort();

const Lexikon: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTag, setActiveTag] = useState<string>('Alle');
    const [activeTab, setActiveTab] = useState<'glossar' | 'operatoren'>('glossar');

    const filteredGlossary = GLOSSARY.filter(entry => {
        const matchesSearch = searchTerm === '' ||
            entry.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.definition.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTag = activeTag === 'Alle' || entry.tags.includes(activeTag);
        return matchesSearch && matchesTag;
    });

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '100px' }}>
            <header style={{ marginBottom: '2rem' }}>
                <h1 className="text-gradient" style={{ fontSize: '2.5rem', margin: 0 }}>
                    <BookOpen size={36} style={{ display: 'inline', marginRight: '0.75rem', verticalAlign: 'middle' }} />
                    Nachschlagewerk
                </h1>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Glossar der Fachbegriffe und NRW-Operatoren für das Abitur</p>
            </header>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
                {(['glossar', 'operatoren'] as const).map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)} style={{
                        padding: '0.6rem 1.5rem', borderRadius: '8px', cursor: 'pointer',
                        fontFamily: 'inherit', fontWeight: 600, fontSize: '0.95rem', transition: 'all 0.2s',
                        background: activeTab === tab ? 'rgba(0,240,255,0.15)' : 'transparent',
                        border: `1.5px solid ${activeTab === tab ? 'var(--accent-neon)' : 'rgba(255,255,255,0.1)'}`,
                        color: activeTab === tab ? 'var(--accent-neon)' : 'var(--text-muted)',
                    }}>
                        {tab === 'glossar' ? '📖 Glossar' : '📋 Operatoren (NRW)'}
                    </button>
                ))}
            </div>

            {activeTab === 'glossar' && (
                <>
                    {/* Search */}
                    <div style={{ position: 'relative', marginBottom: '1rem' }}>
                        <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Begriff suchen…"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem',
                                background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)',
                                borderRadius: '8px', color: 'var(--text-main)', fontFamily: 'inherit', fontSize: '1rem',
                            }}
                        />
                    </div>

                    {/* Tag filter */}
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                        {['Alle', ...ALL_TAGS].map(tag => (
                            <button key={tag} onClick={() => setActiveTag(tag)} style={{
                                padding: '0.25rem 0.75rem', borderRadius: '20px', cursor: 'pointer',
                                fontFamily: 'inherit', fontSize: '0.8rem', transition: 'all 0.2s',
                                background: activeTag === tag ? 'rgba(0,240,255,0.15)' : 'transparent',
                                border: `1px solid ${activeTag === tag ? 'var(--accent-neon)' : 'rgba(255,255,255,0.1)'}`,
                                color: activeTag === tag ? 'var(--accent-neon)' : 'var(--text-muted)',
                            }}>{tag}</button>
                        ))}
                    </div>

                    {/* Glossary entries */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {filteredGlossary.sort((a, b) => a.term.localeCompare(b.term)).map(entry => (
                            <div key={entry.term} className="glass-panel" style={{ padding: '1.25rem 1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--accent-neon)', fontWeight: 700 }}>{entry.term}</h3>
                                    <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', flexShrink: 0 }}>
                                        {entry.tags.map(t => (
                                            <span key={t} style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)' }}>{t}</span>
                                        ))}
                                    </div>
                                </div>
                                <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-muted)', lineHeight: 1.6 }}>{entry.definition}</p>
                            </div>
                        ))}
                        {filteredGlossary.length === 0 && (
                            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Kein Eintrag gefunden.</div>
                        )}
                    </div>
                </>
            )}

            {activeTab === 'operatoren' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {OPERATORS.map(op => (
                        <div key={op.operator} className="glass-panel" style={{ padding: '1.25rem 1.5rem', borderLeft: `4px solid ${AFB_COLOR[op.afb]}` }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-main)' }}>{op.operator}</h3>
                                <span style={{ padding: '0.2rem 0.6rem', borderRadius: '6px', background: `${AFB_COLOR[op.afb]}22`, border: `1px solid ${AFB_COLOR[op.afb]}`, color: AFB_COLOR[op.afb], fontSize: '0.8rem', fontWeight: 700 }}>AFB {op.afb}</span>
                            </div>
                            <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-muted)' }}>{op.meaning}</p>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-main)', fontStyle: 'italic', opacity: 0.7 }}>📝 Beispiel: „{op.example}"</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Lexikon;
