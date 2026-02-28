import React, { useRef, useEffect, useState } from 'react';
import { Zap, Sliders } from 'lucide-react';

// Austrittsarbeit für Natrium (typisches Abitur-Metall): W_A = 2.29 eV
// Grenzfrequenz f_G = W_A / h ≈ 5.56 × 10^14 Hz (grünes Licht)
// Für den Slider: Frequenz von 3.0 (Infrarot) bis 12.0 (×10^14 Hz, UV)
const H_PLANCK = 6.626e-34; // J·s
const EV = 1.602e-19;       // J per eV
const W_A_EV = 2.29;        // Austrittsarbeit Natrium in eV
const W_A_J = W_A_EV * EV;
const F_GRENZ = W_A_J / H_PLANCK; // ≈ 5.56e14 Hz

const getPhotonColor = (freqE14: number): string => {
    // Frequenz in 10^14 Hz → sichtbares Spektrum + IR/UV
    if (freqE14 < 4.0) return '#ff5500'; // Infrarot / tief-Rot
    if (freqE14 < 4.84) return '#ff2200'; // Rot
    if (freqE14 < 5.0) return '#ff6600'; // Orange
    if (freqE14 < 5.26) return '#ffcc00'; // Gelb
    if (freqE14 < 5.77) return '#66ff00'; // Grün
    if (freqE14 < 6.59) return '#0099ff'; // Blau
    if (freqE14 < 7.5) return '#7700ff';  // Violett
    return '#cc00ff'; // UV (unsichtbar, dargestellt als Lila)
};

