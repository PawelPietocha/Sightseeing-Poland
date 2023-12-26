import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MountainsCrownListComponent } from '../mountains-crown-list/mountains-crown-list.component';

@Component({
  selector: 'app-mountains-home',
  standalone: true,
  imports: [
      MatTabsModule, 
      MountainsCrownListComponent],
  templateUrl: './mountains-home.component.html',
  styleUrl: './mountains-home.component.scss'
})
export class MountainsHomeComponent {

}
