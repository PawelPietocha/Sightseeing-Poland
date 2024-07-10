import { FormControl, Validators } from "@angular/forms";

export class MountainCrownUpdateForm {
    dateOfVisit = new FormControl<Date | undefined>(new Date());
    tripTimeHours = new FormControl<number | undefined>(undefined, [Validators.min(0), Validators.max(99)])
    tripTimeMinutes = new FormControl<number | undefined>(undefined, [Validators.min(0), Validators.max(59)]);
    startPlace = new FormControl<string | undefined>(undefined);
    endPlace = new FormControl<string | undefined>(undefined);
    tripLenghtInKm = new FormControl<number | undefined>(undefined, [Validators.min(0.1)]);
    elevationGainInMeters = new FormControl<number | undefined>(undefined, [Validators.min(1)]);

}