import { Component, Input } from '@angular/core';
import { Mountain } from '../models/mountain-model';
import { CommonModule } from '@angular/common';
import { MountainsApiService } from '../services/mountains-api.service';
import { MountainDialogService } from '../services/mountains-dialog-service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-mountains-crown-list-element',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule, 
    MatTooltipModule],
  templateUrl: './mountains-crown-list-element.component.html',
  styleUrl: './mountains-crown-list-element.component.scss'
})
export class MountainsCrownListElementComponent {
  @Input() mountain: Mountain;

  constructor(
    private mountainsApiService: MountainsApiService, 
    private mountainsDialogService: MountainDialogService) { }

  updateMountain(): void {
    this.mountain.visited = true;
    this.mountainsApiService.updateMountain(this.mountain).subscribe();
  }

  markAsVisited(): void {
    this.mountainsDialogService.openMarkAsVisitedDialog(this.mountain);
  }

  onClickDetails() {
    this.mountainsDialogService.openMarkAsVisitedDialog(this.mountain);
    }

}
