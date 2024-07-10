export interface Mountain {
    id: number;
    name: string;
    height: number;
    imagePath: string;
    voivodeship: string;
    mountainsRange: string;
    visited: boolean;
    dateOfVisit?: Date;
    tripTimeHours?: number;
    tripTimeMinutes?: number;
    startPlace?: string;
    endPlace?: string;
    tripLenghtInKm?: number;
    elevationGainInMeters?: number;
    visitedMountainId?: number;
}
