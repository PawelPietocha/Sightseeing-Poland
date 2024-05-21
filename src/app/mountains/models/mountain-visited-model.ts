export interface MountainVisited {
    dateOfVisit?: Date;
    tripTimeHours?: number;
    tripTimeMinutes?: number;
    startPlace?: string;
    endPlace?: string;
    tripLenghtInKm?: number;
    elevationGainInMeters?: number;
    mountainId: number;
    userId: string;
}