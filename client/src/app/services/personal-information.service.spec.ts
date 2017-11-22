import { TestBed, inject } from '@angular/core/testing';

import { PersonalInformationService } from './personal-information.service';

describe('PersonalInformationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonalInformationService]
    });
  });

  it('should be created', inject([PersonalInformationService], (service: PersonalInformationService) => {
    expect(service).toBeTruthy();
  }));
});
