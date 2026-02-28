import React from 'react';
import type { ModuleData } from '../data/modules';
import ProgressRing from './ProgressRing';
import * as Icons from 'lucide-react';

interface ModuleCardProps {
    data: ModuleData;
    onClick: () => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ data, onClick }) => {
    // Dynamically resolve icon based on string name stored in data
    const IconComponent = (Icons as any)[data.iconName] || Icons.Circle;

    return (
        <div
            className="glass-panel hover-glow"
            onClick={onClick}
            style={{
                padding: '1.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                marginBottom: '1rem',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '1rem',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-purple)'
            }}>
                <IconComponent size={32} />
            </div>

            <div style={{ flex: 1, paddingRight: '1rem' }}>

                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>
                    {data.title}
                </h3>
                <p style={{ margin: '0.25rem 0 0', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    {data.description}
                </p>
            </div>

            <div className="flex-center">
                <ProgressRing progress={data.progress} size={50} strokeWidth={5} />
            </div>

            {/* Decorative gradient overlay on hover handled generally by CSS, or we can add specific ones */}
        </div>
    );
};

export default ModuleCard;
