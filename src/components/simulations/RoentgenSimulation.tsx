import React, { useRef, useEffect, useState } from 'react';

const H = 6.626e-34;  // Planck constant
const E_CHARGE = 1.602e-19; // electron charge
const C = 3e8; // speed of light

const RoentgenSimulation: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [voltage, setVoltage] = useState(40); // kV
    const [material, setMaterial] = useState<'wolfram' | 'molybden' | 'kupfer'>('wolfram');

    const CHAR_PEAKS: Record<string, { kAlpha: number; kBeta: number; label: string }> = {
        wolfram: { kAlpha: 0.021, kBeta: 0.018, label: 'Wolfram (W)' },
        molybden: { kAlpha: 0.0714, kBeta: 0.0632, label: 'Molybdän (Mo)' },
        kupfer: { kAlpha: 0.154, kBeta: 0.139, label: 'Kupfer (Cu)' },
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const W = canvas.width;
        const H_canvas = canvas.height;
        const PAD = { top: 20, right: 20, bottom: 50, left: 60 };
        const plotW = W - PAD.left - PAD.right;
        const plotH = H_canvas - PAD.top - PAD.bottom;

        ctx.clearRect(0, 0, W, H_canvas);

        // Background
        ctx.fillStyle = 'rgba(10, 12, 16, 0.0)';
        ctx.fillRect(0, 0, W, H_canvas);

        // Axes
        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(PAD.left, PAD.top);
        ctx.lineTo(PAD.left, PAD.top + plotH);
        ctx.lineTo(PAD.left + plotW, PAD.top + plotH);
        ctx.stroke();

        // λmin
        const U = voltage * 1000; // Volt
        const lambda_min = (H * C) / (E_CHARGE * U); // in meters
        const lambda_min_nm = lambda_min * 1e9;
        const lambda_max_nm = 0.2; // display range in nm

        // Axis labels
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.font = '12px Outfit, sans-serif';
        ctx.fillText('Intensität', PAD.left - 10, PAD.top + plotH / 2);
        ctx.fillText('Wellenlänge λ (nm)', PAD.left + plotW / 2 - 40, H_canvas - 10);

        // λ axis ticks
        for (let i = 0; i <= 4; i++) {
            const lam = (i / 4) * lambda_max_nm;
            const x = PAD.left + (lam / lambda_max_nm) * plotW;
            ctx.fillStyle = 'rgba(255,255,255,0.4)';
            ctx.fillText(lam.toFixed(3), x - 12, PAD.top + plotH + 18);
            ctx.beginPath();
            ctx.moveTo(x, PAD.top + plotH);
            ctx.lineTo(x, PAD.top + plotH + 5);
            ctx.strokeStyle = 'rgba(255,255,255,0.3)';
            ctx.stroke();
        }

        // Draw bremsstrahlung
        const grad = ctx.createLinearGradient(PAD.left, 0, PAD.left + plotW, 0);
        grad.addColorStop(0, 'rgba(0, 240, 255, 0.9)');
        grad.addColorStop(0.5, 'rgba(176, 82, 240, 0.6)');
        grad.addColorStop(1, 'rgba(176, 82, 240, 0.1)');

        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.5;
        let firstPoint = true;
        for (let px = 0; px <= plotW; px++) {
            const lam = (px / plotW) * lambda_max_nm;
            if (lam < lambda_min_nm) continue;

            // Simplified Kramers formula for bremsspektrum
            const intensity = (1 / (lam * lam)) * (1 / lambda_min_nm - 1 / lam);
            const normalizedY = Math.min(intensity * 3e-4, 1);
            const y = PAD.top + plotH - normalizedY * plotH * 0.85;

            if (firstPoint) {
                ctx.moveTo(PAD.left + px, PAD.top + plotH);
                ctx.lineTo(PAD.left + px, y);
                firstPoint = false;
            } else {
                ctx.lineTo(PAD.left + px, y);
            }
        }
        ctx.lineTo(PAD.left + plotW, PAD.top + plotH);
        ctx.stroke();

        // Characteristic peaks
        const peaks = CHAR_PEAKS[material];
        [[peaks.kAlpha, 'Kα', 0.9], [peaks.kBeta, 'Kβ', 0.65]].forEach(([lam, label, relHeight]) => {
            const lamNm = lam as number;
            if (lamNm < lambda_min_nm) return;
            const px = (lamNm / lambda_max_nm) * plotW;
            const peakHeight = (relHeight as number) * plotH * 0.85;

            // Draw peak as sharp Gaussian
            ctx.beginPath();
            ctx.strokeStyle = lam === peaks.kAlpha ? '#ffd166' : '#ff6b6b';
            ctx.lineWidth = 3;
            for (let dx = -15; dx <= 15; dx++) {
                const g = Math.exp(-0.5 * (dx / 2.5) ** 2);
                const y = PAD.top + plotH - g * peakHeight;
                if (dx === -15) {
                    ctx.moveTo(PAD.left + px + dx, y);
                } else {
                    ctx.lineTo(PAD.left + px + dx, y);
                }
            }
            ctx.stroke();

            ctx.fillStyle = lam === peaks.kAlpha ? '#ffd166' : '#ff6b6b';
            ctx.font = 'bold 12px Outfit';
            ctx.fillText(label as string, PAD.left + px - 10, PAD.top + plotH - peakHeight - 8);
        });

        // λmin marker
        const xMin = PAD.left + (lambda_min_nm / lambda_max_nm) * plotW;
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(xMin, PAD.top);
        ctx.lineTo(xMin, PAD.top + plotH);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.font = '11px Outfit';
        ctx.fillText(`λmin = ${lambda_min_nm.toFixed(4)} nm`, xMin + 4, PAD.top + 14);
    }, [voltage, material]);

    const U = voltage * 1000;
    const lambdaMin = ((H * C) / (E_CHARGE * U) * 1e9).toFixed(4);
    const fMax = (E_CHARGE * U / H / 1e15).toFixed(2);

    return (
        <div style={{ padding: '1rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>Röntgenröhre – Spektrum-Simulation</h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                    <label style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Anodenspannung U_A</label>
                    <input type="range" min={15} max={100} value={voltage} onChange={e => setVoltage(+e.target.value)}
                        style={{ width: '100%', margin: '0.5rem 0', accentColor: 'var(--accent-neon)' }} />
                    <span style={{ color: 'var(--accent-neon)', fontWeight: 700 }}>{voltage} kV</span>
                </div>
                <div>
                    <label style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Anodenmaterial</label>
                    <select value={material} onChange={e => setMaterial(e.target.value as 'wolfram' | 'molybden' | 'kupfer')}
                        style={{ display: 'block', marginTop: '0.5rem', width: '100%', padding: '0.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-main)', fontFamily: 'inherit' }}>
                        <option value="wolfram">Wolfram (W)</option>
                        <option value="molybden">Molybdän (Mo)</option>
                        <option value="kupfer">Kupfer (Cu)</option>
                    </select>
                </div>
            </div>

            <canvas ref={canvasRef} width={680} height={320} style={{ width: '100%', borderRadius: '8px', background: 'rgba(0,0,0,0.3)' }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                <div style={{ background: 'rgba(0,240,255,0.07)', border: '1px solid rgba(0,240,255,0.2)', borderRadius: '8px', padding: '1rem' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-neon)', textTransform: 'uppercase', letterSpacing: '1px' }}>λmin (Duane-Hunt)</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)' }}>{lambdaMin} nm</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>λmin = hc / (e·UA)</div>
                </div>
                <div style={{ background: 'rgba(176,82,240,0.07)', border: '1px solid rgba(176,82,240,0.2)', borderRadius: '8px', padding: '1rem' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-purple)', textTransform: 'uppercase', letterSpacing: '1px' }}>f_max</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)' }}>{fMax} PHz</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>f_max = e·UA / h</div>
                </div>
            </div>
        </div>
    );
};

export default RoentgenSimulation;
