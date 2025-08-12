import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsInfo } from './skills-info';

describe('SkillsInfo', () => {
  let component: SkillsInfo;
  let fixture: ComponentFixture<SkillsInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillsInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
