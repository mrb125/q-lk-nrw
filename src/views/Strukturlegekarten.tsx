import React, { useState, useCallback, useEffect } from 'react';
import {
    ReactFlow,
    Controls,
    Background,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    Panel,
    ConnectionMode,
    MarkerType,
    ReactFlowProvider,
    useReactFlow
} from '@xyflow/react';
import type {
    Connection,
    Edge,
    Node,
    NodeChange,
    EdgeChange,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import dagre from 'dagre';

import { nodeTypes } from '../components/legekarten/CustomNodes';
import CustomEdge from '../components/legekarten/CustomEdge';
import {
    initialCards,
    photoeffektTemplateNodes,
    photoeffektTemplateEdges,
    doppelspaltTemplateNodes,
    doppelspaltTemplateEdges
} from '../data/legekartenData';
import type { LegekarteData } from '../data/legekartenData';
import { exportFlowToPDF } from '../utils/exportPdf';
import { Download, Plus, Trash2, Zap, Waves, Sparkles, CheckCircle } from 'lucide-react';

const edgeTypes = {
    custom: CustomEdge,
};

const LOCAL_STORAGE_KEY_NODES = 'q-lk-nrw-sk-nodes';
const LOCAL_STORAGE_KEY_EDGES = 'q-lk-nrw-sk-edges';

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'TB') => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
        // Approximate dimensions
        dagreGraph.setNode(node.id, { width: 220, height: 80 });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        node.targetPosition = direction === 'LR' ? 'left' : 'top' as any;
        node.sourcePosition = direction === 'LR' ? 'right' : 'bottom' as any;

        // Shift by half dimensions because dagre coordinates are center
        node.position = {
            x: nodeWithPosition.x - 110,
            y: nodeWithPosition.y - 40,
        };
        return node;
    });

    return { nodes, edges };
};

// Combining all valid template edges to check against
const allValidEdges = [...photoeffektTemplateEdges, ...doppelspaltTemplateEdges];

