import React, { useState, useEffect } from 'react';
import { modules } from '../data/modules';
import { Brain, CheckCircle, XCircle, RotateCcw, Award, Filter } from 'lucide-react';

type Flashcard = {
    id: string;
    topic: string;
    type: 'Theorie' | 'Abitur';
    afb?: 'I' | 'II' | 'III';
    front: string;
    back: string;
};

type AFBFilter = 'Alle' | 'Theorie' | 'I' | 'II' | 'III';

const buildAllCards = (): Flashcard[] => {
    const allCards: Flashcard[] = [];
    modules.forEach(mod => {
        if (mod.theoryBites) {
            mod.theoryBites.forEach((bite, idx) => {
                allCards.push({
                    id: `theory-${mod.id}-${idx}`,
                    topic: mod.title,
                    type: 'Theorie',
                    front: `Klassische Sicht: ${bite.classicalText}`,
                    back: `Quanten-Sicht: ${bite.quantumText}`
                });
            });
        }
        if (mod.abiturTasks) {
            mod.abiturTasks.forEach((task, idx) => {
                allCards.push({
                    id: `abitur-${mod.id}-${idx}`,
                    topic: mod.title,
                    type: 'Abitur',
                    afb: task.afb,
                    front: `Operator: ${task.operator} (AFB ${task.afb})\n\n${task.question}`,
                    back: task.answer
                });
            });
        }
    });
    return allCards.sort(() => Math.random() - 0.5);
};

