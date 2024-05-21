import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MountainsCrownListElementComponent } from '../mountains-crown-list-element/mountains-crown-list-element.component';
import { CommonModule } from '@angular/common';
import { Mountain } from '../models/mountain-model';
import { MountainsApiService } from '../services/mountains-api.service';
import { MountainVisited } from '../models/mountain-visited-model';
import { mergeMap } from 'rxjs';

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
  visitedMountains: MountainVisited[];
  constructor(private mountinsApiService: MountainsApiService) {
    this.getMountains();
    this.getVisitedMountains();
  }

  getMountains(): void {
    this.mountinsApiService.getAllMountainsCrown()
    .pipe(
      mergeMap(mountains => {
        this.mountains = mountains;
        return mountains
      })
    )
    .subscribe(mountains => {
      this.getVisitedMountains();
    })
  }

  getVisitedMountains(): void {
    const userId = localStorage.getItem('userId')
    if (userId) {
      this.mountinsApiService.getVisitedMountainCrown(userId).subscribe(mountainsVisited => {
        this.visitedMountains = mountainsVisited;
        this.mergeMountainsCrownWithVisited();
      })
    }
  }

  mergeMountainsCrownWithVisited(): void {
    this.visitedMountains.forEach(visitedMountain => {
      let mountain = this.mountains.find(x => x.id === visitedMountain.mountainId)
      if(mountain){
        mountain.dateOfVisit = visitedMountain.dateOfVisit;
        mountain.elevationGainInMeters = visitedMountain.elevationGainInMeters;
        mountain.endPlace = visitedMountain.endPlace;
        mountain.startPlace = visitedMountain.startPlace;
        mountain.tripLenghtInKm = visitedMountain.tripLenghtInKm;
        mountain.tripTimeHours = visitedMountain.tripTimeHours;
        mountain.tripTimeMinutes = visitedMountain.tripTimeMinutes;
        mountain.visited = true;
      }
    })
  }
}
