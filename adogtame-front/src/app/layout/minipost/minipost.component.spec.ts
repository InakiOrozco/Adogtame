import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinipostComponent } from './minipost.component';

describe('MinipostComponent', () => {
  let component: MinipostComponent;
  let fixture: ComponentFixture<MinipostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinipostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinipostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
