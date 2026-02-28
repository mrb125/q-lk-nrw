import React from 'react';
import { Zap } from 'lucide-react';

interface TheoryBiteProps {
    title: string;
    classicalText: string;
    quantumText: string;
    isRevealed?: boolean;
}

const TheoryBite: React.FC<TheoryBiteProps> = ({ title, classicalText, quantumText, isRevealed = false }) => {
    return (
        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem', position: 'relative', overflow: 'hidden' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Zap color="var(--accent-neon)" size={24} /> {title}
            </h3>

            <div style={{ padding: '1.5rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', borderLeft: '4px solid var(--text-muted)' }}>
                <p style={{ margin: 0, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Klassische Sicht</p>
                <p style={{ fontSize: '1.1rem', fontStyle: 'italic' }}>"{classicalText}"</p>
            </div>

            {isRevealed && quantumText && (
                <div style={{
                    marginTop: '1.5rem',
                    padding: '1.5rem',
                    background: 'rgba(176, 82, 240, 0.1)',
                    borderRadius: '12px',
                    borderLeft: '4px solid var(--accent-purple)',
                    animation: 'fadeIn 0.5s ease-out'
                }}>
                    <p style={{ margin: 0, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--accent-purple)', marginBottom: '0.5rem', fontWeight: 600 }}>Quanten-Sicht</p>
                    <p style={{ fontSize: '1.1rem', textShadow: '0 0 10px rgba(176, 82, 240, 0.3)' }}>{quantumText}</p>
                </div>
            )}

        </div>
    );
};

export default TheoryBite;
