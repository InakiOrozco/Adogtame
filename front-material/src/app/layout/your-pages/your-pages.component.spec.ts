import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourPagesComponent } from './your-pages.component';

describe('YourPagesComponent', () => {
  let component: YourPagesComponent;
  let fixture: ComponentFixture<YourPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourPagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
