import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForvidenComponent } from './forviden.component';

describe('ForvidenComponent', () => {
  let component: ForvidenComponent;
  let fixture: ComponentFixture<ForvidenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForvidenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForvidenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
