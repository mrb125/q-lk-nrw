import React from 'react';
import { BookOpen } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface FormulaSection {
    title: string;
    formulas: { name: string; formula: string; description: string }[];
}

const formulaData: FormulaSection[] = [
    {
        title: "Photonen & Lichtquanten",
        formulas: [
            { name: "Photonenenergie", formula: "E = h \\cdot f = \\frac{h \\cdot c}{\\lambda}", description: "Energie eines einzelnen Photons abhängig von Frequenz f oder Wellenlänge $\\lambda$." },
            { name: "Photonenimpuls", formula: "p = \\frac{E}{c} = \\frac{h}{\\lambda}", description: "Inhärent relativistischer Impuls eines masselosen Photons." },
            { name: "Äquivalenz Masse-Energie", formula: "E = m \\cdot c^2", description: "Einsteinsche Energie-Masse-Äquivalenz." },
        ]
    },
    {
        title: "Photoelektrischer Effekt",
        formulas: [
            { name: "Kinetische Energie", formula: "E_{kin} = h \\cdot f - W_A", description: "Maximal kinetische Energie der Fotoelektronen. $W_{A}$ ist die materialabhängige Austrittsarbeit." },
            { name: "Gegenfeldmethode", formula: "E_{kin, max} = e \\cdot U_g", description: "Experimentelle Bestimmung von $E_{kin, max}$ durch die Gegenspannung $U_g$." },
            { name: "Grenzfrequenz", formula: "f_{G} = \\frac{W_A}{h}", description: "Minimale Frequenz, bei der Elektronen ausgelöst werden (Auslösung ohne restliche kinetische Energie)." }
        ]
    },
    {
        title: "Materiewellen",
        formulas: [
            { name: "De-Broglie-Wellenlänge", formula: "\\lambda = \\frac{h}{p} = \\frac{h}{m \\cdot v}", description: "Jedem Teilchen mit dem Impuls p kann eine Wellenlänge $\\lambda$ zugeordnet werden." },
            { name: "Kinetische Energie (Teilchen)", formula: "E_{kin} = \\frac{1}{2}m v^2 = \\frac{p^2}{2m}", description: "Klassische kinetische Energie eines Elektrons oder anderen Teilchens." },
            { name: "Beschleunigungsarbeit", formula: "E = e \\cdot U_B", description: "Energie eines Elektrons nach Durchlaufen einer Beschleunigungsspannung $U_B$." }
        ]
    },
    {
        title: "Röntgenstrahlung & Bragg-Reflexion",
        formulas: [
            { name: "Bragg-Bedingung", formula: "n \\cdot \\lambda = 2d \\cdot \\sin(\\alpha)", description: "Bedingung für konstruktive Interferenz am Kristallgitter (Glanzwinkel $\\alpha$, Netzebenenabstand d)." },
            { name: "Grenzwellenlänge", formula: "\\lambda_{g} = \\frac{h \\cdot c}{e \\cdot U_A}", description: "Minimale Wellenlänge der Röntgenbremsstrahlung bei Anodenspannung $U_A$ (Duane-Hunt-Gesetz)." }
        ]
    },
    {
        title: "Heisenbergsche Unschärferelation",
        formulas: [
            { name: "Ort-Impuls-Unschärfe", formula: "\\Delta x \\cdot \\Delta p \\ge \\frac{h}{4\\pi}", description: "Ort und Impuls eines Objekts können nicht gleichzeitig beliebig genau bestimmt werden." },
            { name: "Energie-Zeit-Unschärfe", formula: "\\Delta E \\cdot \\Delta t \\ge \\frac{h}{4\\pi}", description: "Sinnvolle Erweiterung: Energie kann kurzzeitig umso mehr schwanken, je kürzer das Zeitfenster ist." }
        ]
    }
];

const Formulas: React.FC = () => {
    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '100px' }}>
            <header style={{ marginBottom: '3rem' }}>
                <h1 className="text-gradient" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: 0 }}>
                    <BookOpen size={36} /> Formelsammlung & Konstanten
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginTop: '0.5rem' }}>
                    Die wichtigsten Gleichungen für das Quantenphysik-Abitur NRW.
                </p>
            </header>

            <section style={{ marginBottom: '4rem' }}>
                <h2 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1.5rem', color: 'var(--accent-purple)' }}>Wichtige Naturkonstanten</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                    <div className="glass-panel" style={{ padding: '1rem' }}>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Plancksches Wirkungsquantum (h)</div>
                        <div style={{ fontSize: '1.2rem', marginTop: '0.25rem' }}><InlineMath math="6{,}626 \cdot 10^{-34} \text{ Js}" /></div>
                        <div style={{ fontSize: '1.2rem', marginTop: '0.25rem' }}><InlineMath math="4{,}136 \cdot 10^{-15} \text{ eVs}" /></div>
                    </div>
                    <div className="glass-panel" style={{ padding: '1rem' }}>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Lichtgeschwindigkeit (c)</div>
                        <div style={{ fontSize: '1.2rem', marginTop: '0.25rem' }}><InlineMath math="2{,}998 \cdot 10^{8} \frac{\text{m}}{\text{s}}" /></div>
                    </div>
                    <div className="glass-panel" style={{ padding: '1rem' }}>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Elementarladung (e)</div>
                        <div style={{ fontSize: '1.2rem', marginTop: '0.25rem' }}><InlineMath math="1{,}602 \cdot 10^{-19} \text{ C}" /></div>
                    </div>
                    <div className="glass-panel" style={{ padding: '1rem' }}>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Elektronenmasse (m_e)</div>
                        <div style={{ fontSize: '1.2rem', marginTop: '0.25rem' }}><InlineMath math="9{,}109 \cdot 10^{-31} \text{ kg}" /></div>
                    </div>
                </div>
            </section>

            {formulaData.map((section, idx) => (
                <section key={idx} style={{ marginBottom: '3rem' }}>
                    <h2 style={{
                        borderBottom: '1px solid var(--border-color)',
                        paddingBottom: '0.5rem',
                        marginBottom: '1.5rem',
                        color: 'var(--accent-green)'
                    }}>
                        {section.title}
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {section.formulas.map((item, fIdx) => (
                            <div key={fIdx} className="glass-panel hover-scale" style={{ padding: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center' }}>
                                <div style={{ minWidth: '250px', flex: 1 }}>
                                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: 'white' }}>{item.name}</h3>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                                        {/* Use a simple regex to parse embedded math in description like $formula$ */}
                                        {item.description.split('$').map((part, i) =>
                                            i % 2 === 1 ? <InlineMath key={i} math={part} /> : <span key={i}>{part}</span>
                                        )}
                                    </div>
                                </div>
                                <div style={{
                                    flex: 2,
                                    minWidth: '300px',
                                    background: 'rgba(0,0,0,0.3)',
                                    padding: '1rem',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    border: '1px solid rgba(255,255,255,0.05)'
                                }}>
                                    <BlockMath math={item.formula} />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default Formulas;
