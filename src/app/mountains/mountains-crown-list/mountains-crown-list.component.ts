import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MountainsCrownListElementComponent } from '../mountains-crown-list-element/mountains-crown-list-element.component';
import { CommonModule } from '@angular/common';
import { Mountain } from '../models/mountain-model';
import { MountainsApiService } from '../services/mountains-api.service';

@Component({
  selector: 'app-mountains-crown-list',
  standalone: true,
  imports:
    [
      MatGridListModule,
      MountainsCrownListElementComponent,
      CommonModule],
  templateUrl: './mountains-crown-list.component.html',
  styleUrl: './mountains-crown-list.component.scss'
})
export class MountainsCrownListComponent {
  mountains: Mountain[];
  constructor(private mountinsApiService: MountainsApiService) {
    this.getMountains();
  }

  getMountains(): void {
    this.mountinsApiService.getAllMountainsCrown().subscribe(mountains => {

      this.mountains = mountains;
    })
  }
}
