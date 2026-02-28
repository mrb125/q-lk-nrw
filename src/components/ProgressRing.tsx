import React from 'react';

interface ProgressRingProps {
    progress: number; // 0 to 100
    size?: number;
    strokeWidth?: number;
    color?: string;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
    progress,
    size = 60,
    strokeWidth = 6,
    color = 'var(--accent-neon)'
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
                {/* Background track */}
                <circle
                    stroke="var(--bg-elevated)"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                {/* Progress indicator */}
                <circle
                    stroke={color}
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset: offset, transition: 'stroke-dashoffset 0.5s ease-in-out' }}
                    strokeLinecap="round"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
            </svg>
            {/* Percentage Text */}
            <div style={{ position: 'absolute', fontSize: `${size * 0.25}px`, fontWeight: '600' }}>
                {progress}%
            </div>
        </div>
    );
};

export default ProgressRing;
