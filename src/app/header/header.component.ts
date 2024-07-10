import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthApiService } from '../auth/auth-api.service';
import { DialogService } from '../utils/dialogs/dialog-service';
import { take } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  displayUser: string;
  isUserLogged: boolean;

  constructor(
    private router: Router,
    private dialogService: DialogService,
    private authApiService: AuthApiService) {
  }
  ngOnInit(): void {
    if (localStorage.getItem('displayName')) {
      this.displayUser = localStorage.getItem('displayName')!;
      this.isUserLogged = true;
    }
    this.authApiService.currentUserSubject$.subscribe(user => {
      if (user) {
        this.displayUser = user.displayName;
        this.isUserLogged = true;
      }
    })
  }

  onClickLogout(): void {
    this.dialogService.openConfirmDialog("Czy na pewno chcesz się wylogować?").pipe(take(1)).subscribe(confirmed => {
      if (!confirmed) {
        return;
      }
      else {
        localStorage.clear();
        this.isUserLogged = false;
        this.router.navigate(['']);
      }
    })
  }
}
