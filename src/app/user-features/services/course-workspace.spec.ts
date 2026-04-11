import { TestBed } from '@angular/core/testing';

import { CourseWorkspace } from './course-workspace';

describe('CourseWorkspace', () => {
  let service: CourseWorkspace;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseWorkspace);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
