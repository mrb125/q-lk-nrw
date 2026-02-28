import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { modules } from '../data/modules';
import TheoryBite from '../components/TheoryBite';
import SimulationDoppelspalt from '../components/SimulationDoppelspalt';
import SimulationPhotoeffekt from '../components/simulations/PhotoeffectSimulation';
import AbiturTask from '../components/AbiturTask';
import ResourceLinks from '../components/ResourceLinks';
import { ArrowLeft, ChevronDown } from 'lucide-react';

const LearningModule: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const moduleData = modules.find(m => m.id === id);
    const [showQuantumView, setShowQuantumView] = useState(false);
    const [showAllAnswers, setShowAllAnswers] = useState(false);

    if (!moduleData) {
        return <div style={{ padding: '2rem' }}>Modul nicht gefunden.</div>;
    }

    const hasContent = (moduleData.theoryBites && moduleData.theoryBites.length > 0) ||
        (moduleData.abiturTasks && moduleData.abiturTasks.length > 0) ||
        moduleData.hasSimulation;

    // Determine section numbers based on what's present
    const hasTheory = !!moduleData.theoryBites?.length;
    const hasSimulation = !!moduleData.hasSimulation;
    const hasResources = !!moduleData.resources?.length;
    const hasAbitur = !!moduleData.abiturTasks?.length;

    let sectionNum = 1;
    const theorySec = hasTheory ? sectionNum++ : null;
    const simSec = hasSimulation ? sectionNum++ : null;
    const resourceSec = hasResources ? sectionNum++ : null;
    const abiturSec = hasAbitur ? sectionNum++ : null;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <button
                onClick={() => navigate('/')}
                className="text-gradient"
                style={{
                    background: 'transparent',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    marginBottom: '2rem',
                    fontSize: '1rem',
                    fontWeight: 600,
                    padding: 0
                }}
            >
                <ArrowLeft size={20} color="var(--accent-neon)" /> Zurück zur Übersicht
            </button>

            <header style={{ marginBottom: '3rem' }}>

                <h1 className="text-gradient" style={{ fontSize: '3rem', margin: 0, paddingBottom: '0.5rem' }}>{moduleData.title}</h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    {moduleData.description}
                </p>

                {moduleData.experimentImage && (
                    <div style={{
                        marginTop: '2rem',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: '1px solid var(--border-color)',
                        background: 'rgba(0,0,0,0.3)',
                    }}>
                        <img
                            src={moduleData.experimentImage.url}
                            alt={moduleData.experimentImage.caption}
                            style={{
                                width: '100%',
                                maxHeight: '360px',
                                objectFit: 'contain',
                                display: 'block',
                                background: 'rgba(255,255,255,0.03)',
                                padding: '1rem',
                            }}
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                        <div style={{
                            padding: '0.75rem 1rem',
                            fontSize: '0.8rem',
                            color: 'var(--text-muted)',
                            borderTop: '1px solid var(--border-color)',
                            fontStyle: 'italic',
                        }}>
                            📷 {moduleData.experimentImage.caption} · Quelle: Wikimedia Commons (CC)
                        </div>
                    </div>
                )}
            </header>

            {moduleData.shortExplanation && (
                <div style={{
                    background: 'rgba(0, 240, 255, 0.06)',
                    border: '1px solid rgba(0, 240, 255, 0.2)',
                    borderLeft: '4px solid var(--accent-neon)',
                    borderRadius: '8px',
                    padding: '1.25rem 1.5rem',
                    marginBottom: '2.5rem',
                    fontSize: '1rem',
                    lineHeight: '1.75',
                    color: 'var(--text-main)',
                }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-neon)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
                        💡 Kurzerklärung
                    </div>
                    {moduleData.shortExplanation}
                </div>
            )}

            <section>
                {!hasContent ? (
                    <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        Die interaktiven Theorie-Bites, Simulationen und Aufgaben für „{moduleData.title}" werden in Kürze freigeschaltet.
                    </div>
                ) : (
                    <>
                        {/* 1. Theory Bites */}
                        {hasTheory && theorySec !== null && (
                            <>
                                <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
                                    {theorySec}. Klassische Erwartung vs. Quantenwelt
                                </h2>
                                {moduleData.theoryBites!.map((bite, i) => (
                                    <TheoryBite
                                        key={i}
                                        title={bite.title}
                                        classicalText={bite.classicalText}
                                        quantumText={bite.quantumText}
                                        isRevealed={showQuantumView}
                                    />
                                ))}
                            </>
                        )}

                        {/* 2. Simulation */}
                        {hasSimulation && simSec !== null && (
                            <>
                                <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
                                    {simSec}. Interaktive Simulation
                                </h2>
                                {id === 'doppelspalt' && <SimulationDoppelspalt />}
                                {id === 'photoeffekt' && <SimulationPhotoeffekt />}
                            </>
                        )}

                        {/* 3. Resources */}
                        {hasResources && moduleData.resources && resourceSec !== null && (
                            <ResourceLinks
                                resources={moduleData.resources}
                                sectionNumber={String(resourceSec)}
                            />
                        )}

                        {/* 4. Abitur Tasks */}
                        {hasAbitur && abiturSec !== null && (
                            <>
                                <h2 style={{ fontSize: '1.5rem', marginTop: '1rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
                                    {abiturSec}. Abitur-Training (Kernlehrplan NRW)
                                </h2>
                                {moduleData.abiturTasks!.map((task, i) => (
                                    <AbiturTask
                                        key={i}
                                        afb={task.afb}
                                        operator={task.operator}
                                        question={task.question}
                                        answer={task.answer}
                                        forceShow={showAllAnswers}
                                    />
                                ))}
                            </>
                        )}

                        {/* Reveal-all button at the bottom */}
                        {(hasTheory || hasAbitur) && !showQuantumView && (
                            <div style={{ marginTop: '3rem', marginBottom: '1rem', textAlign: 'center' }}>
                                <button
                                    onClick={() => { setShowQuantumView(true); setShowAllAnswers(true); }}
                                    className="hover-glow"
                                    style={{
                                        padding: '1.5rem 3rem',
                                        background: 'linear-gradient(135deg, var(--bg-elevated), rgba(0, 240, 255, 0.1))',
                                        border: '2px solid var(--accent-neon)',
                                        color: 'var(--accent-neon)',
                                        borderRadius: '16px',
                                        fontSize: '1.15rem',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        display: 'inline-flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '0.4rem',
                                        transition: 'all 0.3s',
                                        boxShadow: '0 0 20px rgba(0, 240, 255, 0.2)'
                                    }}
                                >
                                    <span>Alle Lösungen aufdecken</span>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 400, color: 'var(--text-main)' }}>
                                        Quanten-Sicht + Musterlösungen sichtbar machen
                                    </span>
                                    <ChevronDown size={22} />
                                </button>
                            </div>
                        )}

                        {(hasTheory || hasAbitur) && showQuantumView && (
                            <div style={{
                                marginTop: '2rem',
                                marginBottom: '1rem',
                                padding: '0.75rem 1.5rem',
                                color: 'var(--accent-green)',
                                fontWeight: 600,
                                border: '1px solid var(--accent-green)',
                                borderRadius: '12px',
                                background: 'rgba(57, 255, 20, 0.05)',
                                animation: 'fadeIn 0.4s ease-out',
                                textAlign: 'center',
                            }}>
                                ✓ Alle Quanten-Antworten und Musterlösungen sind sichtbar
                            </div>
                        )}
                    </>
                )}
            </section>
        </div>
    );
};

export default LearningModule;
