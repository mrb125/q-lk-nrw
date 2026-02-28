import React, { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';
import { BADGES, getEarnedBadges } from '../data/badges';

const Badges: React.FC = () => {
    const [earned, setEarned] = useState<Set<string>>(new Set());

    useEffect(() => {
        setEarned(getEarnedBadges());
    }, []);

    const earnedList = BADGES.filter(b => earned.has(b.id));
    const lockedList = BADGES.filter(b => !earned.has(b.id));

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '100px' }}>
            <header style={{ marginBottom: '2rem' }}>
                <h1 className="text-gradient" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: 0 }}>
                    <Trophy size={36} /> Meine Abzeichen
                </h1>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    {earnedList.length} / {BADGES.length} Abzeichen freigeschaltet
                </p>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', marginTop: '0.75rem', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(earnedList.length / BADGES.length) * 100}%`, background: 'var(--accent-neon)', transition: 'width 0.4s ease' }} />
                </div>
            </header>

            {earnedList.length > 0 && (
                <section style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.1rem', color: 'var(--accent-green)', marginBottom: '1rem' }}>✓ Erhalten</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                        {earnedList.map(b => (
                            <div key={b.id} className="glass-panel hover-scale" style={{ padding: '1.25rem', textAlign: 'center', borderTop: '2px solid var(--accent-neon)' }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{b.icon}</div>
                                <h3 style={{ margin: '0 0 0.4rem 0', fontSize: '1rem', color: 'var(--accent-neon)' }}>{b.name}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0, lineHeight: 1.4 }}>{b.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <section>
                <h2 style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>🔒 Noch gesperrt</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                    {lockedList.map(b => (
                        <div key={b.id} className="glass-panel" style={{ padding: '1.25rem', textAlign: 'center', opacity: 0.45 }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem', filter: 'grayscale(1)' }}>{b.icon}</div>
                            <h3 style={{ margin: '0 0 0.4rem 0', fontSize: '1rem' }}>???</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0, lineHeight: 1.4 }}>{b.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Badges;
