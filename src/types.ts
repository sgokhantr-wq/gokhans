export interface InventoryItem {
    id: string;
    itemCode: string;
    description: string;
    onHand: number;
    onOrder: number;
    leadTimeDays: number;
    avgWeeklyDemand: number;
    lastMovement: string;
}

export interface SimulationStep {
    id: number;
    action: string;
    target: string;
    durationMs: number;
    status: 'pending' | 'active' | 'success' | 'failure';
    details: string;
}

export interface Project {
    id: string;
    title: string;
    summary: string;
    tags: string[];
    metrics: string[];
    iconType: 'erp' | 'auto' | 'bi';
}
