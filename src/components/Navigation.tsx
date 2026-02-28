import React from 'react';
import { Home, Compass, Award, User, Share2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', path: '/', icon: <Home size={24} /> },
        { name: 'Legekarten', path: '/strukturlegekarten', icon: <Share2 size={24} /> },
        { name: 'Entdecken', path: '/explore', icon: <Compass size={24} /> },
        { name: 'Abzeichen', path: '/badges', icon: <Award size={24} /> },
        { name: 'Profil', path: '/profile', icon: <User size={24} /> },
    ];

    return (
        <nav style={{
            position: 'fixed',
            bottom: 0,
            width: '100%',
            backgroundColor: 'rgba(21, 24, 34, 0.8)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderTop: '1px solid var(--border-color)',
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            zIndex: 50
        }}>
            {navItems.map(item => {
                const isActive = location.pathname === item.path;
                return (
                    <Link
                        key={item.name}
                        to={item.path}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.25rem',
                            color: isActive ? 'var(--accent-neon)' : 'var(--text-muted)',
                            transition: 'color 0.3s ease'
                        }}
                    >
                        <div style={{
                            filter: isActive ? 'drop-shadow(0 0 8px rgba(0, 240, 255, 0.6))' : 'none'
                        }}>
                            {item.icon}
                        </div>
                        <span style={{ fontSize: '0.75rem', fontWeight: isActive ? 600 : 400 }}>
                            {item.name}
                        </span>
                    </Link>
                )
            })}
        </nav>
    );
};

export default Navigation;
