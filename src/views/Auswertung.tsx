import React, { useState, useEffect, useRef } from 'react';
import { BarChart2 } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { checkAndAwardBadge } from '../data/badges';

// ──────────────────────────────────────────
// Shared helpers
// ──────────────────────────────────────────

const c = 3e8;
const e = 1.602e-19;
const me = 9.109e-31;

function linearRegression(xs: number[], ys: number[]) {
    const n = xs.length;
    const sumX = xs.reduce((a, b) => a + b, 0);
    const sumY = ys.reduce((a, b) => a + b, 0);
    const sumXY = xs.reduce((s, x, i) => s + x * ys[i], 0);
    const sumX2 = xs.reduce((s, x) => s + x * x, 0);
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    return { slope, intercept };
}

// ──────────────────────────────────────────
// Tab 1 – Photoeffekt: h-Bestimmung
// ──────────────────────────────────────────
type PhotoRow = { lambda: string; Ug: string };

const PhotoeffektTab: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [rows, setRows] = useState<PhotoRow[]>([
        { lambda: '365', Ug: '2.01' },
        { lambda: '404', Ug: '1.63' },
        { lambda: '436', Ug: '1.38' },
        { lambda: '546', Ug: '0.76' },
        { lambda: '578', Ug: '0.55' },
    ]);

    const validRows = rows.filter(r => r.lambda && r.Ug && !isNaN(+r.lambda) && !isNaN(+r.Ug));
    const freqs = validRows.map(r => c / (+r.lambda * 1e-9));
    const Ugs = validRows.map(r => +r.Ug);
    const reg = validRows.length >= 2 ? linearRegression(freqs, Ugs) : null;


    useEffect(() => {
        checkAndAwardBadge('auswertung_done');
        const canvas = canvasRef.current;
        if (!canvas || !reg || freqs.length < 2) return;
        const ctx = canvas.getContext('2d')!;
        const W = canvas.width, H = canvas.height;
        const pad = { l: 55, r: 20, t: 20, b: 45 };
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = '#0d0d1a';
        ctx.fillRect(0, 0, W, H);

        const minF = Math.min(...freqs) * 0.98, maxF = Math.max(...freqs) * 1.02;
        const minY = Math.min(...Ugs) * 0.9, maxY = Math.max(...Ugs) * 1.1;
        const toX = (f: number) => pad.l + ((f - minF) / (maxF - minF)) * (W - pad.l - pad.r);
        const toY = (u: number) => H - pad.b - ((u - minY) / (maxY - minY)) * (H - pad.t - pad.b);

        // Axes
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pad.l, pad.t); ctx.lineTo(pad.l, H - pad.b); ctx.lineTo(W - pad.r, H - pad.b);
        ctx.stroke();

        // Labels
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.font = '11px monospace';
        ctx.fillText('f  [Hz]', W / 2 - 15, H - 8);
        ctx.save(); ctx.translate(12, H / 2); ctx.rotate(-Math.PI / 2);
        ctx.fillText('Ug [V]', -25, 0); ctx.restore();

        // Trendline
        const x1 = minF, x2 = maxF;
        const y1 = reg.slope * x1 + reg.intercept, y2 = reg.slope * x2 + reg.intercept;
        ctx.strokeStyle = '#ffd166';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 3]);
        ctx.beginPath();
        ctx.moveTo(toX(x1), toY(Math.max(minY, Math.min(maxY, y1))));
        ctx.lineTo(toX(x2), toY(Math.max(minY, Math.min(maxY, y2))));
        ctx.stroke();
        ctx.setLineDash([]);

        // Data points
        freqs.forEach((f, i) => {
            ctx.beginPath();
            ctx.arc(toX(f), toY(Ugs[i]), 5, 0, Math.PI * 2);
            ctx.fillStyle = 'var(--accent-neon)';
            ctx.fill();
        });
    }, [rows, reg, freqs, Ugs]);

    const addRow = () => setRows(r => [...r, { lambda: '', Ug: '' }]);
    const updateRow = (i: number, field: keyof PhotoRow, val: string) => {
        setRows(prev => prev.map((r, j) => j === i ? { ...r, [field]: val } : r));
    };

    return (
        <div>
            <h3 style={{ marginTop: 0 }}>Bestimmung des Planckschen Wirkungsquantums h</h3>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Trage Wellenlänge λ (nm) und Gegenspannung U_g (V) ein. Die lineare Regression liefert h.
            </div>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <div style={{ flex: '0 0 auto' }}>
                    <table style={{ borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                        <thead>
                            <tr>
                                <th style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid var(--border-color)' }}>λ (nm)</th>
                                <th style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid var(--border-color)' }}>U_g (V)</th>
                                <th style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid var(--border-color)' }}>f (×10¹⁴ Hz)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((r, i) => (
                                <tr key={i}>
                                    <td style={{ padding: '4px' }}>
                                        <input value={r.lambda} onChange={e => updateRow(i, 'lambda', e.target.value)} style={{ width: '70px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white', padding: '4px 6px' }} />
                                    </td>
                                    <td style={{ padding: '4px' }}>
                                        <input value={r.Ug} onChange={e => updateRow(i, 'Ug', e.target.value)} style={{ width: '70px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white', padding: '4px 6px' }} />
                                    </td>
                                    <td style={{ padding: '4px 8px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                        {r.lambda && !isNaN(+r.lambda) ? (c / (+r.lambda * 1e-9) / 1e14).toFixed(2) : '—'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={addRow} className="button button-outline" style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>+ Zeile</button>
                </div>
                <div style={{ flex: '1 1 300px' }}>
                    <canvas ref={canvasRef} width={420} height={220} style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
                </div>
            </div>
            {reg && (
                <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div className="glass-panel" style={{ padding: '1rem' }}>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Bestimmtes h</div>
                        <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--accent-neon)' }}>
                            {(reg.slope).toExponential(3)} Js
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Literaturwert: 6,626 × 10⁻³⁴ Js</div>
                    </div>
                    <div className="glass-panel" style={{ padding: '1rem' }}>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Relative Abweichung</div>
                        <div style={{ fontSize: '1.3rem', fontWeight: 700, color: reg ? 'var(--accent-green)' : 'var(--text-muted)' }}>
                            {reg ? (Math.abs(reg.slope - 6.626e-34) / 6.626e-34 * 100).toFixed(1) : '—'} %
                        </div>
                    </div>
                    <div className="glass-panel" style={{ padding: '1rem' }}>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Austrittsarbeit W_A</div>
                        <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--accent-purple)' }}>
                            {reg ? (-reg.intercept / 1).toFixed(2) : '—'} eV
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// ──────────────────────────────────────────
// Tab 2 – Doppelspalt: λ aus Δy
// ──────────────────────────────────────────
const DoppelspaltTab: React.FC = () => {
    const [d, setD] = useState('0.5');
    const [L, setL] = useState('2.0');
    const [dy, setDy] = useState('2.1');

    const dVal = +d * 1e-3, LVal = +L, dyVal = +dy * 1e-3;
    const lambda = (dVal * dyVal) / LVal;

    return (
        <div>
            <h3 style={{ marginTop: 0 }}>Wellenlänge aus Doppelspalt-Experiment</h3>
            <BlockMath math={`\\lambda = \\frac{d \\cdot \\Delta y}{L}`} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', margin: '1.5rem 0' }}>
                {[
                    { label: 'Spaltabstand d', unit: 'mm', val: d, set: setD },
                    { label: 'Schirmabstand L', unit: 'm', val: L, set: setL },
                    { label: 'Streifenabstand Δy', unit: 'mm', val: dy, set: setDy },
                ].map(f => (
                    <div key={f.label} className="glass-panel" style={{ padding: '1rem' }}>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>{f.label} ({f.unit})</div>
                        <input type="number" value={f.val} onChange={e => f.set(e.target.value)} step="0.01"
                            style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white', padding: '0.5rem', fontSize: '1.1rem' }} />
                    </div>
                ))}
            </div>
            <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid var(--accent-neon)' }}>
                <div style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Berechnete Wellenlänge:</div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent-neon)' }}>{(lambda * 1e9).toFixed(1)} nm</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>≈ {lambda < 380e-9 ? 'UV-Bereich' : lambda < 780e-9 ? 'sichtbares Licht' : 'IR/Mikrowellen'}</div>
            </div>
        </div>
    );
};

// ──────────────────────────────────────────
// Tab 3 – Bragg: λ aus Glanzwinkel
// ──────────────────────────────────────────
const BraggTab: React.FC = () => {
    const [alpha, setAlpha] = useState('20');
    const [d, setD] = useState('0.282');
    const [n, setN] = useState('1');

    const lambda = 2 * (+d * 1e-9) * Math.sin(+alpha * Math.PI / 180) / +n;

    return (
        <div>
            <h3 style={{ marginTop: 0 }}>Röntgen-Wellenlänge aus Bragg-Reflexion</h3>
            <BlockMath math={`\\lambda = \\frac{2d \\cdot \\sin(\\alpha)}{n}`} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', margin: '1.5rem 0' }}>
                {[
                    { label: 'Glanzwinkel α', unit: '°', val: alpha, set: setAlpha, step: '0.5' },
                    { label: 'Netzebenenabstand d', unit: 'nm', val: d, set: setD, step: '0.001' },
                    { label: 'Ordnung n', unit: '', val: n, set: setN, step: '1' },
                ].map(f => (
                    <div key={f.label} className="glass-panel" style={{ padding: '1rem' }}>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>{f.label}{f.unit ? ` (${f.unit})` : ''}</div>
                        <input type="number" value={f.val} onChange={e => f.set(e.target.value)} step={f.step}
                            style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white', padding: '0.5rem', fontSize: '1.1rem' }} />
                    </div>
                ))}
            </div>
            <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid var(--accent-purple)' }}>
                <div style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Berechnete Röntgen-Wellenlänge:</div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent-purple)' }}>{(lambda * 1e9).toFixed(4)} nm = {(lambda * 1e10).toFixed(3)} Å</div>
            </div>
        </div>
    );
};

// ──────────────────────────────────────────
// Tab 4 – De-Broglie: λ aus U_B
// ──────────────────────────────────────────
const DeBroglieTab: React.FC = () => {
    const [Ub, setUb] = useState('3000');

    const Ekin = +Ub * e;
    const p = Math.sqrt(2 * me * Ekin);
    const lambda = 6.626e-34 / p;

    return (
        <div>
            <h3 style={{ marginTop: 0 }}>De-Broglie-Wellenlänge aus Beschleunigungsspannung</h3>
            <div style={{ margin: '1rem 0 1.5rem 0', fontSize: '0.95rem', color: 'var(--text-muted)' }}>Schritt-für-Schritt Berechnung:</div>
            <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Beschleunigungsspannung U_B (V)</div>
                <input type="number" value={Ub} onChange={e => setUb(e.target.value)} step="100"
                    style={{ width: '200px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'white', padding: '0.5rem', fontSize: '1.2rem' }} />
            </div>

            {[
                { step: '1', desc: 'Kinetische Energie', formula: `E_{kin} = e \\cdot U_B = 1{,}6 \\cdot 10^{-19} \\cdot ${Ub}`, result: `= ${Ekin.toExponential(3)} \\text{ J}` },
                { step: '2', desc: 'Impuls', formula: `p = \\sqrt{2m_e \\cdot E_{kin}}`, result: `= ${p.toExponential(3)} \\text{ kg·m/s}` },
                { step: '3', desc: 'De-Broglie-Wellenlänge', formula: `\\lambda = \\frac{h}{p}`, result: `= ${(lambda * 1e12).toFixed(3)} \\text{ pm}` },
            ].map(s => (
                <div key={s.step} className="glass-panel" style={{ padding: '1rem', marginBottom: '0.75rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--accent-neon)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>{s.step}</div>
                    <div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>{s.desc}</div>
                        <InlineMath math={`${s.formula} ${s.result}`} />
                    </div>
                </div>
            ))}
        </div>
    );
};

// ──────────────────────────────────────────
// Main Auswertung view
// ──────────────────────────────────────────
type Tab = 'photoeffekt' | 'doppelspalt' | 'bragg' | 'debroglie';

const tabs: { id: Tab; label: string }[] = [
    { id: 'photoeffekt', label: '⚡ Photoeffekt (h)' },
    { id: 'doppelspalt', label: '🌊 Doppelspalt (λ)' },
    { id: 'bragg', label: '💎 Bragg (Röntgen)' },
    { id: 'debroglie', label: '⚛️ De-Broglie (λ)' },
];

const Auswertung: React.FC = () => {
    const [active, setActive] = useState<Tab>('photoeffekt');

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '100px' }}>
            <header style={{ marginBottom: '2rem' }}>
                <h1 className="text-gradient" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: 0 }}>
                    <BarChart2 size={36} /> Messwert-Auswertung
                </h1>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    Gib deine gemessenen Werte ein und berechne physikalische Größen automatisch.
                </p>
            </header>

            {/* Tab Bar */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                {tabs.map(t => (
                    <button key={t.id} onClick={() => setActive(t.id)} style={{
                        padding: '0.5rem 1rem', borderRadius: '8px', border: `1.5px solid ${active === t.id ? 'var(--accent-neon)' : 'var(--border-color)'}`,
                        background: active === t.id ? 'rgba(0,240,255,0.1)' : 'transparent',
                        color: active === t.id ? 'var(--accent-neon)' : 'var(--text-muted)',
                        cursor: 'pointer', fontWeight: active === t.id ? 700 : 400, transition: 'all 0.2s'
                    }}>{t.label}</button>
                ))}
            </div>

            <div className="glass-panel" style={{ padding: '2rem' }}>
                {active === 'photoeffekt' && <PhotoeffektTab />}
                {active === 'doppelspalt' && <DoppelspaltTab />}
                {active === 'bragg' && <BraggTab />}
                {active === 'debroglie' && <DeBroglieTab />}
            </div>
        </div>
    );
};

export default Auswertung;
