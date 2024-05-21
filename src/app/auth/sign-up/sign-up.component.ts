import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SignUpForm } from '../models/sign-up-form.model';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { VoivodeshipApiService } from '../../voivodeships/services/voivodeship-api.service';
import { take } from 'rxjs';
import { Voivodeship } from '../../voivodeships/models/voivodeship-model';
import { AuthApiService } from '../auth-api.service';
import { SignUp } from '../models/sign-up-model';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../models/user.model';

@Component({
  selector: 'app-sign-up',
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
    CommonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatIconModule,
    MatRadioModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {
  signUpForm = new FormGroup<SignUpForm>(new SignUpForm());
  signUpLabel = "Zarejestruj się";
  loginLabel = "Zaloguj się";
  maxDateOfBirth = new Date();
  voivodeships: Voivodeship[] = [];
  hidePassword = true;

  constructor(
    private router: Router,
    private voivodeshipApiService: VoivodeshipApiService,
    private authApiService: AuthApiService) { }

  ngOnInit(): void {
    this.initData();

  }
  onSubmit(): void {
    if (!this.signUpForm.valid) {
      return;
    }
    let userToRegister = this.convertSignUpFormToSignUpModel();
    this.authApiService.register(userToRegister).subscribe(user => {
      if (user) {
        this.onSuccesfullyRegister(user);
      }
    })
  }

  onClickLogIn(): void {
    this.router.navigate(['login']);
  }

  private initData(): void {
    this.maxDateOfBirth.setFullYear(this.maxDateOfBirth.getFullYear() - 16);
    this.signUpForm.controls.dateOfBirth.setValue(this.maxDateOfBirth);
    this.voivodeshipApiService.getVoivodeships().pipe(take(1)).subscribe(voivodeships => {
      this.voivodeships = voivodeships;
    })
  }

  private convertSignUpFormToSignUpModel(): SignUp {
    return {
      email: this.signUpForm.controls.email.getRawValue(),
      password: this.signUpForm.controls.password.getRawValue(),
      displayName: this.signUpForm.controls.displayName.getRawValue(),
      dateOfBirth: this.signUpForm.controls.dateOfBirth.getRawValue(),
      gender: this.signUpForm.controls.gender.getRawValue(),
      voivodeshipId: this.signUpForm.controls.voivodeship.getRawValue(),
      acceptTerms: this.signUpForm.controls.acceptTerms.getRawValue(),
    }
  }

  private onSuccesfullyRegister(user: User): void {
    this.authApiService.currentUserSubject$.next(user);
        this.router.navigate(['home']);
  }
}


