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
  constructor(
    public dialogRef: MatDialogRef<MountainsCrownUpdateDialogComponent>,
    private mountainApiService: MountainsApiService
    ){}
    
  ngOnInit(): void {
  this.getMountainDetails();
  console.log(this.mountain);
  };
  
  onCancel() {
  this.dialogRef.close(false);
  }

  onCofnijOznaczenie() {
    this.mountain.visited = false;
    this.mountainApiService.updateMountain(this.mountain).subscribe(x => {
      this.dialogRef.close();
    })
  }

  
  onSubmit() {
    if(!this.form.valid) {
      this.form.markAsDirty();
      return;
    }
    const mountainVisited = this.mapFormToVisitedMountain();
    this.mountainApiService.markMountainAsVisited(mountainVisited).subscribe(x => {
      this.dialogRef.close(true);
    })
  }

  mapFormToVisitedMountain(): MountainVisited {
    let mountainVisited: MountainVisited = {
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

