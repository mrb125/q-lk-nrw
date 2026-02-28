import React, { useState, useEffect, useRef } from 'react';
import { Settings2, Zap } from 'lucide-react';

const MATERIALS = [
    { name: 'Cäsium', workFunction: 1.95, color: '#e0c05a' },  // eV
    { name: 'Kalium', workFunction: 2.29, color: '#d0d0d0' },  // eV
    { name: 'Natrium', workFunction: 2.36, color: '#f0f0f0' }, // eV
    { name: 'Zink', workFunction: 4.31, color: '#a0a0b0' },    // eV
    { name: 'Platin', workFunction: 5.65, color: '#e5e4e2' }     // eV
];

const PLANCK_CONSTANT_EV_S = 4.135667696e-15; // eV*s
const SPEED_OF_LIGHT = 299792458; // m/s

interface Particle {
    id: number;
    x: number;
    y: number;
    speed: number;
    type: 'photon' | 'electron';
    wavelength?: number;
}

const PhotoeffectSimulation: React.FC = () => {
    const [wavelengthNm, setWavelengthNm] = useState<number>(400); // nm
    const [intensity, setIntensity] = useState<number>(50); // 1-100%
    const [selectedMaterial, setSelectedMaterial] = useState(MATERIALS[0]);
    const [particles, setParticles] = useState<Particle[]>([]);

    const requestRef = useRef<number>(0);
    const particleIdCounter = useRef<number>(0);

    // Calculate energy
    const frequency = SPEED_OF_LIGHT / (wavelengthNm * 1e-9);
    const photonEnergyEv = PLANCK_CONSTANT_EV_S * frequency;
    const kineticEnergyEv = photonEnergyEv - selectedMaterial.workFunction;
    const isEmitting = kineticEnergyEv > 0;

    // Determine photon color based on wavelength roughly
    const getWavelengthColor = (wl: number) => {
        if (wl < 400) return 'var(--accent-purple)'; // UV
        if (wl < 450) return '#4d4dff'; // Blue
        if (wl < 500) return '#00ffff'; // Cyan
        if (wl < 550) return '#00ff00'; // Green
        if (wl < 600) return '#ffff00'; // Yellow
        if (wl < 650) return '#ff9900'; // Orange
        return '#ff0000'; // Red
    };

    const emitFrequency = Math.max(1, 100 - intensity); // Lower is faster emission

    useEffect(() => {
        let frameCount = 0;

        const animate = () => {
            frameCount++;

            setParticles(prev => {
                let newParticles = [...prev];

                // Move existing particles
                newParticles = newParticles.map(p => {
                    if (p.type === 'photon') {
                        return { ...p, y: p.y + p.speed, x: p.x + (Math.sin(p.y / 20) * 2) }; // Photons move down with slight wave
                    } else {
                        return { ...p, y: p.y - p.speed }; // Electrons move up
                    }
                });

                // Photons hitting the plate (y > 300)
                const hittingPhotons = newParticles.filter(p => p.type === 'photon' && p.y >= 290 && p.y <= 310);

                // Remove out of bounds particles or electrons hitting the anode (y <= 60)
                newParticles = newParticles.filter(p => {
                    if (p.type === 'electron') return p.y > 60;
                    return p.y > 0 && p.y < 350;
                });

                // If a photon hits and energy is sufficient, create an electron
                if (isEmitting && hittingPhotons.length > 0) {
                    // We only emit an electron for roughly every N hitting photons to keep it visually clean,
                    // or just 1 electron per photon hit. Let's do 1:1.
                    hittingPhotons.forEach(photon => {
                        newParticles.push({
                            id: particleIdCounter.current++,
                            x: photon.x + (Math.random() * 20 - 10),
                            y: 290,
                            speed: Math.max(1, kineticEnergyEv * 2), // Speed depends on kinetic energy
                            type: 'electron'
                        });
                    });

                    // Remove the photons that hit
                    newParticles = newParticles.filter(p => !(p.type === 'photon' && p.y >= 290));
                } else if (!isEmitting) {
                    // Photons are absorbed but no emission
                    newParticles = newParticles.filter(p => !(p.type === 'photon' && p.y >= 300));
                }

                // Emit new photons based on intensity
                if (frameCount % emitFrequency === 0) {
                    newParticles.push({
                        id: particleIdCounter.current++,
                        x: 50 + Math.random() * 300, // Random X across width
                        y: 50, // Start near top
                        speed: 5, // Constant speed of light
                        type: 'photon',
                        wavelength: wavelengthNm
                    });
                }

                return newParticles;
            });

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(requestRef.current);
    }, [intensity, emitFrequency, isEmitting, kineticEnergyEv, wavelengthNm]);

    return (
        <div className="simulation-container">
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <Zap className="text-gradient" />
                Photoelektrischer Effekt
            </h2>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {/* Controls */}
                <div className="glass-panel" style={{ flex: '1 1 300px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                        <Settings2 size={20} />
                        <h3 style={{ margin: 0 }}>Parameter</h3>
                    </div>

                    <div>
                        <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span>Material der Kathode</span>
                            <span style={{ color: 'var(--accent-purple)' }}>{selectedMaterial.name} (W_A = {selectedMaterial.workFunction} eV)</span>
                        </label>
                        <select
                            value={selectedMaterial.name}
                            onChange={(e) => setSelectedMaterial(MATERIALS.find(m => m.name === e.target.value) || MATERIALS[0])}
                            style={{
                                width: '100%', padding: '0.5rem', borderRadius: '4px',
                                background: 'rgba(0,0,0,0.3)', color: 'white', border: '1px solid var(--border-color)'
                            }}
                        >
                            {MATERIALS.map(m => (
                                <option key={m.name} value={m.name} style={{ background: '#1a1a2e' }}>
                                    {m.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span>Wellenlänge des Lichts ($\lambda$)</span>
                            <span style={{ color: getWavelengthColor(wavelengthNm) }}>{wavelengthNm} nm</span>
                        </label>
                        <input
                            type="range"
                            min="200"
                            max="800"
                            value={wavelengthNm}
                            onChange={(e) => setWavelengthNm(Number(e.target.value))}
                            style={{ width: '100%', accentColor: getWavelengthColor(wavelengthNm) }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            <span>UV</span>
                            <span>Sichtbar</span>
                            <span>Infrarot</span>
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span>Intensität (Photonenzahl)</span>
                            <span style={{ color: 'var(--accent-green)' }}>{intensity}%</span>
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={intensity}
                            onChange={(e) => setIntensity(Number(e.target.value))}
                            style={{ width: '100%', accentColor: 'var(--accent-green)' }}
                        />
                    </div>

                    <div style={{ marginTop: 'auto', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', borderLeft: `4px solid ${isEmitting ? 'var(--accent-green)' : 'var(--accent-red)'}` }}>
                        <h4 style={{ margin: '0 0 0.5rem 0' }}>Aktuelle Werte</h4>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            <div>Photonenenergie ({"$E_{Ph}$"}): <strong style={{ color: 'white' }}>{photonEnergyEv.toFixed(2)} eV</strong></div>
                            <div>Austrittsarbeit ({"$W_A$"}): <strong style={{ color: 'white' }}>{selectedMaterial.workFunction.toFixed(2)} eV</strong></div>
                            <div>Kinetische Energie ({"$E_{kin}$"}): <strong style={{ color: isEmitting ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                                {isEmitting ? kineticEnergyEv.toFixed(2) : '0.00'} eV
                            </strong></div>
                            <div style={{ marginTop: '0.5rem', fontWeight: 'bold', color: isEmitting ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                                {isEmitting ? '✓ Elektronen treten aus' : '✗ Keine Emission (E_Ph < W_A)'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Animation Area */}
                <div className="glass-panel" style={{ flex: '1 1 400px', height: '400px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    {/* Light Source */}
                    <div style={{
                        position: 'absolute', top: 0, left: 0, width: '100%', height: '50px',
                        background: `linear-gradient(to bottom, ${getWavelengthColor(wavelengthNm)}44, transparent)`,
                        display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '10px'
                    }}>
                        <div style={{ color: 'white', fontWeight: 'bold', textShadow: `0 0 10px ${getWavelengthColor(wavelengthNm)}` }}>
                            Lichtquelle
                        </div>
                    </div>

                    <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
                        {/* Material Plate */}
                        <rect x="50" y="300" width="300" height="30" fill={selectedMaterial.color} rx="5" />
                        <text x="200" y="320" fill="black" textAnchor="middle" fontSize="14" fontWeight="bold">{selectedMaterial.name}</text>

                        {/* Particles */}
                        {particles.map(p => (
                            p.type === 'photon' ? (
                                <circle
                                    key={p.id}
                                    cx={p.x}
                                    cy={p.y}
                                    r="3"
                                    fill={getWavelengthColor(p.wavelength || 400)}
                                    style={{ filter: `drop-shadow(0 0 5px ${getWavelengthColor(p.wavelength || 400)})` }}
                                />
                            ) : (
                                <circle
                                    key={p.id}
                                    cx={p.x}
                                    cy={p.y}
                                    r="4"
                                    fill="#4da6ff"
                                    style={{ filter: 'drop-shadow(0 0 5px #4da6ff)' }}
                                />
                            )
                        ))}
                    </svg>

                    {/* Anode */}
                    <div style={{ position: 'absolute', top: '60px', left: '50px', width: '300px', height: '10px', background: 'rgba(255,255,255,0.2)', borderRadius: '5px' }}></div>
                    <div style={{ position: 'absolute', top: '40px', left: '200px', transform: 'translateX(-50%)', color: 'var(--text-muted)', fontSize: '0.8rem' }}>Anode (Auffänger)</div>

                </div>
            </div>
        </div>
    );
};

export default PhotoeffectSimulation;
