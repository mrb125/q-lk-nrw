import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, FastForward } from 'lucide-react';

const SimulationDoppelspalt: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isRunning, setIsRunning] = useState(false);
    const [photonCount, setPhotonCount] = useState(0);
    const animationRef = useRef<number>(0);

    const drawPhoton = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        // Doppelspalt Wahrscheinlichkeitsverteilung stark vereinfacht:
        // P(x) ~ cos^2(a*x) * sinc^2(b*x)
        // Für die visuelle Simulation nähern wir es stochastisch an:

        let x = 0;
        while (true) {
            // Rejection sampling
            const testX = (Math.random() - 0.5) * width;
            const testY = Math.random();

            // Skalierungsfaktoren für Optik anpassen
            const normX = (testX / width) * 20; // -10 to 10
            const envelope = Math.pow(Math.sin(normX * 0.5) / (normX * 0.5 === 0 ? 1 : normX * 0.5), 2) || 1;
            const interference = Math.pow(Math.cos(normX * 2), 2);
            const prob = envelope * interference;

            if (testY < prob * 1.5) { // Leicht überhöhen für schnellere sichtbare Muster
                x = testX + width / 2;
                break;
            }
        }

        const y = Math.random() * height; // Homogen in der Höhe

        ctx.fillStyle = 'rgba(0, 240, 255, 0.8)'; // Neon Cyan
        ctx.shadowBlur = 5;
        ctx.shadowColor = 'rgba(0, 240, 255, 1)';
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    };

    const addPhotons = (count: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        for (let i = 0; i < count; i++) {
            drawPhoton(ctx, canvas.width, canvas.height);
        }
        setPhotonCount(prev => prev + count);
    };

    const animate = () => {
        addPhotons(10); // Batch for smoother animation
        animationRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        if (isRunning) {
            animationRef.current = requestAnimationFrame(animate);
        } else if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [isRunning]);

    const resetSimulation = () => {
        setIsRunning(false);
        setPhotonCount(0);
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx?.clearRect(0, 0, canvas.width, canvas.height);
        }
    };

    return (
        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '3rem' }}>
            <h3 style={{ margin: '0 0 1rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Virtuelles Labor: Stochastischer Aufbau am Doppelspalt</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Photonen: {photonCount.toLocaleString('de-DE')}
                </span>
            </h3>

            <div style={{ background: '#000', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                <canvas
                    ref={canvasRef}
                    width={800}
                    height={200}
                    style={{ width: '100%', display: 'block' }}
                />
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                <button
                    onClick={() => addPhotons(1)}
                    className="hover-glow"
                    style={{ padding: '0.5rem 1.5rem', background: 'transparent', border: '1px solid var(--accent-neon)', color: 'var(--accent-neon)', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Einzelnes Photon feuern
                </button>
                <button
                    onClick={() => setIsRunning(!isRunning)}
                    className="hover-glow"
                    style={{ padding: '0.5rem 1.5rem', background: isRunning ? 'var(--bg-elevated)' : 'var(--accent-neon)', border: 'none', color: isRunning ? 'var(--text-main)' : '#000', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    {isRunning ? <><Pause size={18} /> Pause</> : <><Play size={18} /> Dauerfeuer (Video)</>}
                </button>
                <button
                    onClick={() => addPhotons(10000)}
                    className="hover-glow"
                    style={{ padding: '0.5rem 1.5rem', background: 'transparent', border: '1px solid var(--accent-purple)', color: 'var(--accent-purple)', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    <FastForward size={18} /> +10.000 (Langzeit-Limit)
                </button>

                <div style={{ flex: 1 }} />
                <button
                    onClick={resetSimulation}
                    style={{ padding: '0.5rem 1.5rem', background: 'transparent', border: '1px solid var(--text-muted)', color: 'var(--text-muted)', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Zurücksetzen
                </button>
            </div>
            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                Tipp: Beobachte, wie bei wenigen Photonen kein Muster erkennbar ist (Zufall), sich bei vielen Photonen aber exakt die klassische Interferenz-Verteilung abzeichnet.
            </p>
        </div>
    );
};

export default SimulationDoppelspalt;
