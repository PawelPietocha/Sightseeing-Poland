import { Injectable, Injector } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { MountainsCrownUpdateDialogComponent } from "../mountains-crown-update-dialog/mountains-crown-update-dialog.component";
import { Mountain } from "../models/mountain-model";

@Injectable({
    providedIn: 'root',
  })
export class MountainDialogService {

    constructor(
        public dialog: MatDialog,
        private injector: Injector,
        ) {}

    openMarkAsVisitedDialog(mountain: Mountain): void {
        const dialogRef = this.dialog.open(MountainsCrownUpdateDialogComponent, {
            maxHeight: '900px',
            maxWidth: '500px',
            height: '500px',
            injector: this.injector
        });

        dialogRef.componentInstance.title = "Uzupełnij szczegóły zdobycia szczytu";
        dialogRef.componentInstance.mountain = mountain;

    }

}