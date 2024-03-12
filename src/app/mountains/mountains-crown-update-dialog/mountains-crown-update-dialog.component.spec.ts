import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MountainsCrownUpdateDialogComponent } from './mountains-crown-update-dialog.component';

describe('MountainsCrownUpdateDialogComponent', () => {
  let component: MountainsCrownUpdateDialogComponent;
  let fixture: ComponentFixture<MountainsCrownUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MountainsCrownUpdateDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MountainsCrownUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
