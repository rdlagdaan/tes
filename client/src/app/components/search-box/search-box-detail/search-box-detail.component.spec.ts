import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBoxDetailComponent } from './search-box-detail.component';

describe('SearchBoxDetailComponent', () => {
  let component: SearchBoxDetailComponent;
  let fixture: ComponentFixture<SearchBoxDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBoxDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
