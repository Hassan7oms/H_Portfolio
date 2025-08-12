import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperinceInfo } from './experince-info';

describe('ExperinceInfo', () => {
  let component: ExperinceInfo;
  let fixture: ComponentFixture<ExperinceInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperinceInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperinceInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
