import React, { useRef, useEffect, useState, useCallback } from 'react';

const PHOTON_SPEED = 2.5;

interface Photon {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    arm: 'upper' | 'lower' | null;
    detected: boolean;
    opacity: number;
}

const MachZehnderSimulation: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef = useRef<number>(0);
    const photonsRef = useRef<Photon[]>([]);
    const nextIdRef = useRef(0);
    const [detectorEnabled, setDetectorEnabled] = useState(false);
    const detectorRef = useRef(false);
    const drawRef = useRef<() => void>(() => { /* placeholder */ });

    useEffect(() => { detectorRef.current = detectorEnabled; }, [detectorEnabled]);

    const spawnPhoton = useCallback(() => {
        photonsRef.current.push({
            id: nextIdRef.current++,
            x: 30, y: 150,
            vx: PHOTON_SPEED, vy: 0,
            arm: null, detected: false, opacity: 1
        });
    }, []);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const W = canvas.width;
        const H = canvas.height;
        ctx.clearRect(0, 0, W, H);

        // Layout constants
        const BS1 = { x: 120, y: 150 }; // Beamsplitter 1
        const BS2 = { x: 480, y: 150 }; // Beamsplitter 2
        const MIRROR_UP = { x: 300, y: 60 };
        const MIRROR_DOWN = { x: 300, y: 240 };
        const DETECTOR_X = 560;

        // Draw beam paths (guide lines)
        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        // Lower arm
        ctx.beginPath(); ctx.moveTo(BS1.x, BS1.y); ctx.lineTo(MIRROR_DOWN.x, MIRROR_DOWN.y); ctx.lineTo(BS2.x, BS2.y); ctx.stroke();
        // Upper arm
        ctx.beginPath(); ctx.moveTo(BS1.x, BS1.y); ctx.lineTo(MIRROR_UP.x, MIRROR_UP.y); ctx.lineTo(BS2.x, BS2.y); ctx.stroke();
        // Input / output
        ctx.beginPath(); ctx.moveTo(30, BS1.y); ctx.lineTo(BS1.x, BS1.y); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(BS2.x, BS2.y); ctx.lineTo(DETECTOR_X, BS2.y); ctx.stroke();
        ctx.setLineDash([]);

        // Draw optical elements
        const drawElement = (label: string, x: number, y: number, angle: number = 45) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate((angle * Math.PI) / 180);
            ctx.fillStyle = 'rgba(0,240,255,0.15)';
            ctx.strokeStyle = 'rgba(0,240,255,0.7)';
            ctx.lineWidth = 2;
            ctx.fillRect(-18, -4, 36, 8);
            ctx.strokeRect(-18, -4, 36, 8);
            ctx.restore();
            ctx.fillStyle = 'rgba(0,240,255,0.7)';
            ctx.font = 'bold 10px Outfit';
            ctx.fillText(label, x - 10, y - 14);
        };
        drawElement('BS1', BS1.x, BS1.y);
        drawElement('BS2', BS2.x, BS2.y);
        drawElement('M1', MIRROR_UP.x, MIRROR_UP.y);
        drawElement('M2', MIRROR_DOWN.x, MIRROR_DOWN.y);

        // Detector
        const detColor = detectorRef.current ? '#ff6b6b' : '#39ff14';
        ctx.fillStyle = detectorRef.current ? 'rgba(255,107,107,0.2)' : 'rgba(57,255,20,0.1)';
        ctx.strokeStyle = detColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(DETECTOR_X - 2, BS2.y - 25, 20, 50, 4);
        ctx.fill(); ctx.stroke();
        ctx.fillStyle = detColor;
        ctx.font = 'bold 9px Outfit';
        ctx.fillText('D', DETECTOR_X + 3, BS2.y + 4);

        if (detectorRef.current) {
            // Also detector on upper arm
            ctx.fillStyle = 'rgba(255,107,107,0.2)';
            ctx.strokeStyle = '#ff6b6b';
            ctx.beginPath();
            ctx.roundRect(MIRROR_UP.x + 10, MIRROR_UP.y - 20, 20, 40, 4);
            ctx.fill(); ctx.stroke();
            ctx.fillStyle = '#ff6b6b';
            ctx.fillText('D', MIRROR_UP.x + 16, MIRROR_UP.y + 4);
        }

        // Update and draw photons
        photonsRef.current = photonsRef.current.filter(p => p.opacity > 0.05);
        photonsRef.current.forEach(p => {
            // State machine for photon path
            if (!p.detected) {
                // Beamsplitter 1
                if (Math.abs(p.x - BS1.x) < 3 && p.arm === null) {
                    p.arm = Math.random() < 0.5 ? 'upper' : 'lower';
                    if (p.arm === 'upper') { p.vx = 0; p.vy = -PHOTON_SPEED; }
                    else { p.vx = 0; p.vy = PHOTON_SPEED; }
                }
                // Mirror upper
                if (p.arm === 'upper' && Math.abs(p.y - MIRROR_UP.y) < 3 && p.vy < 0) {
                    p.vy = 0; p.vx = PHOTON_SPEED;
                    if (detectorRef.current) { p.detected = true; p.opacity = 1; }
                }
                // Mirror lower
                if (p.arm === 'lower' && Math.abs(p.y - MIRROR_DOWN.y) < 3 && p.vy > 0) {
                    p.vy = 0; p.vx = PHOTON_SPEED;
                }
                // Beamsplitter 2
                if (Math.abs(p.x - BS2.x) < 3 && !p.detected && p.arm !== null) {
                    p.vx = PHOTON_SPEED; p.vy = 0;
                    p.detected = true;
                }

                p.x += p.vx;
                p.y += p.vy;

                if (p.x > DETECTOR_X + 30) p.opacity -= 0.08;
            } else {
                p.opacity -= 0.06;
            }

            // Draw photon
            const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 8);
            grd.addColorStop(0, `rgba(255,220,0,${p.opacity})`);
            grd.addColorStop(1, `rgba(255,140,0,0)`);
            ctx.fillStyle = grd;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
            ctx.fill();
        });

        // Labels
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.font = '11px Outfit';
        ctx.fillText('Photon →', 32, 140);
        ctx.fillText(detectorRef.current ? '⚠ Welcher-Weg-Info aktiv' : '✓ Kein Detektor', 180, 30);
        ctx.fillStyle = detectorRef.current ? '#ff6b6b' : '#39ff14';
        ctx.font = 'bold 11px Outfit';

        animRef.current = requestAnimationFrame(drawRef.current);
    }, []);

    useEffect(() => {
        drawRef.current = draw;
        animRef.current = requestAnimationFrame(draw);
        const spawnInterval = setInterval(spawnPhoton, 800);
        return () => {
            cancelAnimationFrame(animRef.current);
            clearInterval(spawnInterval);
        };
    }, [draw, spawnPhoton]);

    return (
        <div style={{ padding: '1rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>Mach-Zehnder-Interferometer (Quantenradierer)</h3>

            <canvas ref={canvasRef} width={600} height={300} style={{ width: '100%', borderRadius: '8px', background: 'rgba(0,0,0,0.4)' }} />

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1.25rem', flexWrap: 'wrap' }}>
                <button
                    onClick={() => setDetectorEnabled(d => !d)}
                    style={{
                        padding: '0.6rem 1.25rem', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600,
                        background: detectorEnabled ? 'rgba(255,107,107,0.15)' : 'rgba(57,255,20,0.1)',
                        border: `2px solid ${detectorEnabled ? '#ff6b6b' : '#39ff14'}`,
                        color: detectorEnabled ? '#ff6b6b' : '#39ff14',
                        transition: 'all 0.3s'
                    }}>
                    {detectorEnabled ? '🔴 Detektor AN (Welcher-Weg aktiv)' : '🟢 Detektor AUS (Quantenradierer)'}
                </button>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {detectorEnabled
                        ? '→ Messung zerstört die Interferenz – Teilchenverhalten!'
                        : '→ Kein Welcher-Weg-Wissen → Interferenz!'}
                </span>
            </div>

            <div style={{ background: 'rgba(0,240,255,0.05)', border: '1px solid rgba(0,240,255,0.2)', borderRadius: '8px', padding: '1rem', marginTop: '1rem' }}>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    💡 <strong style={{ color: 'var(--text-main)' }}>Ohne Detektor:</strong> Das Photon nimmt "beide Wege gleichzeitig" und interferiert mit sich selbst → immer konstruktive Interferenz am Ausgang. <br />
                    <strong style={{ color: '#ff6b6b' }}>Mit Detektor:</strong> Sobald man weiß, welchen Weg das Photon nahm (Welcher-Weg-Info), kollabiert die Superposition → zufällige 50/50-Verteilung, kein Interferenzmuster.
                </p>
            </div>
        </div>
    );
};

export default MachZehnderSimulation;
