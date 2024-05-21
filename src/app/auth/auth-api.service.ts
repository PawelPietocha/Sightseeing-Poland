import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginCredentials } from "./models/login.model";
import { User } from "./models/user.model";
import { BehaviorSubject, Observable, map } from "rxjs";
import { SignUp } from "./models/sign-up-model";
import { UpdateLoginDetails } from "./models/updateLoginDetailsModel";

@Injectable({
  providedIn: 'root',
})

export class AuthApiService {

  private baseApiURL = 'https://localhost:5001/api/Account/';
  currentUserSubject$ = new BehaviorSubject<User | null>(null);


  constructor(private http: HttpClient) {
  }

  login(loginCredentials: LoginCredentials): Observable<User> {
    return this.http
      .post<User>(this.baseApiURL + 'login', loginCredentials)
      .pipe(
        map(user => {
          localStorage.setItem('token', user.token);
          localStorage.setItem('displayName', user.displayName);
          localStorage.setItem('email', user.email);
          localStorage.setItem('userId', user.id);
          return user;
        }))
  }

  register(signUpForm: SignUp): Observable<User> {
    return this.http
      .post<User>(this.baseApiURL + 'register', signUpForm)
      .pipe(
        map(user => {
          localStorage.setItem('token', user.token);
          localStorage.setItem('displayName', user.displayName);
          localStorage.setItem('email', user.email);
          localStorage.setItem('userId', user.id);
          return user;
        }))
  }

  updateUserDetails(user: User): Observable<User> {
    return this.http
      .post<User>(this.baseApiURL + 'updateUserDetails', user)
      .pipe(
        map(user => {
          localStorage.setItem('displayName', user.displayName);
          return user;
        }))
  }

  updateUserLoginDetails(user: User, password: string): Observable<User> {
    const updateLoginDetails: UpdateLoginDetails = {
      email: user.email,
      password: password,
      id: user.id
    }
    return this.http
      .post<User>(this.baseApiURL + 'updateUserLoginDetails', updateLoginDetails)
      .pipe(
        map(user => {
          localStorage.setItem('email', user.email);
          return user;
        })
      )
  }

  getLoggedUser(email: string | null): Observable<User> {
    return this.http
      .get<User>(this.baseApiURL + 'getCurrentUser/' + email)
      .pipe(
        map(user => {
          return user;
        }))
  }
}