import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRecordsComponent } from './detail-records.component';

describe('DetailRecordsComponent', () => {
  let component: DetailRecordsComponent;
  let fixture: ComponentFixture<DetailRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
