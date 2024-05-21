import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from '../auth/auth-api.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  activeTab = 1;
  displayUser: string | null;
  isUserLogged: boolean;

  constructor(
    private router: Router,
    private authApiService: AuthApiService) {
  }
  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.displayUser = localStorage.getItem('displayName');
      this.isUserLogged = true;
    }
    this.authApiService.currentUserSubject$.subscribe(user => {
      if(user) {
        this.displayUser = user.displayName;
        this.isUserLogged = true;
      }
    })
  }

onClickParks(): void {
  this.activeTab = 3;
  this.router.navigate(['parks']);
}
onClickMoutain(): void {
  this.activeTab = 2;
  this.router.navigate(['mountains']);
}
onClickHome(): void {
  this.activeTab = 1;
  this.router.navigate(['home']);
}
onClickLogout(): void {
  localStorage.clear();
  this.isUserLogged = false;
  this.router.navigate(['']);
}


}
