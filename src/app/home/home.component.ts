import { Component, OnInit } from '@angular/core';
import { AuthApiService } from '../auth/auth-api.service';
import { CommonModule } from '@angular/common';
import { VoivodeshipApiService } from '../voivodeships/services/voivodeship-api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Voivodeship } from '../voivodeships/models/voivodeship-model';
import { take } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../auth/models/user.model';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports:
    [
      CommonModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      FormsModule,
      MatTabsModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatSelectModule,
      MatIconModule
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  email: string;
  displayName: string;
  dateOfBirth: Date;
  genderId: number;
  selectedVoivodeship: Voivodeship = {
    id: 0,
    name: ''
  };
  voivodeships: Voivodeship[];
  dataLoaded: boolean = false;
  updateUserDetailsMode: boolean = false;
  updateUserLoginDetailsMode: boolean = false;
  editUserDetailsButtonLabel = 'Edytuj dane użytkownika';
  editUserLoginDetailsButtonLabel = 'Edytuj dane logowania użytkownika';
  maxDate = new Date();
  id = '';
  hidePassword = true;
  password: string = '';

  constructor(
    private authApiService: AuthApiService,
    private voivodeshipApiService: VoivodeshipApiService) {
  }
  ngOnInit(): void {
    this.voivodeshipApiService.getVoivodeships().pipe(take(1)).subscribe(voivodeships => {
      this.voivodeships = voivodeships;
    })
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 16);
    this.authApiService.currentUserSubject$.subscribe(user => {
      if (user) {
        this.email = user.email;
        this.displayName = user.displayName;
        this.dateOfBirth = user.dateOfBirth;
        this.genderId = user.gender;
        this.getVoivodeshipById(user.voivodeshipId);
        this.id = user.id
        this.dataLoaded = true;
      }
      else {
        if (localStorage.getItem('email')) {
          let email = localStorage.getItem('email');
          this.authApiService.getLoggedUser(email).subscribe(user => {
            this.email = user.email;
            this.displayName = user.displayName;
            this.dateOfBirth = user.dateOfBirth;
            this.genderId = user.gender;
            this.getVoivodeshipById(user.voivodeshipId);
            this.id = user.id
            this.dataLoaded = true;
          })
        }
      }
    })
  }

  getVoivodeshipById(id: number) {
    this.voivodeshipApiService.getVoivodeship(id).subscribe(voivodeship => {
      this.selectedVoivodeship = voivodeship;
    })
  }

  moveToUpdateUserDetailsMode() {
    if (!this.updateUserDetailsMode) {
      this.updateUserDetailsMode = true;
      this.editUserDetailsButtonLabel = 'Zapisz';
    }
    else {
      let user: User = {
        email: this.email,
        displayName: this.displayName,
        token: '',
        dateOfBirth: this.dateOfBirth,
        gender: this.genderId,
        voivodeshipId: this.selectedVoivodeship.id,
        id: this.id
      }
      this.authApiService.updateUserDetails(user).subscribe(user => {
        this.updateUserDetailsMode = false;
        this.editUserDetailsButtonLabel = 'Edytuj dane użytkownika';
      })
    }
  }

  moveToUpdateUserLoginDetailsMode() {
    if (!this.updateUserLoginDetailsMode) {
      this.updateUserLoginDetailsMode = true;
      this.editUserLoginDetailsButtonLabel = 'Zapisz';
    }
    else {
      if (this.password.length < 8) {
        return;
      }
      let user: User = {
        email: this.email,
        displayName: this.displayName,
        token: '',
        dateOfBirth: this.dateOfBirth,
        gender: this.genderId,
        voivodeshipId: this.selectedVoivodeship.id,
        id: this.id
      }
      this.authApiService.updateUserLoginDetails(user, this.password).subscribe(user => {
        this.updateUserLoginDetailsMode = false;
      this.editUserLoginDetailsButtonLabel = 'Zmień hasło użytkownika';
      })
    }
  }
}

