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
  this.dialogRef.close();
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
    this.mapFormToMountain();
    this.mountainApiService.updateMountain(this.mountain).subscribe(x => {
      this.dialogRef.close();
    })
  }

  mapFormToMountain(): void {
    this.mountain.visited = true;
    this.mountain.dateOfVisit = this.form.controls.dateOfVisit.getRawValue()!;
    this.mountain.tripTimeMinutes = this.form.controls.tripTimeMinutes.getRawValue()!;
    this.mountain.tripTimeHours = this.form.controls.tripTimeHours.getRawValue()!;
    this.mountain.startPlace = this.form.controls.startPlace.getRawValue()!;
    this.mountain.endPlace = this.form.controls.endPlace.getRawValue()!;
    this.mountain.tripLenghtInKm = this.form.controls.tripLenghtInKm.getRawValue()!;
    this.mountain.elevationGainInMeters = this.form.controls.elevationGainInMeters.getRawValue()!;
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

