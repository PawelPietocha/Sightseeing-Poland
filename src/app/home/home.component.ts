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
import { mergeMap, of, take } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../auth/models/user.model';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { SnackBarService } from '../utils/snackbar/snackbar.service';
import { DialogService } from '../utils/dialogs/dialog-service';

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

  selectedVoivodeship: Voivodeship = { id: 0, name: '' };
  voivodeships: Voivodeship[];
  dataLoaded = false;
  updateUserDetailsMode = false;
  updateUserLoginDetailsMode = false;
  hidePassword = true;
  editUserDetailsButtonLabel = 'Edytuj dane użytkownika';
  editUserLoginDetailsButtonLabel = 'Edytuj dane logowania użytkownika';
  maxDate = new Date();
  id = '';
  password = '';

  constructor(
    private authApiService: AuthApiService,
    private voivodeshipApiService: VoivodeshipApiService,
    private dialogService: DialogService,
    private snackBarService: SnackBarService) {
  }
  ngOnInit(): void {
    this.setVoivodeships();
    this.subtractYearsFromCurrentDateToSetMaxDate(16);
    this.getUserDataInfo();
  }

  switchUpdateDetailsMode() {
    if (!this.updateUserDetailsMode) {
      this.updateUserDetailsMode = true;
      this.editUserDetailsButtonLabel = 'Zapisz';
    }
    else {
      this.updateUserDetails();
    }
  }

  switchUpdatePasswordMode() {
    if (!this.updateUserLoginDetailsMode) {
      this.updateUserLoginDetailsMode = true;
      this.editUserLoginDetailsButtonLabel = 'Zapisz';
    }
    else {
      if (!this.isPasswordValid()) {
        this.snackBarService.openSnackBar('Hasło musi zawierać Wielką literę, małą literę i znak specjalny', false);
        return;
      }
      this.updateUserPassword();
    }
  }

  private subtractYearsFromCurrentDateToSetMaxDate(years: number): void {
    this.maxDate.setFullYear(this.maxDate.getFullYear() - years);
  }

  private setVoivodeships(): void {
    this.voivodeshipApiService.getVoivodeships().subscribe(voivodeships => {
      this.voivodeships = voivodeships;
    })
  }

  private setUserData(user: User): void {
    this.email = user.email;
    this.displayName = user.displayName;
    this.dateOfBirth = user.dateOfBirth;
    this.genderId = user.gender;
    this.getVoivodeshipById(user.voivodeshipId);
    this.id = user.id
    this.dataLoaded = true;
  }

  private getUserDataInfo(): void {
    this.authApiService.currentUserSubject$.subscribe(user => {
      if (user) {
        this.setUserData(user);
      }
      else {
        if (localStorage.getItem('email')) {
          let email = localStorage.getItem('email');
          this.authApiService.getLoggedUser(email).subscribe(user => {
            this.setUserData(user);
          })
        }
      }
    })
  }

  private getVoivodeshipById(id: number): void {
    this.voivodeshipApiService.getVoivodeship(id).subscribe(voivodeship => {
      this.selectedVoivodeship = voivodeship;
    })
  }

  private getUserFromForm(): User {
    return {
      email: this.email,
      displayName: this.displayName,
      token: '',
      dateOfBirth: this.dateOfBirth,
      gender: this.genderId,
      voivodeshipId: this.selectedVoivodeship.id,
      id: this.id
    }
  }

  private updateUserDetails(): void {
    this.dialogService.openConfirmDialog('Czy na pewno zmienić dane użytkownika?')
    .pipe(mergeMap(
      (result: boolean) => {
        if(result) {
          let user = this.getUserFromForm();
          return this.authApiService.updateUserDetails(user)
        }
        else {
          return of (null);
        }
      }
    ))
    .subscribe({
      next: (user) => {
        if(user) {
          this.updateUserDetailsMode = false;
          this.editUserDetailsButtonLabel = 'Zmień dane użytkownika';
          this.snackBarService.openSnackBar("Dane użytkownika zostały zmienione");
        }
      },
      error: () => {
        this.snackBarService.openSnackBar("Błąd przy próbie zmiany danych użytkownika", false);
      }
    })
  }

  private updateUserPassword(): void {
    this.dialogService.openConfirmDialog("Czy na pewno chcesz zmienić hasło użytkownika?")
    .pipe(mergeMap(
      (result: boolean) => {
        if(result) {
          let user = this.getUserFromForm();
          return this.authApiService.updateUserLoginDetails(user, this.password)
        }
        else {
          return of (null);
        }
      }
    ))
    .subscribe({
      next: (user) => {
        if(user) {
          this.updateUserLoginDetailsMode = false;
          this.editUserLoginDetailsButtonLabel = 'Zmień hasło użytkownika';
          this.snackBarService.openSnackBar("Hasło użytkownika zostało zmienione");
        }
      },
      error: () => {
        this.snackBarService.openSnackBar("Błąd przy próbie zmiany hasła użytkownika", false);
      }
    })
  }

  private isPasswordValid(): boolean {
    let regex = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}');
    return regex.test(this.password);
  }
}

