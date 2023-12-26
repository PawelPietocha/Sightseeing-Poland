import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MountainsCrownListElementComponent } from '../mountains-crown-list-element/mountains-crown-list-element.component';

@Component({
  selector: 'app-mountains-crown-list',
  standalone: true,
  imports: [MatGridListModule,
    MountainsCrownListElementComponent],
  templateUrl: './mountains-crown-list.component.html',
  styleUrl: './mountains-crown-list.component.scss'
})
export class MountainsCrownListComponent {

}
