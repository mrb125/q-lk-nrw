import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Waves } from 'lucide-react';

const getWavelengthColor = (nm: number) => {
    if (nm < 380) return '#8B00FF';
    if (nm < 450) return '#0000FF';
    if (nm < 495) return '#00BFFF';
    if (nm < 570) return '#00FF00';
    if (nm < 590) return '#FFFF00';
    if (nm < 620) return '#FF7F00';
    return '#FF0000';
};

const DoppelspaltSimulation: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const patternCanvasRef = useRef<HTMLCanvasElement>(null);
    const animRef = useRef<number>(0);
    const dotCountRef = useRef<number[]>([]);

    const [wavelength, setWavelength] = useState(532); // nm
    const [slitDist, setSlitDist] = useState(0.5);    // mm
    const [screenDist, setScreenDist] = useState(2.0); // m
    const [singlePhoton, setSinglePhoton] = useState(false);

    const W = 450, H = 250;
    const patternH = 100;

    const computePattern = useCallback(() => {
        const d = slitDist * 1e-3;
        const L = screenDist;
        const lam = wavelength * 1e-9;
        const points: { x: number; intensity: number }[] = [];
        for (let px = 0; px < W; px++) {
            const y = ((px - W / 2) / W) * 0.04; // ±2cm on screen
            const delta = (d * y) / L;
            const intensity = Math.pow(Math.cos(Math.PI * delta / lam), 2);
            points.push({ x: px, intensity });
        }
        return points;
    }, [wavelength, slitDist, screenDist]);

    useEffect(() => {
        dotCountRef.current = new Array(W).fill(0);
    }, [wavelength, slitDist, screenDist, singlePhoton]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const pCanvas = patternCanvasRef.current;
        if (!canvas || !pCanvas) return;
        const ctx = canvas.getContext('2d')!;
        const pCtx = pCanvas.getContext('2d')!;
        const pattern = computePattern();
        const color = getWavelengthColor(wavelength);

        if (!singlePhoton) {
            // Draw full interference pattern immediately
            ctx.clearRect(0, 0, W, H);
            ctx.fillStyle = '#0d0d1a';
            ctx.fillRect(0, 0, W, H);
            pattern.forEach(p => {
                ctx.fillStyle = `rgba(${parseInt(color.slice(1, 3), 16)},${parseInt(color.slice(3, 5), 16)},${parseInt(color.slice(5, 7), 16)},${p.intensity})`;
                ctx.fillRect(p.x, 0, 1, H);
            });
        }

        // Pattern graph
        pCtx.clearRect(0, 0, W, patternH);
        pCtx.fillStyle = '#0d0d1a';
        pCtx.fillRect(0, 0, W, patternH);
        pCtx.beginPath();
        pCtx.strokeStyle = color;
        pCtx.lineWidth = 2;
        pattern.forEach((p, i) => {
            const y = patternH - p.intensity * (patternH - 4) - 2;
            i === 0 ? pCtx.moveTo(p.x, y) : pCtx.lineTo(p.x, y);
        });
        pCtx.stroke();
    }, [wavelength, slitDist, screenDist, computePattern, singlePhoton]);

    // Single photon animation
    useEffect(() => {
        if (!singlePhoton) { cancelAnimationFrame(animRef.current); return; }
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d')!;
        const pattern = computePattern();
        const totalIntensity = pattern.reduce((s, p) => s + p.intensity, 0);
        dotCountRef.current = new Array(W).fill(0);
        ctx.fillStyle = '#0d0d1a';
        ctx.fillRect(0, 0, W, H);

        let frame = 0;
        const color = getWavelengthColor(wavelength);

        const step = () => {
            if (frame % 2 === 0) {
                // Emit one photon
                let r = Math.random() * totalIntensity;
                let chosen = 0;
                for (let i = 0; i < pattern.length; i++) {
                    r -= pattern[i].intensity;
                    if (r <= 0) { chosen = i; break; }
                }
                dotCountRef.current[chosen]++;
                const y = H - Math.floor(Math.random() * H * 0.8) - H * 0.1;
                ctx.fillStyle = color;
                ctx.fillRect(chosen, Math.floor(y), 1, 1);
            }
            frame++;
            animRef.current = requestAnimationFrame(step);
        };
        animRef.current = requestAnimationFrame(step);
        return () => cancelAnimationFrame(animRef.current);
    }, [singlePhoton, computePattern, wavelength]);

    return (
        <div className="simulation-container">
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <Waves className="text-gradient" /> Doppelspalt-Simulation
            </h2>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {/* Controls */}
                <div className="glass-panel" style={{ flex: '1 1 260px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                        <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span>Wellenlänge λ</span>
                            <span style={{ color: getWavelengthColor(wavelength) }}>{wavelength} nm</span>
                        </label>
                        <input type="range" min={380} max={780} value={wavelength} onChange={e => setWavelength(+e.target.value)} style={{ width: '100%', accentColor: getWavelengthColor(wavelength) }} />
                    </div>
                    <div>
                        <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span>Spaltabstand d</span>
                            <span style={{ color: 'var(--accent-neon)' }}>{slitDist.toFixed(2)} mm</span>
                        </label>
                        <input type="range" min={0.1} max={2} step={0.05} value={slitDist} onChange={e => setSlitDist(+e.target.value)} style={{ width: '100%' }} />
                    </div>
                    <div>
                        <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span>Schirmabstand L</span>
                            <span style={{ color: 'var(--accent-purple)' }}>{screenDist.toFixed(1)} m</span>
                        </label>
                        <input type="range" min={0.5} max={5} step={0.1} value={screenDist} onChange={e => setScreenDist(+e.target.value)} style={{ width: '100%' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <input type="checkbox" id="singlePhoton" checked={singlePhoton} onChange={e => setSinglePhoton(e.target.checked)} style={{ width: '18px', height: '18px', accentColor: 'var(--accent-neon)' }} />
                        <label htmlFor="singlePhoton" style={{ cursor: 'pointer' }}>Einzelphotonen-Modus</label>
                    </div>
                    <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '1rem', fontSize: '0.9rem' }}>
                        <div style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Gangunterschied (Mitte):</div>
                        <div style={{ color: 'var(--accent-neon)', fontWeight: 700 }}>Δs = d·sin(α)</div>
                        <div style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Streifenabstand Δy:</div>
                        <div style={{ color: 'var(--accent-green)', fontWeight: 700 }}>{((wavelength * 1e-9 * screenDist) / (slitDist * 1e-3) * 100).toFixed(3)} cm</div>
                    </div>
                </div>

                {/* Visualization */}
                <div style={{ flex: '1 1 460px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Schirmbild (Interferenzmuster):</div>
                    <canvas ref={canvasRef} width={W} height={H} style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Intensitätsprofil I(y):</div>
                    <canvas ref={patternCanvasRef} width={W} height={patternH} style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
                    {singlePhoton && <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'center' }}>Einzelne Photonen treffen zufällig auf → Das Muster entsteht statistisch.</div>}
                </div>
            </div>
        </div>
    );
};

export default DoppelspaltSimulation;
