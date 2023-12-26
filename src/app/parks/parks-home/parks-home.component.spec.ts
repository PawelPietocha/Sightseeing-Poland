import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParksHomeComponent } from './parks-home.component';

describe('ParksHomeComponent', () => {
  let component: ParksHomeComponent;
  let fixture: ComponentFixture<ParksHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParksHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParksHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
