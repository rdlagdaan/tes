import { TestBed, inject } from '@angular/core/testing';

import { SchoolNameService } from './school-name.service';

describe('SchoolNameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SchoolNameService]
    });
  });

  it('should be created', inject([SchoolNameService], (service: SchoolNameService) => {
    expect(service).toBeTruthy();
  }));
});
