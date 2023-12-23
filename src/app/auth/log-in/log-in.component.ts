import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [
      MatFormFieldModule, 
      MatInputModule,
      FormsModule,
      MatButtonModule
    ],
    
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {
  login = "Zaloguj się";
  signUp = "Zarejestruj się"

  constructor(private router: Router) { }

  onSubmit(form: NgForm) {
    console.log(form);
  }

  onClickSignUp() {
    this.router.navigate(['signup']);
  }

}
