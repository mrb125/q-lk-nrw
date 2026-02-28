import type { Node, Edge } from '@xyflow/react';

export type NodeCategory = 'experiment' | 'object' | 'concept' | 'interpretation' | 'formula';

export interface LegekarteData {
    id: string;
    label: string;
    category: NodeCategory;
}

export const initialCards: LegekarteData[] = [
    // Themenfeld 1
    { id: '1-licht', label: 'Licht (klassische Welle)', category: 'concept' },
    { id: '1-photon', label: 'Photon (Lichtquant)', category: 'object' },
    { id: '1-hallwachs', label: 'Hallwachs-Versuch', category: 'experiment' },
    { id: '1-photoeffekt', label: 'Photoeffekt', category: 'experiment' },
    { id: '1-compton', label: 'Compton-Effekt', category: 'experiment' },
    { id: '1-wirkungsquant', label: 'Planck\'sches Wirkungsquantum (h)', category: 'object' },
    { id: '1-austrittsarbeit', label: 'Austrittsarbeit (W_A)', category: 'object' },
    { id: '1-kinetik', label: 'Kinetische Energie (E_kin)', category: 'object' },
    { id: '1-impuls', label: 'Impuls des Photons (p = h/λ)', category: 'formula' },
    { id: '1-energie', label: 'Energie des Photons (E = h·f)', category: 'formula' },

    // Themenfeld 2
    { id: '2-elektron', label: 'Elektron / Materieteilchen', category: 'object' },
    { id: '2-debroglie', label: 'De-Broglie-Wellenlänge (λ = h/p)', category: 'formula' },
    { id: '2-beugung', label: 'Elektronenbeugung', category: 'experiment' },
    { id: '2-fullerene', label: 'Fullerene-Interferenz', category: 'experiment' },
    { id: '2-roentgen', label: 'Röntgenspektrum / Bremsstrahlung', category: 'experiment' },

    // Themenfeld 3
    { id: '3-doppelspalt', label: 'Doppelspalt-Experiment', category: 'experiment' },
    { id: '3-stochastisch', label: 'Stochastischer Aufbau', category: 'interpretation' },
    { id: '3-interferenz', label: 'Interferenzmuster', category: 'interpretation' },
    { id: '3-wahrscheinlichkeit', label: 'Wahrscheinlichkeitswelle', category: 'interpretation' },
    { id: '3-dualismus', label: 'Welle-Teilchen-Dualismus', category: 'concept' },

    // Themenfeld 4
    { id: '4-machzehnder', label: 'Mach-Zehnder-Interferometer', category: 'experiment' },
    { id: '4-welcherweg', label: 'Welcher-Weg-Information', category: 'concept' },
    { id: '4-komplementaritat', label: 'Komplementarität', category: 'interpretation' },
    { id: '4-delayedchoice', label: 'Delayed-Choice-Experiment', category: 'experiment' },
    { id: '4-unschaerfe', label: 'Heisenbergsche Unschärferelation (Δx·Δp ≥ h/4π)', category: 'formula' },
    { id: '4-katze', label: 'Schrödingers Katze', category: 'concept' },
    { id: '4-messprozess', label: 'Kollaps der Wellenfunktion', category: 'interpretation' },
];

export const photoeffektTemplateNodes: Node[] = [
    // Top Level
    { id: 't1-hall', type: 'legekarte', position: { x: 250, y: 50 }, data: { label: 'Hallwachs-Versuch', category: 'experiment' } },
    { id: 't1-phot', type: 'legekarte', position: { x: 250, y: 150 }, data: { label: 'Photoeffekt', category: 'experiment' } },
    // Middle Level
    { id: 't1-licht', type: 'legekarte', position: { x: 50, y: 250 }, data: { label: 'Licht (klassische Welle)', category: 'concept' } },
    { id: 't1-quant', type: 'legekarte', position: { x: 450, y: 250 }, data: { label: 'Photon (Lichtquant)', category: 'object' } },
    // Bottom Level
    { id: 't1-ener', type: 'legekarte', position: { x: 450, y: 350 }, data: { label: 'Energie des Photons (E = h·f)', category: 'formula' } },
    { id: 't1-aust', type: 'legekarte', position: { x: 250, y: 450 }, data: { label: 'Austrittsarbeit (W_A)', category: 'object' } },
    { id: 't1-kine', type: 'legekarte', position: { x: 650, y: 450 }, data: { label: 'Kinetische Energie (E_kin)', category: 'object' } }
];

