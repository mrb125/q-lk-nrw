import React from 'react';
import { useNavigate } from 'react-router-dom';
import { modules } from '../data/modules';
import ModuleCard from '../components/ModuleCard';
import { Sparkles } from 'lucide-react';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    const handleModuleClick = (id: string) => {
        navigate(`/module/${id}`);
    };

    const totalProgress = Math.round(
        modules.reduce((acc, mod) => acc + mod.progress, 0) / modules.length
    );

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 700, margin: 0 }}>
                    Willkommen zurück, <br />
                    <span className="text-gradient">Physik LK</span>
                </h1>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    Dein Fortschritt in der Quantenphysik
                </p>

                {/* Global Progress Bar */}
                <div className="glass-panel" style={{ marginTop: '1.5rem', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: 'rgba(0, 240, 255, 0.1)', padding: '0.75rem', borderRadius: '50%', color: 'var(--accent-neon)' }}>
                        <Sparkles size={28} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span style={{ fontWeight: 600 }}>Gesamtfortschritt</span>
                            <span className="text-gradient" style={{ fontWeight: 700 }}>{totalProgress}%</span>
                        </div>
                        <div style={{ height: '8px', background: 'var(--bg-elevated)', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{
                                height: '100%',
                                width: `${totalProgress}%`,
                                background: 'linear-gradient(90deg, var(--accent-neon), var(--accent-purple))',
                                borderRadius: '4px'
                            }} />
                        </div>
                    </div>
                </div>
            </header>

            <section>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Lernmodule</h2>
                {modules.filter(m => !m.isBonus).map(mod => (
                    <ModuleCard
                        key={mod.id}
                        data={mod}
                        onClick={() => handleModuleClick(mod.id)}
                    />
                ))}
            </section>

            <section style={{ marginTop: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', margin: 0 }}>⭐ Bonus-Level</h2>
                    <span style={{
                        background: 'rgba(255,209,102,0.15)',
                        color: '#ffd166',
                        border: '1px solid #ffd166',
                        padding: '0.15rem 0.6rem',
                        borderRadius: '99px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                    }}>Über den Lehrplan hinaus</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                    Faszinierende Themen für neugierige Köpfe – nicht abiturrelevant, aber spannend.
                </p>
                {modules.filter(m => m.isBonus).map(mod => (
                    <ModuleCard
                        key={mod.id}
                        data={mod}
                        onClick={() => handleModuleClick(mod.id)}
                    />
                ))}
            </section>
        </div>
    );
};

export default Dashboard;
