'use client'

import { RoadmapMatrix } from "@/app/scripts/roadmap/roadmap-types";
import { ReactFlow, Background, Node, Edge, useReactFlow, NodeChange, applyNodeChanges} from '@xyflow/react';
import { RoadmapModal } from "./roadmapModal";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {INITIAL_FIT_LAYERS_MOBILE, INITIAL_FIT_LAYERS, FIT_MIN_ZOOM_MOBILE, FIT_MAX_ZOOM_MOBILE, MIN_ZOOM_MOBILE,MAX_ZOOM, MIN_ZOOM} from '@/app/scripts/roadmap/roadmap-constants'
import { getRoadmapParams } from "@/app/scripts/roadmap/getRoadmapParams";
import { useRoadmapNodes } from "@/app/scripts/roadmap/getRoadmapNodes";
import { RoadmapConnectorNode, RoadmapCustomNode } from "@/app/ui/roadmap/customRoadmapNodes";

export interface RoadmapCanvasProps{
    matrix : RoadmapMatrix;
    initialCompleted: string[];
    solvedSlugs: string[];
    loginUrl : string | null;
}

const nodeTypes = {
  custom: RoadmapCustomNode,
  connector: RoadmapConnectorNode,
};

export function RoadmapCanvas({matrix, initialCompleted, solvedSlugs, loginUrl} : RoadmapCanvasProps){

    const modalActive = false;
    const isMobile = false;

    const { modal, setModal, modalNode, modalChecked, getProgress, isComplete, handleToggle } = getRoadmapParams(matrix, initialCompleted, solvedSlugs, loginUrl);

    const { nodeValues, edgeValues, fitNodeIds, entranceDuration } = useRoadmapNodes(matrix, getProgress, isComplete, setModal, 
        loginUrl === null, //loginURL === null means logged in
        isMobile ? INITIAL_FIT_LAYERS_MOBILE : INITIAL_FIT_LAYERS,
    );

    const [nodes, setNodes] = useState<Node[]>(nodeValues);
    const [edges, setEdges] = useState<Edge[]>(edgeValues);

    const [edgesRevealed, setEdgesRevealed] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setEdgesRevealed(true), entranceDuration);
        return () => clearTimeout(t);
    }, [entranceDuration]);

    const containerRef = useRef<HTMLDivElement>(null);
    const prevWidthRef = useRef<number | null>(null);

    useEffect(() => {
        setNodes(nodeValues);
    }, [nodeValues]);

    const { getViewport, setViewport, fitView, viewportInitialized } = useReactFlow();

    const fitViewOptions = useMemo(() => {
        const nodes = fitNodeIds.map((id) => ({ id }));
        if (!isMobile) return { nodes };
        return {
        nodes,
        padding: 0.06,
        minZoom: FIT_MIN_ZOOM_MOBILE,
        maxZoom: FIT_MAX_ZOOM_MOBILE,
        };
    }, [fitNodeIds, isMobile]);

    const fitOptionsRef = useRef(fitViewOptions);
    fitOptionsRef.current = fitViewOptions;
    
    const didFitRef = useRef(false);

    useEffect(() => {
        if (!viewportInitialized) return;
        
        if (!didFitRef.current) {
            didFitRef.current = true;
            return;
        }

        fitView({ ...fitOptionsRef.current, duration: 300 });
    }, [isMobile, viewportInitialized, fitView]);

    useLayoutEffect(() => {
        const el = containerRef.current;
        if (!el || !viewportInitialized) return;

        prevWidthRef.current = el.getBoundingClientRect().width;

        const ro = new ResizeObserver(([entry]) => {
            const nextWidth = entry.contentRect.width;
            const prevWidth = prevWidthRef.current ?? nextWidth;
            const delta = nextWidth - prevWidth;

            prevWidthRef.current = nextWidth;

            if (!delta) return;

            const { x, y, zoom } = getViewport();

            setViewport({ x: x + (delta / 2) / zoom, y, zoom }, { duration: 0 });
        });

        ro.observe(el);

        return () => ro.disconnect();
    }, [getViewport, setViewport, viewportInitialized]);

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setNodes((nodesSnapshot: Node[]) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );

    return(
        <div ref={containerRef} className="-m-3 h-[calc(100%+1.5rem)] w-[calc(100%+1.5rem)]">
            <div className={`h-full w-full overflow-hidden rounded-xl border-1 border-accent-border shadow-[inset_0_0_80px_rgba(124,158,248,0.03)] ${edgesRevealed ? "" : "edges-revealing"}`}>
                <ReactFlow className="bg-transparent" nodeTypes={nodeTypes} fitView fitViewOptions={fitViewOptions} minZoom={isMobile ? MIN_ZOOM_MOBILE : MIN_ZOOM}
                    maxZoom={MAX_ZOOM} nodes={nodes} edges={edges} onNodesChange={onNodesChange} nodesDraggable={!isMobile} panOnScroll={false} zoomOnDoubleClick={!isMobile}
                >
                    
                    <Background color="rgba(124,158,248,0.35)" gap={isMobile ? 32 : 24} size={1.5}></Background>

                </ReactFlow>
            </div>

            {modal !== null && modalNode !== null && (
                <RoadmapModal
                    node={modalNode}
                    checked={modalChecked}
                    onToggle={(itemIdx) => handleToggle(modal.layerIndex, modal.nodeIndex, itemIdx)}
                    onClose={() => setModal(null)}
                />
            )}

        </div>
    )

}