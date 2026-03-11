import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSection } from './course-section';

describe('CourseSection', () => {
  let component: CourseSection;
  let fixture: ComponentFixture<CourseSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
