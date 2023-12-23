import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss'
})
export class StartComponent {

  constructor(private router: Router) {}

  onClickSignUpButton(): void {
    this.router.navigate(["signup"]);
  }

  onClickLoginButton(): void {
    this.router.navigate(["login"]);
  }
}
