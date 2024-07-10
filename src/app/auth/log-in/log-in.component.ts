import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { LoginCredentials } from '../models/login.model';
import { AuthApiService } from '../auth-api.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../models/user.model';
import { SnackBarService } from '../../utils/snackbar/snackbar.service';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],

  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {
  loginLabel = "Zaloguj się";
  signUpLabel = "Zarejestruj się";
  wasIncorrectLoginTry = false;
  isSpinnerVisible = false;
  hidePassword = true;

  constructor(
    private router: Router,
    private authApiService: AuthApiService,
    private snackbarService: SnackBarService) { }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }
    this.isSpinnerVisible = true;
    const loginCredentials: LoginCredentials = form.value;
    this.authApiService.login(loginCredentials).subscribe({
      next: (user: User) => {
        if (user) this.onSuccessfullyLogin(user);
      },
      error: () => this.onUnSuccessfullyLogin()
    })
  }

  onClickSignUp(): void {
    this.router.navigate(['signup']);
  }

  private onSuccessfullyLogin(user: User): void {
    this.snackbarService.openSnackBar("Zalogowano poprawnie");
    this.isSpinnerVisible = false;
    this.authApiService.currentUserSubject$.next(user);
    this.router.navigate(['home']);
  }

  private onUnSuccessfullyLogin(): void {
    this.snackbarService.openSnackBar('Błędne dane logowania', false);
    this.wasIncorrectLoginTry = true;
    this.isSpinnerVisible = false;
  }
}