const Flashcards: React.FC = () => {
    const [allCards] = useState<Flashcard[]>(buildAllCards);
    const [activeFilter, setActiveFilter] = useState<AFBFilter>('Alle');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [knownCards, setKnownCards] = useState<Set<string>>(new Set());

    useEffect(() => {
        const saved = localStorage.getItem('q-lk-flashcards-known');
        if (saved) setKnownCards(new Set(JSON.parse(saved)));
    }, []);

    useEffect(() => {
        if (knownCards.size > 0) {
            localStorage.setItem('q-lk-flashcards-known', JSON.stringify(Array.from(knownCards)));
        }
    }, [knownCards]);

    // Filter cards for the active filter - always regenerate when filter changes
    const filteredCards = (() => {
        if (activeFilter === 'Alle') return allCards;
        if (activeFilter === 'Theorie') return allCards.filter(c => c.type === 'Theorie');
        return allCards.filter(c => c.afb === activeFilter);
    })();

    const handleFilterChange = (f: AFBFilter) => {
        setActiveFilter(f);
        setCurrentIndex(0);
        setIsFlipped(false);
    };

    const handleNext = (known: boolean) => {
        const currentCard = filteredCards[currentIndex];
        if (known) {
            setKnownCards(prev => new Set(prev).add(currentCard.id));
            setIsFlipped(false);
            setCurrentIndex(prev => prev + 1);
        } else {
            setIsFlipped(false);
            setCurrentIndex(prev => (prev + 1 < filteredCards.length ? prev + 1 : prev));
        }
    };

    const handleReset = () => {
        if (window.confirm('Lernfortschritt zurücksetzen?')) {
            setKnownCards(new Set());
            localStorage.removeItem('q-lk-flashcards-known');
            setCurrentIndex(0);
            setIsFlipped(false);
        }
    };

    const filters: { label: string; value: AFBFilter; color: string }[] = [
        { label: 'Alle', value: 'Alle', color: 'var(--accent-neon)' },
        { label: 'Theorie', value: 'Theorie', color: 'var(--accent-purple)' },
        { label: 'AFB I', value: 'I', color: '#06d6a0' },
        { label: 'AFB II', value: 'II', color: '#ffd166' },
        { label: 'AFB III', value: 'III', color: '#ef233c' },
    ];

    const totalCards = filteredCards.length;
    const learnedCount = filteredCards.filter(c => knownCards.has(c.id)).length;
    const progressPercent = totalCards > 0 ? Math.round((learnedCount / totalCards) * 100) : 0;
    const isFinished = currentIndex >= totalCards;
    const currentCard = filteredCards[currentIndex];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '100px' }}>
            <header style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 className="text-gradient" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                        <Brain /> Karteikarten-Trainer
                    </h1>
                    <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 0 0' }}>Trainiere Konzepte und Abituraufgaben.</p>
                </div>
                <button onClick={handleReset} className="button button-outline" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <RotateCcw size={16} /> Reset
                </button>
            </header>

            {/* AFB Filter */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <Filter size={16} style={{ color: 'var(--text-muted)' }} />
                {filters.map(f => (
                    <button
                        key={f.value}
                        onClick={() => handleFilterChange(f.value)}
                        style={{
                            padding: '0.35rem 0.9rem',
                            borderRadius: '20px',
                            border: `1.5px solid ${activeFilter === f.value ? f.color : 'rgba(255,255,255,0.15)'}`,
                            background: activeFilter === f.value ? `${f.color}22` : 'transparent',
                            color: activeFilter === f.value ? f.color : 'var(--text-muted)',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: activeFilter === f.value ? 700 : 400,
                            transition: 'all 0.2s'
                        }}
                    >
                        {f.label}
                    </button>
                ))}
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: 'auto' }}>
                    {totalCards} Karten
                </span>
            </div>

            {/* Progress Bar */}
            <div style={{ marginBottom: '2rem', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Fortschritt ({activeFilter})</span>
                    <strong style={{ color: 'var(--accent-neon)' }}>{learnedCount} / {totalCards} ({progressPercent}%)</strong>
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${progressPercent}%`, background: 'var(--accent-neon)', transition: 'width 0.3s ease' }}></div>
                </div>
            </div>

            {totalCards === 0 ? (
                <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem' }}>
                    <p style={{ color: 'var(--text-muted)' }}>Keine Karten für diesen Filter.</p>
                </div>
            ) : isFinished ? (
                <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                    <Award size={64} color="var(--accent-yellow)" style={{ marginBottom: '1rem' }} />
                    <h2 className="text-gradient">Großartige Arbeit!</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Alle {totalCards} Karten in diesem Durchgang abgearbeitet.</p>
                    <button onClick={() => { setCurrentIndex(0); setIsFlipped(false); }} className="button button-primary" style={{ marginTop: '2rem' }}>
                        Nochmal
                    </button>
                </div>
            ) : (
                <div style={{ perspective: '1000px', margin: '0 auto', maxWidth: '600px' }}>
                    <div
                        onClick={() => setIsFlipped(!isFlipped)}
                        style={{
                            width: '100%', minHeight: '350px', position: 'relative',
                            transition: 'transform 0.6s', transformStyle: 'preserve-3d',
                            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)', cursor: 'pointer'
                        }}
                    >
                        {/* Front */}
                        <div className="glass-panel" style={{
                            position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
                            display: 'flex', flexDirection: 'column', padding: '2rem',
                            borderTop: `4px solid ${currentCard.type === 'Theorie' ? 'var(--accent-purple)' : currentCard.afb === 'I' ? '#06d6a0' : currentCard.afb === 'II' ? '#ffd166' : '#ef233c'}`
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                <span>{currentCard.type}{currentCard.afb ? ` · AFB ${currentCard.afb}` : ''}</span>
                                <span>{currentCard.topic}</span>
                            </div>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.15rem', textAlign: 'center', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                                {currentCard.front}
                            </div>
                            <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '1rem' }}>
                                Tippen zum Umdrehen · {currentIndex + 1} / {totalCards}
                            </div>
                        </div>

                        {/* Back */}
                        <div className="glass-panel" style={{
                            position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
                            display: 'flex', flexDirection: 'column', padding: '2rem',
                            borderTop: `4px solid ${currentCard.type === 'Theorie' ? 'var(--accent-purple)' : 'var(--accent-neon)'}`,
                            transform: 'rotateY(180deg)', background: 'rgba(20, 20, 35, 0.95)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                <span>Antwort / Lösung</span>
                                <span>{currentCard.topic}</span>
                            </div>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', textAlign: 'center', color: 'var(--accent-green)', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                                {currentCard.back}
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '3rem', opacity: isFlipped ? 1 : 0.3, transition: 'opacity 0.3s', pointerEvents: isFlipped ? 'auto' : 'none' }}>
                        <button onClick={(e) => { e.stopPropagation(); handleNext(false); }} style={{ background: 'rgba(255,60,60,0.1)', border: '2px solid var(--accent-red)', color: 'var(--accent-red)', borderRadius: '50%', width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>
                            <XCircle size={32} />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); handleNext(true); }} style={{ background: 'rgba(57,255,20,0.1)', border: '2px solid var(--accent-green)', color: 'var(--accent-green)', borderRadius: '50%', width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>
                            <CheckCircle size={32} />
                        </button>
                    </div>
                    {isFlipped && <div style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Wusstest du die Antwort?</div>}
                </div>
            )}
        </div>
    );
};

export default Flashcards;
