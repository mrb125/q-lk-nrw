import React, { useState, useEffect, useRef } from 'react';
import { Palette } from 'lucide-react';

export type Theme = 'quantum' | 'dark' | 'space' | 'matrix';

const THEMES: { id: Theme; label: string; icon: string }[] = [
    { id: 'quantum', label: 'Quanten-Feld', icon: '🌌' },
    { id: 'space', label: 'Deep Space', icon: '🚀' },
    { id: 'matrix', label: 'Matrix', icon: '💻' },
    { id: 'dark', label: 'Minimal Dark', icon: '🌙' }
];

export const ThemeToggle: React.FC = () => {
    const [theme, setTheme] = useState<Theme>('quantum');
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const savedTheme = localStorage.getItem('q-lk-theme') as Theme;
        if (savedTheme && THEMES.some(t => t.id === savedTheme)) {
            setTheme(savedTheme);
            applyTheme(savedTheme);
        } else {
            applyTheme('quantum');
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const applyTheme = (newTheme: Theme) => {
        document.body.className = `theme-${newTheme}`;
    };

    const handleThemeChange = (newTheme: Theme) => {
        setTheme(newTheme);
        applyTheme(newTheme);
        localStorage.setItem('q-lk-theme', newTheme);
        setIsOpen(false);
    };

    return (
        <div ref={dropdownRef} style={{ position: 'relative' }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="glass-panel"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    color: 'var(--text-main)',
                    border: '1px solid var(--border-color)',
                    background: isOpen ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.2)',
                    transition: 'all 0.2s',
                    borderRadius: '8px'
                }}
            >
                <Palette size={18} color="var(--accent-neon)" />
                <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                    {THEMES.find(t => t.id === theme)?.icon}
                </span>
            </button>

            {isOpen && (
                <div className="glass-panel" style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '0.5rem',
                    minWidth: '200px',
                    padding: '0.5rem',
                    zIndex: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem'
                }}>
                    <div style={{ padding: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid var(--border-color)', marginBottom: '0.25rem' }}>
                        Design wählen
                    </div>
                    {THEMES.map(t => (
                        <button
                            key={t.id}
                            onClick={() => handleThemeChange(t.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem 1rem',
                                width: '100%',
                                textAlign: 'left',
                                cursor: 'pointer',
                                background: theme === t.id ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
                                border: 'none',
                                borderRadius: '6px',
                                color: theme === t.id ? 'var(--accent-neon)' : 'var(--text-main)',
                                transition: 'background 0.2s',
                            }}
                            onMouseEnter={(e) => {
                                if (theme !== t.id) e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                            }}
                            onMouseLeave={(e) => {
                                if (theme !== t.id) e.currentTarget.style.background = 'transparent';
                            }}
                        >
                            <span style={{ fontSize: '1.2rem' }}>{t.icon}</span>
                            <span style={{ fontSize: '0.9rem', fontWeight: theme === t.id ? 600 : 400 }}>{t.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
