import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MountainsCrownListElementComponent } from './mountains-crown-list-element.component';

describe('MountainsCrownListElementComponent', () => {
  let component: MountainsCrownListElementComponent;
  let fixture: ComponentFixture<MountainsCrownListElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MountainsCrownListElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MountainsCrownListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
