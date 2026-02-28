import React, { useState } from 'react';
import { FileText, CheckCircle2 } from 'lucide-react';

interface AbiturTaskProps {
    afb: 'I' | 'II' | 'III';
    operator: string;
    question: string;
    answer: string;
    forceShow?: boolean;
}

const AbiturTask: React.FC<AbiturTaskProps> = ({ afb, operator, question, answer, forceShow = false }) => {
    const [showAnswer, setShowAnswer] = useState(false);
    const isVisible = showAnswer || forceShow;

    // Farbcodierung für Anforderungsbereiche
    const afbColors = {
        'I': '#39ff14', // Green
        'II': '#00f0ff', // Cyan
        'III': '#b052f0' // Purple
    };

    const color = afbColors[afb];

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem', borderLeft: `4px solid ${color}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FileText size={20} color={color} />
                    <span style={{ fontWeight: 600, color }}>Erwartungshorizont AFB {afb}</span>
                </div>
                <span style={{
                    background: 'rgba(255,255,255,0.1)',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    letterSpacing: '1px',
                    textTransform: 'uppercase'
                }}>
                    Operator: {operator}
                </span>
            </div>

            <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                {question}
            </p>

            {!isVisible ? (
                <button
                    onClick={() => setShowAnswer(true)}
                    style={{
                        background: 'transparent',
                        border: `1px solid ${color}`,
                        color: color,
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.background = `${color}22`;
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.background = 'transparent';
                    }}
                >
                    Lösungsvorschlag anzeigen
                </button>
            ) : (
                <div style={{
                    background: 'rgba(255,255,255,0.03)',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginTop: '1rem',
                    animation: 'fadeIn 0.3s ease-out'
                }}>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', margin: '0 0 0.5rem 0' }}>
                        <CheckCircle2 size={18} color="var(--accent-green)" />
                        Musterlösung / Kernbegriffe
                    </h4>
                    <p style={{ color: 'var(--text-muted)', margin: 0, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                        {answer}
                    </p>
                </div>
            )}
        </div>
    );
};

export default AbiturTask;
