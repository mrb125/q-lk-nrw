import React from 'react';
import type { ResourceData } from '../data/modules';
import { Youtube, ExternalLink, BookOpen, Clock } from 'lucide-react';

interface ResourceLinksProps {
    resources: ResourceData[];
    sectionNumber?: string;
}

const ResourceLinks: React.FC<ResourceLinksProps> = ({ resources, sectionNumber = "3" }) => {
    return (
        <section style={{ marginTop: '4rem', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <BookOpen size={24} color="var(--accent-neon)" />
                {sectionNumber}. Weiterführende Ressourcen & Selbststudium
            </h2>

            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                {resources.map((res) => (
                    <a
                        key={res.url}
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-panel hover-glow"
                        style={{
                            padding: '1.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.75rem',
                            transition: 'transform 0.2s ease',
                            textDecoration: 'none'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{
                                background: res.type === 'video' ? 'rgba(255, 0, 0, 0.1)' : 'rgba(0, 240, 255, 0.1)',
                                padding: '0.5rem',
                                borderRadius: '8px',
                                color: res.type === 'video' ? '#ff4040' : 'var(--accent-neon)'
                            }}>
                                {res.type === 'video' ? <Youtube size={20} /> : <ExternalLink size={20} />}
                            </div>
                            {res.duration && (
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    <Clock size={12} /> {res.duration}
                                </span>
                            )}
                        </div>

                        <div>
                            <h4 style={{ color: 'var(--text-main)', marginBottom: '0.25rem' }}>{res.title}</h4>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                                {res.description}
                            </p>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default ResourceLinks;
