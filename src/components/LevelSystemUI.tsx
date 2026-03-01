import React, { useState, useEffect } from 'react';
import { getXP, getCurrentLevel, getNextLevel, getLevelProgress } from '../utils/xpSystem';

export const LevelSystemUI: React.FC = () => {
    const [xp, setXp] = useState<number>(() => getXP());
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        // Listen for XP updates from anywhere in the app
        const handleXpUpdate = () => {
            setXp(getXP());
        };

        window.addEventListener('xp-updated', handleXpUpdate);
        return () => window.removeEventListener('xp-updated', handleXpUpdate);
    }, []);

    const currentLevel = getCurrentLevel(xp);
    const nextLevel = getNextLevel(xp);
    const progress = getLevelProgress(xp);

    return (
        <div
            className="glass-panel"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                background: 'rgba(21, 24, 34, 0.8)',
                cursor: 'default',
                position: 'relative',
                transition: 'all 0.3s ease',
                width: isHovered ? '280px' : 'auto',
            }}
        >
            <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent-neon), var(--accent-purple))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '1rem',
                boxShadow: '0 0 10px rgba(0, 240, 255, 0.3)',
                flexShrink: 0
            }}>
                {currentLevel.level}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {currentLevel.title}
                    </span>
                    {isHovered && nextLevel && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {xp} / {nextLevel.xpRequired} XP
                        </span>
                    )}
                </div>

                {/* Progress Bar Container */}
                <div style={{
                    width: '100%',
                    height: '4px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    position: 'relative',
                    transition: 'height 0.2s',
                    ...(isHovered && { height: '8px' })
                }}>
                    {/* Active Progress */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: `${progress}%`,
                        background: 'linear-gradient(90deg, var(--accent-neon), var(--accent-purple))',
                        borderRadius: '2px',
                        transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }} />
                </div>
            </div>

            {isHovered && !nextLevel && (
                <div className="text-gradient" style={{ fontSize: '0.7rem', fontWeight: 700, marginLeft: 'auto' }}>
                    MAX LEVEL
                </div>
            )}
        </div>
    );
};
