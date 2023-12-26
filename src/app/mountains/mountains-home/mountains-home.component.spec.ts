import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MountainsHomeComponent } from './mountains-home.component';

describe('MountainsHomeComponent', () => {
  let component: MountainsHomeComponent;
  let fixture: ComponentFixture<MountainsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MountainsHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MountainsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
