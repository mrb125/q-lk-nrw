import React, { useRef, useEffect, useState, useCallback } from 'react';

const HBAR = 1.055e-34;
const ME = 9.109e-31;

function computeWavefunction(L: number, n: number, steps: number) {
    const xs: number[] = [];
    const psi: number[] = [];
    for (let i = 0; i <= steps; i++) {
        const x = (i / steps) * L;
        xs.push(x);
        psi.push(Math.sin((n * Math.PI * x) / L));
    }
    return { xs, psi };
}

const PotentialtopfSimulation: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [L_nm, setL_nm] = useState(1.0);     // box width in nm
    const [n, setN] = useState(1);              // quantum number
    const [showPsi2, setShowPsi2] = useState(true); // show |ψ|² or ψ

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const W = canvas.width;
        const H = canvas.height;
        const PAD = { top: 30, right: 40, bottom: 50, left: 60 };
        const plotW = W - PAD.left - PAD.right;
        const plotH = H - PAD.top - PAD.bottom;

        ctx.clearRect(0, 0, W, H);

        // Draw potential well walls
        ctx.strokeStyle = 'rgba(0,240,255,0.8)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(PAD.left, PAD.top);
        ctx.lineTo(PAD.left, PAD.top + plotH);
        ctx.lineTo(PAD.left + plotW, PAD.top + plotH);
        ctx.lineTo(PAD.left + plotW, PAD.top);
        ctx.stroke();

        // Shade outside region (forbidden zone)
        ctx.fillStyle = 'rgba(0,240,255,0.04)';
        ctx.fillRect(0, PAD.top, PAD.left, plotH);
        ctx.fillRect(PAD.left + plotW, PAD.top, PAD.right, plotH);
        ctx.fillText('V=∞', 5, PAD.top + 20);
        ctx.fillText('V=∞', PAD.left + plotW + 5, PAD.top + 20);

        // Axis labels
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.font = '12px Outfit';
        ctx.fillText('|ψ|²', PAD.left - 40, PAD.top + plotH / 2);
        ctx.fillText('0', PAD.left - 15, PAD.top + plotH + 5);
        ctx.fillText(`${L_nm} nm`, PAD.left + plotW - 15, PAD.top + plotH + 15);
        ctx.fillText(`x`, PAD.left + plotW / 2 - 5, H - 10);

        // Gridlines
        for (let i = 0; i <= 4; i++) {
            const y = PAD.top + (i / 4) * plotH;
            ctx.strokeStyle = 'rgba(255,255,255,0.06)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(PAD.left, y);
            ctx.lineTo(PAD.left + plotW, y);
            ctx.stroke();
        }

        // Wavefunction
        const STEPS = 300;
        const { xs, psi } = computeWavefunction(L_nm, n, STEPS);

        // Draw energy level line
        const E_eV = ((n * n * Math.PI * Math.PI * HBAR * HBAR) / (2 * ME * (L_nm * 1e-9) ** 2)) / 1.602e-19;
        const maxE_eV = ((4 * Math.PI * Math.PI * HBAR * HBAR) / (2 * ME * (L_nm * 1e-9) ** 2)) / 1.602e-19;
        const energyY = PAD.top + plotH - (Math.min(E_eV / maxE_eV, 0.95)) * plotH;

        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = 'rgba(255,209,102,0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(PAD.left, energyY);
        ctx.lineTo(PAD.left + plotW, energyY);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#ffd166';
        ctx.font = '11px Outfit';
        ctx.fillText(`E${n} = ${E_eV.toFixed(2)} eV`, PAD.left + 5, energyY - 4);

        // Draw wavefunction on top of energy line
        const values = showPsi2 ? psi.map(p => p * p) : psi;
        const maxVal = Math.max(...values.map(Math.abs));
        const amplitude = plotH * 0.38;

        const grad = ctx.createLinearGradient(PAD.left, 0, PAD.left + plotW, 0);
        grad.addColorStop(0, 'rgba(176, 82, 240, 0.9)');
        grad.addColorStop(0.5, 'rgba(0, 240, 255, 0.9)');
        grad.addColorStop(1, 'rgba(176, 82, 240, 0.9)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 3;
        ctx.beginPath();
        values.forEach((val, i) => {
            const x = PAD.left + (xs[i] / L_nm) * plotW;
            const normalized = val / maxVal;
            const y = energyY - normalized * amplitude;
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();

        // Nodes
        for (let node = 1; node < n; node++) {
            const nodeX = PAD.left + (node / n) * plotW;
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.beginPath();
            ctx.arc(nodeX, energyY, 4, 0, Math.PI * 2);
            ctx.fill();
        }
    }, [L_nm, n, showPsi2]);

    useEffect(() => { draw(); }, [draw]);

    return (
        <div style={{ padding: '1rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>Unendlicher Potentialtopf</h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                    <label style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Topfbreite L</label>
                    <input type="range" min={0.2} max={3} step={0.1} value={L_nm} onChange={e => setL_nm(+e.target.value)}
                        style={{ width: '100%', margin: '0.5rem 0', accentColor: 'var(--accent-neon)' }} />
                    <span style={{ color: 'var(--accent-neon)', fontWeight: 700 }}>{L_nm.toFixed(1)} nm</span>
                </div>
                <div>
                    <label style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Quantenzahl n</label>
                    <input type="range" min={1} max={5} step={1} value={n} onChange={e => setN(+e.target.value)}
                        style={{ width: '100%', margin: '0.5rem 0', accentColor: 'var(--accent-purple)' }} />
                    <span style={{ color: 'var(--accent-purple)', fontWeight: 700 }}>n = {n}</span>
                </div>
            </div>

            <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <button onClick={() => setShowPsi2(!showPsi2)} style={{
                    padding: '0.4rem 1rem', borderRadius: '6px', cursor: 'pointer', fontFamily: 'inherit',
                    background: showPsi2 ? 'rgba(0,240,255,0.15)' : 'transparent',
                    border: '1px solid var(--accent-neon)', color: 'var(--accent-neon)'
                }}>
                    {showPsi2 ? '|ψ|² anzeigen' : 'ψ anzeigen'}
                </button>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {showPsi2 ? 'Aufenthaltswahrscheinlichkeit' : 'Wellenfunktion'}
                </span>
            </div>

            <canvas ref={canvasRef} width={680} height={320} style={{ width: '100%', borderRadius: '8px', background: 'rgba(0,0,0,0.3)' }} />

            <div style={{ background: 'rgba(0,240,255,0.07)', border: '1px solid rgba(0,240,255,0.2)', borderRadius: '8px', padding: '1rem', marginTop: '1rem' }}>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    💡 Die Wellenfunktion ist im Inneren ein stehende Sinuswelle. An den Wänden muss ψ = 0 sein.
                    Es gibt genau <strong style={{ color: 'var(--text-main)' }}>n−1 Knoten</strong> (weiße Punkte).
                    Die Energie skaliert mit n²: E_n = n²·E₁.
                </p>
            </div>
        </div>
    );
};

export default PotentialtopfSimulation;
