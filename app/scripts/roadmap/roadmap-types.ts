
export interface RoadmapItem{
    id : string;
    label : string;
    href : string;
    isProblem : boolean;
    slug? : string;
}

export interface RoadmapNode{
    id : string;
    title : string;
    items: RoadmapItem[];
}

export type RoadmapMatrix = RoadmapNode[][];