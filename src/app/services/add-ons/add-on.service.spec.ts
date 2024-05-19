import { TestBed } from '@angular/core/testing';

import { AddOnService } from './add-on.service';

describe('AddOnService', () => {
  let service: AddOnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddOnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