const SimulationPhotoeffekt: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number | null>(null);
    const [freqE14, setFreqE14] = useState(5.0); // in 10^14 Hz
    const [intensity, setIntensity] = useState(5); // 1–10
    const [isRunning, setIsRunning] = useState(false);
    const [electronCount, setElectronCount] = useState(0);

    const freq = freqE14 * 1e14;
    const eKin_J = H_PLANCK * freq - W_A_J;
    const eKin_eV = eKin_J / EV;
    const aboveThreshold = eKin_eV >= 0;
    const photonColor = getPhotonColor(freqE14);

    const drawFrame = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const W = canvas.width;
        const H = canvas.height;

        // Fade previous frame for trail effect
        ctx.fillStyle = 'rgba(10, 12, 16, 0.2)';
        ctx.fillRect(0, 0, W, H);

        // Metal surface
        const metalY = H * 0.55;
        const gradient = ctx.createLinearGradient(0, metalY, 0, H);
        gradient.addColorStop(0, 'rgba(100, 120, 160, 0.9)');
        gradient.addColorStop(1, 'rgba(40, 50, 80, 0.9)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, metalY, W, H - metalY);

        // Metal label
        ctx.fillStyle = 'rgba(180, 200, 255, 0.5)';
        ctx.font = '11px Outfit, sans-serif';
        ctx.fillText('Natriumoberfläche (WA = 2,29 eV)', 12, metalY + 20);

        // Photons coming in (from left diagonally)
        const numPhotons = intensity;
        for (let i = 0; i < numPhotons; i++) {
            const t = (Date.now() / 600 + i / numPhotons) % 1;
            const px = 40 + t * (W * 0.45);
            const py = H * 0.05 + t * (metalY - H * 0.05);

            ctx.beginPath();
            ctx.arc(px, py, 3, 0, Math.PI * 2);
            ctx.fillStyle = photonColor;
            ctx.shadowBlur = 8;
            ctx.shadowColor = photonColor;
            ctx.fill();
            ctx.shadowBlur = 0;

            // Arrow / motion streak
            ctx.strokeStyle = photonColor + '55';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(px - 12, py - 12);
            ctx.lineTo(px, py);
            ctx.stroke();
        }

        // Electrons shooting off (only if above threshold)
        if (aboveThreshold) {
            const speed = Math.sqrt(eKin_eV) * 18;
            const numElectrons = Math.ceil(intensity * 0.6);
            for (let i = 0; i < numElectrons; i++) {
                const t = (Date.now() / 500 + i / numElectrons + 0.12) % 1;
                const angle = -Math.PI * 0.55 + (i / numElectrons) * Math.PI * 0.5;
                const ex = W * 0.5 + Math.cos(angle) * speed * t * 80;
                const ey = metalY - Math.sin(angle) * speed * t * 80;

                if (ey > 0) {
                    ctx.beginPath();
                    ctx.arc(ex, ey, 2.5, 0, Math.PI * 2);
                    ctx.fillStyle = '#39ff14';
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = '#39ff14';
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }
            }
        }
    };

    const animate = () => {
        drawFrame();
        setElectronCount(prev => aboveThreshold ? prev + Math.ceil(intensity * 0.3) : prev);
        animationRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        if (isRunning) {
            animationRef.current = requestAnimationFrame(animate);
        } else if (animationRef.current !== null) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
        }
        return () => { if (animationRef.current !== null) { cancelAnimationFrame(animationRef.current); animationRef.current = null; } };
    }, [isRunning, freqE14, intensity, aboveThreshold]);

    const reset = () => {
        setIsRunning(false);
        setElectronCount(0);
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx?.clearRect(0, 0, canvas.width, canvas.height);
        }
    };

    const fGrenzE14 = F_GRENZ / 1e14;
    const lambdaNm = Math.round(3e8 / freq * 1e9);

    return (
        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '3rem' }}>
            <h3 style={{ margin: '0 0 1.5rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span>Virtuelles Labor: Photoeffekt</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Ausgelöste Elektronen: <span style={{ color: aboveThreshold ? 'var(--accent-green)' : 'var(--text-muted)' }}>{electronCount.toLocaleString('de-DE')}</span>
                </span>
            </h3>

            {/* Canvas */}
            <div style={{ background: '#0a0c10', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                <canvas ref={canvasRef} width={800} height={220} style={{ width: '100%', display: 'block' }} />
            </div>

            {/* Controls */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
                <div>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span><Sliders size={14} style={{ marginRight: '0.35rem', verticalAlign: 'middle' }} />Lichtfrequenz</span>
                        <span style={{ color: photonColor, fontWeight: 700 }}>f = {freqE14.toFixed(1)} × 10¹⁴ Hz (λ ≈ {lambdaNm} nm)</span>
                    </label>
                    <input
                        type="range" min={3.0} max={12.0} step={0.1}
                        value={freqE14}
                        onChange={e => setFreqE14(parseFloat(e.target.value))}
                        style={{ width: '100%', accentColor: photonColor }}
                    />
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem', display: 'flex', justifyContent: 'space-between' }}>
                        <span>IR (3,0)</span>
                        <span style={{ color: freqE14 >= fGrenzE14 ? 'var(--accent-green)' : '#ff4466' }}>
                            Grenzfrequenz: {fGrenzE14.toFixed(2)} × 10¹⁴ Hz
                        </span>
                        <span>UV (12,0)</span>
                    </div>
                </div>

                <div>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span><Zap size={14} style={{ marginRight: '0.35rem', verticalAlign: 'middle' }} />Intensität (Photonen/s)</span>
                        <span style={{ color: 'var(--accent-neon)', fontWeight: 700 }}>Stufe {intensity}</span>
                    </label>
                    <input
                        type="range" min={1} max={10} step={1}
                        value={intensity}
                        onChange={e => setIntensity(parseInt(e.target.value))}
                        style={{ width: '100%', accentColor: 'var(--accent-neon)' }}
                    />
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem', display: 'flex', justifyContent: 'space-between' }}>
                        <span>schwach</span>
                        <span>stark</span>
                    </div>
                </div>
            </div>

            {/* Status Panel */}
            <div style={{
                marginTop: '1.25rem',
                padding: '1rem 1.5rem',
                borderRadius: '10px',
                background: aboveThreshold ? 'rgba(57, 255, 20, 0.06)' : 'rgba(255, 50, 50, 0.06)',
                border: `1px solid ${aboveThreshold ? 'rgba(57, 255, 20, 0.3)' : 'rgba(255, 50, 50, 0.3)'}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
            }}>
                <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Status</div>
                    <div style={{ fontWeight: 700, fontSize: '1.1rem', color: aboveThreshold ? 'var(--accent-green)' : '#ff4466' }}>
                        {aboveThreshold ? '✓ Elektronen werden ausgelöst' : '✗ Unterhalb der Grenzfrequenz – keine Elektronen'}
                    </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
                        E<sub>Photon</sub> = h·f &nbsp;|&nbsp; E<sub>kin</sub> = h·f − W<sub>A</sub>
                    </div>
                    <div style={{ fontFamily: 'monospace', fontSize: '1rem', color: aboveThreshold ? 'var(--accent-green)' : '#ff4466' }}>
                        E<sub>kin</sub> = {eKin_eV >= 0 ? `+${eKin_eV.toFixed(3)}` : eKin_eV.toFixed(3)} eV
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                <button
                    onClick={() => setIsRunning(!isRunning)}
                    className="hover-glow"
                    style={{ padding: '0.5rem 1.5rem', background: isRunning ? 'var(--bg-elevated)' : 'var(--accent-neon)', border: 'none', color: isRunning ? 'var(--text-main)' : '#000', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
                >
                    {isRunning ? '⏸ Pause' : '▶ Simulation starten'}
                </button>
                <button
                    onClick={reset}
                    style={{ padding: '0.5rem 1.5rem', background: 'transparent', border: '1px solid var(--text-muted)', color: 'var(--text-muted)', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Zurücksetzen
                </button>
            </div>
            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                Tipp: Schiebe die Frequenz über die Grenzfrequenz und beobachte, wie Elektronen sofort emittiert werden – unabhängig von der Intensität!
            </p>
        </div>
    );
};

export default SimulationPhotoeffekt;
