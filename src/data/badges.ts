// Badge definitions and engine
export type Badge = {
    id: string;
    name: string;
    description: string;
    icon: string;
    condition: string;
};

export const BADGES: Badge[] = [
    { id: 'first_card', name: 'Erste Karte!', description: 'Erste Karteikarte im Trainer umgedreht.', icon: '🃏', condition: 'flashcard_flipped_any' },
    { id: 'ten_cards', name: '10 Karten gelernt', description: '10 Karteikarten als "gewusst" markiert.', icon: '⭐', condition: 'known_cards_10' },
    { id: 'trainer_master', name: 'Trainer-Meister', description: 'Alle Karteikarten eines Filters auf "gewusst" gesetzt.', icon: '🏆', condition: 'all_cards_known_filter' },
    { id: 'abitur_done', name: 'Abitur gemacht!', description: 'Eine vollständige Abitur-Simulation abgeschlossen.', icon: '🎓', condition: 'abitur_simulation_done' },
    { id: 'abitur_excellent', name: 'Ausgezeichnet!', description: 'Abitur-Simulation mit ≥85% abgeschlossen.', icon: '🥇', condition: 'abitur_score_85' },
    { id: 'explorer', name: 'Entdecker', description: 'Die Formelsammlung aufgerufen.', icon: '🔭', condition: 'formulas_visited' },
    { id: 'sim_user', name: 'Experimentator', description: 'Eine Simulation gestartet.', icon: '⚗️', condition: 'simulation_started' },
    { id: 'two_boards', name: 'Board-Profi', description: 'Zwei Strukturlegekarten-Boards angelegt.', icon: '🗂️', condition: 'boards_two' },
    { id: 'auswertung_done', name: 'Auswertungsexperte', description: 'Eine Messwert-Auswertung durchgeführt.', icon: '📊', condition: 'auswertung_done' },
    { id: 'all_topics', name: 'Quantenphysiker', description: '10+ Karteikarten aus verschiedenen Themen gelernt.', icon: '⚛️', condition: 'topics_10' },
];

const STORAGE_KEY = 'q-lk-badges';

export const getEarnedBadges = (): Set<string> => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? new Set(JSON.parse(saved)) : new Set();
};

export const awardBadge = (id: string): boolean => {
    const earned = getEarnedBadges();
    if (earned.has(id)) return false;
    earned.add(id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(earned)));
    return true; // newly earned
};

export const checkAndAwardBadge = (condition: string): boolean => {
    const badge = BADGES.find(b => b.condition === condition);
    if (!badge) return false;
    return awardBadge(badge.id);
};
