import { CommonModule } from '@angular/common';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_NATIVE_DATE_FORMATS, MatDateFormats, MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MountainCrownUpdateForm } from '../models/mountain-crown-update-form';
import { Mountain } from '../models/mountain-model';
import { MountainsApiService } from '../services/mountains-api.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MountainVisited } from '../models/mountain-visited-model';
import { DialogService } from '../../utils/dialogs/dialog-service';
import { mergeMap, of } from 'rxjs';
import { SnackBarService } from '../../utils/snackbar/snackbar.service';

@Component({
  selector: 'app-mountains-crown-update-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    MatTooltipModule,
    CommonModule],
    providers: [
      { provide: DateAdapter, useClass: NativeDateAdapter },
      { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
    ],
  templateUrl: './mountains-crown-update-dialog.component.html',
  styleUrl: './mountains-crown-update-dialog.component.scss',
})

export class MountainsCrownUpdateDialogComponent implements OnInit{
  mountain: Mountain;
  form = new FormGroup<MountainCrownUpdateForm>(new MountainCrownUpdateForm());
  maxDate = new Date();
  title = 'Example dialog Title';
  isMountainVisited: boolean;
  isOnEditMode = false;
  constructor(
    public dialogRef: MatDialogRef<MountainsCrownUpdateDialogComponent>,
    private mountainApiService: MountainsApiService,
    private dialogService: DialogService,
    private snackBarService: SnackBarService
    ){}
    
  ngOnInit(): void {
    console.log(this.mountain);
  this.getMountainDetails();
  if(this.isMountainVisited) {
    this.form.disable();
  }
  };
  
  onCancel() {
  this.dialogRef.close(false);
  }

  onUndoMark() {
    this.dialogService.openConfirmDialog("Czy na pewno cofnąć oznaczenie góry jako zdobytą?")
    .pipe(mergeMap(
      (result: boolean) => {
        if(result) {
          const mountainVisited = this.mapFormToVisitedMountain();
          console.log(mountainVisited);
          return this.mountainApiService.deleteMountainFromVisited(mountainVisited)
        
        }
        else {
          return of (null)
        }
      }
    ))
    .subscribe({
      next: (result) => {
        if(result) {
          this.mountain.visited = false;
          this.snackBarService.openSnackBar("Oznaczenie zostało cofnięte");
          this.dialogRef.close(false);
        }
      },
      error: () => {
        this.snackBarService.openSnackBar("Błąd przy próbie cofnięcia oznaczenia góry jako zdobytej", false);
      }
    })
  }

  moveToEditMode() {
    this.isOnEditMode = true;
    this.form.enable();
  }

  
  onSubmit() {
    if(!this.form.valid) {
      this.form.markAsDirty();
      return;
    }
    const mountainVisited = this.mapFormToVisitedMountain();
    if(this.isMountainVisited) {
      this.mountainApiService.updateMountain(mountainVisited).subscribe((mountain: Mountain) => {
        this.dialogRef.close(mountain);
      })
    }
    else {
      this.mountainApiService.markMountainAsVisited(mountainVisited).subscribe((mountain: Mountain) => {
        this.dialogRef.close(mountain);
      })  
    }
  }

  mapFormToVisitedMountain(): MountainVisited {
    let mountainVisited: MountainVisited = {
      id: this.mountain.visitedMountainId,
      dateOfVisit: this.form.controls.dateOfVisit.getRawValue()!,     
      tripTimeMinutes: this.form.controls.tripTimeMinutes.getRawValue()!,
      tripTimeHours: this.form.controls.tripTimeHours.getRawValue()!,
      startPlace: this.form.controls.startPlace.getRawValue()!,
      endPlace: this.form.controls.endPlace.getRawValue()!,
      tripLenghtInKm: this.form.controls.tripLenghtInKm.getRawValue()!,
      elevationGainInMeters: this.form.controls.elevationGainInMeters.getRawValue()!,
      mountainId: this.mountain.id,
      userId: localStorage.getItem('userId')!
    }
    return mountainVisited;
  }

  getMountainDetails(): void {
    if (this.mountain.visited) {
      this.form.controls.dateOfVisit.setValue(this.mountain.dateOfVisit!);
      this.form.controls.tripTimeMinutes.setValue(this.mountain.tripTimeMinutes!);
      this.form.controls.tripTimeHours.setValue(this.mountain.tripTimeHours!);
      this.form.controls.startPlace.setValue(this.mountain.startPlace!);
      this.form.controls.endPlace.setValue(this.mountain.endPlace!);
      this.form.controls.tripLenghtInKm.setValue(this.mountain.tripLenghtInKm!);
      this.form.controls.elevationGainInMeters.setValue(this.mountain.elevationGainInMeters!);
    }
  }
}

