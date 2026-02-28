import React from 'react';
import { useNavigate } from 'react-router-dom';
import { modules } from '../data/modules';
import { Compass, BookOpen } from 'lucide-react';

const Explore: React.FC = () => {
    const navigate = useNavigate();

    const handleTopicClick = (id: string) => {
        navigate(`/module/${id}`);
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Compass size={36} className="text-gradient" />
                    Entdecken
                </h1>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    Stöbere durch alle Themen und Module der Quantenphysik.
                </p>
            </header>

            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                {modules.map(mod => (
                    <div
                        key={mod.id}
                        className="glass-panel hover-glow"
                        style={{ padding: '1.5rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '1rem' }}
                        onClick={() => handleTopicClick(mod.id)}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-purple)' }}>
                            <BookOpen size={20} />
                            <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{mod.title}</h3>
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0, flex: 1 }}>
                            Klicke hier, um die Inhalte, Simulationen und Aufgaben zu diesem Thema zu erkunden.
                        </p>
                        <div style={{ fontSize: '0.8rem', color: 'var(--accent-neon)', fontWeight: 'bold' }}>
                            {((mod.theoryBites?.length || 0) + (mod.abiturTasks?.length || 0) + (mod.resources?.length || 0))} Lerneinheiten
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Explore;