export const photoeffektTemplateEdges: Edge[] = [
    { id: 'e1', source: 't1-hall', target: 't1-phot', label: 'ist die qualitative Version von', animated: true, markerEnd: { type: 'arrowclosed' as any, color: 'var(--accent-purple)' }, style: { stroke: 'var(--accent-purple)', strokeWidth: 2 } },
    { id: 'e2', source: 't1-licht', target: 't1-phot', label: 'kann NICHT erklären', animated: true, markerEnd: { type: 'arrowclosed' as any, color: 'var(--accent-red, #ef233c)' }, style: { stroke: 'var(--accent-red, #ef233c)', strokeWidth: 2 } },
    { id: 'e3', source: 't1-phot', target: 't1-quant', label: 'wird erklärt durch', animated: true, markerEnd: { type: 'arrowclosed' as any, color: 'var(--accent-purple)' }, style: { stroke: 'var(--accent-purple)', strokeWidth: 2 } },
    { id: 'e4', source: 't1-quant', target: 't1-ener', label: 'besitzt', animated: true, markerEnd: { type: 'arrowclosed' as any, color: 'var(--accent-purple)' }, style: { stroke: 'var(--accent-purple)', strokeWidth: 2 } },
    { id: 'e5', source: 't1-ener', target: 't1-aust', label: 'muss größer sein als', animated: true, markerEnd: { type: 'arrowclosed' as any, color: 'var(--accent-purple)' }, style: { stroke: 'var(--accent-purple)', strokeWidth: 2 } },
    { id: 'e6', source: 't1-ener', target: 't1-kine', label: 'Rest wird zu', animated: true, markerEnd: { type: 'arrowclosed' as any, color: 'var(--accent-purple)' }, style: { stroke: 'var(--accent-purple)', strokeWidth: 2 } }
];

export const doppelspaltTemplateNodes: Node[] = [
    // Top Level
    { id: 't2-dopp', type: 'legekarte', position: { x: 300, y: 50 }, data: { label: 'Doppelspalt-Experiment', category: 'experiment' } },
    // Middle Level
    { id: 't2-inte', type: 'legekarte', position: { x: 100, y: 150 }, data: { label: 'Interferenzmuster', category: 'interpretation' } },
    { id: 't2-stoc', type: 'legekarte', position: { x: 500, y: 150 }, data: { label: 'Stochastischer Aufbau', category: 'interpretation' } },
    // Bottom Level
    { id: 't2-wahr', type: 'legekarte', position: { x: 300, y: 250 }, data: { label: 'Wahrscheinlichkeitswelle', category: 'interpretation' } },
    { id: 't2-dual', type: 'legekarte', position: { x: 300, y: 350 }, data: { label: 'Welle-Teilchen-Dualismus', category: 'concept' } }
];

export const doppelspaltTemplateEdges: Edge[] = [
    { id: 'e7', source: 't2-dopp', target: 't2-inte', label: 'erzeugt langfristig', animated: true, markerEnd: { type: 'arrowclosed' as any, color: 'var(--accent-purple)' }, style: { stroke: 'var(--accent-purple)', strokeWidth: 2 } },
    { id: 'e8', source: 't2-dopp', target: 't2-stoc', label: 'bei einzelnen Photonen entsteht', animated: true, markerEnd: { type: 'arrowclosed' as any, color: 'var(--accent-purple)' }, style: { stroke: 'var(--accent-purple)', strokeWidth: 2 } },
    { id: 'e9', source: 't2-stoc', target: 't2-wahr', label: 'wird beschrieben durch', animated: true, markerEnd: { type: 'arrowclosed' as any, color: 'var(--accent-purple)' }, style: { stroke: 'var(--accent-purple)', strokeWidth: 2 } },
    { id: 'e10', source: 't2-inte', target: 't2-wahr', label: 'ist das Quadrat der', animated: true, markerEnd: { type: 'arrowclosed' as any, color: 'var(--accent-purple)' }, style: { stroke: 'var(--accent-purple)', strokeWidth: 2 } },
    { id: 'e11', source: 't2-wahr', target: 't2-dual', label: 'ist der Kern des', animated: true, markerEnd: { type: 'arrowclosed' as any, color: 'var(--accent-purple)' }, style: { stroke: 'var(--accent-purple)', strokeWidth: 2 } }
];
