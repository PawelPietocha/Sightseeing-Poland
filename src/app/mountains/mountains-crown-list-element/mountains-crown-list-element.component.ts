import { Component, Input } from '@angular/core';
import { Mountain } from '../models/mountain-model';
import { CommonModule } from '@angular/common';
import { MountainsApiService } from '../services/mountains-api.service';
import { MountainDialogService } from '../services/mountains-dialog-service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogService } from '../../utils/dialogs/dialog-service';
import { mergeMap, of } from 'rxjs';
import { SnackBarService } from '../../utils/snackbar/snackbar.service';
import { MountainVisited } from '../models/mountain-visited-model';

@Component({
  selector: 'app-mountains-crown-list-element',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule],
  templateUrl: './mountains-crown-list-element.component.html',
  styleUrl: './mountains-crown-list-element.component.scss'
})
export class MountainsCrownListElementComponent {
  @Input() mountain: Mountain;

  constructor(
    private mountainsApiService: MountainsApiService,
    private dialogService: DialogService,
    private snackBarService: SnackBarService,
    private mountainsDialogService: MountainDialogService) { }

  markAsVisited(): void {
    this.dialogService.openConfirmDialog("Czy na pewno oznaczyć górę jako zdobytą?")
      .pipe(
        mergeMap(
          (result: boolean) => {
            if (result) {
              return this.dialogService.openConfirmDialog("Czy chcesz uzupełnić szczegóły zdobycia?")
            }
            else {
              return of(null)
            }

          }
        ),
        mergeMap(
          (result) => {
            if (result) {
              return this.mountainsDialogService.openMarkAsVisitedDialog(this.mountain);
            }
            if (result === false) {
              let mountainVisited: MountainVisited = {
                mountainId: this.mountain.id,
                userId: localStorage.getItem('userId')!
              }
              return this.mountainsApiService.markMountainAsVisited(mountainVisited);
            }
            else {
              return of(null);
            }
          }
        )
      )
      .subscribe({
        next: (result: Mountain) => {
          if (result != null) {
            this.setMountainFromResult(result);
            this.snackBarService.openSnackBar("Góra oznaczona jako zdobyta");
          }
        },
        error: () => {
          this.snackBarService.openSnackBar("Błąd podczas oznaczania góry jako zdobyta", false);
        }

      })
  }

  onClickDetails() {
    console.log(this.mountain);
    this.mountainsDialogService.openMarkAsVisitedDialog(this.mountain, true)
    .subscribe({
      next: (result: Mountain) => {
        if (result) {
          this.setMountainFromResult(result);
          this.snackBarService.openSnackBar("Góra zaaktualizowana");
        }
      },
      error: () => {
        this.snackBarService.openSnackBar("Błąd przy aktualizacji góry", false);
      }
    }
    )
  }

  private setMountainFromResult(result: Mountain) {
    this.mountain.visited = true;
    this.mountain.dateOfVisit = result.dateOfVisit;
    this.mountain.elevationGainInMeters = result.elevationGainInMeters;
    this.mountain.endPlace = result.endPlace;
    this.mountain.startPlace = result.startPlace;
    this.mountain.tripLenghtInKm = result.tripLenghtInKm;
    this.mountain.tripTimeHours = result.tripTimeHours;
    this.mountain.tripTimeMinutes = result.tripTimeMinutes;
    this.mountain.id = result.id;
  }
}
