import React, { useState } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import { TestTube, Atom, Sparkles, BookOpen, Sigma, Edit3 } from 'lucide-react';
import type { NodeCategory } from '../../data/legekartenData';

// Styles für die verschiedenen Kategorien der Karten
const categoryStyles: Record<NodeCategory | 'custom', { border: string, bg: string, text: string, icon: React.ReactNode }> = {
    experiment: {
        border: 'var(--accent-green)',
        bg: 'rgba(0, 255, 170, 0.1)',
        text: 'var(--accent-green)',
        icon: <TestTube size={16} />
    },
    object: {
        border: 'var(--accent-blue)',
        bg: 'rgba(0, 150, 255, 0.1)',
        text: 'var(--accent-blue)',
        icon: <Atom size={16} />
    },
    concept: {
        border: 'var(--accent-purple)',
        bg: 'rgba(157, 78, 221, 0.1)',
        text: 'var(--accent-purple)',
        icon: <BookOpen size={16} />
    },
    interpretation: {
        border: 'var(--accent-orange, #ff9f1c)',
        bg: 'rgba(255, 159, 28, 0.1)',
        text: 'var(--accent-orange, #ff9f1c)',
        icon: <Sparkles size={16} />
    },
    formula: {
        border: 'var(--accent-red, #ef233c)',
        bg: 'rgba(239, 35, 60, 0.1)',
        text: 'var(--accent-red, #ef233c)',
        icon: <Sigma size={16} />
    },
    custom: {
        border: 'var(--text-main)',
        bg: 'rgba(255, 255, 255, 0.1)',
        text: 'var(--text-main)',
        icon: <Edit3 size={16} />
    }
};

interface LegekarteNodeProps {
    id: string;
    data: {
        label: string;
        category: NodeCategory;
    };
    selected?: boolean;
}

export const LegekarteNode = ({ id, data, selected }: LegekarteNodeProps) => {
    const style = categoryStyles[data.category] || categoryStyles.concept;
    const { setNodes, setEdges } = useReactFlow();

    const onDelete = (e: React.MouseEvent) => {
        e.stopPropagation(); // Verhindern, dass die Node ausgewählt wird
        setNodes((nodes) => nodes.filter((node) => node.id !== id));
        setEdges((edges) => edges.filter((edge) => edge.source !== id && edge.target !== id));
    };

    return (
        <div
            className="glass-panel"
            style={{
                padding: '12px',
                borderRadius: '8px',
                border: `2px solid ${style.border}`,
                backgroundColor: style.bg,
                minWidth: '150px',
                textAlign: 'center',
                boxShadow: selected ? `0 0 15px ${style.border}` : 'none',
                transition: 'box-shadow 0.2s ease',
                position: 'relative'
            }}
        >
            <button
                onClick={onDelete}
                className="nodrag nopan"
                style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    width: '20px',
                    height: '20px',
                    background: 'var(--accent-red, #ef233c)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '10px',
                    lineHeight: 1,
                    padding: 0,
                    zIndex: 10
                }}
                title="Karte löschen"
            >
                ×
            </button>

            <Handle type="target" position={Position.Top} className="w-3 h-3" />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px', color: style.text }}>
                {style.icon}
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {data.category}
                </span>
            </div>

            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>
                {data.label}
            </div>

            <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
        </div>
    );
};

interface EditableNodeProps {
    id: string;
    data: {
        label: string;
    };
    selected?: boolean;
}

export const EditableNode = ({ id, data, selected }: EditableNodeProps) => {
    const style = categoryStyles.custom;
    const { setNodes, setEdges } = useReactFlow();
    const [isEditing, setIsEditing] = useState(false);
    const [label, setLabel] = useState(data.label || 'Eigener Text...');

    const onDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        setNodes((nodes) => nodes.filter((node) => node.id !== id));
        setEdges((edges) => edges.filter((edge) => edge.source !== id && edge.target !== id));
    };

    const handleBlur = () => {
        setIsEditing(false);
        setNodes((nds) =>
            nds.map((n) => (n.id === id ? { ...n, data: { ...n.data, label } } : n))
        );
    };

    return (
        <div
            className="glass-panel"
            style={{
                padding: '12px',
                borderRadius: '8px',
                border: `2px dashed ${style.border}`,
                backgroundColor: style.bg,
                minWidth: '150px',
                textAlign: 'center',
                boxShadow: selected ? `0 0 15px ${style.border}` : 'none',
                transition: 'box-shadow 0.2s ease',
                position: 'relative'
            }}
        >
            <button
                onClick={onDelete}
                className="nodrag nopan"
                style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    width: '20px',
                    height: '20px',
                    background: 'var(--accent-red, #ef233c)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '10px',
                    lineHeight: 1,
                    padding: 0,
                    zIndex: 10
                }}
            >
                ×
            </button>

            <Handle type="target" position={Position.Top} className="w-3 h-3" />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px', color: style.text }}>
                {style.icon}
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    EIGEN
                </span>
            </div>

            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>
                {isEditing ? (
                    <input
                        autoFocus
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        onBlur={handleBlur}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleBlur() }}
                        className="nodrag"
                        style={{
                            width: '100%',
                            background: 'rgba(0,0,0,0.5)',
                            border: '1px solid var(--border-color)',
                            color: 'white',
                            textAlign: 'center',
                            borderRadius: '4px',
                            padding: '4px'
                        }}
                    />
                ) : (
                    <div onClick={() => setIsEditing(true)} style={{ cursor: 'text', minHeight: '20px' }} title="Klicken zum Bearbeiten">
                        {label || 'Klicken zum Bearbeiten'}
                    </div>
                )}
            </div>

            <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
        </div>
    );
};

export const nodeTypes = {
    legekarte: LegekarteNode,
    editable: EditableNode,
};
