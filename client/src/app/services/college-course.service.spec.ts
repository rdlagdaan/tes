import { TestBed, inject } from '@angular/core/testing';

import { CollegeCourseService } from './college-course.service';

describe('CollegeCourseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CollegeCourseService]
    });
  });

  it('should be created', inject([CollegeCourseService], (service: CollegeCourseService) => {
    expect(service).toBeTruthy();
  }));
});
