import { RoadmapMatrix } from "./roadmap-types";
import { INITIAL_FIT_LAYERS, NODE_WIDTH, GAP_X,GAP_Y, LAYER_STAGGER, CONNECTOR_X, EDGE_DASH, EDGE_DRAW_DURATION, EDGE_CYCLE, EDGE_START_DELAY, EDGE_HIT_TIME, EDGE_STEP } from "./roadmap-constants"
import { useMemo } from "react";
import { Node, Edge } from '@xyflow/react';
import { CSSProperties } from "react";

export function getElementPositions(n: number): number[] {
    const positions: number[] = [];

    if (n % 2 === 1) {
        const mid = Math.floor(n / 2);
        for (let i = 0; i < n; i++) {
            positions.push((i - mid) * GAP_X);
        }
    } else {
        const mid = n / 2;
        for (let i = 0; i < n; i++) {
            positions.push((i - mid + 0.5) * GAP_X);
        }
    }

    return positions;
}

function edgeStyle(delay: number, dx: number): CSSProperties {
  const dash = Math.max(Math.abs(dx) + 80, EDGE_DASH);
  return {
    animationDelay: `${delay}ms`,
    animationDuration: `${EDGE_DRAW_DURATION * (dash / EDGE_DASH)}ms`,
    ["--ltcp-edge-len" as string]: `${dash}px`,
  } as CSSProperties;
}

export function useRoadmapNodes(matrix : RoadmapMatrix, getProgress : (i : number, j : number) => number, isComplete: (i: number, j: number) => boolean,
                                setModal: (val: { layerIndex: number; nodeIndex: number } | null) => void, loggedIn: boolean = false, fitLayers: number = INITIAL_FIT_LAYERS
){
    return useMemo(() => {

        const nodeValues : Node[] = [];
        const edgeValues : Edge[] = [];
        const fitNodeIds : string[] = [];

        let fitStart = 0;

        if(loggedIn){
            for(let i=0;i<matrix.length;i++){
                const layerComplete = matrix[i].every((_,j) => isComplete(i,j));
                
                if(!layerComplete){
                    break;
                }
                
                fitStart = i;
            }
        }

        fitStart = Math.max(0, Math.min(fitStart, matrix.length - fitLayers));
        const fitEnd = fitStart + fitLayers;

        const animStart = Math.max(fitStart - 1, 0);
        const relu = (i: number) => Math.max(i - animStart, 0);


        let cur_y = 0;
        let next_index = 0;

        const edgeBase = EDGE_START_DELAY;

        for(let i =0; i< matrix.length;i++){
            
            const positions = getElementPositions(matrix[i].length);
            
            for(let j =0;j<matrix[i].length;j++){

                const li = i;
                const lj = j;
                nodeValues.push({
                    id : next_index.toString(),
                    type: 'custom',
                    position : {x: positions[lj], y : cur_y},
                    width: NODE_WIDTH,
                    data : {
                        label : matrix[li][lj].title,
                        progress : getProgress(li,lj),
                        isComplete : isComplete(li,lj),
                        onClick: () => setModal({ layerIndex: li, nodeIndex: lj }),
                        hideBottomNode: false,
                        hideTopNode : false,
                        popDelay: relu(i) * LAYER_STAGGER,
                    }
                });

                if (i >= fitStart && i < fitEnd){
                    fitNodeIds.push(next_index.toString());
                } 
                next_index++;
            }

            cur_y += GAP_Y;
            if (i === matrix.length - 1){
                continue;
            }

            nodeValues.push({
                id: next_index.toString(),
                type: 'connector',
                position: { x: CONNECTOR_X, y: cur_y + 20 },
                data: { label: "Question", progress: 0, isComplete: false, onClick: () => {}, hideBottomNode: false, hideTopNode: false, popDelay: edgeBase + relu(i) * EDGE_CYCLE + EDGE_HIT_TIME },
            });

            if (i >= fitStart && i + 1 < fitEnd){
                fitNodeIds.push(next_index.toString());
            } 

            next_index++;
            cur_y += GAP_Y;
            
            for(let j =0;j<matrix[i].length;j++){
                edgeValues.push({
                    id: `${nodeValues.length-1 - matrix[i].length + j}-${nodeValues.length - 1}`,
                    source: `${nodeValues.length-1 - matrix[i].length + j}`,
                    target: `${nodeValues.length - 1}`,
                    selectable: false,
                    style: edgeStyle(edgeBase + relu(i) * EDGE_CYCLE, positions[j]),
                });
            }

            if(i != 0){
                for (let j = 0; j < matrix[i].length; j++) {
                    edgeValues.push({
                        id: `${nodeValues.length - matrix[i].length - 2}-${nodeValues.length - 1 - matrix[i].length + j}`,
                        source: `${nodeValues.length - matrix[i].length - 2}`,
                        target: `${nodeValues.length - 1 - matrix[i].length + j}`,
                        selectable: false,
                        style: edgeStyle(edgeBase + relu(i - 1) * EDGE_CYCLE + EDGE_STEP, positions[j]),
                    });
                }
            }
        }

        const i = matrix.length - 1;
        const lastPositions = getElementPositions(matrix[i].length);
        for (let j = 0; j < matrix[i].length; j++) {
            edgeValues.push({
                id: `${nodeValues.length - 1 - matrix[i].length + j}-${nodeValues.length - matrix[i].length}`,
                source: `${nodeValues.length - 1 - matrix[i].length + j}`,
                target: `${nodeValues.length - matrix[i].length}`,
                selectable: false,
                style: edgeStyle(edgeBase + relu(Math.max(i - 1, 0)) * EDGE_CYCLE + EDGE_STEP, lastPositions[j]),
            });
        }

        nodeValues[0].data.hideTopNode = true;
        nodeValues[nodeValues.length-1].data.hideBottomNode = true;

        return { nodeValues, edgeValues, fitNodeIds, entranceDuration: (EDGE_START_DELAY + Math.max(matrix.length - animStart - 1, 0) * EDGE_CYCLE + EDGE_DRAW_DURATION) };


    },[matrix, getProgress, isComplete, setModal, loggedIn, fitLayers]);
}