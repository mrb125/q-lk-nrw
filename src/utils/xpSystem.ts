export const XP_KEY = 'q-lk-xp';
export const ACTIVITY_KEY = 'q-lk-activity';

export interface LevelThreshold {
    level: number;
    xpRequired: number;
    title: string;
}

export const LEVELS: LevelThreshold[] = [
    { level: 1, xpRequired: 0, title: 'Quanten-Novize' },
    { level: 2, xpRequired: 50, title: 'Wahrscheinlichkeitssurfer' },
    { level: 3, xpRequired: 150, title: 'Photonen-Dompteur' },
    { level: 4, xpRequired: 300, title: 'Wellenfunktions-Bändiger' },
    { level: 5, xpRequired: 500, title: 'Verschränkungs-Meister' },
    { level: 6, xpRequired: 800, title: 'Bohr-Schüler' },
    { level: 7, xpRequired: 1200, title: 'Planck-Erbe' },
    { level: 8, xpRequired: 1800, title: 'Heisenberg-Versteher' },
    { level: 9, xpRequired: 2500, title: 'Schrödingers Liebling' },
    { level: 10, xpRequired: 4000, title: 'Quanten-Gott' },
];

export const getXP = (): number => {
    return parseInt(localStorage.getItem(XP_KEY) || '0', 10);
};

export const addXP = (amount: number) => {
    const current = getXP();
    localStorage.setItem(XP_KEY, (current + amount).toString());
    recordActivity();
    window.dispatchEvent(new Event('xp-updated'));
};

export const getCurrentLevel = (xp: number = getXP()): LevelThreshold => {
    return [...LEVELS].reverse().find(l => xp >= l.xpRequired) || LEVELS[0];
};

export const getNextLevel = (xp: number = getXP()): LevelThreshold | null => {
    return LEVELS.find(l => xp < l.xpRequired) || null;
};

export const getLevelProgress = (xp: number = getXP()) => {
    const currentLevel = getCurrentLevel(xp);
    const nextLevel = getNextLevel(xp);

    if (!nextLevel) return 100; // Max level

    const xpInCurrentLevel = xp - currentLevel.xpRequired;
    const xpNeededForNext = nextLevel.xpRequired - currentLevel.xpRequired;
    return (xpInCurrentLevel / xpNeededForNext) * 100;
};

export const recordActivity = () => {
    const today = new Date().toISOString().split('T')[0];
    const activity = getActivityData();
    if (!activity[today]) activity[today] = 0;
    activity[today]++;
    localStorage.setItem(ACTIVITY_KEY, JSON.stringify(activity));
    window.dispatchEvent(new Event('activity-updated'));
};

export const getActivityData = (): Record<string, number> => {
    try {
        return JSON.parse(localStorage.getItem(ACTIVITY_KEY) || '{}');
    } catch {
        return {};
    }
};

export const checkAndAwardBadge = (badgeId: string, condition: boolean) => {
    if (!condition) return;
    const BADGE_KEY = `q-lk-badge-${badgeId}`;
    if (!localStorage.getItem(BADGE_KEY)) {
        localStorage.setItem(BADGE_KEY, 'true');
        window.dispatchEvent(new CustomEvent('badge-earned', { detail: { badgeId } }));
    }
};

