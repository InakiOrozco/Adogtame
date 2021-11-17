import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupcardComponent } from './groupcard.component';

describe('GroupcardComponent', () => {
  let component: GroupcardComponent;
  let fixture: ComponentFixture<GroupcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupcardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
