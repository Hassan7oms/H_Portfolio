import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesInfo } from './services-info';

describe('ServicesInfo', () => {
  let component: ServicesInfo;
  let fixture: ComponentFixture<ServicesInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
