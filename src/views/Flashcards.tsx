import React, { useState, useEffect } from 'react';
import { modules } from '../data/modules';
import { Brain, CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react';

type Flashcard = {
    id: string;
    topic: string;
    type: 'Theorie' | 'Abitur';
    front: string;
    back: string;
};

const Flashcards: React.FC = () => {
    const [cards, setCards] = useState<Flashcard[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [knownCards, setKnownCards] = useState<Set<string>>(new Set());

    // Initialize cards on load
    useEffect(() => {
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
                        front: `Operator: ${task.operator} (AFB ${task.afb})\n\n${task.question}`,
                        back: task.answer
                    });
                });
            }
        });

        // Shuffle cards
        allCards.sort(() => Math.random() - 0.5);

        setCards(allCards);

        // Load known cards from localStorage
        const savedKnown = localStorage.getItem('q-lk-flashcards-known');
        if (savedKnown) {
            setKnownCards(new Set(JSON.parse(savedKnown)));
        }
    }, []);

    // Save progress
    useEffect(() => {
        if (knownCards.size > 0) {
            localStorage.setItem('q-lk-flashcards-known', JSON.stringify(Array.from(knownCards)));
        }
    }, [knownCards]);

    const handleNext = (known: boolean) => {
        const currentCard = cards[currentIndex];

        if (known) {
            setKnownCards(prev => new Set(prev).add(currentCard.id));
        } else {
            // Move card to end to repeat later
            setCards(prev => {
                const newCards = [...prev];
                const card = newCards.splice(currentIndex, 1)[0];
                newCards.push(card);
                return newCards;
            });
            // Don't advance index because we removed current element
            setIsFlipped(false);
            return;
        }

        setIsFlipped(false);
        if (currentIndex < cards.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const handleReset = () => {
        if (window.confirm("Bist du sicher, dass du deinen Lernfortschritt komplett zurücksetzen willst?")) {
            setKnownCards(new Set());
            localStorage.removeItem('q-lk-flashcards-known');
            setCurrentIndex(0);

            // Re-shuffle
            setCards(prev => [...prev].sort(() => Math.random() - 0.5));
        }
    };

    if (cards.length === 0) return <div style={{ padding: '2rem', textAlign: 'center' }}>Lade Karteikarten...</div>;

    const isFinished = currentIndex >= cards.length;
    const currentCard = cards[currentIndex];

    // Filter to calculate total known vs available
    const totalCards = cards.length;
    const learnedCount = knownCards.size;
    const progressPercent = Math.round((learnedCount / totalCards) * 100) || 0;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '100px' }}>
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 className="text-gradient" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                        <Brain /> Karteikarten-Trainer
                    </h1>
                    <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 0 0' }}>Trainiere die Konzepte und Abituraufgaben.</p>
                </div>
                <button onClick={handleReset} className="button button-outline" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', padding: '0.5rem 1rem' }}>
                    <RotateCcw size={16} /> Reset
                </button>
            </header>

            {/* Progress Bar */}
            <div style={{ marginBottom: '2rem', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Globaler Lernfortschritt</span>
                    <strong style={{ color: 'var(--accent-neon)' }}>{learnedCount} / {totalCards} verstanden ({progressPercent}%)</strong>
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${progressPercent}%`, background: 'var(--accent-neon)', transition: 'width 0.3s ease' }}></div>
                </div>
            </div>

            {isFinished ? (
                <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                    <Award size={64} color="var(--accent-yellow)" style={{ marginBottom: '1rem' }} />
                    <h2 className="text-gradient">Großartige Arbeit!</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Du hast alle {totalCards} Karteikarten in diesem Durchgang verstanden.</p>
                    <button onClick={handleReset} className="button button-primary" style={{ marginTop: '2rem' }}>
                        Training neu starten
                    </button>
                </div>
            ) : (
                <div style={{ perspective: '1000px', margin: '0 auto', maxWidth: '600px' }}>
                    <div
                        onClick={() => setIsFlipped(!isFlipped)}
                        style={{
                            width: '100%',
                            minHeight: '350px',
                            position: 'relative',
                            transition: 'transform 0.6s',
                            transformStyle: 'preserve-3d',
                            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
                            cursor: 'pointer'
                        }}
                    >
                        {/* Front of card */}
                        <div className="glass-panel" style={{
                            position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
                            display: 'flex', flexDirection: 'column', padding: '2rem',
                            borderTop: `4px solid ${currentCard.type === 'Theorie' ? 'var(--accent-purple)' : 'var(--accent-neon)'}`
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                <span>{currentCard.type}</span>
                                <span>{currentCard.topic}</span>
                            </div>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', textAlign: 'center', whiteSpace: 'pre-wrap' }}>
                                {currentCard.front}
                            </div>
                            <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '1rem' }}>
                                Tippen zum Umdrehen
                            </div>
                        </div>

                        {/* Back of card */}
                        <div className="glass-panel" style={{
                            position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
                            display: 'flex', flexDirection: 'column', padding: '2rem',
                            borderTop: `4px solid ${currentCard.type === 'Theorie' ? 'var(--accent-purple)' : 'var(--accent-neon)'}`,
                            transform: 'rotateY(180deg)',
                            background: 'rgba(20, 20, 35, 0.95)' // Slightly darker back
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                <span>Antwort / Lösung</span>
                                <span>{currentCard.topic}</span>
                            </div>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.15rem', textAlign: 'center', color: 'var(--accent-green)', whiteSpace: 'pre-wrap' }}>
                                {currentCard.back}
                            </div>
                        </div>
                    </div>

                    {/* Action buttons - only show clearly when flipped, or show disabled */}
                    <div style={{
                        display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '3rem',
                        opacity: isFlipped ? 1 : 0.3, transition: 'opacity 0.3s', pointerEvents: isFlipped ? 'auto' : 'none'
                    }}>
                        <button
                            onClick={(e) => { e.stopPropagation(); handleNext(false); }}
                            style={{
                                background: 'rgba(255, 60, 60, 0.1)', border: '2px solid var(--accent-red)', color: 'var(--accent-red)',
                                borderRadius: '50%', width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 0 15px rgba(255, 60, 60, 0.2)'
                            }}
                        >
                            <XCircle size={32} />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); handleNext(true); }}
                            style={{
                                background: 'rgba(57, 255, 20, 0.1)', border: '2px solid var(--accent-green)', color: 'var(--accent-green)',
                                borderRadius: '50%', width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 0 15px rgba(57, 255, 20, 0.2)'
                            }}
                        >
                            <CheckCircle size={32} />
                        </button>
                    </div>

                    {isFlipped && (
                        <div style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            Wusstest du die Antwort?
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Flashcards;
