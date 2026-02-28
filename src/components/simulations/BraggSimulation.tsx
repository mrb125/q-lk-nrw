import React, { useState, useEffect, useRef } from 'react';
import { RadioTower } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

const BraggSimulation: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [glanzwinkelDeg, setGlanzwinkelDeg] = useState(20);
    const [netzebenenabstand, setNetzebenenabstand] = useState(0.28); // nm (NaCl)
    const [n, setN] = useState(1); // order of interference

    const W = 450, H = 300;

    const lambda = 2 * netzebenenabstand * Math.sin((glanzwinkelDeg * Math.PI) / 180);
    const isConstructive = lambda > 0 && lambda < 0.5; // physically plausible wavelength

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d')!;
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = '#0d0d1a';
        ctx.fillRect(0, 0, W, H);

        const alpha = (glanzwinkelDeg * Math.PI) / 180;
        const layerY = H * 0.55;
        const layer2Y = layerY + 40;

        // Draw crystal lattice layers
        ctx.strokeStyle = 'rgba(100,150,255,0.4)';
        ctx.lineWidth = 1;
        for (const y of [layerY, layer2Y]) {
            ctx.beginPath();
            ctx.setLineDash([6, 4]);
            ctx.moveTo(0, y);
            ctx.lineTo(W, y);
            ctx.stroke();
            // atoms
            ctx.setLineDash([]);
            for (let x = 30; x < W; x += 50) {
                ctx.beginPath();
                ctx.arc(x, y, 6, 0, Math.PI * 2);
                ctx.fillStyle = '#4da6ff';
                ctx.fill();
            }
        }
        ctx.setLineDash([]);

        // Label d
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.beginPath();
        ctx.moveTo(20, layerY);
        ctx.lineTo(20, layer2Y);
        ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.font = '12px monospace';
        ctx.fillText('d', 25, (layerY + layer2Y) / 2 + 4);

        // Draw incident ray
        const hitX = W / 2;
        const rayLength = 140;
        const dx = Math.cos(Math.PI / 2 - alpha) * rayLength;
        const dy = Math.sin(Math.PI / 2 - alpha) * rayLength;

        ctx.strokeStyle = isConstructive ? '#ffd166' : '#aaa';
        ctx.lineWidth = 2;
        // Incident to layer 1
        ctx.beginPath();
        ctx.moveTo(hitX - dx, layerY - dy);
        ctx.lineTo(hitX, layerY);
        ctx.stroke();
        // Reflected from layer 1
        ctx.beginPath();
        ctx.moveTo(hitX, layerY);
        ctx.lineTo(hitX + dx, layerY - dy);
        ctx.stroke();

        // Incident through layer 1 to layer 2
        ctx.strokeStyle = isConstructive ? '#ff9f43' : '#aaa';
        ctx.beginPath();
        ctx.moveTo(hitX, layerY);
        ctx.lineTo(hitX, layer2Y);
        ctx.stroke();
        // Reflected from layer 2
        ctx.beginPath();
        ctx.moveTo(hitX + 10, layer2Y);
        ctx.lineTo(hitX + 10 + dx, layer2Y - dy - 40);
        ctx.stroke();

        // Angle label
        ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        ctx.beginPath();
        ctx.arc(hitX, layerY, 40, -Math.PI / 2, -(Math.PI / 2 - alpha), false);
        ctx.stroke();
        ctx.fillStyle = 'white';
        ctx.fillText(`α=${glanzwinkelDeg}°`, hitX + 10, layerY - 15);

        // Constructive indicator
        if (isConstructive) {
            ctx.fillStyle = 'var(--accent-green)';
        } else {
            ctx.fillStyle = 'var(--accent-red)';
        }
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText(isConstructive ? '✓ Konstruktive Interferenz' : '✗ Keine konstr. Interferenz', 8, 25);
    }, [glanzwinkelDeg, netzebenenabstand, n, isConstructive]);

    return (
        <div className="simulation-container">
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <RadioTower className="text-gradient" /> Bragg-Reflexion am Kristall
            </h2>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {/* Controls */}
                <div className="glass-panel" style={{ flex: '1 1 260px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                        <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span>Glanzwinkel α</span>
                            <span style={{ color: 'var(--accent-neon)' }}>{glanzwinkelDeg}°</span>
                        </label>
                        <input type="range" min={5} max={80} value={glanzwinkelDeg} onChange={e => setGlanzwinkelDeg(+e.target.value)} style={{ width: '100%' }} />
                    </div>
                    <div>
                        <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span>Netzebenenabstand d</span>
                            <span style={{ color: 'var(--accent-purple)' }}>{netzebenenabstand.toFixed(2)} nm</span>
                        </label>
                        <input type="range" min={0.1} max={0.6} step={0.01} value={netzebenenabstand} onChange={e => setNetzebenenabstand(+e.target.value)} style={{ width: '100%' }} />
                    </div>
                    <div>
                        <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span>Ordnung n</span>
                            <span style={{ color: 'var(--accent-green)' }}>{n}. Ordnung</span>
                        </label>
                        <input type="range" min={1} max={4} step={1} value={n} onChange={e => setN(+e.target.value)} style={{ width: '100%' }} />
                    </div>
                    <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '1rem', fontSize: '0.9rem' }}>
                        <div style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Bragg-Bedingung:</div>
                        <div style={{ fontSize: '0.9rem', margin: '0.5rem 0' }}>
                            <InlineMath math={`n \\cdot \\lambda = 2d \\cdot \\sin(\\alpha)`} />
                        </div>
                        <div style={{ color: 'var(--text-muted)', marginTop: '0.75rem' }}>Berechnete Wellenlänge:</div>
                        <div style={{ color: isConstructive ? 'var(--accent-green)' : 'var(--accent-red)', fontWeight: 700 }}>
                            λ = {(lambda * n / 1).toFixed(3)} nm
                            {isConstructive ? ' (Röntgen ✓)' : ' (außer Bereich)'}
                        </div>
                    </div>
                </div>
                {/* Canvas */}
                <div style={{ flex: '1 1 460px' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Kristallgitter-Reflexion:</div>
                    <canvas ref={canvasRef} width={W} height={H} style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
                </div>
            </div>
        </div>
    );
};

export default BraggSimulation;
