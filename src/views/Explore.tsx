import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, BookOpen, ExternalLink } from 'lucide-react';

const externalLinks = [
    {
        title: "LEIFIphysik - Quantenphysik",
        description: "Umfangreiche Erklärungen, Aufgaben und historische Versuche zur Quantenphysik auf Schulniveau.",
        url: "https://www.leifiphysik.de/quantenphysik",
        meta: "Fachportal"
    },
    {
        title: "PhET Simulationen",
        description: "Interaktive HTML5-Simulationen zum selbstständigen Experimentieren (z.B. Photoeffekt, Quanteninterferenz).",
        url: "https://phet.colorado.edu/de/simulations/filter?subjects=quantum-phenomena",
        meta: "Simulationen"
    },
    {
        title: "Welt der Physik",
        description: "Aktuelle Artikel, Podcasts und Hintergrundwissen zur modernen physikalischen Forschung.",
        url: "https://www.weltderphysik.de/gebiet/materie/quantenphysik/",
        meta: "Wissenschaft"
    },
    {
        title: "Max-Planck-Gesellschaft",
        description: "Einblicke in die Spitzenforschung im Bereich der Quantenoptik und Grundlagenforschung.",
        url: "https://www.mpg.de/themen/quantenphysik",
        meta: "Forschung"
    }
];

const Explore: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Compass size={36} className="text-gradient" />
                    Entdecken
                </h1>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    Weiterführende externe Links und Ressourcen zum Thema Quantenphysik.
                </p>
            </header>

            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                <div
                    className="glass-panel hover-glow"
                    style={{ padding: '1.5rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '2px solid var(--accent-green)' }}
                    onClick={() => navigate('/formulas')}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-green)' }}>
                        <BookOpen size={24} />
                        <h3 style={{ margin: 0, fontSize: '1.3rem' }}>Formelsammlung</h3>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0, flex: 1 }}>
                        Zentrale Konstanten und Formeln für das Quantenphysik-Abitur (NRW) in der kompakten Übersicht.
                    </p>
                    <div style={{ fontSize: '0.8rem', color: 'var(--accent-green)', fontWeight: 'bold' }}>
                        Intern
                    </div>
                </div>

                {externalLinks.map((link, idx) => (
                    <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="glass-panel hover-glow"
                        style={{ padding: '1.5rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '1rem', textDecoration: 'none', color: 'inherit' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-purple)' }}>
                            <ExternalLink size={20} />
                            <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{link.title}</h3>
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0, flex: 1 }}>
                            {link.description}
                        </p>
                        <div style={{ fontSize: '0.8rem', color: 'var(--accent-neon)', fontWeight: 'bold' }}>
                            {link.meta}
                        </div>
                    </a>
                ))}
            </section>
        </div>
    );
};

export default Explore;