const StrukturlegekartenFlow: React.FC = () => {
    const { screenToFlowPosition, fitView } = useReactFlow();

    // Initialize from local storage if exists
    const [nodes, setNodes] = useState<Node[]>(() => {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY_NODES);
        return saved ? JSON.parse(saved) : [];
    });

    const [edges, setEdges] = useState<Edge[]>(() => {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY_EDGES);
        return saved ? JSON.parse(saved) : [];
    });

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Custom Edge Label Prompt State
    const [pendingConnection, setPendingConnection] = useState<Connection | null>(null);
    const [edgeLabelInput, setEdgeLabelInput] = useState('');

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_NODES, JSON.stringify(nodes));
    }, [nodes]);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_EDGES, JSON.stringify(edges));
    }, [edges]);

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
        []
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    );

    const onConnect = useCallback(
        (params: Connection) => {
            // Zeige das Custom Modal anstatt window.prompt
            setPendingConnection(params);
            setEdgeLabelInput(''); // Reset input
        },
        []
    );

    const confirmEdgeConnection = (labelText: string) => {
        if (!pendingConnection) return;

        setEdges((eds) => addEdge({
            ...pendingConnection,
            type: 'custom',
            label: labelText || undefined,
            animated: true,
            style: { stroke: 'var(--accent-purple)', strokeWidth: 2 },
            markerEnd: {
                type: MarkerType.ArrowClosed,
                width: 20,
                height: 20,
                color: 'var(--accent-purple)',
            },
        }, eds));

        setPendingConnection(null);
    };

    const handleLabelKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            confirmEdgeConnection(edgeLabelInput);
        } else if (e.key === 'Escape') {
            setPendingConnection(null);
        }
    };

    const onDragStart = (event: React.DragEvent, card: LegekarteData) => {
        event.dataTransfer.setData('application/reactflow', JSON.stringify(card));
        event.dataTransfer.effectAllowed = 'move';
    };

    const handleAddNode = useCallback((cardData: any) => {
        // Use the center of the viewport for tap-to-add
        const position = screenToFlowPosition({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
        });

        const type = cardData.category === 'custom' ? 'editable' : 'legekarte';

        const newNode: Node = {
            id: `${cardData.id}-${Date.now()}`,
            type,
            position,
            data: { label: cardData.label, category: cardData.category },
        };

        setNodes((nds) => nds.concat(newNode));
    }, [screenToFlowPosition]);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            const cardDataStr = event.dataTransfer.getData('application/reactflow');
            if (!cardDataStr) return;

            const cardData = JSON.parse(cardDataStr);

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const type = cardData.category === 'custom' ? 'editable' : 'legekarte';

            const newNode: Node = {
                id: `${cardData.id}-${Date.now()}`,
                type,
                position,
                data: { label: cardData.label, category: cardData.category },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition]
    );

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const handleClear = () => {
        if (window.confirm('Möchtest du wirklich alle Karten vom Feld entfernen?')) {
            setNodes([]);
            setEdges([]);
        }
    };

    const handleLoadTemplate = (templateNodes: Node[], templateEdges: Edge[]) => {
        if (nodes.length > 0 || edges.length > 0) {
            if (!window.confirm('Achtung: Dadurch werden deine aktuellen Karten überschrieben. Fortfahren?')) {
                return;
            }
        }

        // Ensure templates use custom edge type
        const customEdges = templateEdges.map(e => ({ ...e, type: 'custom' }));

        setNodes([...templateNodes]);
        setEdges([...customEdges]);
        setTimeout(() => fitView({ padding: 0.2 }), 50);
    };

    const handleExport = () => {
        const summary = window.prompt("Fasse dieses Netzwerk in einem kurzen Satz zusammen (optional):");

        let headerDiv: HTMLDivElement | null = null;
        if (summary) {
            const container = document.getElementById('react-flow-container');
            if (container) {
                headerDiv = document.createElement('div');
                headerDiv.style.position = 'absolute';
                headerDiv.style.top = '20px';
                headerDiv.style.left = '20px';
                headerDiv.style.zIndex = '1000';
                headerDiv.style.background = 'rgba(0,0,0,0.8)';
                headerDiv.style.color = 'white';
                headerDiv.style.padding = '10px 20px';
                headerDiv.style.borderRadius = '8px';
                headerDiv.style.fontSize = '24px';
                headerDiv.style.fontWeight = 'bold';
                headerDiv.style.border = '2px solid var(--accent-neon)';
                headerDiv.innerText = summary;
                container.appendChild(headerDiv);
            }
        }

        exportFlowToPDF('react-flow-container', 'Quantenphysik_Strukturlegekarten.pdf').then(() => {
            if (headerDiv) {
                headerDiv.remove();
            }
        });
    };

    const handleLayout = () => {
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
            [...nodes],
            [...edges]
        );
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
        setTimeout(() => fitView({ padding: 0.2, duration: 800 }), 50);
    };

    const handleCheckRelations = () => {
        // Simple logic: If source label and target label match a valid template edge, it's green.
        // Doing it by labels because generated node IDs are unique timestamps.

        const newEdges = edges.map(edge => {
            const sourceNode = nodes.find(n => n.id === edge.source);
            const targetNode = nodes.find(n => n.id === edge.target);

            if (!sourceNode || !targetNode) return edge;

            // Find if there is a template connection between these two labels
            const isValid = allValidEdges.some(validEdge => {
                const validSourceNode = [...photoeffektTemplateNodes, ...doppelspaltTemplateNodes]
                    .find(n => n.id === validEdge.source);
                const validTargetNode = [...photoeffektTemplateNodes, ...doppelspaltTemplateNodes]
                    .find(n => n.id === validEdge.target);

                return validSourceNode?.data.label === sourceNode.data.label &&
                    validTargetNode?.data.label === targetNode.data.label;
            });

            if (isValid) {
                return {
                    ...edge,
                    style: { stroke: '#06d6a0', strokeWidth: 3 }, // Green
                    markerEnd: (typeof edge.markerEnd === 'object') ? { ...edge.markerEnd, color: '#06d6a0' } : edge.markerEnd
                };
            } else {
                return {
                    ...edge,
                    style: { stroke: '#ef233c', strokeWidth: 3 }, // Red
                    markerEnd: (typeof edge.markerEnd === 'object') ? { ...edge.markerEnd, color: '#ef233c' } : edge.markerEnd
                };
            }
        });

        setEdges(newEdges as any);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', paddingBottom: '2rem' }}>
            <header style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>Strukturlegekarten</h1>
                    <p style={{ color: 'var(--text-muted)', margin: 0 }}>Platziere die Begriffe und verbinde sie miteinander. Wird automatisch gespeichert!</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <button
                        className="button button-outline"
                        onClick={() => handleLoadTemplate(photoeffektTemplateNodes, photoeffektTemplateEdges)}
                        title="Lädt ein vorgefertigtes Layout zum Thema Photoeffekt"
                    >
                        <Zap size={16} /> Photoeffekt
                    </button>
                    <button
                        className="button button-outline"
                        onClick={() => handleLoadTemplate(doppelspaltTemplateNodes, doppelspaltTemplateEdges)}
                        title="Lädt ein vorgefertigtes Layout zum Thema Doppelspalt"
                    >
                        <Waves size={16} /> Doppelspalt
                    </button>

                    <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--border-color)', margin: '0 0.5rem' }}></div>

                    <button className="button button-outline" onClick={handleLayout} title="Räumt das Canvas automatisch auf">
                        <Sparkles size={16} /> Aufräumen
                    </button>

                    <button className="button button-outline" onClick={handleCheckRelations} style={{ color: '#06d6a0', borderColor: '#06d6a0' }} title="Prüft, ob Pfeile physikalisch korrekt sind">
                        <CheckCircle size={16} /> Prüfen
                    </button>

                    <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--border-color)', margin: '0 0.5rem' }}></div>

                    <button className="button button-outline" onClick={handleClear}>
                        <Trash2 size={16} /> Leeren
                    </button>
                    <button className="button button-primary" onClick={handleExport}>
                        <Download size={16} /> PDF
                    </button>
                    <button
                        className="button button-outline"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        {isSidebarOpen ? 'Ausblenden' : 'Einblenden'}
                    </button>
                </div>
            </header>

            <div style={{ display: 'flex', flex: 1, gap: '1rem', minHeight: '600px', height: 'calc(100vh - 180px)' }}>
                {/* Editor Area */}
                <div
                    className="glass-panel"
                    style={{ flex: 1, minHeight: '600px', position: 'relative' }}
                    id="react-flow-container"
                >
                    <div style={{ position: 'absolute', inset: 0 }}>
                        <ReactFlow
                            style={{ width: '100%', height: '100%' }}
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            onDrop={onDrop}
                            onDragOver={onDragOver}
                            nodeTypes={nodeTypes}
                            edgeTypes={edgeTypes}
                            connectionMode={ConnectionMode.Loose}
                            fitView
                        >
                            <Background color="#ccc" gap={16} />
                            <Controls className="no-print" />
                            <Panel position="top-left" className="no-print" style={{ background: 'rgba(0,0,0,0.5)', padding: '8px', borderRadius: '4px', color: 'white' }}>
                                Karten pro Drag & Drop auf das Feld ziehen. Verbindungen können beim Ziehen beschriftet werden!
                            </Panel>
                        </ReactFlow>

                        {/* Custom Edge Label Prompt Modal */}
                        {pendingConnection && (
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'rgba(0,0,0,0.6)',
                                backdropFilter: 'blur(4px)',
                                zIndex: 2000,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <div className="glass-panel" style={{ padding: '2rem', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'center' }}>
                                    <h3 style={{ margin: 0, color: 'var(--accent-neon)' }}>Verbindung beschriften</h3>
                                    <p style={{ margin: 0, color: 'var(--text-muted)' }}>Wie lautet die Beziehung zwischen den Begriffen?</p>

                                    <input
                                        autoFocus
                                        type="text"
                                        value={edgeLabelInput}
                                        onChange={(e) => setEdgeLabelInput(e.target.value)}
                                        onKeyDown={handleLabelKeyDown}
                                        placeholder="z.B. führt zu, besteht aus..."
                                        style={{
                                            padding: '0.75rem',
                                            borderRadius: '8px',
                                            border: '1px solid var(--accent-purple)',
                                            background: 'rgba(0,0,0,0.5)',
                                            color: 'white',
                                            fontSize: '1rem',
                                            outline: 'none'
                                        }}
                                    />

                                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1rem' }}>
                                        <button className="button button-outline" onClick={() => setPendingConnection(null)}>
                                            Abbrechen
                                        </button>
                                        <button className="button button-outline" onClick={() => confirmEdgeConnection('')}>
                                            Ohne Text
                                        </button>
                                        <button className="button button-primary" onClick={() => confirmEdgeConnection(edgeLabelInput)}>
                                            Speichern
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar with Cards */}
                {isSidebarOpen && (
                    <div className="glass-panel no-print" style={{
                        width: '300px', height: '100%', overflowY: 'auto', padding: '1rem',
                        display: 'flex', flexDirection: 'column', gap: '1rem', flexShrink: 0
                    }}>
                        <h3 style={{ marginTop: 0 }}>Karten stapeln</h3>

                        {/* Grouping by Category for the sidebar */}
                        {['experiment', 'object', 'concept', 'interpretation', 'formula'].map((cat) => {
                            const categoryCards = initialCards.filter(c => c.category === cat);
                            if (categoryCards.length === 0) return null;

                            return (
                                <div key={cat} style={{ marginBottom: '1rem' }}>
                                    <h4 style={{ textTransform: 'uppercase', fontSize: '0.8rem', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                                        {cat}
                                    </h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        {categoryCards.map((card) => (
                                            <div
                                                key={card.id}
                                                draggable
                                                onDragStart={(e) => onDragStart(e, card)}
                                                onClick={() => handleAddNode(card)}
                                                style={{
                                                    padding: '0.5rem',
                                                    background: 'var(--bg-elevated)',
                                                    border: '1px solid var(--border-color)',
                                                    borderRadius: '4px',
                                                    cursor: 'grab',
                                                    fontSize: '0.9rem',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between'
                                                }}
                                            >
                                                <span>{card.label}</span>
                                                <Plus size={14} style={{ color: 'var(--text-muted)' }} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}

                        {/* Custom Editable Node */}
                        <div style={{ marginBottom: '1rem' }}>
                            <h4 style={{ textTransform: 'uppercase', fontSize: '0.8rem', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                                EIGENE KARTE
                            </h4>
                            <div
                                draggable
                                onDragStart={(e) => onDragStart(e, { id: 'custom-card', label: 'Eigener Text...', category: 'custom' } as any)}
                                onClick={() => handleAddNode({ id: 'custom-card', label: 'Eigener Text...', category: 'custom' })}
                                style={{
                                    padding: '0.5rem',
                                    background: 'var(--bg-elevated)',
                                    border: '1px dashed var(--border-color)',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <span>Neue Kachel erstellen</span>
                                <Plus size={14} style={{ color: 'var(--text-muted)' }} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const Strukturlegekarten: React.FC = () => {
    return (
        <ReactFlowProvider>
            <StrukturlegekartenFlow />
        </ReactFlowProvider>
    );
};

export default Strukturlegekarten;
