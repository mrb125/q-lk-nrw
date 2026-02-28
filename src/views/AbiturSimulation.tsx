import React, { useState, useEffect, useRef } from 'react';
import { modules } from '../data/modules';
import { GraduationCap, Clock, CheckCircle, XCircle, ChevronRight, Trophy, RotateCcw } from 'lucide-react';

type Question = {
    id: string;
    topic: string;
    afb: 'I' | 'II' | 'III';
    operator: string;
    question: string;
    answer: string;
};

type UserAnswer = {
    questionId: string;
    userText: string;
    selfScore: 'correct' | 'partial' | 'wrong' | null;
};

const TOTAL_MINUTES = 45;

const buildQuestions = (): Question[] => {
    const all: Question[] = [];
    modules.forEach(mod => {
        if (mod.abiturTasks) {
            mod.abiturTasks.forEach((t, i) => {
                all.push({ id: `${mod.id}-${i}`, topic: mod.title, afb: t.afb, operator: t.operator, question: t.question, answer: t.answer });
            });
        }
    });
    // Sort I → II → III
    return all.sort((a, b) => a.afb.localeCompare(b.afb));
};

const AbiturSimulation: React.FC = () => {
    const [phase, setPhase] = useState<'intro' | 'exam' | 'review'>('intro');
    const [questions] = useState<Question[]>(buildQuestions);
    const [currentQ, setCurrentQ] = useState(0);
    const [userText, setUserText] = useState('');
    const [answers, setAnswers] = useState<UserAnswer[]>([]);
    const [timeLeft, setTimeLeft] = useState(TOTAL_MINUTES * 60);
    const [showAnswer, setShowAnswer] = useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (phase === 'exam') {
            timerRef.current = setInterval(() => {
                setTimeLeft(t => {
                    if (t <= 1) {
                        clearInterval(timerRef.current!);
                        setPhase('review');
                        return 0;
                    }
                    return t - 1;
                });
            }, 1000);
        }
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [phase]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timerColor = timeLeft < 300 ? 'var(--accent-red)' : timeLeft < 600 ? '#ffd166' : 'var(--accent-green)';

    const handleSubmitAnswer = () => {
        const updated = [...answers.filter(a => a.questionId !== questions[currentQ].id),
        { questionId: questions[currentQ].id, userText, selfScore: null }];
        setAnswers(updated);
        setShowAnswer(true);
    };

    const handleSelfScore = (score: 'correct' | 'partial' | 'wrong') => {
        setAnswers(prev => prev.map(a => a.questionId === questions[currentQ].id ? { ...a, selfScore: score } : a));
        setShowAnswer(false);
        setUserText('');
        if (currentQ < questions.length - 1) {
            setCurrentQ(currentQ + 1);
        } else {
            clearInterval(timerRef.current!);
            setPhase('review');
        }
    };

    const handleStart = () => {
        setPhase('exam');
        setCurrentQ(0);
        setAnswers([]);
        setUserText('');
        setTimeLeft(TOTAL_MINUTES * 60);
        setShowAnswer(false);
    };

    const stats = {
        correct: answers.filter(a => a.selfScore === 'correct').length,
        partial: answers.filter(a => a.selfScore === 'partial').length,
        wrong: answers.filter(a => a.selfScore === 'wrong').length,
        total: answers.length,
    };
    const scorePercent = stats.total > 0 ? Math.round(((stats.correct + stats.partial * 0.5) / stats.total) * 100) : 0;
    const grade = scorePercent >= 85 ? '15 P. (sehr gut)' : scorePercent >= 70 ? '11 P. (gut)' : scorePercent >= 55 ? '8 P. (befriedigend)' : scorePercent >= 40 ? '5 P. (ausreichend)' : '0-4 P. (nicht bestanden)';

    if (phase === 'intro') return (
        <div style={{ maxWidth: '700px', margin: '0 auto', paddingBottom: '100px' }}>
            <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <GraduationCap size={64} style={{ color: 'var(--accent-neon)', marginBottom: '1rem' }} />
                <h1 className="text-gradient" style={{ fontSize: '2.5rem', margin: 0 }}>Abitur-Simulation</h1>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontSize: '1.1rem' }}>
                    Simuliere eine echte Abiturprüfung unter Zeitdruck
                </p>
            </header>
            <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <h2 style={{ marginTop: 0 }}>Prüfungsdetails</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent-neon)' }}>{TOTAL_MINUTES} min</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Bearbeitungszeit</div>
                    </div>
                    <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent-purple)' }}>{questions.length}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Aufgaben (AFB I–III)</div>
                    </div>
                </div>
                <p style={{ color: 'var(--text-muted)', marginTop: '1.5rem', lineHeight: 1.7 }}>
                    Bearbeite die Aufgaben wie in einer echten Prüfung. Schreibe deine Antwort, dann vergleiche mit der Musterlösung und bewertest du dich selbst.
                </p>
            </div>
            <button onClick={handleStart} className="button button-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.2rem' }}>
                <GraduationCap size={24} /> Prüfung starten
            </button>
        </div>
    );

    if (phase === 'review') return (
        <div style={{ maxWidth: '700px', margin: '0 auto', paddingBottom: '100px' }}>
            <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Trophy size={64} style={{ color: 'var(--accent-yellow)', marginBottom: '1rem' }} />
                <h1 className="text-gradient">Prüfung abgeschlossen</h1>
            </header>
            <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <h2 style={{ marginTop: 0, marginBottom: '1.5rem' }}>Dein Ergebnis</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ textAlign: 'center', background: 'rgba(57,255,20,0.1)', borderRadius: '8px', padding: '1rem', border: '1px solid var(--accent-green)' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent-green)' }}>{stats.correct}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Richtig</div>
                    </div>
                    <div style={{ textAlign: 'center', background: 'rgba(255,209,102,0.1)', borderRadius: '8px', padding: '1rem', border: '1px solid #ffd166' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 700, color: '#ffd166' }}>{stats.partial}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Teilweise</div>
                    </div>
                    <div style={{ textAlign: 'center', background: 'rgba(255,60,60,0.1)', borderRadius: '8px', padding: '1rem', border: '1px solid var(--accent-red)' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent-red)' }}>{stats.wrong}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Falsch</div>
                    </div>
                </div>
                <div style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-neon)', marginBottom: '0.5rem' }}>
                    {scorePercent}% → {grade}
                </div>
            </div>

            <h2 style={{ marginBottom: '1rem' }}>Alle Aufgaben im Überblick</h2>
            {questions.map((q) => {
                const ans = answers.find(a => a.questionId === q.id);
                return (
                    <div key={q.id} className="glass-panel" style={{ marginBottom: '1rem', padding: '1.5rem', borderLeft: `4px solid ${ans?.selfScore === 'correct' ? 'var(--accent-green)' : ans?.selfScore === 'partial' ? '#ffd166' : ans?.selfScore === 'wrong' ? 'var(--accent-red)' : 'var(--border-color)'}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                            <span>AFB {q.afb} · {q.topic}</span>
                            <span style={{ color: ans?.selfScore === 'correct' ? 'var(--accent-green)' : ans?.selfScore === 'partial' ? '#ffd166' : 'var(--accent-red)' }}>{ans?.selfScore ?? 'nicht bewertet'}</span>
                        </div>
                        <p style={{ margin: '0 0 0.5rem 0', fontWeight: 600 }}>{q.question}</p>
                        <p style={{ margin: 0, color: 'var(--accent-green)', fontSize: '0.9rem' }}><strong>Lösung:</strong> {q.answer}</p>
                    </div>
                );
            })}
            <button onClick={() => setPhase('intro')} className="button button-primary" style={{ width: '100%', marginTop: '1rem' }}>
                <RotateCcw size={18} /> Neue Prüfung
            </button>
        </div>
    );

    // Exam phase
    const q = questions[currentQ];
    return (
        <div style={{ maxWidth: '700px', margin: '0 auto', paddingBottom: '100px' }}>
            {/* Timer Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', background: 'rgba(0,0,0,0.3)', padding: '0.75rem 1.5rem', borderRadius: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: timerColor, fontWeight: 700, fontSize: '1.3rem' }}>
                    <Clock size={20} /> {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    Aufgabe {currentQ + 1} / {questions.length}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {(['I', 'II', 'III'] as const).map(afb => (
                        <span key={afb} style={{
                            padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700,
                            background: q.afb === afb ? 'var(--accent-purple)' : 'transparent',
                            color: q.afb === afb ? 'white' : 'var(--text-muted)',
                            border: '1px solid var(--border-color)'
                        }}>AFB {afb}</span>
                    ))}
                </div>
            </div>

            <div className="glass-panel" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>{q.topic}</div>
                <div style={{ display: 'inline-block', background: 'var(--accent-purple)', color: 'white', padding: '0.2rem 0.7rem', borderRadius: '4px', fontSize: '0.85rem', marginBottom: '1rem' }}>
                    {q.operator}
                </div>
                <h2 style={{ margin: '0 0 1.5rem 0', lineHeight: 1.5 }}>{q.question}</h2>

                {!showAnswer ? (
                    <>
                        <textarea
                            value={userText}
                            onChange={e => setUserText(e.target.value)}
                            placeholder="Schreibe deine Antwort hier..."
                            style={{
                                width: '100%', minHeight: '160px', background: 'rgba(0,0,0,0.3)',
                                border: '1px solid var(--border-color)', borderRadius: '8px',
                                color: 'white', padding: '1rem', fontSize: '1rem', resize: 'vertical',
                                outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box'
                            }}
                        />
                        <button onClick={handleSubmitAnswer} className="button button-primary" style={{ width: '100%', marginTop: '1rem' }}>
                            <ChevronRight size={18} /> Musterlösung anzeigen
                        </button>
                    </>
                ) : (
                    <>
                        <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '1rem', marginBottom: '1rem', borderLeft: '4px solid var(--accent-green)' }}>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Musterlösung:</div>
                            <p style={{ margin: 0, color: 'var(--accent-green)', whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>{q.answer}</p>
                        </div>
                        <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '1rem' }}>Wie gut war deine Antwort?</p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <button onClick={() => handleSelfScore('wrong')} style={{ flex: 1, padding: '0.75rem', background: 'rgba(255,60,60,0.1)', border: '2px solid var(--accent-red)', color: 'var(--accent-red)', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <XCircle size={18} /> Falsch
                            </button>
                            <button onClick={() => handleSelfScore('partial')} style={{ flex: 1, padding: '0.75rem', background: 'rgba(255,209,102,0.1)', border: '2px solid #ffd166', color: '#ffd166', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                ≈ Teilweise
                            </button>
                            <button onClick={() => handleSelfScore('correct')} style={{ flex: 1, padding: '0.75rem', background: 'rgba(57,255,20,0.1)', border: '2px solid var(--accent-green)', color: 'var(--accent-green)', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <CheckCircle size={18} /> Richtig
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* Progress dots */}
            <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {questions.map((_, i) => {
                    const ans = answers.find(a => a.questionId === questions[i].id);
                    return (
                        <div key={i} style={{
                            width: '10px', height: '10px', borderRadius: '50%',
                            background: i === currentQ ? 'var(--accent-neon)' : ans?.selfScore === 'correct' ? 'var(--accent-green)' : ans?.selfScore === 'partial' ? '#ffd166' : ans?.selfScore === 'wrong' ? 'var(--accent-red)' : 'rgba(255,255,255,0.15)'
                        }} />
                    );
                })}
            </div>
        </div>
    );
};

export default AbiturSimulation;
