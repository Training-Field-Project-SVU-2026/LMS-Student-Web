import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseWorkspace } from './course-workspace';

describe('CourseWorkspace', () => {
  let component: CourseWorkspace;
  let fixture: ComponentFixture<CourseWorkspace>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseWorkspace]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseWorkspace);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
