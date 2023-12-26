import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MountainsCrownListComponent } from './mountains-crown-list.component';

describe('MountainsCrownListComponent', () => {
  let component: MountainsCrownListComponent;
  let fixture: ComponentFixture<MountainsCrownListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MountainsCrownListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MountainsCrownListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
