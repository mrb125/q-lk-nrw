
import { BaseEdge, EdgeLabelRenderer, getBezierPath, useReactFlow } from '@xyflow/react';
import type { EdgeProps } from '@xyflow/react';

export default function CustomEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
    label,
}: EdgeProps) {
    const { setEdges } = useReactFlow();
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    const onEdgeClick = () => {
        setEdges((edges) => edges.filter((edge) => edge.id !== id));
    };

    return (
        <>
            <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
            <EdgeLabelRenderer>
                <div
                    style={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        fontSize: 12,
                        pointerEvents: 'all',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px',
                        zIndex: 1000,
                    }}
                    className="nodrag nopan"
                >
                    {label && (
                        <div style={{
                            background: 'var(--bg-main)',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-main)',
                            fontWeight: 'bold',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }}>
                            {label}
                        </div>
                    )}
                    <button
                        style={{
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
                            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                        }}
                        onClick={onEdgeClick}
                        title="Pfeil löschen"
                    >
                        ×
                    </button>
                </div>
            </EdgeLabelRenderer>
        </>
    );
}
