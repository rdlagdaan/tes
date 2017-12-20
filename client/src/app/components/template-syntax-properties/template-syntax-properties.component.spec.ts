import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateSyntaxPropertiesComponent } from './template-syntax-properties.component';

describe('TemplateSyntaxPropertiesComponent', () => {
  let component: TemplateSyntaxPropertiesComponent;
  let fixture: ComponentFixture<TemplateSyntaxPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateSyntaxPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateSyntaxPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
