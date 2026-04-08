import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GusetCourses } from './guset-courses';

describe('GusetCourses', () => {
  let component: GusetCourses;
  let fixture: ComponentFixture<GusetCourses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GusetCourses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GusetCourses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
