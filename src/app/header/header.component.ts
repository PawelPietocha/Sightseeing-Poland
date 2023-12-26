import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  activeTab = 1;

  constructor(private router: Router) {
    
  }

onClickParks() {
  this.activeTab = 3;
  this.router.navigate(['parks']);
}
onClickMoutain() {
  this.activeTab = 2;
  this.router.navigate(['mountains']);
}
onClickHome() {
  this.activeTab = 1;
  this.router.navigate(['home']);
}


}
