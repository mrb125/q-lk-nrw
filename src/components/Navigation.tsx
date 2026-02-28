import React from 'react';
import { Home, Compass, Share2, Brain, BarChart2, GraduationCap, Trophy } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', path: '/', icon: <Home size={22} /> },
        { name: 'Legekarten', path: '/strukturlegekarten', icon: <Share2 size={22} /> },
        { name: 'Entdecken', path: '/explore', icon: <Compass size={22} /> },
        { name: 'Trainer', path: '/flashcards', icon: <Brain size={22} /> },
        { name: 'Auswertung', path: '/auswertung', icon: <BarChart2 size={22} /> },
    ];

    const secondaryItems = [
        { name: 'Abitur', path: '/abitur', icon: <GraduationCap size={22} /> },
        { name: 'Abzeichen', path: '/badges', icon: <Trophy size={22} /> },
    ];

    const allItems = [...navItems, ...secondaryItems];

    return (
        <nav style={{
            position: 'fixed', bottom: 0, width: '100%',
            backgroundColor: 'rgba(21, 24, 34, 0.9)',
            backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            borderTop: '1px solid var(--border-color)',
            padding: '0.75rem 1rem',
            display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 50
        }}>
            {allItems.map(item => {
                const isActive = location.pathname === item.path;
                return (
                    <Link key={item.name} to={item.path} style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem',
                        color: isActive ? 'var(--accent-neon)' : 'var(--text-muted)',
                        transition: 'color 0.3s ease', textDecoration: 'none'
                    }}>
                        <div style={{ filter: isActive ? 'drop-shadow(0 0 6px rgba(0, 240, 255, 0.6))' : 'none', transition: 'filter 0.3s' }}>
                            {item.icon}
                        </div>
                        <span style={{ fontSize: '0.65rem', fontWeight: isActive ? 700 : 400 }}>{item.name}</span>
                    </Link>
                );
            })}
        </nav>
    );
};

export default Navigation;
