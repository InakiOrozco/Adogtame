import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourpagesComponent } from './yourpages.component';

describe('YourpagesComponent', () => {
  let component: YourpagesComponent;
  let fixture: ComponentFixture<YourpagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourpagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourpagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
