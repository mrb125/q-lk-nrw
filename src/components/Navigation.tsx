import React from 'react';
import { Home, Compass, Share2, Brain, BarChart2, GraduationCap, Trophy, Zap, BookOpen } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', path: '/', icon: <Home size={20} /> },
        { name: 'Legekarten', path: '/strukturlegekarten', icon: <Share2 size={20} /> },
        { name: 'Trainer', path: '/flashcards', icon: <Brain size={20} /> },
        { name: 'Quiz', path: '/quiz', icon: <Zap size={20} /> },
        { name: 'Lexikon', path: '/lexikon', icon: <BookOpen size={20} /> },
        { name: 'Auswertung', path: '/auswertung', icon: <BarChart2 size={20} /> },
        { name: 'Entdecken', path: '/explore', icon: <Compass size={20} /> },
        { name: 'Abitur', path: '/abitur', icon: <GraduationCap size={20} /> },
        { name: 'Abzeichen', path: '/badges', icon: <Trophy size={20} /> },
    ];

    return (
        <nav style={{
            position: 'fixed', bottom: 0, width: '100%',
            backgroundColor: 'rgba(21, 24, 34, 0.95)',
            backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            borderTop: '1px solid var(--border-color)',
            padding: '0.5rem 0.5rem',
            display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 50,
            overflowX: 'auto',
            gap: '0.25rem',
        }}>
            {navItems.map(item => {
                const isActive = location.pathname === item.path;
                return (
                    <Link key={item.name} to={item.path} style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.15rem',
                        color: isActive ? 'var(--accent-neon)' : 'var(--text-muted)',
                        transition: 'color 0.3s ease', textDecoration: 'none',
                        flexShrink: 0, padding: '0.25rem 0.5rem',
                        borderRadius: '8px',
                        background: isActive ? 'rgba(0,240,255,0.08)' : 'transparent',
                    }}>
                        <div style={{ filter: isActive ? 'drop-shadow(0 0 6px rgba(0, 240, 255, 0.6))' : 'none', transition: 'filter 0.3s' }}>
                            {item.icon}
                        </div>
                        <span style={{ fontSize: '0.6rem', fontWeight: isActive ? 700 : 400, whiteSpace: 'nowrap' }}>{item.name}</span>
                    </Link>
                );
            })}
        </nav>
    );
};

export default Navigation;
